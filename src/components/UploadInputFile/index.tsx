
import './styles.css'
import ArrowUp from './../../assets/btn-arrow-up.svg';
import { useRef } from 'react';

export type UploadInputFileProps = {
  updateStateFilesInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadInputFile({ updateStateFilesInput }: UploadInputFileProps) {
  const inputFile = useRef<HTMLInputElement>(null);

  function handleUploadFile() {
    if (inputFile.current) {
      inputFile.current?.click();
    }
  }

  return (
    <>
      <input
        className='input-file-upload'
        type="file"
        accept='image/*'
        id='image-input'
        ref={inputFile}
        onChange={updateStateFilesInput}
      />
      <button
        className='btn-upload-archive'
        onClick={handleUploadFile}
      >
        <img
          src={ArrowUp}
          alt="Upload de imagem"
          className='img-upload-btn' />
        Click to upload
      </button>
    </>
  )
}