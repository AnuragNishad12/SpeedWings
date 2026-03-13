import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { database } from '../firebaseConfig';
import { X, Filter, MapPin, Calendar, Clock, ChevronRight, Check, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

// ─── Booking Dialog (replaces EnquiryForm) ────────────────────────────────────
function BookingDialog({ car, onClose }) {
  const [step, setStep] = useState(1); // 1 = configure, 2 = review, 3 = success

  // Step 1
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [extraKm, setExtraKm] = useState('');
  const [extraHr, setExtraHr] = useState('');
  const [step1Error, setStep1Error] = useState('');

  // Step 2
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing calculations
  const basePrice = Number((car.price || '0').replace(/[^0-9.]/g, '')) || 0;
  const extraKmRate = Number(car.extraKmRate) || Math.round(basePrice * 0.01) || 310;
  const extraHrRate = Number(car.extraHrRate) || Math.round(basePrice * 0.1) || 3100;
  const extraKmCost = (Number(extraKm) || 0) * extraKmRate;
  const extraHrCost = (Number(extraHr) || 0) * extraHrRate;
  const estimatedTotal = basePrice + extraKmCost + extraHrCost;

  const fmt = (v) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(v);

  // Max 4 digit numeric input
  const numInput = (val, setter) => setter(val.replace(/\D/g, '').slice(0, 4));

  const today = new Date().toISOString().split('T')[0];

  const handleProceed = () => {
    if (!selectedDate || !selectedTime) {
      setStep1Error('Please select a date and time to continue.');
      return;
    }
    setStep1Error('');
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !phone || !email || !pickup) {
      setSubmitError('Please fill in all required fields.');
      return;
    }
    if (!agreeTerms) {
      setSubmitError('Please agree to the Terms & Conditions.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await push(ref(database, 'bookings'), {
        carId: car.id,
        carTitle: car.title || '',
        carPrice: car.price || '',
        carCity: car.city || '',
        carCountry: car.country || '',
        date: selectedDate,
        time: selectedTime,
        extraKm: Number(extraKm) || 0,
        extraHr: Number(extraHr) || 0,
        extraKmRate,
        extraHrRate,
        estimatedTotal,
        firstName,
        lastName,
        phone,
        email,
        pickup,
        dropoff: dropoff || '',
        additionalInfo: additionalInfo || '',
        bookedAt: new Date().toISOString(),
        status: 'pending',
      });
      setStep(3);
    } catch (err) {
      console.error(err);
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[80px] overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-gradient-to-b from-[#1c1c1c] to-[#111] border border-[#C88A56]/30 rounded-2xl w-full max-w-2xl shadow-2xl shadow-black/70 overflow-hidden my-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-[#C88A56]/20 flex items-start justify-between">
          <div>
            {step < 3 && (
              <div className="flex items-center gap-2 mb-2">
                {[1, 2].map((s, i) => (
                  <React.Fragment key={s}>
                    <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-light border transition-all ${step >= s ? 'bg-[#C88A56] border-[#C88A56] text-black' : 'border-[#C88A56]/30 text-gray-500'}`}>{s}</span>
                    {i === 0 && <div className={`w-10 h-px transition-all ${step >= 2 ? 'bg-[#C88A56]' : 'bg-[#C88A56]/20'}`} />}
                  </React.Fragment>
                ))}
              </div>
            )}
            <h2 className="text-xl text-white font-light tracking-wide">
              {step === 1 && 'Configure Your Booking'}
              {step === 2 && 'Review & Confirm'}
              {step === 3 && 'Booking Confirmed'}
            </h2>
            {step < 3 && <p className="text-xs text-[#C88A56] tracking-widest uppercase font-light mt-0.5">{car.title}</p>}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#C88A56]/10 rounded-full transition-colors border border-transparent hover:border-[#C88A56]/30 mt-1">
            <X className="w-5 h-5 text-gray-400 hover:text-[#C88A56] transition-colors" />
          </button>
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="px-7 py-6">
            {/* Package Banner */}
            <div className="flex items-center gap-3 bg-white/5 border border-[#C88A56]/20 rounded-xl px-5 py-4 mb-7">
              <div className="w-3 h-3 rounded-full border-2 border-[#C88A56] flex-shrink-0" />
              <p className="flex-1 text-white text-sm font-light tracking-wide truncate">
                <span className="uppercase">{car.title}</span>
                {car.totalTime && <span className="text-gray-400"> — {car.totalTime}</span>}
                {car.kilometers && <span className="text-gray-400"> — {car.kilometers} KM</span>}
                {car.price && <span className="text-[#C88A56]"> — {car.price}</span>}
              </p>
              <ChevronRight className="w-4 h-4 text-[#C88A56] flex-shrink-0" />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-xs text-gray-400 tracking-[0.15em] uppercase font-light mb-2">Choose Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C88A56] pointer-events-none" />
                  <input
                    type="date" min={today} value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-black/50 border border-[#C88A56]/25 rounded-lg text-white text-sm font-light focus:outline-none focus:border-[#C88A56] transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 tracking-[0.15em] uppercase font-light mb-2">Choose Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C88A56] pointer-events-none" />
                  <input
                    type="time" value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-black/50 border border-[#C88A56]/25 rounded-lg text-white text-sm font-light focus:outline-none focus:border-[#C88A56] transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Extra KM & HR */}
            <div className="grid grid-cols-2 gap-5 mb-7">
              {[
                { label: 'Extra KMs', badge: `+ ₹${fmt(extraKmRate)} / KM`, val: extraKm, set: setExtraKm },
                { label: 'Extra HRS', badge: `+ ₹${fmt(extraHrRate)} / HR`, val: extraHr, set: setExtraHr },
              ].map(({ label, badge, val, set }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-400 tracking-[0.15em] uppercase font-light">{label}</label>
                    <span className="text-xs text-gray-500 bg-white/5 border border-[#C88A56]/15 rounded-full px-2.5 py-0.5 font-light">{badge}</span>
                  </div>
                  <input
                    type="text" inputMode="numeric" value={val} maxLength={4}
                    onChange={e => numInput(e.target.value, set)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-black/50 border border-[#C88A56]/25 rounded-lg text-white text-sm font-light placeholder-gray-600 focus:outline-none focus:border-[#C88A56] transition-colors"
                  />
                  <div className="mt-1 h-0.5 bg-gradient-to-r from-[#C88A56]/30 to-transparent rounded" />
                </div>
              ))}
            </div>

            {/* Estimated Total */}
            <div className="bg-black/40 border border-[#C88A56]/20 rounded-xl px-5 py-4 mb-6">
              <p className="text-xs text-gray-500 tracking-[0.15em] uppercase font-light mb-1">Estimated Total</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl text-white font-light tracking-wide">₹ {fmt(estimatedTotal)}</p>
                {(extraKmCost > 0 || extraHrCost > 0) && (
                  <div className="pb-1 text-xs font-light space-x-1">
                    {extraKmCost > 0 && <span className="text-emerald-400/70">+₹{fmt(extraKmCost)} km</span>}
                    {extraKmCost > 0 && extraHrCost > 0 && <span className="text-gray-600">·</span>}
                    {extraHrCost > 0 && <span className="text-emerald-400/70">+₹{fmt(extraHrCost)} hr</span>}
                  </div>
                )}
              </div>
            </div>

            {step1Error && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-light mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />{step1Error}
              </div>
            )}

            <button onClick={handleProceed} className="w-full py-4 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black text-sm font-light tracking-[0.18em] uppercase rounded-xl transition-all shadow-lg shadow-[#C88A56]/25">
              Proceed to Pay
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="px-7 py-6 max-h-[75vh] overflow-y-auto">
            <p className="text-xs text-gray-500 tracking-[0.12em] uppercase font-light mb-5">Your path to luxury awaits</p>

            {/* Name */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {[
                { label: 'First Name *', val: firstName, set: setFirstName, ph: 'First Name' },
                { label: 'Last Name *', val: lastName, set: setLastName, ph: 'Last Name' },
              ].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 tracking-[0.12em] uppercase font-light mb-2">{label}</label>
                  <input type="text" value={val} onChange={e => set(e.target.value)} placeholder={ph}
                    className="w-full px-0 py-2 bg-transparent border-b border-[#C88A56]/25 text-white text-sm font-light placeholder-gray-600 focus:outline-none focus:border-[#C88A56] transition-colors" />
                </div>
              ))}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs text-gray-500 tracking-[0.12em] uppercase font-light mb-2">Phone *</label>
                <div className="flex items-center gap-2 border-b border-[#C88A56]/25 pb-2 focus-within:border-[#C88A56] transition-colors">
                  <span className="text-sm">🇮🇳</span>
                  <span className="text-sm text-gray-400 font-light">+ 91</span>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Phone"
                    className="flex-1 bg-transparent text-white text-sm font-light placeholder-gray-600 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 tracking-[0.12em] uppercase font-light mb-2">Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                  className="w-full px-0 py-2 bg-transparent border-b border-[#C88A56]/25 text-white text-sm font-light placeholder-gray-600 focus:outline-none focus:border-[#C88A56] transition-colors" />
              </div>
            </div>

            {/* Pickup */}
            <div className="mb-5">
              <label className="block text-xs text-gray-500 tracking-[0.12em] uppercase font-light mb-2">Pickup Address *</label>
              <div className="flex items-center gap-2 border-b border-[#C88A56]/25 pb-2 focus-within:border-[#C88A56] transition-colors">
                <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <input type="text" value={pickup} onChange={e => setPickup(e.target.value)}
                  placeholder={`Enter Pickup Address${car.city ? ` (${car.city})` : ''}`}
                  className="flex-1 bg-transparent text-white text-sm font-light placeholder-gray-600 focus:outline-none" />
              </div>
            </div>

            {/* Dropoff */}
            <div className="mb-5">
              <label className="block text-xs text-gray-500 tracking-[0.12em] uppercase font-light mb-2">
                Drop-off Address <span className="normal-case text-gray-600">(optional)</span>
              </label>
              <div className="flex items-center gap-2 border-b border-[#C88A56]/25 pb-2 focus-within:border-[#C88A56] transition-colors">
                <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <input type="text" value={dropoff} onChange={e => setDropoff(e.target.value)} placeholder="Enter Drop-off Address (Optional)"
                  className="flex-1 bg-transparent text-white text-sm font-light placeholder-gray-600 focus:outline-none" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="mb-6">
              <label className="block text-xs text-gray-500 tracking-[0.12em] uppercase font-light mb-2">
                Additional Information <span className="normal-case text-gray-600">(optional)</span>
              </label>
              <input type="text" value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} placeholder="Any special requests..."
                className="w-full px-0 py-2 bg-transparent border-b border-[#C88A56]/25 text-white text-sm font-light placeholder-gray-600 focus:outline-none focus:border-[#C88A56] transition-colors" />
            </div>

            {/* Booking summary */}
            <div className="bg-[#C88A56]/8 border border-[#C88A56]/20 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
              <div className="text-xs text-gray-400 font-light space-y-0.5">
                <p>{selectedDate} · {selectedTime}</p>
                {(extraKm || extraHr) && (
                  <p className="text-gray-500">
                    {extraKm ? `+${extraKm} km` : ''}{extraKm && extraHr ? ' · ' : ''}{extraHr ? `+${extraHr} hr` : ''}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-light">Total</p>
                <p className="text-[#C88A56] font-light">₹ {fmt(estimatedTotal)}</p>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer mb-6">
              <button type="button" onClick={() => setAgreeTerms(p => !p)}
                className={`w-4 h-4 mt-0.5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${agreeTerms ? 'bg-[#C88A56] border-[#C88A56]' : 'bg-transparent border-[#C88A56]/40'}`}>
                {agreeTerms && <Check className="w-2.5 h-2.5 text-black" />}
              </button>
              <span className="text-sm text-gray-400 font-light">
                I agree to the <span className="text-[#C88A56] underline underline-offset-2">Terms & Conditions</span>
              </span>
            </label>

            {submitError && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-light mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />{submitError}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-8 py-4 bg-white/8 border border-white/10 text-gray-300 text-sm font-light tracking-[0.12em] uppercase rounded-xl hover:bg-white/12 transition-all">
                Edit
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting}
                className="flex-1 py-4 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] disabled:opacity-60 disabled:cursor-not-allowed text-black text-sm font-light tracking-[0.18em] uppercase rounded-xl transition-all shadow-lg shadow-[#C88A56]/25">
                {isSubmitting ? 'Confirming...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === 3 && (
          <div className="px-7 py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#C88A56]/15 border border-[#C88A56]/40 flex items-center justify-center mb-5">
              <Check className="w-7 h-7 text-[#C88A56]" />
            </div>
            <h3 className="text-2xl text-white font-light tracking-wide mb-2">Booking Confirmed</h3>
            <p className="text-gray-400 font-light text-sm max-w-xs leading-relaxed mb-2">
              Your booking for <span className="text-[#C88A56]">{car.title}</span> on {selectedDate} has been received.
            </p>
            <p className="text-gray-500 font-light text-xs mb-8">We'll reach out to {email} shortly to confirm.</p>
            <div className="bg-black/40 border border-[#C88A56]/20 rounded-xl px-6 py-4 w-full mb-8">
              <div className="flex justify-between text-sm font-light mb-2">
                <span className="text-gray-400">Estimated Total</span>
                <span className="text-[#C88A56]">₹ {fmt(estimatedTotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-light">
                <span className="text-gray-400">Pickup</span>
                <span className="text-white text-right max-w-[60%] truncate">{pickup}</span>
              </div>
            </div>
            <button onClick={onClose} className="w-full py-4 bg-gradient-to-r from-[#C88A56] to-[#d4a574] text-black text-sm font-light tracking-[0.18em] uppercase rounded-xl shadow-lg shadow-[#C88A56]/25">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LuxuryCarSearch() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableCategories, setAvailableCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [carName, setCarName] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [showLocationDialog, setShowLocationDialog] = useState(true);
  const [locationData, setLocationData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const carsRef = ref(database, 'cars');
    const unsubscribe = onValue(carsRef, (snapshot) => {
      if (snapshot.exists()) {
        const carsData = [];
        const categoriesSet = new Set();
        const locationMap = {};

        snapshot.forEach((child) => {
          const carData = { id: child.key, ...child.val() };
          carsData.push(carData);
          if (carData.category) categoriesSet.add(carData.category.toLowerCase());

          const country = (carData.country || '').trim();
          const cityRaw = (carData.city || '').trim();
          if (country) {
            if (!locationMap[country]) locationMap[country] = new Set();
            cityRaw.split(',').forEach(c => { const t = c.trim(); if (t) locationMap[country].add(t); });
          } else if (cityRaw) {
            if (!locationMap['Other']) locationMap['Other'] = new Set();
            cityRaw.split(',').forEach(c => { const t = c.trim(); if (t) locationMap['Other'].add(t); });
          }
        });

        const processedLocations = {};
        Object.entries(locationMap).forEach(([c, s]) => { processedLocations[c] = Array.from(s).sort(); });

        setCars(carsData);
        setFilteredCars(carsData);
        setAvailableCategories(Array.from(categoriesSet).sort());
        setLocationData(processedLocations);
        const countries = Object.keys(processedLocations).sort();
        if (countries.length > 0) setSelectedCountry(countries[0]);
      } else {
        setCars([]); setFilteredCars([]); setAvailableCategories([]); setLocationData({});
      }
      setIsLoading(false);
    }, (err) => { console.error(err); setIsLoading(false); });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...cars];
      if (carName.trim()) {
        const term = carName.toLowerCase();
        result = result.filter(c => (c.title || '').toLowerCase().includes(term));
      }
      if (maxPrice && !isNaN(Number(maxPrice))) {
        const max = Number(maxPrice);
        result = result.filter(c => Number((c.price || '0').replace(/[^0-9]/g, '')) <= max);
      }
      if (selectedCategories.length > 0) {
        result = result.filter(c => selectedCategories.includes((c.category || '').toLowerCase()));
      }
      if (selectedCity) {
        result = result.filter(c =>
          (c.city || '').toLowerCase().split(',').map(s => s.trim()).includes(selectedCity.toLowerCase())
        );
      } else if (selectedCountry) {
        result = result.filter(c => {
          if (selectedCountry === 'Other') return !c.country || c.country.trim() === '';
          return (c.country || '').toLowerCase() === selectedCountry.toLowerCase();
        });
      }
      setFilteredCars(result);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [carName, maxPrice, selectedCategories, cars, selectedCity, selectedCountry]);

  const toggleCategory = (cat) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  const clearFilters = () => { setCarName(''); setMaxPrice(''); setSelectedCategories([]); };
  const openDetails = (car) => { setSelectedCar(car); setShowDetails(true); };
  const openBooking = (car) => { setSelectedCar(car); setShowBookingDialog(true); };

  const getCarImages = (car) => {
    const images = [];
    if (car.coverImg) images.push(car.coverImg);
    if (car.additionalImages && Array.isArray(car.additionalImages)) {
      car.additionalImages.forEach(u => { if (u && typeof u === 'string') images.push(u); });
    }
    if (images.length === 0) images.push('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800');
    return images;
  };

  const LocationDialog = () => {
    const countries = Object.keys(locationData).sort();
    const cities = selectedCountry ? (locationData[selectedCountry] || []) : [];
    const popularCities = cities.slice(0, 6);
    const otherCities = cities.slice(6);
    if (!showLocationDialog) return null;
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowLocationDialog(false)} />
        <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#141414] border border-[#C88A56]/30 rounded-2xl w-full max-w-3xl shadow-2xl shadow-black/60 overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-[#C88A56]/20 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-[#C88A56]" />
                <span className="text-[#C88A56] text-xs tracking-[0.2em] uppercase font-light">Select Location</span>
              </div>
              <h2 className="text-2xl text-white font-light tracking-wide">Where are you looking?</h2>
            </div>
            <button onClick={() => setShowLocationDialog(false)} className="p-2 hover:bg-[#C88A56]/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400 hover:text-[#C88A56] transition-colors" />
            </button>
          </div>
          <div className="px-8 py-6">
            {countries.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {countries.map(country => (
                  <button key={country} onClick={() => { setSelectedCountry(country); setSelectedCity(null); }}
                    className={`px-6 py-2.5 rounded-full text-sm tracking-[0.12em] uppercase font-light transition-all border ${selectedCountry === country ? 'bg-[#C88A56] border-[#C88A56] text-black shadow-lg shadow-[#C88A56]/30' : 'bg-transparent border-[#C88A56]/30 text-gray-300 hover:border-[#C88A56]/60 hover:text-white'}`}>
                    {country}
                  </button>
                ))}
              </div>
            )}
            {popularCities.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-gray-500 tracking-[0.18em] uppercase mb-4 font-light">Popular Cities</p>
                <div className="flex flex-wrap gap-3">
                  {popularCities.map(city => (
                    <button key={city} onClick={() => { setSelectedCity(city); setShowLocationDialog(false); }}
                      className={`px-5 py-2 rounded-full text-sm tracking-[0.1em] uppercase font-light transition-all border ${selectedCity === city ? 'bg-[#C88A56] border-[#C88A56] text-black' : 'bg-transparent border-[#C88A56]/20 text-gray-300 hover:border-[#C88A56]/50 hover:text-white'}`}>
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {otherCities.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-gray-500 tracking-[0.18em] uppercase mb-4 font-light">Other Cities</p>
                <div className="flex flex-wrap gap-3">
                  {otherCities.map(city => (
                    <button key={city} onClick={() => { setSelectedCity(city); setShowLocationDialog(false); }}
                      className={`px-5 py-2 rounded-full text-sm tracking-[0.1em] uppercase font-light transition-all border ${selectedCity === city ? 'bg-[#C88A56] border-[#C88A56] text-black' : 'bg-transparent border-[#C88A56]/20 text-gray-300 hover:border-[#C88A56]/50 hover:text-white'}`}>
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {countries.length === 0 && !isLoading && <p className="text-gray-500 text-sm font-light text-center py-4">No location data available.</p>}
          </div>
          <div className="px-8 pb-8 flex items-center justify-between">
            <button onClick={() => setShowLocationDialog(false)} className="text-sm text-gray-400 hover:text-[#C88A56] transition-colors font-light underline underline-offset-4">Browse all cars</button>
            {selectedCountry && (
              <button onClick={() => { setSelectedCity(null); setShowLocationDialog(false); }}
                className="px-8 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black text-sm font-light tracking-[0.12em] uppercase rounded-lg transition-all shadow-lg shadow-[#C88A56]/30">
                Show {selectedCountry} Cars
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CarCard = ({ car }) => (
    <div className="mb-6">
      <div className="md:flex bg-black/40 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-[#C88A56]/20 transition-all duration-300 hover:border-[#C88A56]/40 hover:shadow-2xl hover:shadow-[#C88A56]/10">
        <div className="md:w-1/2 p-6">
          <div className="relative w-full h-64 md:h-80 bg-white rounded-xl overflow-hidden border border-[#C88A56]/20">
            <img src={car.coverImg || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'} alt={car.title} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-3xl text-[#C88A56] mb-2 tracking-wide">{car.title || 'Premium Vehicle'}</h2>
            <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4" />
            {(car.city || car.country) && (
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#C88A56]" />
                <span className="text-xs text-gray-400 font-light tracking-wide">{[car.city, car.country].filter(Boolean).join(', ')}</span>
              </div>
            )}
            <p className="text-sm text-gray-300 mb-6 line-clamp-3 font-light leading-relaxed">{car.description || 'Exceptional luxury and performance in one masterpiece.'}</p>
          </div>
          <div>
            <div className="mb-6 pb-4 border-b border-[#C88A56]/20">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-light text-sm uppercase tracking-wider">Starting from</span>
                <span className="text-[#C88A56] text-2xl font-light">{car.price || '—'}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => openDetails(car)} className="flex-1 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56] font-light text-sm tracking-wide hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300">View Details</button>
              <button onClick={() => openBooking(car)} className="flex-1 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black font-light text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#C88A56]/30">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FilterPanel = () => (
    <>
      {isFilterOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsFilterOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-b from-[#141414] to-black border-l border-[#C88A56]/20 z-50 transform transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-[#C88A56]/20 flex items-center justify-between">
            <h2 className="text-2xl text-[#C88A56] tracking-wider">FILTERS</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-[#C88A56]/10 rounded-full"><X className="w-6 h-6 text-[#C88A56]" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-8">
              <label className="block text-sm text-gray-300 uppercase tracking-wider font-light mb-3">Car Model</label>
              <input type="text" value={carName} onChange={e => setCarName(e.target.value)} placeholder="e.g. Audi, Ferrari..."
                className="w-full px-4 py-3 bg-black/50 border border-[#C88A56]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C88A56] transition-colors font-light" />
            </div>
            <div className="mb-8">
              <label className="block text-sm text-gray-300 uppercase tracking-wider font-light mb-3">Max Price (₹)</label>
              <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 50000"
                className="w-full px-4 py-3 bg-black/50 border border-[#C88A56]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C88A56] transition-colors font-light" />
            </div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm text-gray-300 uppercase tracking-wider font-light">Location</label>
                {(selectedCountry || selectedCity) && <button onClick={() => setShowLocationDialog(true)} className="text-xs text-[#C88A56] hover:text-[#d4a574] font-light underline">Change</button>}
              </div>
              <button onClick={() => setShowLocationDialog(true)} className="w-full px-4 py-3 bg-black/50 border border-[#C88A56]/30 rounded-lg text-left hover:border-[#C88A56] font-light flex items-center gap-2 transition-colors">
                <MapPin className="w-4 h-4 text-[#C88A56] flex-shrink-0" />
                {selectedCity ? <span className="text-white">{selectedCity}{selectedCountry ? `, ${selectedCountry}` : ''}</span>
                  : selectedCountry ? <span className="text-white">{selectedCountry} — All Cities</span>
                  : <span className="text-gray-500">Select location...</span>}
              </button>
              {(selectedCity || selectedCountry) && (
                <button onClick={() => { setSelectedCity(null); setSelectedCountry(null); }} className="mt-2 text-xs text-gray-500 hover:text-[#C88A56] transition-colors font-light">× Clear location</button>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-300 uppercase tracking-wider font-light">Vehicle Type</h3>
                <button onClick={clearFilters} className="text-xs text-[#C88A56] hover:text-[#d4a574] font-light underline">Clear</button>
              </div>
              <div className="h-px bg-gradient-to-r from-[#C88A56]/30 to-transparent mb-4" />
              <div className="space-y-3">
                {availableCategories.length > 0 ? availableCategories.map(cat => (
                  <label key={cat} className="flex items-center cursor-pointer group">
                    <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 text-[#C88A56] border-[#C88A56]/30 rounded focus:ring-[#C88A56] focus:ring-offset-0 bg-black/50" />
                    <span className="ml-3 text-white font-light text-sm capitalize group-hover:text-[#C88A56] transition-colors">{cat}</span>
                  </label>
                )) : <p className="text-gray-500 text-sm font-light">No categories available</p>}
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-[#C88A56]/20">
            <div className="text-center text-sm text-gray-400 mb-4 font-light">Showing <span className="text-[#C88A56] font-normal">{filteredCars.length}</span> car{filteredCars.length !== 1 ? 's' : ''}</div>
            <button onClick={clearFilters} className="w-full py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black rounded-lg font-light tracking-wide uppercase text-sm transition-all shadow-lg shadow-[#C88A56]/30">Reset all filters</button>
          </div>
        </div>
      </div>
    </>
  );

  const CarDetailsModal = () => {
    const [activeImg, setActiveImg] = useState(0);
    if (!selectedCar || !showDetails) return null;
    const images = getCarImages(selectedCar);
    return (
      <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowDetails(false)}>
        <div className="bg-gradient-to-b from-[#141414] to-black w-full max-w-5xl max-h-[90vh] overflow-hidden border border-[#C88A56]/30" onClick={e => e.stopPropagation()}>
          <div className="bg-black/60 backdrop-blur-sm p-6 border-b border-[#C88A56]/20 relative">
            <h2 className="text-3xl text-[#C88A56] tracking-wide">{selectedCar.title}</h2>
            <button onClick={() => setShowDetails(false)} className="absolute top-5 right-6 p-2 bg-[#C88A56]/20 hover:bg-[#C88A56]/30 rounded-full border border-[#C88A56]/30">
              <X className="w-6 h-6 text-[#C88A56]" />
            </button>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="mb-8">
              <div className="w-full flex justify-center mb-4">
                <div className="inline-block border border-[#C88A56]/20 overflow-hidden bg-black/30">
                  <img src={images[activeImg]} alt="view" className="max-w-full h-auto max-h-[500px] object-contain block" />
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <div key={i} onClick={() => setActiveImg(i)}
                    className={`cursor-pointer w-24 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === i ? 'border-[#C88A56] shadow-lg shadow-[#C88A56]/30' : 'border-[#C88A56]/20 hover:border-[#C88A56]/50'}`}>
                    <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">Key Specs</h3>
                <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4" />
                <div className="space-y-3 text-gray-300 font-light">
                  {[
                    { l: 'Price', v: selectedCar.price, gold: true },
                    { l: 'Kilometers', v: `${selectedCar.kilometers} km` },
                    { l: 'Passengers', v: selectedCar.pax },
                    selectedCar.totalTime && { l: 'Performance', v: selectedCar.totalTime },
                    selectedCar.city && { l: 'Available Cities', v: selectedCar.city },
                    selectedCar.country && { l: 'Country', v: selectedCar.country },
                  ].filter(Boolean).map(({ l, v, gold }) => (
                    <div key={l} className="flex justify-between border-b border-[#C88A56]/20 pb-2">
                      <span>{l}</span><span className={gold ? 'text-[#C88A56]' : 'text-white text-right'}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">About</h3>
                <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4" />
                <p className="text-gray-300 mb-6 font-light leading-relaxed">{selectedCar.description || 'Luxury redefined.'}</p>
                <button onClick={() => { setShowDetails(false); openBooking(selectedCar); }}
                  className="w-full py-4 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black font-light tracking-wide uppercase transition-all shadow-lg shadow-[#C88A56]/30">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ActiveLocationBadge = () => {
    if (!selectedCity && !selectedCountry) return null;
    return (
      <button onClick={() => setShowLocationDialog(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-[#C88A56]/10 border border-[#C88A56]/30 rounded-full text-sm text-[#C88A56] font-light hover:bg-[#C88A56]/20 transition-all">
        <MapPin className="w-3.5 h-3.5" />
        <span>{selectedCity || selectedCountry}</span>
        <span className="text-gray-500 hover:text-white ml-1" onClick={e => { e.stopPropagation(); setSelectedCity(null); setSelectedCountry(null); }}>×</span>
      </button>
    );
  };

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] min-h-screen text-white">
      <Navbar />
      <div className="bg-black py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <a href="/" className="text-gray-400 hover:text-[#C88A56] transition-colors font-light text-sm tracking-widest uppercase">HOME</a>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-[#C88A56] font-light text-sm tracking-widest uppercase">Luxury Cars</span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-wide">Our Premium Car Collection</h1>
          <p className="text-gray-400 text-base md:text-lg font-light max-w-4xl leading-relaxed">Discover curated luxury vehicles of exceptional performance and elegance.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <ActiveLocationBadge />
            {!selectedCity && !selectedCountry && (
              <button onClick={() => setShowLocationDialog(true)} className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-[#C88A56] transition-colors font-light">
                <MapPin className="w-3.5 h-3.5" />Select location
              </button>
            )}
          </div>
          <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56] font-light text-sm tracking-wider uppercase hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300">
            <Filter size={18} />Filters
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin h-12 w-12 border-4 border-[#C88A56] rounded-full border-t-transparent" />
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20 bg-black/40 backdrop-blur-sm rounded-2xl border border-[#C88A56]/20">
            <h3 className="text-2xl mb-4 text-gray-300 font-light">No cars found</h3>
            <p className="text-gray-400 mb-6 font-light">Adjust your filters or try a different location</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={clearFilters} className="px-8 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] rounded-lg text-black font-light tracking-wide uppercase shadow-lg shadow-[#C88A56]/30 transition-all">Clear Filters</button>
              <button onClick={() => setShowLocationDialog(true)} className="px-8 py-3 border border-[#C88A56]/30 rounded-lg text-[#C88A56] font-light tracking-wide uppercase hover:bg-[#C88A56]/10 transition-all">Change Location</button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-lg mb-6 text-gray-300 font-light">
              {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
              {(selectedCity || selectedCountry) && <span className="text-[#C88A56]"> in {selectedCity || selectedCountry}</span>}
            </p>
            {filteredCars.map(car => <CarCard key={car.id} car={car} />)}
          </>
        )}
      </div>

      <LocationDialog />
      <FilterPanel />
      <CarDetailsModal />

      {showBookingDialog && selectedCar && (
        <BookingDialog
          car={selectedCar}
          onClose={() => { setShowBookingDialog(false); setSelectedCar(null); }}
        />
      )}
    </div>
  );
}