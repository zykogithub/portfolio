"use client";

import Image from 'next/image';

export default function IntroComponent({ 
  title = '', 
  image, 
  texte, 
  direction = 'left',
  noPadding = false 
}) {
  return (
    <div className={`flex flex-col ${direction === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} ${noPadding ? '' : 'mb-8'} gap-8 items-center`}>
      {/* Contenu texte */}
      <div className="flex-1">
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        <p className="text-lg leading-relaxed">{texte}</p>
      </div>
      
      {/* Image */}
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
    </div>
  );
}