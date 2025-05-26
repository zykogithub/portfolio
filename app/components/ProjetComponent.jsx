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
        if (!response.ok) 
          if(response.status === 401 ) throw new Error(`Indisponibilité temporaire des projets, veuillez revenir plus tard`, { status: response.status });
          else throw new Error(`Erreur lors de la récupération des dépôts : ${response.statusText}`, { status: response.status });
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
  else{
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
        {(
          <div className="flex items-center gap-1">
            <span>Langages :</span>

            <LangagesListe langages={langages} />
          </div>
        )}
      </div>
    </div>
  );
}

function LangagesListe({ langages = {} }) {
  if (langages.length>0)  langages = removeQuotesFromAttributes(langages);
  console.log("langages:", langages);
  
  return (
    <div className="flex gap-1">
      {Object.keys(langages).length > 0 ? (
        Object.keys(langages).map((lang, index) => (
          <LangageIcon key={index} lang={lang} />
        ))
      ) : (
        <span>Pas de langages disponibles</span>
      )}
    </div>
  );
}



function LangageIcon({ lang }) {
  const [src, setSrc] = useState(`/langages/${lang}.png`);
  const [failedOnce, setFailedOnce] = useState(false);

  useEffect(() => {
    // à chaque fois que le `lang` change, on reset le state
    if (lang === "C#") {
      setSrc(`/langages/CSHARP.png`);
      
    }
    else{
      setSrc(`/langages/${lang}.png`);
      setFailedOnce(false);
    }
  }, [lang]);
  
  const handleError = () => {
    if (!failedOnce) {
      setSrc("/langages/unknown.png");
      setFailedOnce(true);
    }
  };

  return (
    <Image
      src={src}
      alt={lang}
      width={24}
      height={24}
      title={src === "/langages/unknown.png" ? "Langage sans icône fournie" : `Icône de ${lang}`}
      className="h-6 w-6 object-contain transition-opacity duration-300 ease-in-out"
      onError={handleError}
    />
  );
}


