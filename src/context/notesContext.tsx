import React, {createContext, useState} from 'react';

type Location = {
  x: number;
  y: number;
};

type Note = {
  value: string;
  index: number;
  location: Location;
  display: boolean;
};

interface NotesContext {
  note: string;
  notes: Note[];
  updateNote: (value: string) => any;
  location: Location;
  updateLocation: (value: any) => any;
  addNewNote: (value: string) => any;
  updateNotes: (value: any) => any;
}

export const NotesContext = createContext<NotesContext>({
  note: '',
  notes: [],
  updateNote: (value: string) => value,
  location: {
    x: 0,
    y: 0,
  },
  updateLocation: (value: any) => value,
  addNewNote: (value: string) => value,
  updateNotes: (value: any) => value,
});

const NotesProvider = ({children}: any) => {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<any>([]);
  const [location, setLocation] = useState<any>({x: 0, y: 0});
  const updateNote = (value: string) => {
    setNote(value);
  };
  const updateLocation = (coords: any) => {
    setLocation(coords);
  };
  const addNewNote = (noteText: string) => {
    console.log(location);
    const newNote = {
      value: noteText,
      location: location,
      display: false,
      index: notes.length,
    };
    console.log(newNote);
    setNotes([...notes, newNote]);
  };

  const updateNotes = (newNotes: any) => {
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
