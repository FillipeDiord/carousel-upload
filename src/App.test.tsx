import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App', () => {
  it('check if the child component is being rendered', () => {
    render(<App />);

    const CarouselUploader = screen.getByTestId('container-drag-and-drop');

    expect(CarouselUploader).toBeInTheDocument();
  });
});