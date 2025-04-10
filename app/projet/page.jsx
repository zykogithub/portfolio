"use client"
import IntroComponent from '../components/IntroductionComponent';
import NavBarComponent from '../components/NavBarComponent';
import ProjectComponent from '../components/ProjetComponent'

export default function Home() {
    return (
        <>
        <NavBarComponent key={0} className="bg-[var(--foreground)] min-h-screen"/>
        <div className="bg-[var(--background)] min-h-screen">
        <h1>Projets</h1>
        <IntroComponent
            key="1"
            title="Quels projets ?"
            image="/project.png"
            texte="Ici vous trouverez mes projets publics pu poster sur mon github."
            direction="right"
        />
        <ProjectComponent/>
        </div>
        </>
    );
    
}