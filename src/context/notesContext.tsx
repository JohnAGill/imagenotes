import React, { createContext, useState, ReactNode } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import { graphql } from 'react-relay';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
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
  note_uid: string;
  ui: string;
  text_color: string;
};

interface NotesContextType {
  note: string;
  notes: NoteType[];
  updateNote: (value: string) => void;
  location: Location;
  updateLocation: (value: Location) => void;
  addNewNote: (value: string, color: string) => void;
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
  const [notes, setNotes] = useState<any>([]);
  const [location, setLocation] = useState<Location>({ x: 0, y: 0 });
  const [noteToEdit, setNoteEdit] = useState<any>(null);
  const updateNote = (value: string) => {
    setNote(value);
  };
  const updateLocation = (coords: Location) => {
    setLocation(coords);
  };
  const addNewNote = (noteText: string, color: string) => {
    const newNote = {
      value: noteText,
      location: location,
      display: false,
      index: notes.length,
      note_uid: '',
      text_color: color,
    };
    setNotes([...notes, newNote]);
  };

  const saveNote = async (noteToSave: any, uid: string | undefined) => {
    try {
      await superagent
        .post('https://api.cloudinary.com/v1_1/dukb3cxun/upload')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE')
        .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type')
        .field('upload_preset', 'imagenotes')
        .field('file', {
          uri: noteToSave.picture,
          type: 'image/png',
          name: 'upload.png',
        })
        .end(async (error: any, response: any) => {
          if (error) {
            throw error;
          }
          const { url } = response.body;
          const id = uuid();
          console.log(notes);
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
              uid: uuid(),
              text_color: noteObject.text_color,
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
            console.log(e);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateNoteSave = async () => {
    const notesToSend = _.map(notes, (noteObject: any) => ({
      value: noteObject.value,
      x: noteObject.location.x,
      y: noteObject.location.y,
      order: noteObject.order,
      note_uid: noteObject.note_uid,
      uid: noteObject.uid,
    }));
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
