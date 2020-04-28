import React, { createContext, useState, ReactNode } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import { graphql } from 'react-relay';
import fetchGraphQL from '../fetchGraphQL';
import { v4 as uuid } from 'uuid';

type Location = {
  x: number;
  y: number;
};

export type NoteType = {
  value: string;
  index: number;
  location: Location;
  display: boolean;
  note_uid: string;
  ui: string;
};

interface NotesContextType {
  note: string;
  notes: NoteType[];
  updateNote: (value: string) => void;
  location: Location;
  updateLocation: (value: Location) => void;
  addNewNote: (value: string) => void;
  updateNotes: (value: NoteType[]) => void;
  saveNote: (value: any, uid: string | undefined) => void;
  setNoteToEdit: (note: any) => void;
  selectedNote: any;
  editNote: (index: number, value: string) => void;
  updateNoteSave: () => void;
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
  setNoteToEdit: (value: any) => value,
  selectedNote: null,
  editNote: () => null,
  updateNoteSave: () => null,
});

const NotesProviderText = ({ children }: NotesProvider) => {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Array<NoteType>>([]);
  const [location, setLocation] = useState<Location>({ x: 0, y: 0 });
  const [noteToEdit, setNoteEdit] = useState<any>(null);
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
      note_uid: '',
    };
    setNotes([...notes, newNote]);
  };

  const saveNote = async (noteToSave: any, uid: string | undefined) => {
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
          const id = uuid();
          const id2 = uuid();
          const noteToSend = {
            picture: url,
            uid: id,
            user_id: uid,
            notes: _.map(notes, (noteObject) => ({
              value: noteObject.value,
              x: noteObject.location.x,
              y: noteObject.location.y,
              order: noteObject.index,
              note_uid: id,
              uid: id2,
            })),
          };
          try {
            const query = graphql`
              query notesContextQuery($note: CreateNoteInput) {
                createNote(note: $note)
              }
            `;
            await fetchGraphQL(query, {
              note: noteToSend,
            });
          } catch (e) {
            console.log('here?');
            console.log(e);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateNoteSave = async () => {
    console.log('herettt');
    console.log(notes);
    const notesToSend = _.map(notes, (noteObject: any) => ({
      value: noteObject.value,
      x: noteObject.location.x,
      y: noteObject.location.y,
      order: noteObject.order,
      note_uid: noteObject.note_uid,
      uid: noteObject.uid,
    }));
    console.log(notesToSend);
    try {
      const query = graphql`
        query notesContextUpdateQuery($notes: [NoteInput]) {
          updateNote(notes: $notes)
        }
      `;
      await fetchGraphQL(query, {
        notes: notesToSend,
      });
    } catch (e) {
      console.log('here?');
      console.log(e);
    }
  };

  const updateNotes = (newNotes: NoteType[]) => {
    setNotes(newNotes);
  };

  const setNoteToEdit = (note: any) => {
    setNoteEdit(note);
  };

  const editNote = (index: number, value: string) => {
    const getNote = notes[index];
    notes[index] = {
      ...getNote,
      value: value,
    };
  };

  return (
    <NotesContext.Provider
      value={{
        updateNoteSave,
        editNote,
        selectedNote: noteToEdit,
        setNoteToEdit,
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
