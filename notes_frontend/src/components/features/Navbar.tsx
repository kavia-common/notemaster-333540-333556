import React from 'react';
import { Plus, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface NavbarProps {
  onSearch: (query: string) => void;
  onNewNote: () => void;
  toggleSidebar: () => void;
}

export function Navbar({ onSearch, onNewNote, toggleSidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-4 gap-4 max-w-[1920px] mx-auto">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center gap-2 font-bold text-xl text-[#3b82f6]">
          <span className="hidden sm:inline">Notemaster</span>
        </div>

        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search notes..." 
              className="pl-10 bg-gray-50 border-transparent focus:bg-white focus:border-[#3b82f6]"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={onNewNote} className="gap-2 hidden sm:flex">
          <Plus size={18} />
          <span>New Note</span>
        </Button>
        <Button onClick={onNewNote} size="sm" className="sm:hidden">
          <Plus size={18} />
        </Button>
      </div>
    </header>
  );
}
