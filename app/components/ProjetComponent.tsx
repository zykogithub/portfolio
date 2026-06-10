'use client';
import { useState, useEffect } from 'react';
import Loader from './loadingComponentt';
import Image from 'next/image';

interface ProjetData {
  nom: string;
  description: string;
  lien: string;
  langages: Record<string, number>;
}

export default function ProjetComponent() {
  const [projects, setProjects] = useState<ProjetData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          if(response.status === 401 ) throw new Error(`Indisponibilité temporaire des projets, veuillez revenir plus tard`, { cause: response.status });
          else throw new Error(`Erreur lors de la récupération des dépôts : ${response.statusText}`, { cause: response.status });
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Erreur: {(error as Error).message}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Liste des Projets</h2>
      {projects && projects.length > 0 ? (
        <ListeProjets projet={projects} />
      ) : (
        <p>Aucun projet disponible</p>
      )}
    </div>
  );
}

function ListeProjets({ projet }: { projet: ProjetData[] }) {
  return (
    <div className="grid gap-6">
      {projet.map((p, index) => (
        <Projet 
          key={index} 
          nom={p.nom}
          description={p.description}
          lienDepot={p.lien}
          langages={p.langages} 
        />
      ))}
    </div>
  );
}

function Projet({ nom, description, lienDepot, langages }: { nom: string, description: string, lienDepot: string, langages: Record<string, number> }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{nom}</h3>
      <p className="mb-3">{description || 'Pas de description disponible'}</p>
      <div className="flex flex-wrap items-center gap-4">
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
        <div className="flex items-center gap-1">
          <span>Langages :</span>
          <LangagesListe langages={langages || {}} />
        </div>
      </div>
    </div>
  );
}

function LangagesListe({ langages }: { langages: Record<string, number> }) {
  const langList = Object.keys(langages || {});
  
  return (
    <div className="flex flex-wrap gap-1">
      {langList.length > 0 ? (
        langList.map((lang, index) => (
          <LangageIcon key={index} lang={lang} />
        ))
      ) : (
        <span>Pas de langages disponibles</span>
      )}
    </div>
  );
}

function LangageIcon({ lang }: { lang: string }) {
  const [src, setSrc] = useState(`/langages/${lang}.png`);
  const [failedOnce, setFailedOnce] = useState(false);

  useEffect(() => {
    // à chaque fois que le `lang` change, on reset le state
    if (lang === "C#") {
      setSrc(`/langages/CSHARP.png`);
    } else if (lang === "C++") {
      setSrc(`/langages/CPP.png`);
    } else {
      setSrc(`/langages/${lang}.png`);
    }
    setFailedOnce(false);
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
      title={src === "/langages/unknown.png" ? `Langage ${lang} sans icône` : `Icône de ${lang}`}
      className="h-6 w-6 object-contain transition-opacity duration-300 ease-in-out"
      onError={handleError}
    />
  );
}
