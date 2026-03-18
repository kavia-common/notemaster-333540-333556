import React from 'react';
import { Note } from '@/types';
import { Clock } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      onClick={() => onClick(note)}
      className="group bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex flex-col h-64"
    >
      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-[#3b82f6] transition-colors">
        {note.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-4 flex-1 whitespace-pre-wrap overflow-hidden">
        {note.content}
      </p>
      
      <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-400 border-t border-gray-50">
        <div className="flex items-center gap-2 overflow-hidden flex-1 mr-2">
          {note.tags && note.tags.length > 0 ? (
            <div className="flex gap-1 overflow-x-auto no-scrollbar scrollbar-hide">
              {note.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
                  #{tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
                  +{note.tags.length - 3}
                </span>
              )}
            </div>
          ) : (
            <span className="italic">No tags</span>
          )}
        </div>
        
        {note.updated_at && (
          <div className="flex items-center gap-1 shrink-0">
            <Clock size={12} />
            {formatDate(note.updated_at)}
          </div>
        )}
      </div>
    </div>
  );
}
