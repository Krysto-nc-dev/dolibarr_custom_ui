import React from 'react';
import { Loader as LucideLoader } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LucideLoader className="animate-spin text-primaryColor" size={94} />
    </div>
  );
};

export default Loader;
