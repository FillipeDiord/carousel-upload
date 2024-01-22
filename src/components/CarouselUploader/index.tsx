import { useState, DragEvent, useRef, useCallback } from 'react';

import './styles.css';
import AddNewImage from '../../assets/add-new-image.svg';
import DeleteImage from '../../assets/delete-image.svg';
import ArrowUp from './../../assets/btn-arrow-up.svg';

export function CarouselUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [dataArchives, setDataArchives] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const inputFile = useRef<HTMLInputElement>(null);


  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDragOver(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleUploadFileDragAndDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    handleUploadDropFiles(event);
  }

  function handleUploadFile() {
    if (inputFile.current) {
      inputFile.current.click();
    }
  }

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

  const handleDeleteImage = useCallback((index: number) => {
    setFiles(files.filter((file, i) => i !== index));
    setDataArchives(dataArchives.filter((data, i) => i !== index));
  }, [files, dataArchives])

  return (
    <>
      <div
        className='container-component'
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleUploadFileDragAndDrop}
      >
        {!dataArchives.length ?
          <>
            <input
              className='input-file-upload'
              type="file"
              accept='image/*'
              id='image-input'
              ref={inputFile}
              onChange={handleUploadInputFiles}
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
            <div className='container-message-and-drag-drop'>
              <span className='message-or'>or</span>
              <span className='message-drag-drop'>Drag and drop a file here</span>
            </div>
          </>
          :
          <div className='container-show-images'>
            <div className='container-add-new-images'>
              <input
                className='input-file-upload'
                type="file"
                accept='image/*'
                id='image-input'
                ref={inputFile}
                onChange={handleUploadInputFiles}
              />
              <button
                className='btn-add-new-image'
                onClick={handleUploadFile}
              >
                <img
                  src={AddNewImage}
                  alt='Adicionar nova imagem'
                  className='img-add-new-image' />
              </button>
              Add new images
            </div>
            {dataArchives.map((dataFile, index) =>
              <div
                key={dataFile}
                className='container-image-and-btn-delete'
              >
                <img
                  src={DeleteImage}
                  className='btn-delete-image'
                  alt='Deletar imagem'
                  data-index={index}
                  onClick={() => handleDeleteImage(index)}
                />
                <img
                  src={dataFile}
                  alt="imagem"
                  className='images-carousel'
                />
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
}