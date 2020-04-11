import React, { createContext, useState, ReactNode } from 'react';

interface PictureContext {
  picture: string;
  addPicture: (value: string) => void;
}

export const PictureContext = createContext<PictureContext>({
  picture: '',
  addPicture: () => console.log(''),
});

type PictureProvider = {
  children: ReactNode;
};

const PictureProvider = ({ children }: PictureProvider) => {
  const [picture, setPicture] = useState<string>('');
  const addPicture = (pictureToAdd: string) => {
    setPicture(pictureToAdd);
  };
  return <PictureContext.Provider value={{ picture, addPicture }}>{children}</PictureContext.Provider>;
};

export default PictureProvider;
