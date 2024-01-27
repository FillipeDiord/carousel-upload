import { forwardRef, InputHTMLAttributes } from "react";

import './styles.css';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <>
      <input {...props} ref={ref} />
    </>
  )
});