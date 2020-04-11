import React, { createContext, useState, ReactNode } from 'react';

type Location = {
  x: number;
  y: number;
};

export type NoteType = {
  value: string;
  index: number;
  location: Location;
  display: boolean;
};

interface NotesContext {
  note: string;
  notes: NoteType[];
  updateNote: (value: string) => void;
  location: Location;
  updateLocation: (value: Location) => void;
  addNewNote: (value: string) => void;
  updateNotes: (value: NoteType[]) => void;
}

type NotesProvider = {
  children: ReactNode;
};

export const NotesContext = createContext<NotesContext>({
  note: '',
  notes: [],
  updateNote: (value: string) => value,
  location: {
    x: 0,
    y: 0,
  },
  updateLocation: (value: Location) => value,
  addNewNote: (value: string) => value,
  updateNotes: (value: NoteType[]) => value,
});

const NotesProvider = ({ children }: NotesProvider) => {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [location, setLocation] = useState<Location>({ x: 0, y: 0 });
  const updateNote = (value: string) => {
    setNote(value);
  };
  const updateLocation = (coords: Location) => {
    setLocation(coords);
  };
  const addNewNote = (noteText: string) => {
    const newNote = {
      value: noteText,
      location: location,
      display: false,
      index: notes.length,
    };
    setNotes([...notes, newNote]);
  };

  const updateNotes = (newNotes: NoteType[]) => {
    setNotes(newNotes);
  };
  return (
    <NotesContext.Provider
      value={{
        note,
        updateNote,
        location,
        updateLocation,
        notes,
        addNewNote,
        updateNotes,
      }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
