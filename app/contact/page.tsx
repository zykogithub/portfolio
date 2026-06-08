"use client";
import IntroComponent from "../components/IntroductionComponent";
import NavBarComponent from "../components/NavBarComponent";

export default function Contact() {
  return (
    <>
    <NavBarComponent key={0} className="bg-[var(--foreground)]"/>
      <div className="bg-[var(--background)] min-h-screen">
        <div className="page-container">
          <h1 className="section-title">Contact</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <IntroComponent
              key={1}
              title="Instagram"
              texte="zykocorp"
              image="/instagram.png"
              direction="right"
              noPadding={false}
            />
            <IntroComponent
              key={2}
              title="LinkedIn"
              texte="Naherry Darouèche"
              image="/linkedin.png"
              direction="left"
              noPadding={false}
            />
            <IntroComponent
              key={3}
              title="CV"
              texte="Mon CV"
              image="/CV.png"
              direction="right"
              noPadding={false}
              elementOuvrir="/CV.pdf"
            />
          </div>
        </div>
      </div>
    </>
  );
}