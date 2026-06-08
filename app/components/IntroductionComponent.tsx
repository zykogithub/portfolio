"use client";

import Image from 'next/image';

interface IntroProp {
  title?: string;
  image: string; 
  texte: string; 
  direction?: 'left' | 'right';
  noPadding?: boolean;
  elementOuvrir? : string
}

// Ta fonction reste exactement la même !
export default function IntroComponent({ 
  title = '', 
  image, 
  texte, 
  direction = 'left',
  noPadding = false,
  elementOuvrir
} : IntroProp) {
  return (
    <div className={`flex flex-col ${direction === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} ${noPadding ? '' : 'mb-8'} gap-8 items-center`}>
      {/* Contenu texte */}
      <div className="flex-1">
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        <p className="text-lg leading-relaxed">{texte}</p>
      </div>
      {/* Image */}
      {elementOuvrir && (
        <a href={elementOuvrir}>
          <ImageAffichage
            image={image}
          />
        </a>
      )}
      {!elementOuvrir && (<ImageAffichage image={image}/>)}
    </div>
  );
}

interface ImageProp{
  image : string
}

function ImageAffichage({image} : ImageProp) {
  return (
    <div className="flex-1">
        <Image
          key={10}
          src={image} 
          alt={""} 
          className="w-full max-w-md rounded-lg shadow-md object-cover"
          width={1000}
          height={1000}
        />
      </div>
  )
}