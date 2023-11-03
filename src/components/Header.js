import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex items-center justify-between">
        <div className="text-2xl text-white font-bold">Boardgames</div>
        <ul className="flex space-x-4 text-white">
          <li className="hover:underline cursor-pointer">Home</li>
          <li className="hover:underline cursor-pointer">Bla</li>
          <li className="hover:underline cursor-pointer">Bloe</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
