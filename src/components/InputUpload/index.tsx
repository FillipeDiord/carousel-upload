import { ChangeEvent, DragEvent, useRef } from 'react';

import { Button } from '../Button';
import { Input } from '../Input';
import { Image } from '../Image';

import ArrowUp from './../../assets/btn-arrow-up.svg';
import AddNewImage from './../../assets/add-new-image.svg';

export type InputUploadProps = {
  updatedStateImages: (file: File | null, event: DragEvent<HTMLDivElement> | null) => void;
  haveFile: boolean;
}

export function InputUpload({ updatedStateImages, haveFile }: InputUploadProps) {
  const inputFile = useRef<HTMLInputElement>(null);
  
  function uploadFile() {
    if (inputFile.current) {
      inputFile.current.click();
    }
  }

  function handleUploadInputFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      updatedStateImages(file, null);
    }
  }

  return (
    <>
      <Input
        className='input-file-upload'
        type="file"
        accept='image/png, image/jpeg, image/gif'
        id='image-input'
        ref={inputFile}
        onChange={handleUploadInputFile}
      />
      {haveFile ?
        <div className='container-add-new-images'>
          <Button
            className='btn-add-new-image'
            onClick={uploadFile}
          >
            <Image
              src={AddNewImage}
              alt='Adicionar nova imagem'
              className='img-add-new-image' />
          </Button>
          Add new images
        </div>
        :
        <>
          <Button
            className='btn-upload-archive'
            onClick={uploadFile}
          >
            <Image
              src={ArrowUp}
              alt="Upload de imagem"
              className='img-upload-btn' />
            Click to upload
          </Button>
          <div className='container-message-and-drag-drop'>
            <p className='message-or'>or</p>
            <p className='message-drag-drop'>Drag and drop a file here</p>
          </div>
        </>
      }
    </>
  )
}