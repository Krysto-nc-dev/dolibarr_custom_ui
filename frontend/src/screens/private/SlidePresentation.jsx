import React, { useState, useEffect } from 'react';
import { MoveLeftIcon, MoveRightIcon, FileWarning, FullscreenIcon } from 'lucide-react';
import { useGetPresentationByIdQuery } from '../../slices/presentationApiSlice';
import { useParams, useNavigate } from 'react-router-dom';

import endSlide from '../../assets/images/bouchon_hand.jpeg';

const SlidePresentation = () => {
  const { id: presentationId } = useParams();
  const navigate = useNavigate();
  const { data: presentation, error: presentationError, isLoading: loadingPresentation } = useGetPresentationByIdQuery(presentationId);
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [validation, setValidation] = useState([]); // État de la validation des réponses
  const [message, setMessage] = useState(null); // Message à afficher

  useEffect(() => {
    if (presentation && presentation.slides) {
      setSlides(presentation.slides);
      initializeAnswers(presentation.slides);
    }
  }, [presentation]);

  const initializeAnswers = (slides) => {
    const initialAnswers = slides.map((slide) => {
      if (slide.template === 'quiz') {
        return slide.questions.map((question) => ({
          questionText: question.questionText,
          answer: '', // Initialiser avec une chaîne vide
          correctAnswer: question.correctAnswer,
        }));
      }
      return null;
    }).filter((el) => el !== null); // Filtrer les éléments nuls

    setAnswers(initialAnswers.flat());
    setValidation(new Array(initialAnswers.flat().length).fill(false));
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex].answer = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNextSlide = () => {
    // Vérifier si toutes les questions sont répondues
    const newValidation = [...validation];
    let isValid = true;
    answers.forEach((answer, index) => {
      if (answer.answer === '') {
        newValidation[index] = false;
        isValid = false;
      } else {
        newValidation[index] = true;
      }
    });

    if (isValid) {
      // Vérifier les réponses par rapport aux réponses correctes
      let allCorrect = true;
      answers.forEach((answer, index) => {
        if (answer.answer !== answer.correctAnswer.toString()) {
          allCorrect = false;
        }
      });

      if (allCorrect) {
        setMessage('Vous pouvez passer à la suite.');
        setTimeout(() => {
          setMessage(null);
          setCurrentSlideIndex((prevIndex) => prevIndex + 1);
          initializeAnswers(slides);
        }, 3000); // Afficher le message pendant 3 secondes avant de passer à la diapositive suivante
      } else {
        setMessage('Veuillez vérifier vos réponses. Certaines sont incorrectes.');
      }
    } else {
      setMessage('Veuillez répondre à toutes les questions avant de passer à la diapositive suivante.');
    }

    setValidation(newValidation);
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prevIndex) => prevIndex - 1);
      initializeAnswers(slides);
    }
  };

  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(`Erreur lors du passage en plein écran : ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (loadingPresentation) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (presentationError) {
    return <div className="text-red-500 text-center mt-4">Erreur : {presentationError.message}</div>;
  }

  if (slides.length === 0) {
    return <div className="flex justify-center flex-col items-center h-screen text-red-500 text-3xl"><FileWarning className='h-20 w-20 mb-7' /> Aucune diapositive disponible</div>;
  }

  const isLastSlide = currentSlideIndex === slides.length;
  const currentSlide = slides[currentSlideIndex];

  let slideContent;

  if (!isLastSlide) {
    switch (currentSlide.template) {
      case 'template1':
        slideContent = (
          <div className="slide-content flex-grow flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl mb-4">{currentSlide.title}</h1>
            <p className="text-xl">{currentSlide.subtitle}</p>
            {currentSlide.image && (
              <div className="mt-4">
                <img src={`http://192.168.178.21:3000/uploads/${currentSlide.image}`} alt={currentSlide.title} className="w-full h-auto max-h-96 object-contain" />
              </div>
            )}
          </div>
        );
        break;
      case 'template2':
        slideContent = (
          <div className="slide-content flex-grow flex flex-row items-center justify-center text-center">
            <div className="w-1/2 p-8">
              <h1 className="text-4xl mb-4">{currentSlide.title}</h1>
              <p className="text-xl">{currentSlide.subtitle}</p>
            </div>
            {currentSlide.image && (
              <div className="w-1/2 h-full mr-4">
                <img src={`http://192.168.178.21:3000/uploads/${currentSlide.image}`} alt={currentSlide.title} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        );
        break;
      case 'template3':
        slideContent = (
          <div className="slide-content flex-grow flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl mb-4">{currentSlide.title}</h1>
            <p className="text-xl">{currentSlide.subtitle}</p>
            {currentSlide.image && (
              <div className="mt-4">
                <img src={`http://192.168.178.21:3000/uploads/${currentSlide.image}`} alt={currentSlide.title} className="w-full h-auto max-h-96 object-contain" />
              </div>
            )}
          </div>
        );
        break;
      case 'quiz':
        slideContent = (
          <div className="slide-content flex-grow flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl mb-4">{currentSlide.title}</h1>
            <p className="text-xl">{currentSlide.subtitle}</p>
            {currentSlide.questions && (
              <div className="mt-4 w-full px-4">
                {currentSlide.questions.map((question, index) => (
                  <div key={index} className={`mb-6 ${validation[index] === false ? 'bg-red-200' : ''}`}>
                    <p className="text-lg font-semibold mb-2">{question.questionText}</p>
                    {question.type === 'qcm' ? (
                      <ul className="list-disc list-inside">
                        {question.options.map((option, optionIndex) => (
                          <li key={optionIndex} className="text-left">
                            <label>
                              <input
                                type="radio"
                                name={`question-${index}`}
                                value={optionIndex}
                                className="mr-2"
                                onChange={() => handleAnswerChange(index, optionIndex)}
                              />
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>
                        <label className="text-left">
                          <input
                            type="text"
                            name={`question-${index}`}
                            className="border border-gray-400 p-2 w-full"
                            placeholder="Votre réponse"
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        break;
      default:
        slideContent = (
          <div className="slide-content flex-grow flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl mb-4">{currentSlide.title}</h1>
            <p className="text-xl">{currentSlide.subtitle}</p>
            {currentSlide.image && (
              <div className="mt-4">
                <img src={`http://192.168.178.21:3000/uploads/${currentSlide.image}`} alt={currentSlide.title} className="w-full h-auto max-h-96 object-contain" />
              </div>
            )}
          </div>
        );
    }
  } else {
    slideContent = (
      <div className="slide-content flex-grow flex flex-col justify-center items-center relative">
        <img src={endSlide} alt="End Slide" className="absolute w-full h-full object-cover opacity-30" />
        <h1 className="text-3xl mb-4 relative z-10">Merci d'avoir suivi la présentation !</h1>
      </div>
    );
  }

  return (
    <div className="slider-container w-screen h-screen flex flex-col justify-between relative bg-gray-900 text-white">
      {slideContent}
      <div className="slider-controls absolute bottom-8 w-full flex justify-between px-8">
        <button onClick={goToPreviousSlide} disabled={currentSlideIndex === 0} className="flex items-center px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">
          <MoveLeftIcon /> Précédent
        </button>
        <div className="flex items-center">
          <button onClick={toggleFullScreen} className="flex items-center px-4 py-2 bg-gray-800 text-white rounded mr-4">
            <FullscreenIcon /> Plein Écran
          </button>
          <button onClick={handleNextSlide} className="flex items-center px-4 py-2 bg-gray-800 text-white rounded">
            Suivant <MoveRightIcon />
          </button>
        </div>
      </div>
      {message && (
        <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-${message.includes('passer à la suite') ? 'green' : 'red'}-500 text-white py-2 px-4 rounded-md shadow-md`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default SlidePresentation;
