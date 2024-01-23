// Importando os tipos necessários
import type { Meta, StoryObj } from '@storybook/react';
import type { CarouselUploader } from '../CarouselUploader/index';

const meta = {
  component: CarouselUploader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CarouselUploader>;


export default meta;


type Story = StoryObj<typeof CarouselUploader>;

export const Default: Story = function Default() {
  return typeof <CarouselUploader />;
};

Default.args = {
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ],
  title: 'My awesome carousel',
  description: 'This is a carousel uploader component made with React and TypeScript',
};

// Exportando outra história usando um objeto literal
export const Custom: Story = {
  component: () => (
    <CarouselUploader/>
  ),
};