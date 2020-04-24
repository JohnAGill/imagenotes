import React, { createContext, useState, ReactNode } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import { graphql } from 'react-relay';
import fetchGraphQL from '../fetchGraphQL';

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

interface NotesContextType {
  note: string;
  notes: NoteType[];
  updateNote: (value: string) => void;
  location: Location;
  updateLocation: (value: Location) => void;
  addNewNote: (value: string) => void;
  updateNotes: (value: NoteType[]) => void;
  saveNote: (value: any) => void;
}

type NotesProvider = {
  children: ReactNode;
};

export const NotesContext = createContext<NotesContextType>({
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
  saveNote: (value: any) => value,
});

const NotesProviderText = ({ children }: NotesProvider) => {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Array<NoteType>>([]);
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

  const saveNote = async (noteToSave: any) => {
    try {
      const image = await superagent
        .post('https://api.cloudinary.com/v1_1/dukb3cxun/upload')
        .field('upload_preset', 'imagenotes')
        .field('file', {
          uri: noteToSave.picture,
          type: 'image/png',
          name: 'upload.png',
        })
        .end(async (error: any, response: any) => {
          const { url } = response.body;
          const noteToSend = {
            picture: url,
            uid: 'something09',
            user_id: 'test22',
            notes: _.map(notes, (noteObject) => ({
              value: noteObject.value,
              x: noteObject.location.x,
              y: noteObject.location.y,
              order: noteObject.index,
              note_uid: 'something09',
              uid: `${noteObject.index}`,
            })),
          };
          try {
            const query = graphql`
              query notesContextQuery($note: CreateNoteInput) {
                createNote(note: $note)
              }
            `;
            const data = await fetchGraphQL(query, {
              note: noteToSend,
            });
          } catch (e) {
            console.log(e);
          }
        });
    } catch (error) {
      console.log(error);
    }
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
        saveNote,
      }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProviderText;
