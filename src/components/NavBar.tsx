'use client';
import { useState } from 'react';

import Button from '@/components/Button';
import { HomeIcon, ChartIcon, GearIcon, SheetIcon } from '@/components/icons/Icons';

interface NavBarProps {
  selectedButton: string;
  handleSelectButton: Function;
}

export default function NavBar({ selectedButton, handleSelectButton }: NavBarProps) {
  const navItems = [
    {
      id: 'home',
      icon: HomeIcon,
      label: 'Home',
      size: 8,
    },
    {
      id: 'chart',
      icon: ChartIcon,
      label: 'Chart',
      size: 8,
    },
    {
      id: 'sheets',
      icon: SheetIcon,
      label: 'Chart2',
      size: 8,
    },
    {
      id: 'config',
      icon: GearIcon,
      label: 'Config',
      size: 8,
    },
  ];
  return (
    <nav className="fixed z-20 bottom-0 start-0 flex flex-row bg-gray-100 justify-between px-4 h-[8%] w-full shadow-[4px_4px_10px_#000000,-6px_-6px_24px_#ffffff]">
      {navItems.map(({ id, icon, label, size }) => (
        <Button
          key={id}
          className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${
            selectedButton === id ? 'bg-blue-200' : ''
          }`}
          onClick={() => handleSelectButton(id)}>
          {icon ? icon(selectedButton === id ? '#0000FF' : '#000000', size) : <div>{label}</div>}
        </Button>
      ))}
    </nav>
  );
}
