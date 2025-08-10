
import React from 'react';

type Page = 'generator' | 'about';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const linkClasses = (page: Page) =>
    `px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
      currentPage === page
        ? 'bg-blue-600 text-white'
        : 'text-blue-200/80 hover:bg-gray-700/50'
    }`;

  return (
    <nav className="flex justify-center items-center mb-8 pb-4 border-b border-blue-800/20">
      <div className="flex space-x-4">
        <div onClick={() => onNavigate('generator')} className={linkClasses('generator')}>
          Generator
        </div>
        <div onClick={() => onNavigate('about')} className={linkClasses('about')}>
          About
        </div>
      </div>
    </nav>
  );
};
