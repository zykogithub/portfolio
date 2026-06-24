"use client";
import NavBarComponent from "./components/NavBarComponent";
import IntroComponent from "./components/IntroductionComponent";

export default function Home() {
  const age = new Date().getFullYear() - new Date(2005,1,7,12,10,0,0).getFullYear();
  return (
    <>
    <NavBarComponent className="bg-[var(--foreground)]"/>
    <div className="bg-[var(--background)] min-h-screen">
      
      <div className="page-container">
        <h1 className="section-title">Accueil</h1>
        
        <IntroComponent
          key="1"
          title="Qui suis-je ?"
          image="/me.jpg"
          texte={`Bonjour, je m'appelle Naherry et j'ai ${age} ans. Actuellement je 
          suis en 3eme année de BUT informatique à l'IUT d'Orsay de 
          l'universté Paris-Saclay.`}
          direction="right"
          noPadding={false}
        />

        <IntroComponent
          key="2"
          title="Quelles sont mes compétences ?"
          image="/competence.jpg"
          texte="Durant ma formation au BUT, je me suis spécialisé dans le 
          développement bureau en Java, en web avec html/CSS/js/
          PHP , en algoritmie C/C++. Egalement, dans ma vie 
          personnelle, j'ai pu développer mes compétences en IA avec 
          python et développement android avec Kotline"
          direction="left"
          noPadding={false}
        />
      </div>
    </div>
    </>
  );
}