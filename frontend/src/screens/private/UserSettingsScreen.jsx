import React from 'react';
import ColorPicker from '../../components/ColorPicker';

const UserSettingsScreen = () => {
  return (
    <div className="h-screen flex flex-col p-6 space-y-6">
      <h1 className="text-xl font-bold text-center mb-6">Paramètres de Personnalisation</h1>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <ColorPicker />
        </div>
        <div className="w-full md:w-2/3 lg:w-2/3 space-y-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-md font-semibold text-center mb-4">Guide des Couleurs</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className='text-primaryColor'>Couleur primaire:</strong> Utilisée pour les éléments interactifs principaux tels que les boutons et les liens importants. Doit être bien contrastée pour une meilleure lisibilité.</li>
            <li><strong className='text-secondaryColor'>Couleur secondaire:</strong> Utilisée pour les éléments de mise en valeur ou d'accentuation, tels que les boutons secondaires et les badges.</li>
            <li><strong className='text-accentColor'>Couleur d'accentuation:</strong> Utilisée pour attirer l'attention sur des éléments spécifiques tels que les liens, les icônes et les éléments interactifs mineurs.</li>
            <li><strong className='text-textColor'>Couleur du texte:</strong> Utilisée pour le texte principal et le contenu. Assurez-vous qu'elle est suffisamment contrastée avec le fond pour une meilleure lisibilité.</li>
            <li><strong className='text-backgroundColor'>Couleur de fond:</strong> Utilisée pour l'arrière-plan des pages et des sections. Doit être neutre pour ne pas distraire du contenu principal.</li>
            <li><strong className='text-highlightColor'>Couleur de surbrillance:</strong> Utilisée pour mettre en évidence les éléments sélectionnés ou survolés, comme les boutons ou les cartes.</li>
            <li><strong className='text-mutedColor'>Couleur atténuée:</strong> Utilisée pour le texte ou les éléments secondaires, comme les descriptions et les informations complémentaires.</li>
            <li><strong className='text-dangerColor'>Couleur de danger:</strong> Utilisée pour indiquer des erreurs ou des actions critiques. Elle doit attirer l'attention immédiatement.</li>
            <li><strong className='text-warningColor'>Couleur d'avertissement:</strong> Utilisée pour attirer l'attention sur des avertissements ou des notifications importantes. Elle doit être distincte mais pas aussi alarmante que la couleur de danger.</li>
            <li><strong className='text-successColor'>Couleur de succès:</strong> Utilisée pour indiquer des actions réussies ou des états positifs. Elle doit être apaisante et rassurante.</li>
          </ul>
          <p className="mt-4 text-center">
            Pour créer une palette de couleurs accessible, assurez-vous que les couleurs de danger, d'avertissement et de succès sont suffisamment contrastées par rapport à leur arrière-plan.
            <br />
            <a href="https://coolors.co/" target="_blank" rel="noopener noreferrer" className="text-primaryColor hover:underline">Utilisez cet éditeur de palettes</a> pour expérimenter et créer des palettes de couleurs accessibles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsScreen;
