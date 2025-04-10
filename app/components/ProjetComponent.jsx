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
        const response = await fetch('/api');
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
      {console.log('projets:', projets)}
      {projets.map((projet) => (
        <Projet 
          key={index++} 
          nom={projet.nom}
          description={projet.description}
          lienDepot={projet.lien}
          langages={projet.langages} 
        />
      ))}
    </div>
  );
}
function removeQuotesFromAttributes(data) {
  const cleanData = {};

  for (const key in data) {
    if (typeof data[key] === "string") {
      // On remplace les guillemets dans les chaînes de caractères
      cleanData[key] = data[key].replace(/"/g, ""); // Enlève tous les guillemets
    } else {
      cleanData[key] = data[key]; // Si ce n'est pas une chaîne de caractères, on laisse tel quel
    }
  }

  return cleanData;
}


function Projet({ nom, description, lienDepot, langages }) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-xl font-bold mb-2">{nom}</h3>
      <p className="mb-3">{description}</p>
      
      <div className="flex flex-wrap items-center gap-4">
        <a href={lienDepot} className="text-blue-600 hover:underline">
          Voir sur GitHub
        </a>
        
        {langages && langages.length > 0 && (
          <div className="langage-container">
            <span className="text-sm font-medium">Langages:</span>
            <Langage langages={langages} />
          </div>
        )}
      </div>
    </div>
  );
}

function LangagesListe({ langages = {} }) {
  if (langages.length>0)  langages = removeQuotesFromAttributes(langages);
  return (
    <div className="flex gap-2">
      {Object.keys(langages).map((lang, index) => (
        <LangageIcon key={index} lang={lang} />
      ))}
    </div>
  );
}



function LangageIcon({ lang }) {
  const [src, setSrc] = useState(`/langages/${lang}.png`);
  const [failedOnce, setFailedOnce] = useState(false);

  useEffect(() => {
    // à chaque fois que le `lang` change, on reset le state
    setSrc(`/langages/${lang}.png`);
    setFailedOnce(false);
  }, [lang]);

  const handleError = () => {
    if (!failedOnce) {
      setSrc("/langages/unknown.png");
      setFailedOnce(true);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg"> {/* Conteneur avec fond et arrondi */}
      {langages.map((lang, index) => (
        <div key={index} className="flex items-center p-1 bg-white rounded"> {/* Boîte individuelle pour chaque langage */}
          <Image
            src={`/langages/${lang}.png`}
            alt={lang}
            width={24}
            height={24}
            className="h-6 w-6 object-contain transition-opacity duration-300 ease-in-out"
            onError={(e) => {
              e.target.src = '/langages/default.png';
            }}
          />
          <span className="ml-1 text-xs">{lang}</span> {/* Texte du langage */}
        </div>
      ))}
    </div>
  );
}
