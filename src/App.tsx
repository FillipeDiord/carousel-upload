import { CarouselUploader } from './components/CarouselUploader'

import './App.css'
import ArrowRightNoClicked from './assets/arrow-right-no-clicked.svg'
import ArrowRightClicked from './assets/arrow-right-clicked.svg'
import ArrowLeftNoClicked from './assets/arrow-left-no-clicked.svg'
import ArrowLeftClicked from './assets/arrow-left-clicked.svg'

function App() {

  return (
    <>
      <img
        src={ArrowRightNoClicked}
        alt="Voltar imagem"
        className='arrow-return-image' />
      <img
        src={ArrowRightClicked}
        alt="Selecionar voltar imagem"
        className='arrow-return-image-selected'
        onClick={() => scroll({ left: -20 })}
      />
      <CarouselUploader />
      <img
        src={ArrowLeftNoClicked}
        alt="Avançar imagem"
        className='arrow-next-image' />
      <img
        src={ArrowLeftClicked}
        alt="Selecionar Avançar imagem"
        className='arrow-next-image-selected'
        onClick={() => scroll({ left: 20 })}
      />
    </>
  )
}

export default App
