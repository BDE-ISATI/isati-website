import { useState } from 'react';
import Wei from "@/assets/PageAccueil/Wei.png";

// Simulation de 18 images (pour générer 2 pages de 9 images)
const allImages = new Array(27).fill(Wei);

// Fonction de découpage du tableau en blocs de 'size' éléments
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// Création des groupes de 9 images
const imageChunks = chunkArray(allImages, 9);

export default function GridCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? imageChunks.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === imageChunks.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="flex flex-row justify-center items-center gap-4 w-full px-12">
      
      {/* Flèche Gauche */}
      <div onClick={prevSlide} className="text-5xl hover:bg-red-700 cursor-pointer p-4 z-20 select-none">
        /-
      </div>
      
      {/* Fenêtre visible (Viewport) */}
      <div className="overflow-hidden w-full flex flex-col items-center">
        
        {/* Bande glissante */}
        <div 
          className="flex transition-transform ease-out duration-500 w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imageChunks.map((chunk, chunkIndex) => (
            
            /* Conteneur de la diapositive */
            <div key={chunkIndex} className="w-full shrink-0 flex justify-center p-4">
              
              {/* Grille 3x3 */}
              <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-5xl">
                {chunk.map((img, imgIndex) => (
                  
                  /* Cellule individuelle avec overflow-hidden pour bloquer le débordement du scale */
                  <div key={imgIndex} className="w-full rounded-md shadow-md">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-110 cursor-pointer" 
                      src={img} 
                      alt={`Evenement ${chunkIndex * 9 + imgIndex}`} 
                    />
                  </div>
                  
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='flex flex-row justify-center gap-4 mt-6 mb-2'>
          {imageChunks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Aller au mur ${index + 1}`}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-gray-400" : "bg-black"
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Flèche Droite */}
      <div onClick={nextSlide} className="text-5xl hover:bg-red-700 cursor-pointer p-4 z-20 select-none">
        -\
      </div>
      
    </div>
  );
}