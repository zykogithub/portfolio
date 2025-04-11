"use client"
import NavBarComponent from '../components/NavBarComponent';
import IntroComponent from '../components/IntroductionComponent';
import HackathonComponent from '../components/HackathonComponent';

export default function Home() {
    return(
        <>
            <NavBarComponent key={0} className="bg-[var(--foreground)] min-h-screen"/>
            <div className="bg-[var(--background)] min-h-screen">
                <h1>Hackathon</h1>
                <IntroComponent
                    key="1"
                    title="Qu'est-ce qu'un hackathon ?"
                    image="/hackathon.png"
                    texte="Un hackathon c'est un défi d'une certaine durée où à la fin 
                    du temps appartie, on dioit rendre un projet informatique. 
                    Ici, vous pouvez retrouver ceux pour lesquelles j'ai pu 
                    participer avec le lien vers leur page linkedin du défi s'il existe"
                />
                <HackathonComponent
                key={8}
                
                    title="BPI"
                    description="Ce hackathon de 36 heures avait pour but de conceptualiser et de coder un agent IA prêt à 
                    t'accompagner dans le processus de création d'une entreprise. Effectué à la banque public d'investissemtn 
                    ce défi m'a permis de comprendre le lien enrtre création de code et création de valeur"
                />
                <HackathonComponent
                key={7}
                    title="nuit du code 2024"
                    description="Ce défi informatique de 6h consiste à créer un jeu vidéo en python à partir du thème imposé, composant et framework imposé."
                />
                <HackathonComponent
                key={2}
                    title="automathon 2024"
                    description="Ce hackathon de 24 heures avait pour but de créer une IA détectric de deep fake"
                />
                <HackathonComponent
                key={3}
                    title="From LLM to agentic AI"
                    description="Ce hackathon de 36 heures avait pour but de de créer une application composé d'un agent IA prêt parmis un thème imposé. Mon groupe avait choisi le thème de servir les clients"
                />
                <HackathonComponent
                key={54}
                    title="Coding Jam 2024"
                    description="Ce hackathon de 36 heures avait pour but de créer un jeu vidéo à partir d'un thème imposé."
                />
                <HackathonComponent
                key={5}
                    title="Coding Challange Galadrim"
                    description="Ce défi de 3 heures avait pour but de créer un joueur de battle royal selon les différentes actions possibles."
                />
            </div>
        </>
    )
}