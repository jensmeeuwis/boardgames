import React from 'react';

export default function Header() {
  return (
    <header className="p-4 bg-blue-500">
      <nav className="flex items-center justify-between">
        <div className="text-2xl font-bold text-white">Boardgames</div>
        <ul className="flex space-x-4 text-white">
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">Bla</li>
          <li className="cursor-pointer hover:underline">Bloe</li>
        </ul>
      </nav>
    </header>
  );
};
