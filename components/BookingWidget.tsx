import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Check, Users } from 'lucide-react';
import { PropertyType } from '../types';
import type { BookingLocationState } from '../types';
import { COLORS } from '../tokens';
import { useNavigate } from 'react-router-dom';

const experiences: { type: PropertyType; label: string; location: string }[] = [
  { type: 'mountain', label: 'Mountain Villas', location: 'Narumoru' },
  { type: 'urban', label: 'Apartments', location: 'Nairobi' },
  { type: 'safari', label: 'Safaris', location: 'All Parks' },
];

const BookingWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PropertyType>('mountain');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 guests');
  const navigate = useNavigate();
  const selected = experiences.find((item) => item.type === activeTab) ?? experiences[0];

  const goToBooking = () => {
    const state: BookingLocationState = {
      type: activeTab,
      name: activeTab === 'mountain' ? 'Mountain Villa' : activeTab === 'safari' ? 'Safari Experience' : 'Urban Apartment',
    };
    navigate('/booking', { state });
  };

  return (
    <section className="relative z-30 mx-auto hidden w-full max-w-6xl -mt-20 lg:block" aria-label="Plan your stay">
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl" style={{ color: COLORS.dark }}>
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Plan your stay</p>
            <h2 className="mt-1 font-serif text-2xl text-dark">Find your Manyatta experience</h2>
          </div>
          <span className="hidden items-center gap-2 text-xs text-gray-500 md:flex"><Check size={15} className="text-primary" /> Flexible dates welcome</span>
        </div>
        <div className="flex gap-2 bg-stone-50 p-3" role="tablist" aria-label="Choose an experience">
          {experiences.map((experience) => (
            <button key={experience.type} type="button" role="tab" aria-selected={activeTab === experience.type} onClick={() => setActiveTab(experience.type)} className={`rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${activeTab === experience.type ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-white hover:text-dark'}`}>
              {experience.label}
            </button>
          ))}
        </div>
        <form className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_1fr_0.9fr_auto]" onSubmit={(event) => { event.preventDefault(); goToBooking(); }} aria-label="Property booking form">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-gray-500" htmlFor="booking-experience">Experience</label>
            <div className="flex items-center gap-2"><MapPin size={18} className="text-primary" aria-hidden="true" /><span id="booking-experience" className="font-serif text-lg text-dark">{selected.location}</span></div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-gray-500" htmlFor="check-in-date">Check in</label>
            <div className="flex items-center gap-2"><Calendar size={18} className="text-primary" aria-hidden="true" /><input id="check-in-date" type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="w-full bg-transparent text-sm text-dark outline-none" aria-label="Check in date" /></div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-gray-500" htmlFor="check-out-date">Check out</label>
            <div className="flex items-center gap-2"><Calendar size={18} className="text-primary" aria-hidden="true" /><input id="check-out-date" type="date" min={checkIn || undefined} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="w-full bg-transparent text-sm text-dark outline-none" aria-label="Check out date" /></div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-gray-500" htmlFor="guest-count">Guests</label>
            <div className="flex items-center gap-2"><Users size={18} className="text-primary" aria-hidden="true" /><select id="guest-count" value={guests} onChange={(event) => setGuests(event.target.value)} className="w-full bg-transparent text-sm text-dark outline-none"><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4+ guests</option></select></div>
          </div>
          <button type="submit" className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-dark px-6 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Check availability <ArrowRight size={18} aria-hidden="true" /></button>
        </form>
      </div>
    </section>
  );
};

export default BookingWidget;
