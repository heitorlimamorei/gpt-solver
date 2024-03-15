import React from 'react';
import LeftPanel from '@/components/home/LeftPanel';
import RightPanel from '@/components/home/RightPanel';

export default function Home() {
  return (
    <div
      className="flex flex-row h-screen w-screen
     bg-zinc-800">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
