import { DragEvent } from 'react';

import './styles.css'

export type UploadDropFileProps = {
  children: React.ReactNode;
  updateStateFilesDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

export function UploadDropFile({ children, updateStateFilesDrop }: UploadDropFileProps) {

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleUploadFileDragAndDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    updateStateFilesDrop(event);
  }

  return (
    <>
      <div
        className='container-component'
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleUploadFileDragAndDrop}
      >
        {children}
        <div className='container-message-and-drag-drop'>
          <span className='message-or'>or</span>
          <span className='message-drag-drop'>Drag and drop a file here</span>
        </div>
      </div>
    </>
  )
}