import React from 'react';

const ColorsCalculatorDocumentation = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Comment utiliser le ColorCalculator</h1>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Mode de saisie</h2>
        <p className="text-lg">
          Deux modes sont disponibles pour entrer les quantités de couleurs : par pourcentage ou par grammes.
        </p>
        <p className="text-lg font-semibold">Un bouton bascule permet de passer d'un mode à l'autre.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Poids Total</h2>
        <p className="text-lg">
          Un champ de saisie pour définir le poids total (en grammes) des couleurs à mélanger.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Pourcentages des Couleurs / Grammages des Couleurs</h2>
        <p className="text-lg">
          Les utilisateurs peuvent entrer les pourcentages ou les poids pour chaque couleur.
        </p>
        <p className="text-lg">
          Si la limite est atteinte (100% en mode pourcentage ou le poids total en mode grammes), un message s'affiche et les champs de saisie sont désactivés.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Tableau des Résultats</h2>
        <p className="text-lg">
          Affiche les poids calculés pour chaque couleur en mode pourcentage et les pourcentages en mode grammes.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Messages de Limite</h2>
        <p className="text-lg">
          Des messages d'avertissement apparaissent lorsque les limites sont atteintes.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Boutons</h2>
        <p className="text-lg">
          <span className="font-semibold">"Réinitialiser"</span> : Réinitialise tous les champs de saisie.
        </p>
        <p className="text-lg">
          <span className="font-semibold">"Enregistrer la Recette"</span> : Permet d'enregistrer la recette (fonctionnalité à implémenter).
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Comportement des Messages et Désactivation des Champs</h2>
        <p className="text-lg">
          <span className="font-semibold">Mode Pourcentage:</span> Lorsque la somme des pourcentages atteint 100%, un message "Recette terminée ! Ready to cook !" s'affiche en vert et les champs de saisie sont désactivés.
        </p>
        <p className="text-lg">
          <span className="font-semibold">Mode Grammes:</span> Lorsque la somme des poids atteint le poids total défini, un message similaire s'affiche et les champs de saisie sont désactivés.
        </p>
      </div>



      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Interface Utilisateur et Expérience Utilisateur</h2>
        <p className="text-lg">
          <span className="font-semibold">Design Réactif:</span> Le composant est conçu pour s'adapter à différentes tailles d'écran avec une mise en page flexible.
        </p>
        <p className="text-lg">
          <span className="font-semibold">Messages Clairs:</span> Les messages d'erreur et de succès sont affichés clairement pour informer l'utilisateur de l'état actuel du calcul.
        </p>
        <p className="text-lg">
          <span className="font-semibold">Accessibilité:</span> Les champs de saisie sont accessibles et les boutons sont clairement étiquetés pour une meilleure expérience utilisateur.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Implémentation des Boutons</h2>
        <p className="text-lg">
          <span className="font-semibold">Réinitialiser:</span> Le bouton de réinitialisation réinitialise les pourcentages et les poids à zéro.
        </p>
        <p className="text-lg">
          <span className="font-semibold">Enregistrer la Recette:</span> Le bouton d'enregistrement déclenche une alerte simulant l'enregistrement de la recette. Remplacez cette alerte par la logique d'enregistrement réelle selon vos besoins.
        </p>
      </div>

      <p className="text-lg">
        Ce composant offre une interface intuitive pour gérer les mélanges de couleurs, facilitant ainsi les tests et les ajustements pour obtenir le mélange parfait.
      </p>
    </div>
  );
};

export default ColorsCalculatorDocumentation;
