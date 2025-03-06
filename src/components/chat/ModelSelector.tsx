'use client';

import React, { useState, useRef, useEffect } from 'react';

import { AImodels } from '@/types/aimodels';

interface ModelSelectorProps {
  models: AImodels[];
  selectedModel: string;
  onSelect: (model: AImodels) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModel, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-[80px]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm justify-center w-fit bg-zinc-800 hover:bg-zinc-700 text-white rounded-full border border-gray-600 px-3 py-1 focus:outline-none">
        {selectedModel}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute bottom-full mb-2 left-0 w-48 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-10">
          {models.map((model, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(model);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-zinc-600 ${
                selectedModel === model ? 'bg-zinc-700' : ''
              }`}>
              {model}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
