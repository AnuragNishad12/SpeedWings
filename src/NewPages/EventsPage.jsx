// src/NewPages/Events/EventsPage.jsx

import { useState, useEffect } from 'react';
import { ref as dbRef, onValue, off, push, serverTimestamp } from 'firebase/database';
import { database } from '../firebaseConfig';
import Navbar from '../components/Navbar';
import Footer from '../NewPages/Footer';
import {
  X, MapPin, Calendar, Users, Ticket, Star,
  Clock, ChevronRight, Plus, Minus, CheckCircle,
  User, Mail, Phone, Loader2
} from 'lucide-react';


const DB_PATH          = 'xelevateEvents';
const BOOKINGS_DB_PATH = 'EventBookingDetails';

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}


const BookingDialog = ({ event, onClose }) => {
  const [step, setStep]         = useState('form'); // 'form' | 'success'
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [seats, setSeats]       = useState(1);
  const [form, setForm]         = useState({ name: '', email: '', phone: '' });
  const [touched, setTouched]   = useState({});

  if (!event) return null;

  const maxSeats   = event.availableSeats ?? 0;
  const soldOut    = maxSeats === 0;
  const lowStock   = maxSeats > 0 && maxSeats <= 10;
  const totalPrice = (Number(event.pricePerSeat) * seats).toFixed(2);

  const fillPercent = event.totalSeats
    ? Math.round(((event.totalSeats - maxSeats) / event.totalSeats) * 100)
    : 0;

  // ── field change ──
  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError('');
  };

  const handleBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  // ── simple validation ──
  const validate = () => {
    if (!form.name.trim())                     return 'Full name is required.';
    if (!form.email.trim())                    return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email address.';
    if (!form.phone.trim())                    return 'Phone number is required.';
    if (seats < 1 || seats > maxSeats)         return `Seats must be between 1 and ${maxSeats}.`;
    return null;
  };

  // ── submit ──
  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); setTouched({ name: true, email: true, phone: true }); return; }

    setSaving(true);
    setError('');

    try {
      const bookingPayload = {
        // ── User Info ──
        userName:     form.name.trim(),
        userEmail:    form.email.trim(),
        userPhone:    form.phone.trim(),
        seatsBooked:  seats,

        // ── Event Info ──
        eventId:      event.id,
        eventTitle:   event.eventTitle,
        dateTime:     event.dateTime ?? null,
        location:     event.location ?? null,
        organisedBy:  event.organisedBy ?? null,
        pricePerSeat: Number(event.pricePerSeat),
        totalAmount:  Number(event.pricePerSeat) * seats,

        // ── Meta ──
        bookedAt:     serverTimestamp(),
        status:       'pending',
      };

      const bookingsRef = dbRef(database, BOOKINGS_DB_PATH);
      await push(bookingsRef, bookingPayload);

      setStep('success');
    } catch (e) {
      console.error(e);
      setError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center px-4 pt-24 pb-6"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-[#141414] to-[#0d0d0d] w-full max-w-lg border border-[#C88A56]/30 rounded-xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Success State ── */}
        {step === 'success' ? (
          <div className="flex flex-col items-center justify-center p-10 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#C88A56]/10 border border-[#C88A56]/40 flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-[#C88A56]" />
            </div>
            <h2 className="text-2xl text-white font-light tracking-wide">Booking Confirmed!</h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs">
              Your booking for <span className="text-[#C88A56]">{event.eventTitle}</span> has been received.
              We'll reach out to <span className="text-white">{form.email}</span> with confirmation details.
            </p>

            {/* Summary pill */}
            <div className="mt-2 w-full bg-black/50 border border-[#C88A56]/20 rounded-lg p-4 text-left space-y-2">
              <SummaryRow label="Seats Booked" value={seats} />
              <SummaryRow label="Total Amount" value={`€${totalPrice}`} accent />
            </div>

            <button
              onClick={onClose}
              className="mt-4 w-full py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black font-light text-xs tracking-widest uppercase rounded transition-all shadow-lg shadow-[#C88A56]/20"
            >
              Done
            </button>
          </div>
        ) : (

          <>
            {/* ── Header ── */}
            <div className="relative flex-shrink-0 border-b border-[#C88A56]/20">
              {event.imageUrl && (
                <div className="h-36 w-full overflow-hidden">
                  <img src={event.imageUrl} alt={event.eventTitle} className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                </div>
              )}

              <div className={`${event.imageUrl ? 'absolute bottom-0 left-0 right-0' : ''} px-6 pt-5 pb-4`}>
                <p className="text-xs text-[#C88A56] uppercase tracking-widest font-light mb-1">Reserve Your Seat</p>
                <h2 className="text-xl text-white font-light tracking-wide leading-tight line-clamp-2">
                  {event.eventTitle}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 bg-black/60 hover:bg-[#C88A56]/20 border border-[#C88A56]/30 rounded transition-colors"
              >
                <X className="w-4 h-4 text-[#C88A56]" />
              </button>
            </div>

            {/* ── Body (scrollable) ── */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">

              {/* Event Quick-Info */}
              <div className="grid grid-cols-2 gap-2">
                <MiniInfoTile icon={<Calendar className="w-3.5 h-3.5" />} label="Date & Time" value={formatDateTime(event.dateTime)} />
                <MiniInfoTile icon={<MapPin className="w-3.5 h-3.5" />}   label="Location"   value={event.location} />
              </div>

              {/* Seat Availability */}
              <div className="bg-black/40 border border-[#C88A56]/20 rounded-lg p-4 space-y-3">
                <p className="text-xs text-[#C88A56] uppercase tracking-widest font-light">Seat Availability</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">Total</p>
                    <p className="text-lg text-white font-light">{event.totalSeats}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">Available</p>
                    <p className={`text-lg font-light ${soldOut ? 'text-red-400' : lowStock ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {soldOut ? 'Sold Out' : maxSeats}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">Per Seat</p>
                    <p className="text-lg text-[#C88A56] font-light">€{Number(event.pricePerSeat).toFixed(2)}</p>
                  </div>
                </div>

                {/* Fill bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1 font-light">
                    <span>{fillPercent}% filled</span>
                    {lowStock && !soldOut && (
                      <span className="text-amber-400">Only {maxSeats} left!</span>
                    )}
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${fillPercent}%`,
                        background: soldOut ? '#ef4444' : lowStock
                          ? '#f59e0b'
                          : 'linear-gradient(to right, #C88A56, #d4a574)',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Seat Picker */}
              <div>
                <p className="text-xs text-[#C88A56] uppercase tracking-widest font-light mb-3">Number of Seats</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSeats((s) => Math.max(1, s - 1))}
                    disabled={seats <= 1}
                    className="w-9 h-9 flex items-center justify-center border border-[#C88A56]/30 text-[#C88A56] hover:bg-[#C88A56]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="flex-1 text-center">
                    <span className="text-3xl text-white font-light tabular-nums">{seats}</span>
                    <p className="text-xs text-gray-500 font-light mt-0.5">
                      {seats === 1 ? 'seat' : 'seats'} · €{totalPrice} total
                    </p>
                  </div>

                  <button
                    onClick={() => setSeats((s) => Math.min(maxSeats, s + 1))}
                    disabled={seats >= maxSeats}
                    className="w-9 h-9 flex items-center justify-center border border-[#C88A56]/30 text-[#C88A56] hover:bg-[#C88A56]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[#C88A56]/20 to-transparent" />

              {/* User Form */}
              <div className="space-y-4">
                <p className="text-xs text-[#C88A56] uppercase tracking-widest font-light">Your Details</p>

                <BookingField
                  icon={<User className="w-4 h-4" />}
                  label="Full Name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={touched.name && !form.name.trim() ? 'Name is required' : ''}
                />

                <BookingField
                  icon={<Mail className="w-4 h-4" />}
                  label="Email Address"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={
                    touched.email && !form.email.trim()
                      ? 'Email is required'
                      : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                      ? 'Enter a valid email'
                      : ''
                  }
                />

                <BookingField
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone Number"
                  type="tel"
                  placeholder="e.g. +353 87 000 0000"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && !form.phone.trim() ? 'Phone is required' : ''}
                />
              </div>

              {/* Global error */}
              {error && (
                <p className="text-xs text-red-400 font-light bg-red-500/10 border border-red-500/20 px-3 py-2 rounded">
                  {error}
                </p>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="border-t border-[#C88A56]/20 p-4 bg-black/40 flex-shrink-0 flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-2xl text-[#C88A56] font-light leading-none">€{totalPrice}</span>
                <span className="text-xs text-gray-500 font-light mt-0.5">
                  {seats} {seats === 1 ? 'seat' : 'seats'} total
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={saving || soldOut}
                className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black font-light text-xs tracking-widest uppercase rounded transition-all shadow-lg shadow-[#C88A56]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {saving ? 'Saving…' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Field component ──────────────────────────────────────────────────────────
function BookingField({ icon, label, type, placeholder, value, onChange, onBlur, error }) {
  return (
    <div>
      <label className="text-xs text-gray-400 font-light uppercase tracking-wider mb-1.5 block">{label}</label>
      <div className={`flex items-center gap-3 bg-black/50 border ${error ? 'border-red-500/50' : 'border-[#C88A56]/20'} focus-within:border-[#C88A56]/60 rounded px-3 py-2.5 transition-colors`}>
        <span className="text-[#C88A56] flex-shrink-0">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="flex-1 bg-transparent text-white text-sm font-light placeholder-gray-600 outline-none"
        />
      </div>
      {error && <p className="text-xs text-red-400 font-light mt-1">{error}</p>}
    </div>
  );
}

// ─── Mini helpers ─────────────────────────────────────────────────────────────
function MiniInfoTile({ icon, label, value }) {
  return (
    <div className="bg-black/40 border border-[#C88A56]/20 p-3 rounded">
      <div className="flex items-center gap-1.5 text-[#C88A56] mb-1">
        {icon}
        <span className="text-xs uppercase tracking-wider font-light">{label}</span>
      </div>
      <p className="text-white text-xs font-light leading-snug">{value || '—'}</p>
    </div>
  );
}

function SummaryRow({ label, value, accent }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-400 font-light">{label}</span>
      <span className={`text-sm font-light ${accent ? 'text-[#C88A56]' : 'text-white'}`}>{value}</span>
    </div>
  );
}

// ─── Specification Dialog ─────────────────────────────────────────────────────
const SpecificationDialog = ({ event, onClose }) => {
  if (!event) return null;

  const seatsLeft   = event.availableSeats;
  const soldOut     = seatsLeft === 0;
  const lowStock    = seatsLeft > 0 && seatsLeft <= 10;
  const fillPercent = event.totalSeats
    ? Math.round(((event.totalSeats - seatsLeft) / event.totalSeats) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 pt-24 pb-6"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-[#141414] to-black w-full max-w-3xl max-h-full overflow-hidden relative border border-[#C88A56]/30 flex flex-col rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Dialog Header ── */}
        <div className="relative flex-shrink-0">
          {event.imageUrl && (
            <div className="h-48 w-full overflow-hidden">
              <img src={event.imageUrl} alt={event.eventTitle} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
            </div>
          )}
          <div className={`${event.imageUrl ? 'absolute bottom-0 left-0 right-0' : ''} p-6`}>
            <p className="text-xs text-[#C88A56] uppercase tracking-widest font-light mb-1">Event Details</p>
            <h2 className="text-2xl text-white tracking-wide leading-tight">{event.eventTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-[#C88A56]/20 border border-[#C88A56]/30 transition-colors rounded"
          >
            <X className="w-5 h-5 text-[#C88A56]" />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InfoTile icon={<MapPin className="w-4 h-4" />}   label="Location"     value={event.location} />
            <InfoTile icon={<Calendar className="w-4 h-4" />} label="Date & Time"  value={formatDateTime(event.dateTime)} />
            <InfoTile icon={<Star className="w-4 h-4" />}     label="Organised By" value={event.organisedBy} />
          </div>

          <div>
            <SectionHeading>About This Event</SectionHeading>
            <p className="text-gray-300 font-light text-sm leading-relaxed">{event.description}</p>
          </div>

          <div>
            <SectionHeading>Seating Availability</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <StatTile label="Total Seats"  value={event.totalSeats} />
              <StatTile label="Available"    value={soldOut ? 'Sold Out' : event.availableSeats} highlight={soldOut ? 'sold' : lowStock ? 'low' : null} />
              <StatTile label="Price / Seat" value={`€${Number(event.pricePerSeat).toFixed(2)}`} accent />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1 font-light">
                <span>{fillPercent}% filled</span>
                <span>{seatsLeft} remaining</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${fillPercent}%`,
                    background: soldOut ? '#ef4444' : lowStock ? '#f59e0b' : 'linear-gradient(to right, #C88A56, #d4a574)',
                  }}
                />
              </div>
            </div>
          </div>

          {event.benefits && (
            <div>
              <SectionHeading>What's Included</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {event.benefits.split(',').map((b, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 bg-[#C88A56]/10 border border-[#C88A56]/30 text-[#C88A56] rounded font-light tracking-wide">
                    ✦ {b.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Dialog Footer ── */}
        <div className="border-t border-[#C88A56]/20 p-4 bg-black/40 flex items-center justify-between flex-shrink-0 gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-[#C88A56] font-light">€{Number(event.pricePerSeat).toFixed(2)}</span>
            <span className="text-xs text-gray-400 font-light">per seat</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-[#C88A56]/30 text-[#C88A56] font-light text-sm tracking-wide uppercase hover:bg-[#C88A56]/10 transition-all"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black font-light text-sm tracking-wide uppercase transition-all shadow-lg shadow-[#C88A56]/30"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Small helpers inside spec dialog ────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <div className="mb-3">
      <h3 className="text-sm text-[#C88A56] uppercase tracking-widest font-light">{children}</h3>
      <div className="h-px bg-gradient-to-r from-[#C88A56]/40 to-transparent mt-1" />
    </div>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="bg-black/50 border border-[#C88A56]/20 p-3 rounded">
      <div className="flex items-center gap-1.5 text-[#C88A56] mb-1">
        {icon}
        <span className="text-xs uppercase tracking-wider font-light">{label}</span>
      </div>
      <p className="text-white text-sm font-light leading-snug">{value || '—'}</p>
    </div>
  );
}

function StatTile({ label, value, highlight, accent }) {
  const valueColor = highlight === 'sold' ? 'text-red-400' : highlight === 'low' ? 'text-amber-400' : accent ? 'text-[#C88A56]' : 'text-white';
  return (
    <div className="bg-black/50 border border-[#C88A56]/20 p-3 rounded">
      <div className="text-xs text-gray-400 uppercase tracking-wider font-light mb-1">{label}</div>
      <div className={`text-xl font-light ${valueColor}`}>{value}</div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────
const EventCard = ({ event, onViewSpec, onBook }) => {
  const seatsLeft = event.availableSeats;
  const soldOut   = seatsLeft === 0;
  const lowStock  = seatsLeft > 0 && seatsLeft <= 10;

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-[#C88A56]/20 hover:border-[#C88A56]/50 hover:shadow-2xl hover:shadow-[#C88A56]/10 transition-all duration-300 rounded-xl overflow-hidden group">

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#0d0d0d]">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.eventTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1a1a1a] to-black">
            <Calendar className="w-8 h-8 text-[#C88A56]/30" />
            <span className="text-gray-600 text-xs font-light tracking-wide">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {soldOut ? (
          <span className="absolute top-3 left-3 text-xs px-3 py-1 bg-red-500/90 text-white rounded-full font-light tracking-wide">Sold Out</span>
        ) : lowStock ? (
          <span className="absolute top-3 left-3 text-xs px-3 py-1 bg-amber-500/90 text-black rounded-full font-light tracking-wide">Only {seatsLeft} left</span>
        ) : null}

        <div className="absolute bottom-3 right-3 bg-black/80 border border-[#C88A56]/40 px-3 py-1 rounded">
          <span className="text-[#C88A56] text-sm font-light">
            €{Number(event.pricePerSeat).toFixed(2)}
            <span className="text-gray-400 text-xs ml-1">/seat</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h2 className="text-white text-lg font-light tracking-wide leading-snug mb-3 group-hover:text-[#C88A56] transition-colors duration-300 line-clamp-2">
          {event.eventTitle}
        </h2>

        <div className="flex items-center gap-2 text-gray-400 text-sm font-light mb-2">
          <MapPin className="w-3.5 h-3.5 text-[#C88A56] flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-sm font-light mb-4">
          <Calendar className="w-3.5 h-3.5 text-[#C88A56] flex-shrink-0" />
          <span>{formatDate(event.dateTime)}</span>
        </div>

        <div className="h-px bg-gradient-to-r from-[#C88A56]/20 to-transparent mb-4" />

        <div className="flex gap-3">
          <button
            onClick={() => onViewSpec(event)}
            className="flex-1 py-2.5 bg-black/50 border border-[#C88A56]/30 text-[#C88A56] font-light text-xs tracking-widest uppercase hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300 rounded"
          >
            View Details
          </button>

          <button
            onClick={() => !soldOut && onBook(event)}
            disabled={soldOut}
            className={`flex-1 py-2.5 font-light text-xs tracking-widest uppercase transition-all duration-300 rounded shadow-lg ${
              soldOut
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                : 'bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black shadow-[#C88A56]/30 hover:shadow-[#C88A56]/50'
            }`}
          >
            {soldOut ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-black/40 border border-[#C88A56]/10 rounded-xl overflow-hidden animate-pulse">
    <div className="h-52 bg-white/5" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-white/5 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-1/2" />
      <div className="h-3 bg-white/5 rounded w-2/5" />
      <div className="flex gap-3 pt-2">
        <div className="flex-1 h-9 bg-white/5 rounded" />
        <div className="flex-1 h-9 bg-[#C88A56]/10 rounded" />
      </div>
    </div>
  </div>
);


export default function EventsPage() {
  const [events, setEvents]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [bookingEvent, setBookingEvent]   = useState(null); 

  useEffect(() => {
    const eventsRef = dbRef(database, DB_PATH);

    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setEvents([]);
        setLoading(false);
        return;
      }
      const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setEvents(list);
      setLoading(false);
    });

    return () => off(eventsRef);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#141414] to-[#1a1a1a]">
      <Navbar />

      {/* ── Hero ── */}
      <div className="bg-black py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <a href="/" className="text-gray-400 hover:text-[#C88A56] transition-colors font-light text-sm tracking-widest uppercase">
              Home
            </a>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-[#C88A56] font-light text-sm tracking-widest uppercase">Events</span>
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl text-white mb-4 tracking-wide font-light">Upcoming Events</h1>
            <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-32 mb-5" />
            <p className="text-gray-400 text-base md:text-lg font-light max-w-3xl leading-relaxed">
              Discover exclusive experiences curated by Xelevate — from world-class concerts
              to elite networking summits. Reserve your seat before they sell out.
            </p>
          </div>
        </div>
      </div>

      {/* ── Events Grid ── */}
      <div className="py-12 px-4 md:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          {!loading && (
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-300 font-light text-sm tracking-wide">
                <span className="text-[#C88A56] text-lg mr-1">{events.length}</span>
                event{events.length !== 1 ? 's' : ''} available
              </p>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="bg-black/40 backdrop-blur-sm p-16 rounded-xl text-center border border-[#C88A56]/20">
              <div className="w-16 h-16 rounded-full border border-[#C88A56]/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-[#C88A56]/40" />
              </div>
              <p className="text-xl text-gray-300 font-light mb-2">No events available yet</p>
              <p className="text-gray-500 text-sm font-light">Check back soon for upcoming events.</p>
            </div>
          )}

          {!loading && events.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  onViewSpec={setSelectedEvent}
                  onBook={setBookingEvent}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Spec Dialog ── */}
      {selectedEvent && (
        <SpecificationDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {/* ── Booking Dialog ── */}
      {bookingEvent && (
        <BookingDialog event={bookingEvent} onClose={() => setBookingEvent(null)} />
      )}

      <Footer />
    </div>
  );
}