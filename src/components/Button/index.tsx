import { ButtonHTMLAttributes, ReactNode } from "react";

import './styles.css';

export type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, ...props }: ButtonProps) {
  return (
    <>
      <button {...props}>
        {children}
      </button>
    </>
  )
}