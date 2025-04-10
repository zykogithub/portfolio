"use client";
import Link from "next/link";
import Image from "next/image";

export default function NavBarComponent() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/contact" className="nav-link">
          <Image src="/contact.png" width={30} height={30} alt="Contact"/>
        </Link>
        <Link href="/" className="nav-link">
          <Image src="/home.png" width={30} height={30} alt="Accueil"/>
        </Link>
        <div className="flex items-center space-x-8">
          <Link href="/projet" className="nav-link text-lg font-medium hover:text-blue-300 transition-colors">
            Projets
          </Link>
          <Link href="/hackathon" className="nav-link text-lg font-medium hover:text-blue-300 transition-colors">
            Hackathon
          </Link>
        </div>
      </div>
    </nav>
  );
}