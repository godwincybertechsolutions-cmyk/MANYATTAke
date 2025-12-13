import React, { useState } from 'react';
// import { supabase } from '../src/supabaseClient';
// import { useNavigate, useLocation } from 'react-router-dom';

const Auth: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="text-center">
        <h1 className="text-3xl font-serif mb-4">Authentication Updating</h1>
        <p className="text-gray-600">We are currently updating our member systems. Please contact us directly for bookings.</p>
        <button onClick={() => window.location.href = '/#/others'} className="mt-6 bg-primary text-white px-6 py-2 rounded-full">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Auth;
