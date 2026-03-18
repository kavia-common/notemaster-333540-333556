import React, { useState, useEffect } from 'react';
import { Note, NoteCreate, NoteUpdate } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Trash2 } from 'lucide-react';

interface NoteEditorProps {
  note?: Note;
  onSave: (note: NoteCreate | NoteUpdate) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export function NoteEditor({ note, onSave, onDelete, onCancel, isSaving = false }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags?.join(', ') || '');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags?.join(', ') || '');
    } else {
      setTitle('');
      setContent('');
      setTags('');
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
    await onSave({ title, content, tags: tagList });
  };

  const handleDelete = async () => {
    if (note && onDelete) {
      if (confirm('Are you sure you want to delete this note?')) {
        await onDelete(note.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full gap-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          required
          className="text-lg font-semibold"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="work, ideas, todo (comma separated)"
        />
      </div>

      <div className="flex-1 min-h-[200px]">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          className="h-full min-h-[200px] resize-none font-mono text-base"
          required
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        {note && onDelete ? (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
            <span className="ml-2">Delete</span>
          </Button>
        ) : (
          <div /> // Spacer
        )}
        
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
          </Button>
        </div>
      </div>
    </form>
  );
}
