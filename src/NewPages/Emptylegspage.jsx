import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { X, Filter, PlaneTakeoff, MapPin, Users, Clock, Tag } from 'lucide-react';
// import Footer from '../NewPages/Footer';
import EnquiryForm from '../components/EnquiryForm';

// ─── helpers ─────────────────────────────────────────────────────────────────
const fmt = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

const fmtTime = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const FLIGHT_TYPE_LABELS = {
  ONE_WAY_CHARTER    : 'One Way Charter',
  ROUND_TRIP_CHARTER : 'Round Trip Charter',
  EMPTY_LEG          : 'Empty Leg',
  MULTI_LEG_TRIP     : 'Multi-Leg Trip',
};

// ─── Empty Leg Card ───────────────────────────────────────────────────────────
const EmptyLegCard = ({ leg }) => {
  const [showEnquiry, setShowEnquiry] = useState(false);

  const helicopterData = {
    title        : leg.aircraftDetails?.name,
    price        : leg.aircraftDetails?.price,
    aircraftType : leg.aircraftDetails?.aircraftType,
    maxPassengers: leg.aircraftDetails?.maxPassengers,
  };

  return (
    <div className="max-w-5xl mx-auto mb-6">
      <div className="bg-black/40 backdrop-blur-sm border border-[#C88A56]/20 shadow-xl transition-all duration-300 hover:border-[#C88A56]/50 hover:shadow-[#C88A56]/10 hover:shadow-2xl">

        {/* Top strip — route hero */}
        <div className="bg-gradient-to-r from-[#C88A56]/10 to-transparent border-b border-[#C88A56]/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Route */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-light text-white tracking-wide">
                {leg.emptyLegRoute?.departureCity || '—'}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Departure</div>
            </div>

            <div className="flex flex-col items-center gap-1 px-4">
              <PlaneTakeoff className="w-6 h-6 text-[#C88A56]" />
              <div className="w-16 h-px bg-gradient-to-r from-[#C88A56]/60 to-[#C88A56]/60" />
              <div className="text-[10px] text-[#C88A56] uppercase tracking-widest">Empty Leg</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-light text-white tracking-wide">
                {leg.emptyLegRoute?.destinationCity || '—'}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Destination</div>
            </div>
          </div>

          {/* Status pill + price */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 text-xs font-light tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
              {leg.meta?.status || 'AVAILABLE'}
            </span>
            {leg.aircraftDetails?.price && (
              <span className="text-[#C88A56] text-xl font-light">
                {leg.aircraftDetails.price}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="md:flex">

          {/* Left — aircraft details */}
          <div className="md:w-1/2 p-6 border-r border-[#C88A56]/10">
            <h3 className="text-xs text-[#C88A56] uppercase tracking-widest font-light mb-3">Aircraft</h3>
            <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-16 mb-4" />

            {leg.aircraftDetails?.name ? (
              <>
                <h2 className="text-2xl text-white font-light tracking-wide mb-1">
                  {leg.aircraftDetails.name}
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {leg.aircraftDetails?.aircraftType && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C88A56]/10 border border-[#C88A56]/30 text-[#C88A56] text-xs font-light rounded-full">
                      <Tag className="w-3 h-3" />
                      {leg.aircraftDetails.aircraftType}
                    </span>
                  )}
                  {leg.aircraftDetails?.maxPassengers && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-light rounded-full">
                      <Users className="w-3 h-3" />
                      Max {leg.aircraftDetails.maxPassengers} pax
                    </span>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm font-light">Aircraft details unavailable</p>
            )}

            {/* Original flight type */}
            {leg.emptyLegRoute?.originalFlightType && (
              <div className="mt-4 pt-4 border-t border-[#C88A56]/10">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Original Trip Type: </span>
                <span className="text-xs text-gray-300 font-light">
                  {FLIGHT_TYPE_LABELS[leg.emptyLegRoute.originalFlightType] || leg.emptyLegRoute.originalFlightType}
                </span>
              </div>
            )}
          </div>

          {/* Right — timestamps + CTA */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C88A56] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Route</div>
                  <div className="text-sm text-gray-200 font-light">
                    {leg.emptyLegRoute?.departureCity || '—'}
                    <span className="text-[#C88A56] mx-2">→</span>
                    {leg.emptyLegRoute?.destinationCity || '—'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C88A56] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Available Since</div>
                  <div className="text-sm text-gray-200 font-light">
                    {fmtTime(leg.arrivedAt || leg.meta?.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowEnquiry(true)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black font-light text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#C88A56]/30"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      <EnquiryForm
        helicopter={helicopterData}
        isOpen={showEnquiry}
        closeForm={() => setShowEnquiry(false)}
      />
    </div>
  );
};

// ─── Filter Panel ─────────────────────────────────────────────────────────────
const EmptyLegFilter = ({ isOpen, onClose, aircraftTypes, onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggle = (typeId) => {
    const next = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    setSelectedTypes(next);
    onFilterChange(next);
  };

  const clear = () => {
    setSelectedTypes([]);
    onFilterChange([]);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-b from-[#141414] to-black border-l border-[#C88A56]/20 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#C88A56]/20 flex items-center justify-between">
            <h2 className="text-2xl text-[#C88A56] tracking-widest font-light">FILTERS</h2>
            <button onClick={onClose} className="p-2 hover:bg-[#C88A56]/10 transition-colors">
              <X className="w-6 h-6 text-[#C88A56]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-300 uppercase tracking-widest font-light">Aircraft Type</h3>
                <button
                  onClick={clear}
                  className="text-xs text-[#C88A56] hover:text-[#d4a574] font-light underline transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="h-px bg-gradient-to-r from-[#C88A56]/30 to-transparent mb-4" />

              <div className="space-y-3">
                {aircraftTypes.length === 0 && (
                  <p className="text-gray-600 text-sm font-light">No aircraft types found</p>
                )}
                {aircraftTypes.map((type) => (
                  <div key={type.id} className="flex items-center">
                    <input
                      id={`el-filter-${type.id}`}
                      type="checkbox"
                      checked={selectedTypes.includes(type.id)}
                      onChange={() => toggle(type.id)}
                      className="h-4 w-4 text-[#C88A56] border-[#C88A56]/30 rounded focus:ring-[#C88A56] focus:ring-offset-0 bg-black/50"
                    />
                    <label htmlFor={`el-filter-${type.id}`} className="ml-3 flex-grow cursor-pointer flex items-center justify-between">
                      <span className="text-white font-light">{type.name}</span>
                      <span className="text-gray-500 text-sm">({type.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#C88A56]/20">
            <div className="text-center text-sm text-gray-400 mb-4 font-light">
              Showing{' '}
              <span className="text-[#C88A56] font-normal">
                {selectedTypes.length > 0 ? 'filtered' : 'all'}
              </span>{' '}
              items
            </div>
            <button
              onClick={clear}
              className="w-full py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black rounded-lg font-light tracking-widest uppercase text-sm transition-all shadow-lg shadow-[#C88A56]/30"
            >
              Reset all filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const EmptyLegsPage = () => {
  const [legsData, setLegsData]       = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [aircraftTypes, setTypes]     = useState([]);
  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const legsRef = ref(db, 'EmptyLegData');

    const unsub = onValue(legsRef, (snapshot) => {
      if (!snapshot.exists()) {
        setLegsData([]);
        setFiltered([]);
        setLoading(false);
        return;
      }

      const data = snapshot.val();
      const arr = Object.entries(data).map(([id, val]) => ({ id, ...val }));

      // newest first
      arr.sort((a, b) =>
        new Date(b.arrivedAt || b.meta?.createdAt || 0) -
        new Date(a.arrivedAt || a.meta?.createdAt || 0)
      );

      setLegsData(arr);
      setFiltered(arr);

      // Build aircraft type options
      const types = {};
      arr.forEach(leg => {
        const t = leg.aircraftDetails?.aircraftType;
        if (t) {
          const id = t.toLowerCase().replace(/\s+/g, '-');
          types[id] = types[id]
            ? { ...types[id], count: types[id].count + 1 }
            : { id, name: t, count: 1 };
        }
      });
      setTypes(Object.values(types));
      setLoading(false);
    }, (err) => {
      setError('Error fetching empty leg data: ' + err.message);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleFilterChange = (selectedTypes) => {
    if (selectedTypes.length === 0) {
      setFiltered(legsData);
    } else {
      setFiltered(
        legsData.filter(leg => {
          const typeId = leg.aircraftDetails?.aircraftType?.toLowerCase().replace(/\s+/g, '-') || '';
          return selectedTypes.some(s => typeId.includes(s));
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] flex justify-center items-center h-screen">
        <div className="text-[#C88A56] text-xl font-light tracking-widest animate-pulse">
          Loading empty legs...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] flex justify-center items-center h-screen">
        <div className="text-red-400 text-xl font-light">{error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Hero ── */}
      <div className="bg-black py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <a href="/" className="text-gray-400 hover:text-[#C88A56] transition-colors font-light text-sm tracking-widest uppercase">
              HOME
            </a>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#C88A56] font-light text-sm tracking-widest uppercase">Empty Legs</span>
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-wide font-light">
              Empty Leg Flights
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-4xl leading-relaxed">
              Exclusive one-way private jet opportunities at exceptional value. These flights are
              available when an aircraft needs to reposition after dropping off passengers — your
              chance to fly privately at a fraction of the cost.
            </p>
          </div>

          {/* Live count badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-light tracking-wider">
              {legsData.length} {legsData.length === 1 ? 'flight' : 'flights'} available
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] py-12 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">

          {/* Filter button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56] font-light text-sm tracking-widest uppercase hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-sm p-16 text-center border border-[#C88A56]/20">
              <PlaneTakeoff className="w-12 h-12 text-[#C88A56]/30 mx-auto mb-4" />
              <p className="text-xl text-gray-400 font-light">No empty leg flights available right now.</p>
              <p className="text-sm text-gray-600 font-light mt-2">Check back soon or adjust your filters.</p>
            </div>
          ) : (
            filtered.map(leg => (
              <EmptyLegCard key={leg.id} leg={leg} />
            ))
          )}
        </div>
      </div>

      {/* Filter panel */}
      <EmptyLegFilter
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        aircraftTypes={aircraftTypes}
        onFilterChange={handleFilterChange}
      />

      {/* <Footer /> */}
    </div>
  );
};

export default EmptyLegsPage;