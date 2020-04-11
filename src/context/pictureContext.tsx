import React, {createContext, useState} from 'react';

interface PictureContext {
  picture: string;
  addPicture: (value: string) => any;
}

export const PictureContext = createContext<PictureContext>({
  picture: '',
  addPicture: () => console.log(''),
});

const PictureProvider = ({children}: any) => {
  const [picture, setPicture] = useState<string>('');
  const addPicture = (pictureToAdd: string) => {
    setPicture(pictureToAdd);
  };
  return <PictureContext.Provider value={{picture, addPicture}}>{children}</PictureContext.Provider>;
};

export default PictureProvider;
