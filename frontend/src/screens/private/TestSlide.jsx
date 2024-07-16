import React, { useState, useEffect } from 'react';
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react'; // Assurez-vous d'importer les bonnes icônes
import image from '../../assets/images/BG_bouchons.jpeg';
import image2 from '../../assets/images/cache_pot.jpg';
import image3 from '../../assets/images/mousquetons.jpg';
const Slider = () => {
  const [slides, setSlides] = useState([]); // État pour stocker les diapositives
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // État pour suivre l'index de la diapositive actuelle
  const handleFullscreen = () => {
    const element = document.documentElement // Récupère l'élément racine de la page

    if (element.requestFullscreen) {
      element
        .requestFullscreen()
        .then(() => {
          console.log('Mode plein écran activé.')
        })
        .catch((err) => {
          console.error("Erreur lors de l'activation du mode plein écran:", err)
        })
    }
  }
  // Fonction pour récupérer les diapositives depuis la base de données (simulé ici)
  const fetchSlidesFromDB = () => {
    // Ici, vous pouvez implémenter la logique pour récupérer les diapositives depuis votre API ou votre base de données
    // Par exemple :
    // fetch('endpoint_pour_diapositives')
    //   .then(response => response.json())
    //   .then(data => setSlides(data))
    //   .catch(error => console.error('Erreur lors de la récupération des diapositives:', error));
    
    // Pour l'exemple, simulons des données statiques
    const dummySlides = [
      { id: 1, title: 'Slide 1', content: 'Contenu de la diapositive 1' , image: image },
      { id: 2, title: 'Slide 2', content: 'Contenu de la diapositive 2', image: image2 },
      { id: 3, title: 'Slide 3', content: 'Contenu de la diapositive 3' , image: image3 },
    ];
    setSlides(dummySlides);
  };

  useEffect(() => {
    fetchSlidesFromDB(); // Appel une fois lors du montage du composant pour récupérer les diapositives
  }, []);

  // Fonction pour passer à la diapositive précédente
  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Fonction pour passer à la diapositive suivante
  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  // Si aucune diapositive n'est chargée encore
  if (slides.length === 0) {
    return <div>Chargement...</div>;
  }

  // Affichage de la diapositive actuelle
  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="slider-container" onClick={handleFullscreen}>
      <div className="slide-content">
        <h1>{currentSlide.title}</h1>
        <p>{currentSlide.content}</p>
        <img src={currentSlide.image} alt="" />
      </div>
      <div className="slider-controls">
        <button onClick={goToPreviousSlide} disabled={currentSlideIndex === 0}>
          <MoveLeftIcon /> Précédent
        </button>
        <button onClick={goToNextSlide} disabled={currentSlideIndex === slides.length - 1}>
          Suivant <MoveRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Slider;
