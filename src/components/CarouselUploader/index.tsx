import { 
  useState, 
  DragEvent, 
  useCallback, 
  useEffect, 
  useRef, 
  MouseEvent } from 'react';
import { Image } from '../Image';
import { InputUpload } from '../InputUpload';

import './styles.css';
import DeleteImage from '../../assets/delete-image.svg';
import ArrowRightNoClicked from '../../assets/arrow-right-no-clicked.svg';
import ArrowRightClicked from '../../assets/arrow-right-clicked.svg';
import ArrowLeftNoClicked from '../../assets/arrow-left-no-clicked.svg';
import ArrowLeftClicked from '../../assets/arrow-left-clicked.svg';
import Upload from '../../assets/upload.svg';
import Error from '../../assets/error.svg';

export function CarouselUploader() {
  const [images, setImages] = useState<string[] | []>([]);
  const [haveFile, setHaveFile] = useState(false);
  const [dragAndDropImage, setDragAndDropImage] = useState(false);
  const [hasError, setHasError] = useState(false);
  const carouselUploader = useRef<HTMLDivElement>(null);

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setDragAndDropImage(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleUploadFileDragAndDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setDragAndDropImage(false);
    handleImagesState(null, event);
  }

  function handleImagesState(file: Blob | null, event: DragEvent<HTMLDivElement> | null) {
    if (event) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      const listImagesUrl: string[] = [];

      droppedFiles.forEach((file) => {
        const validatedFile = fileValidation(file as Blob);

        if (validatedFile) {
          const urlImage = URL.createObjectURL(validatedFile);
          listImagesUrl.push(urlImage);
        }
      });

      setImages(prevImages =>
        [...prevImages,
        ...listImagesUrl]
      );

      setHaveFile(true);
    }

    if (file) {
      const validatedFile = fileValidation(file);

      if (validatedFile) {
        const urlImage = URL.createObjectURL(validatedFile);
        setImages(prevImages =>
          [...prevImages,
            urlImage
          ]
        );
        setHaveFile(true);
      }
    }
  }

  function fileValidation(file: Blob) {
    const maxSize = 1024 * 1024 // 1 MB

    if (file.size > maxSize || file.type == 'application/pdf') {
      if (images.length === 0) {
        setHaveFile(false);
      }

      setHasError(true);
      return null
    }
    return file as Blob;
  }

  const handleDeleteImage = useCallback((index: number) => {
    setImages(prevImages => [...prevImages.filter((_, i) => i !== index)]);
  }, []);

  function handleMoveLeft(event: MouseEvent<HTMLImageElement>) {
    event.preventDefault();

    if (carouselUploader.current?.offsetWidth) {
      carouselUploader.current.scrollLeft -= carouselUploader.current?.offsetWidth;
    }
  }

  function handleMoveRight(event: MouseEvent<HTMLImageElement>) {
    event.preventDefault();

    if (carouselUploader.current?.offsetWidth) {
      carouselUploader.current.scrollLeft += carouselUploader.current?.offsetWidth;
    }
  }

  useEffect(() => {
    if (images.length === 0) {
      setHaveFile(false);
    }
  }, [images]);


  return (
    <>
      <Image
        src={ArrowLeftNoClicked}
        alt="Voltar imagem"
        className='arrow-return-image' />
      <Image
        src={ArrowLeftClicked}
        alt="Selecionar voltar imagem"
        className='arrow-return-image-selected'
        onClick={handleMoveLeft}
      />
      <>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleUploadFileDragAndDrop}
          className='container-drag-and-drop'
        >
          {haveFile ?
            <div
              className='container-show-images'
              ref={carouselUploader}
            >
              <InputUpload
                updatedStateImages={handleImagesState}
                haveFile={haveFile}
              />
              {images.map((image, index) =>
                <div
                  key={index}
                  className='container-image-and-btn-delete'
                >
                  <Image
                    src={DeleteImage}
                    className='btn-delete-image'
                    alt='Deletar imagem'
                    onClick={() => handleDeleteImage(index)}
                  />
                  <Image
                    src={image}
                    alt="imagem"
                    className='images-carousel'
                  />
                </div>
              )}
            </div>
            :
            <div className='container-component'>
              <InputUpload
                updatedStateImages={handleImagesState}
                haveFile={haveFile}
              />
            </div>
          }
          {dragAndDropImage &&
            <div
              className='container-backdrop-drag-and-drop'
            >
              <Image
                src={Upload}
                alt='Imagem de upload de aquivo'
                className='image-upload-file'
              />
              <p className='title-drag-and-drop'>Drag here to upload</p>
              <p className='subtitle-drag-and-drop'>PNG or JPG (max. 1MB)</p>
            </div>
          }
          {hasError &&
            <div
              className='container-backdrop-error'
            >
              <Image
                src={Error}
                alt='Imagem de erro de upload'
                className='image-error'
              />
              <p className='title-error'>Failed to upload</p>
              <p className='subtitle-error'>
                Please check if the image has the right size and extension and
                &nbsp;<a onClick={() => setHasError(false)}>try again</a></p>
            </div>
          }
        </div>
      </>
      <Image
        src={ArrowRightNoClicked}
        alt="Avançar imagem"
        className='arrow-next-image' />
      <Image
        src={ArrowRightClicked}
        alt="Selecionar Avançar imagem"
        className='arrow-next-image-selected'
        onClick={handleMoveRight}
      />
    </>
  );
}