import { useState } from 'react';
import { UploadInputFile } from '../UploadInputFile'
import { UploadDropFile } from '../UploadDropFile';

import './styles.css';
import AddNewImage from './../../assets/add-new-image.svg';

export function CarouselUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [dataArchives, setDataArchives] = useState<string[]>([]);

  function handleUploadInputFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFiles([file])
        setDataArchives(prevState =>
          [...prevState, reader.result as string]
        );
      };

      reader.onerror = () => {
        console.error("There was an issue reading the file");
      };

      reader.readAsDataURL(file);
    }
  }

  function handleUploadDropFiles(event: React.DragEvent<HTMLDivElement>) {
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);

    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setDataArchives(prevState =>
          [...prevState, reader.result as string]
        )
      };

      reader.onerror = () => {
        console.error('There was an issue reading the file');
      };

      reader.readAsDataURL(file);

      return reader;
    })
  }

  return (
    <>
      {!files.length &&
        <UploadDropFile updateStateFilesDrop={handleUploadDropFiles}>
          <UploadInputFile updateStateFilesInput={handleUploadInputFiles} />
        </UploadDropFile>
        ||
        <div className='container-show-images'>
          <div className='container-add-new-images'>
            <button
              className='btn-add-new-image'>
              <img
                src={AddNewImage}
                alt='Adicionar nova imagem'
                className='img-add-new-image' />
            </button>
            Add new images
          </div>
          {dataArchives.map((dataFile) =>
            <img
              key={dataFile}
              src={dataFile}
              alt="imagem"
              className='images-carousel'
            />
          )}
        </div>
      }
    </>
  );
}