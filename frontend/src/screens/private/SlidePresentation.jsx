import React, { useState, useEffect } from 'react';
import { MoveLeftIcon, MoveRightIcon, ArrowLeftIcon, PowerOffIcon } from 'lucide-react';
import { useGetPresentationByIdQuery } from '../../slices/presentationApiSlice';
import { useParams, useNavigate } from 'react-router-dom';

import endSlide from '../../assets/images/bouchon_hand.jpeg';

const SlidePresentation = () => {
  const { id: presentationId } = useParams();
  const navigate = useNavigate();
  const { data: presentation, error: presentationError, isLoading: loadingPresentation } = useGetPresentationByIdQuery(presentationId);
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (presentation && presentation.slides) {
      setSlides(presentation.slides);
    }
  }, [presentation]);

  const handleFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element
        .requestFullscreen()
        .then(() => {
          console.log('Mode plein écran activé.');
        })
        .catch((err) => {
          console.error("Erreur lors de l'activation du mode plein écran:", err);
        });
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  if (loadingPresentation) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (presentationError) {
    return <div className="text-red-500 text-center mt-4">Erreur : {presentationError.message}</div>;
  }

  if (slides.length === 0) {
    return <div className="flex justify-center items-center h-screen">Aucune diapositive disponible.</div>;
  }

  const isLastSlide = currentSlideIndex === slides.length;
  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="slider-container w-screen h-screen flex flex-col justify-between relative" onClick={handleFullscreen}>
      {isLastSlide ? (
        <div className="slide-content flex-grow flex flex-col justify-center items-center relative">
          <img src={endSlide} alt="End Slide" className="absolute w-full h-full object-cover opacity-30" />
          <h1 className="text-3xl mb-4 relative z-10">Merci d'avoir suivi la présentation !</h1>
   
        </div>
      ) : (
        <div className="slide-content flex-grow flex flex-row items-center justify-center">
          <div className="w-1/2 p-8">
            <h1 className="text-3xl mb-4">{currentSlide.title}</h1>
            <p className="text-lg">{currentSlide.subtitle}</p>
          </div>
          {currentSlide.image && (
            <div className="w-1/2 h-full mr-4">
              <img src={`http://192.168.178.21:3000/uploads/${currentSlide.image}`} alt={currentSlide.title} className="w-full h-full object-contain" />
            </div>
          )}
        </div>
      )}
      <div className="slider-controls absolute bottom-8 w-full flex justify-between px-8">
        <button onClick={goToPreviousSlide} disabled={currentSlideIndex === 0} className="flex items-center px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">
          <MoveLeftIcon /> 
        </button>
        <div className="flex items-center">
          <button onClick={goToNextSlide} disabled={isLastSlide} className={`px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 ${isLastSlide ? 'hidden' : ''}`}>
             <MoveRightIcon />
          </button>
          <button onClick={() => navigate('/presentations')} className={`ml-4 px-4 py-2 bg-blue-500 text-white rounded ${isLastSlide ? '' : 'hidden'}`}>
            <PowerOffIcon/> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlidePresentation;
