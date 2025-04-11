"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavBarComponent() {
  const pathName = usePathname();
  // petite fonction utilitaire
  const getLinkStyleText = (href) => {
    return pathName === href ? 'text-[#01ffe7]' : '';
  };
  const getLinkStyleImage = (href) => {
    return pathName === href ? 'border border-[3px] border-[#01ffe7] rounded-md' : '';

  };
  
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/contact" className={clsx("nav-link", getLinkStyleImage('/contact'))}>
          <Image src="/contact.png" width={60} height={60} alt="Contact"/>
        </Link>
        <Link href="/" className={clsx("nav-link", getLinkStyleImage('/'))}>
          <Image src="/home.png" width={60} height={60} alt="Accueil"/>
        </Link>
        <div className="flex items-center space-x-8">
          <Link href="/projet" className={clsx(getLinkStyleText('/projet'))}>
            Projet
          </Link>
          <Link href="/hackathon" className={clsx(getLinkStyleText('/hackathon'))}>
            Hackathon
          </Link>
        </div>
      </div>
    </nav>
  );
}