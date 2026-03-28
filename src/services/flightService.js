import { ref, push, update, get, runTransaction } from 'firebase/database';
import { database } from '../firebaseConfig';


const timestamp = () => new Date().toISOString();
const logKey    = () => `log_${Date.now()}`;

export const createFlight = async (flightType, data) => {
  switch (flightType) {
    case 'ONE_WAY_CHARTER':    return await _createOneWayFlight(data);
    case 'ROUND_TRIP_CHARTER': return await _createRoundTripFlight(data);
    case 'MULTI_LEG_TRIP':     return await _createMultiLegFlight(data);
    case 'EMPTY_LEG':          return await _createEmptyLeg(data);
    default: throw new Error(`Unknown flight type: ${flightType}`);
  }
};

// ─────────────────────────────────────────────
//  1. ONE WAY CHARTER
// ─────────────────────────────────────────────
/*
  data = {
    jetId, jetName, totalSeats,
    departureCity, destinationCity,
    departureDate, departureTime, estimatedArrival,
    bookedBy, passengerCount, totalPrice,
    currency?,        default: 'INR'
    quoteRequestId?
  }
*/
const _createOneWayFlight = async (data) => {
  const newRef   = push(ref(database, 'flights'));
  const flightId = newRef.key;

  await update(newRef, {
    flightType: 'ONE_WAY_CHARTER',

    jetInfo: {
      jetId     : data.jetId,
      jetName   : data.jetName,
      totalSeats: data.totalSeats,
    },

    routeInfo: {
      departureCity   : data.departureCity,
      destinationCity : data.destinationCity,
      departureDate   : data.departureDate,
      departureTime   : data.departureTime,
      estimatedArrival: data.estimatedArrival,
    },

    bookingInfo: {
      bookedBy      : data.bookedBy,
      passengerCount: Number(data.passengerCount),
      isPrivate     : true,
      totalPrice    : data.totalPrice,
      currency      : data.currency || 'INR',
      paymentStatus : 'PENDING',
    },

    // PENDING → CONFIRMED → IN_AIR → LANDED → COMPLETED
    status         : 'PENDING',
    emptyLegCreated: false,
    emptyLegId     : null,

    statusHistory: {
      [logKey()]: {
        status   : 'PENDING',
        changedAt: timestamp(),
        changedBy: data.bookedBy,
        note     : 'One way charter created',
      },
    },

    meta: {
      flightId      : flightId,
      quoteRequestId: data.quoteRequestId || null,
      createdAt     : timestamp(),
      updatedAt     : timestamp(),
    },
  });

  // Index for fast admin filtering
  await update(
    ref(database, `flightsByType/ONE_WAY_CHARTER/${flightId}`),
    { active: true, createdAt: timestamp() }
  );

  return flightId;
};

// ─────────────────────────────────────────────
//  2. ROUND TRIP CHARTER
// ─────────────────────────────────────────────
/*
  data = {
    jetId, jetName, totalSeats,
    outbound: { departureCity, destinationCity, departureDate, departureTime, estimatedArrival },
    return:   { departureCity, destinationCity, departureDate, departureTime, estimatedArrival },
    bookedBy, passengerCount,
    outboundPrice, returnPrice,
    currency?,        default: 'INR'
    quoteRequestId?
  }
*/
const _createRoundTripFlight = async (data) => {
  const newRef   = push(ref(database, 'flights'));
  const flightId = newRef.key;

  await update(newRef, {
    flightType: 'ROUND_TRIP_CHARTER',

    jetInfo: {
      jetId     : data.jetId,
      jetName   : data.jetName,
      totalSeats: data.totalSeats,
    },

    routeInfo: {
      outbound: {
        departureCity   : data.outbound.departureCity,
        destinationCity : data.outbound.destinationCity,
        departureDate   : data.outbound.departureDate,
        departureTime   : data.outbound.departureTime,
        estimatedArrival: data.outbound.estimatedArrival,
        status          : 'PENDING',
      },
      return: {
        departureCity   : data.return.departureCity,
        destinationCity : data.return.destinationCity,
        departureDate   : data.return.departureDate,
        departureTime   : data.return.departureTime,
        estimatedArrival: data.return.estimatedArrival,
        status          : 'PENDING',
      },
    },

    bookingInfo: {
      bookedBy      : data.bookedBy,
      passengerCount: Number(data.passengerCount),
      isPrivate     : true,
      outboundPrice : data.outboundPrice,
      returnPrice   : data.returnPrice,
      totalPrice    : data.outboundPrice + data.returnPrice,
      currency      : data.currency || 'INR',
      paymentStatus : 'PENDING',
    },

    // PENDING → CONFIRMED → IN_AIR → OUTBOUND_DONE
    //        → RETURN_IN_AIR → RETURN_DONE → COMPLETED
    status         : 'PENDING',
    emptyLegCreated: false,
    emptyLegId     : null,

    statusHistory: {
      [logKey()]: {
        status   : 'PENDING',
        changedAt: timestamp(),
        changedBy: data.bookedBy,
        note     : 'Round trip charter created',
      },
    },

    meta: {
      flightId      : flightId,
      quoteRequestId: data.quoteRequestId || null,
      createdAt     : timestamp(),
      updatedAt     : timestamp(),
    },
  });

  await update(
    ref(database, `flightsByType/ROUND_TRIP_CHARTER/${flightId}`),
    { active: true, createdAt: timestamp() }
  );

  return flightId;
};

// ─────────────────────────────────────────────
//  3. MULTI-LEG TRIP
// ─────────────────────────────────────────────
/*
  data = {
    jetId, jetName, totalSeats,
    legs: [
      { departureCity, destinationCity, departureDate, departureTime, estimatedArrival },
      { departureCity, destinationCity, departureDate, departureTime, estimatedArrival },
      ...
    ],
    bookedBy, passengerCount, totalPrice,
    currency?,        default: 'INR'
    quoteRequestId?
  }
*/
const _createMultiLegFlight = async (data) => {
  const newRef   = push(ref(database, 'flights'));
  const flightId = newRef.key;

  // Array → Firebase-friendly object
  const legsObj = {};
  data.legs.forEach((leg, i) => {
    legsObj[`leg_${i + 1}`] = {
      legNumber       : i + 1,
      departureCity   : leg.departureCity,
      destinationCity : leg.destinationCity,
      departureDate   : leg.departureDate,
      departureTime   : leg.departureTime,
      estimatedArrival: leg.estimatedArrival,
      status          : 'PENDING',  // each leg has its own status
    };
  });

  await update(newRef, {
    flightType: 'MULTI_LEG_TRIP',

    jetInfo: {
      jetId     : data.jetId,
      jetName   : data.jetName,
      totalSeats: data.totalSeats,
    },

    legs: legsObj,

    bookingInfo: {
      bookedBy      : data.bookedBy,
      passengerCount: Number(data.passengerCount),
      isPrivate     : true,
      totalLegs     : data.legs.length,
      totalPrice    : data.totalPrice,
      currency      : data.currency || 'INR',
      paymentStatus : 'PENDING',
    },

    // PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
    status: 'PENDING',

    statusHistory: {
      [logKey()]: {
        status   : 'PENDING',
        changedAt: timestamp(),
        changedBy: data.bookedBy,
        note     : `Multi-leg trip created with ${data.legs.length} legs`,
      },
    },

    meta: {
      flightId      : flightId,
      quoteRequestId: data.quoteRequestId || null,
      createdAt     : timestamp(),
      updatedAt     : timestamp(),
    },
  });

  await update(
    ref(database, `flightsByType/MULTI_LEG_TRIP/${flightId}`),
    { active: true, createdAt: timestamp() }
  );

  return flightId;
};

// ─────────────────────────────────────────────
//  4. EMPTY LEG
// ─────────────────────────────────────────────
/*
  data = {
    jetId, jetName, totalSeats,
    departureCity, destinationCity,
    departureDate, departureTime, estimatedArrival,
    pricePerSeat, originalFullPrice,
    currency?,        default: 'INR'
    sourceFlightId    ← the original flight that triggered this empty leg
  }
*/
const _createEmptyLeg = async (data) => {
  const newRef     = push(ref(database, 'emptyLegs'));
  const emptyLegId = newRef.key;

  const discountPercent = Math.round(
    (1 - (data.pricePerSeat * data.totalSeats) / data.originalFullPrice) * 100
  );

  await update(newRef, {
    flightType: 'EMPTY_LEG',

    jetInfo: {
      jetId     : data.jetId,
      jetName   : data.jetName,
      totalSeats: data.totalSeats,
    },

    routeInfo: {
      departureCity   : data.departureCity,
      destinationCity : data.destinationCity,
      departureDate   : data.departureDate,
      departureTime   : data.departureTime,
      estimatedArrival: data.estimatedArrival,
    },

    // Live seat counter — updated atomically on every booking
    seatInfo: {
      totalSeats    : data.totalSeats,
      bookedSeats   : 0,
      availableSeats: data.totalSeats,
    },

    pricing: {
      pricePerSeat     : data.pricePerSeat,
      currency         : data.currency || 'INR',
      originalFullPrice: data.originalFullPrice,
      discountPercent  : discountPercent,
    },

    // Passenger bookings are added here as booking_<timestamp>
    bookings: {},

    // AVAILABLE → FILLING_FAST → FULLY_BOOKED → DEPARTED → COMPLETED
    status: 'AVAILABLE',

    statusHistory: {
      [logKey()]: {
        status   : 'AVAILABLE',
        changedAt: timestamp(),
        changedBy: 'system',
        note     : `Empty leg created from flight ${data.sourceFlightId}`,
      },
    },

    meta: {
      emptyLegId    : emptyLegId,
      sourceFlightId: data.sourceFlightId || null,
      createdAt     : timestamp(),
      updatedAt     : timestamp(),
    },
  });

  await update(
    ref(database, `flightsByType/EMPTY_LEG/${emptyLegId}`),
    { active: true, createdAt: timestamp() }
  );

  // Mark the source flight so admin knows empty leg was created
  if (data.sourceFlightId) {
    await update(ref(database, `flights/${data.sourceFlightId}`), {
      emptyLegCreated : true,
      emptyLegId      : emptyLegId,
      'meta/updatedAt': timestamp(),
    });
  }

  return emptyLegId;
};

// ─────────────────────────────────────────────
//  BOOK SEATS ON EMPTY LEG
//  runTransaction = atomic, zero double-booking risk
// ─────────────────────────────────────────────
/*
  passengerInfo = {
    userId?,
    firstName, lastName, email,
    phone?,
    paymentStatus?   default: 'PENDING'
  }

  Returns: bookingId string
  Throws:  Error if not enough seats
*/
export const bookEmptyLegSeats = async (emptyLegId, seatsRequested, passengerInfo) => {
  const emptyLegRef = ref(database, `emptyLegs/${emptyLegId}`);
  let   bookingId   = null;

  await runTransaction(emptyLegRef, (currentData) => {
    if (!currentData) return; // record missing, abort

    const available = currentData.seatInfo.availableSeats;
    const total     = currentData.seatInfo.totalSeats;

    if (available < seatsRequested) {
      throw new Error(
        `Only ${available} seat(s) available. You requested ${seatsRequested}.`
      );
    }

    // Deduct seats
    currentData.seatInfo.bookedSeats    += seatsRequested;
    currentData.seatInfo.availableSeats -= seatsRequested;

    const remaining = currentData.seatInfo.availableSeats;

    // Auto update status based on availability
    if (remaining === 0) {
      currentData.status = 'FULLY_BOOKED';
    } else if (remaining <= Math.ceil(total * 0.25)) {
      currentData.status = 'FILLING_FAST'; // ≤25% seats remaining
    }

    // Add booking entry
    bookingId = `booking_${Date.now()}`;
    if (!currentData.bookings) currentData.bookings = {};

    currentData.bookings[bookingId] = {
      userId       : passengerInfo.userId    || null,
      firstName    : passengerInfo.firstName,
      lastName     : passengerInfo.lastName,
      email        : passengerInfo.email,
      phone        : passengerInfo.phone     || null,
      seatsBooked  : seatsRequested,
      totalPaid    : seatsRequested * currentData.pricing.pricePerSeat,
      currency     : currentData.pricing.currency,
      bookedAt     : timestamp(),
      paymentStatus: passengerInfo.paymentStatus || 'PENDING',
    };

    currentData.meta.updatedAt = timestamp();
    return currentData; // atomic commit
  });

  return bookingId;
};

// ─────────────────────────────────────────────
//  UPDATE FLIGHT STATUS
// ─────────────────────────────────────────────
/*
  collection : 'flights' | 'emptyLegs'
  flightId   : Firebase push key
  newStatus  : string (see flows below)
  adminId    : string
  note?      : string

  ONE_WAY:     PENDING→CONFIRMED→IN_AIR→LANDED→COMPLETED
  ROUND_TRIP:  PENDING→CONFIRMED→IN_AIR→OUTBOUND_DONE→RETURN_IN_AIR→RETURN_DONE→COMPLETED
  MULTI_LEG:   PENDING→CONFIRMED→IN_PROGRESS→COMPLETED
  EMPTY_LEG:   AVAILABLE→FILLING_FAST→FULLY_BOOKED→DEPARTED→COMPLETED
  Any type:    →CANCELLED  (only from PENDING / CONFIRMED / AVAILABLE / FILLING_FAST)
*/

const CANCEL_ALLOWED_FROM = [
  'PENDING', 'CONFIRMED', 'AVAILABLE', 'FILLING_FAST',
];

export const updateFlightStatus = async (
  collection,
  flightId,
  newStatus,
  adminId,
  note = ''
) => {
  const flightRef = ref(database, `${collection}/${flightId}`);
  const snapshot  = await get(flightRef);
  const flight    = snapshot.val();

  if (!flight) throw new Error('Flight not found');

  if (newStatus === 'CANCELLED' && !CANCEL_ALLOWED_FROM.includes(flight.status)) {
    throw new Error(
      `Cannot cancel a flight with status "${flight.status}". ` +
      `Allowed from: ${CANCEL_ALLOWED_FROM.join(', ')}`
    );
  }

  await update(flightRef, {
    status           : newStatus,
    'meta/updatedAt' : timestamp(),
    [`statusHistory/${logKey()}`]: {
      status   : newStatus,
      changedAt: timestamp(),
      changedBy: adminId,
      note     : note || `Status updated to ${newStatus}`,
    },
  });

  // Hint to admin when empty leg opportunity arises
  if (
    newStatus === 'LANDED' &&
    ['ONE_WAY_CHARTER', 'MULTI_LEG_TRIP'].includes(flight.flightType)
  ) {
    console.info(
      `[flightService] Flight ${flightId} landed. ` +
      `Call createFlight('EMPTY_LEG', { sourceFlightId: '${flightId}', ... }) to list return seats.`
    );
  }
};

// ─────────────────────────────────────────────
//  CANCEL FLIGHT  (stores refund info)
// ─────────────────────────────────────────────
export const cancelFlight = async (
  collection,
  flightId,
  adminId,
  reason,
  refundAmount = 0
) => {
  const flightRef = ref(database, `${collection}/${flightId}`);
  const snapshot  = await get(flightRef);
  const flight    = snapshot.val();

  if (!flight) throw new Error('Flight not found');

  if (!CANCEL_ALLOWED_FROM.includes(flight.status)) {
    throw new Error(`Cannot cancel flight with status: ${flight.status}`);
  }

  await update(flightRef, {
    status: 'CANCELLED',

    cancellationInfo: {
      cancelledAt      : timestamp(),
      cancelledBy      : adminId,
      reason           : reason,
      refundStatus     : refundAmount > 0 ? 'PENDING' : 'NOT_APPLICABLE',
      refundAmount     : refundAmount,
      refundProcessedAt: null,
    },

    'meta/updatedAt': timestamp(),

    [`statusHistory/${logKey()}`]: {
      status   : 'CANCELLED',
      changedAt: timestamp(),
      changedBy: adminId,
      note     : reason,
    },
  });
};

// ─────────────────────────────────────────────
//  UPDATE INDIVIDUAL LEG  (Multi-Leg only)
// ─────────────────────────────────────────────
/*
  legKey   : 'leg_1' | 'leg_2' | 'leg_3' ...
  newStatus: 'CONFIRMED' | 'IN_AIR' | 'LANDED' | 'COMPLETED' | 'CANCELLED'
*/
export const updateLegStatus = async (flightId, legKey, newStatus, adminId) => {
  const flightRef = ref(database, `flights/${flightId}`);

  await update(flightRef, {
    [`legs/${legKey}/status`]     : newStatus,
    'meta/updatedAt'              : timestamp(),
    [`statusHistory/${logKey()}`] : {
      status   : `${legKey}_${newStatus}`,
      changedAt: timestamp(),
      changedBy: adminId,
      note     : `${legKey} marked as ${newStatus}`,
    },
  });
};

// ─────────────────────────────────────────────
//  UPDATE OUTBOUND / RETURN LEG  (Round Trip only)
// ─────────────────────────────────────────────
/*
  leg      : 'outbound' | 'return'
  newStatus: 'IN_AIR' | 'LANDED' | 'COMPLETED'
*/
export const updateRoundTripLeg = async (flightId, leg, newStatus, adminId) => {
  const flightRef = ref(database, `flights/${flightId}`);

  await update(flightRef, {
    [`routeInfo/${leg}/status`]   : newStatus,
    'meta/updatedAt'              : timestamp(),
    [`statusHistory/${logKey()}`] : {
      status   : `${leg}_${newStatus}`,
      changedAt: timestamp(),
      changedBy: adminId,
      note     : `${leg} leg marked as ${newStatus}`,
    },
  });
};

// ─────────────────────────────────────────────
//  PROCESS REFUND  (admin confirms refund done)
// ─────────────────────────────────────────────
export const processRefund = async (collection, flightId, adminId) => {
  await update(ref(database, `${collection}/${flightId}`), {
    'cancellationInfo/refundStatus'     : 'PROCESSED',
    'cancellationInfo/refundProcessedAt': timestamp(),
    'meta/updatedAt'                    : timestamp(),
    [`statusHistory/${logKey()}`]       : {
      status   : 'REFUND_PROCESSED',
      changedAt: timestamp(),
      changedBy: adminId,
      note     : 'Refund processed by admin',
    },
  });
};

// ─────────────────────────────────────────────
//  GET ALLOWED ADMIN ACTIONS  (drives UI buttons)
// ─────────────────────────────────────────────
export const getAdminActions = (flightType, status) => {
  if (flightType === 'EMPTY_LEG') {
    switch (status) {
      case 'AVAILABLE':    return ['VIEW_BOOKINGS', 'CANCEL'];
      case 'FILLING_FAST': return ['VIEW_BOOKINGS', 'CANCEL'];
      case 'FULLY_BOOKED': return ['VIEW_BOOKINGS', 'MARK_DEPARTED'];
      case 'DEPARTED':     return ['MARK_COMPLETED'];
      case 'COMPLETED':    return ['VIEW_ONLY'];
      case 'CANCELLED':    return ['VIEW_ONLY'];
      default:             return [];
    }
  }

  if (flightType === 'ROUND_TRIP_CHARTER') {
    switch (status) {
      case 'PENDING':       return ['CONFIRM', 'EDIT_ALL', 'CANCEL'];
      case 'CONFIRMED':     return ['MARK_IN_AIR', 'EDIT_DATE', 'EDIT_JET', 'CANCEL'];
      case 'IN_AIR':        return ['MARK_OUTBOUND_LANDED'];
      case 'OUTBOUND_DONE': return ['MARK_RETURN_IN_AIR'];
      case 'RETURN_IN_AIR': return ['MARK_RETURN_LANDED'];
      case 'RETURN_DONE':   return ['MARK_COMPLETED'];
      case 'COMPLETED':     return ['VIEW_ONLY'];
      case 'CANCELLED':     return ['VIEW_ONLY', 'VIEW_REFUND'];
      default:              return [];
    }
  }

  if (flightType === 'MULTI_LEG_TRIP') {
    switch (status) {
      case 'PENDING':     return ['CONFIRM', 'EDIT_ALL', 'CANCEL'];
      case 'CONFIRMED':   return ['MARK_IN_PROGRESS', 'EDIT_DATE', 'EDIT_JET', 'CANCEL'];
      case 'IN_PROGRESS': return ['UPDATE_LEG_STATUS'];
      case 'COMPLETED':   return ['VIEW_ONLY'];
      case 'CANCELLED':   return ['VIEW_ONLY', 'VIEW_REFUND'];
      default:            return [];
    }
  }

  // ONE_WAY_CHARTER (default)
  switch (status) {
    case 'PENDING':   return ['CONFIRM', 'EDIT_ALL', 'CANCEL'];
    case 'CONFIRMED': return ['MARK_IN_AIR', 'EDIT_DATE', 'EDIT_JET', 'CANCEL'];
    case 'IN_AIR':    return ['MARK_LANDED'];
    case 'LANDED':    return ['MARK_COMPLETED', 'CREATE_EMPTY_LEG'];
    case 'COMPLETED': return ['VIEW_ONLY'];
    case 'CANCELLED': return ['VIEW_ONLY', 'VIEW_REFUND'];
    default:          return [];
  }
};