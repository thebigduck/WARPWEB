import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-shadow-slate border-t border-comet-grey/50 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-starlight-blue/70">
        <p>&copy; {new Date().getFullYear()} Unreal FPS Systems. All rights reserved.</p>
        <p className="text-sm mt-1">Advanced Gameplay Solutions for Unreal Engine.</p>
      </div>
    </footer>
  );
};