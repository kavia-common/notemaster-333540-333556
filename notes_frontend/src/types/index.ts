export interface Note {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface NoteCreate {
  title: string;
  content: string;
  tags?: string[];
}

export interface NoteUpdate {
  title?: string;
  content?: string;
  tags?: string[];
}
