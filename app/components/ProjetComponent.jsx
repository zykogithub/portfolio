'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProjetComponent() {
  const [depots, setDepots] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        const data = await response.json();
        setDepots(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDepots();
  }, []);

  if (loading) {
    return <div>Chargement des projets...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Liste des Projets</h2>
      {depots.length > 0 ? (
        <ListeProjets projets={depots} />
      ) : (
        <p>Aucun projet disponible</p>
      )}
    </div>
  );
}

function ListeProjets({ projets }) {
  let index = 0;
  return (
    <div className="grid gap-6">
      {projets.map((projet) => (
        <Projet 
          key={index++} 
          nom={projet.nom}
          description={projet.description}
          lienDepot={projet.lienDepot}
          langages={projet.langages} 
        />
      ))}
    </div>
  );
}

function Projet({ nom, description, lienDepot, langages = [] }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{nom}</h3>
      <p className="mb-3">{description || 'Pas de description disponible'}</p>
      <div className="flex items-center gap-4">
        {lienDepot && (
          <a 
            href={lienDepot} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Voir sur GitHub
          </a>
        )}
        {langages.length > 0 && (
          <div className="flex items-center gap-2">
            <span>Langages :</span>
            <LangagesListe langages={langages} />
          </div>
        )}
      </div>
    </div>
  );
}

function LangagesListe({ langages = [] }) {
  return (
    <div className="flex gap-2">
      {langages.map((lang) => (
        <LangageIcon key={lang} lang={lang} />
      ))}
    </div>
  );
}

function LangageIcon({ lang }) {
  const [imgError, setImgError] = useState(false);
  let lien = "";
  if (imgError) {
    lien = "unknown";
  }
  else {
    lien = lang.toLowerCase();
  }

  return (
    <Image
      src={`/langages/${lien}.png`}
      alt={lang}
      width={24}
      height={24}
      className="h-6 w-6 object-contain"
      onError={() => setImgError(true)} 
    />
  );
}