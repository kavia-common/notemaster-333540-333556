import React from 'react';
import { Tag, Hash, X } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function Sidebar({ isOpen, onClose, tags, selectedTag, onSelectTag }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:static md:h-[calc(100vh-4rem)]",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 md:hidden">
            <span className="font-semibold text-gray-900">Filters</span>
            <button onClick={onClose} className="p-1 text-gray-500 hover:bg-gray-100 rounded-md">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => onSelectTag(null)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                selectedTag === null 
                  ? "bg-blue-50 text-[#3b82f6]" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Tag size={18} />
              All Notes
            </button>
            
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Tags
            </div>
            
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  selectedTag === tag
                    ? "bg-cyan-50 text-[#06b6d4]" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Hash size={16} />
                {tag}
              </button>
            ))}

            {tags.length === 0 && (
              <div className="px-3 py-4 text-sm text-gray-400 italic">
                No tags found
              </div>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
