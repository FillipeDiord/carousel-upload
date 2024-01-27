import { ImgHTMLAttributes } from 'react';

import './styles.css';

export function Image({ ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <>
      <img {...props} />
    </>
  )
}