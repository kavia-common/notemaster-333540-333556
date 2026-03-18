'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/features/Navbar';
import { Sidebar } from '@/components/features/Sidebar';
import { NoteCard } from '@/components/features/notes/NoteCard';
import { NoteEditor } from '@/components/features/notes/NoteEditor';
import { Modal } from '@/components/ui/Modal';
import { Note, NoteCreate, NoteUpdate } from '@/types';
import * as api from '@/lib/api';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getNotes();
      setNotes(data);
      
      // Extract unique tags from notes
      const allTags = new Set<string>();
      data.forEach(note => {
        note.tags?.forEach(tag => allTags.add(tag));
      });
      setTags(Array.from(allTags).sort());
      
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      // We don't clear notes on error to avoid flickering if it's transient, 
      // but in a real app might want to show error state.
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Filter logic
  useEffect(() => {
    let result = notes;

    if (selectedTag) {
      result = result.filter(note => note.tags?.includes(selectedTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(result);
  }, [notes, selectedTag, searchQuery]);

  const handleCreateNote = () => {
    setEditingNote(undefined);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleSaveNote = async (data: NoteCreate | NoteUpdate) => {
    setIsSaving(true);
    try {
      if (editingNote) {
        await api.updateNote(editingNote.id, data);
      } else {
        await api.createNote(data as NoteCreate);
      }
      await fetchNotes();
      setIsEditorOpen(false);
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await api.deleteNote(id);
      await fetchNotes();
      setIsEditorOpen(false);
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <Navbar 
        onSearch={setSearchQuery} 
        onNewNote={handleCreateNote}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={(tag) => {
            setSelectedTag(tag);
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          }}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#f9fafb]">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Loading notes...
            </div>
          ) : filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredNotes.map(note => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onClick={handleEditNote} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Plus size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery || selectedTag ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-gray-500 max-w-sm mb-6">
                {searchQuery || selectedTag 
                  ? 'Try adjusting your search or filters' 
                  : 'Create your first note to get started'}
              </p>
              {!searchQuery && !selectedTag && (
                <Button onClick={handleCreateNote}>
                  Create Note
                </Button>
              )}
            </div>
          )}
        </main>
      </div>

      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title={editingNote ? 'Edit Note' : 'Create Note'}
      >
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
          onCancel={() => setIsEditorOpen(false)}
          isSaving={isSaving}
        />
      </Modal>
    </div>
  );
}
