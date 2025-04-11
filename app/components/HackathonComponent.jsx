"use client";

export default function HackathonComponent({ title, description, link }) {
  return (
    <div className="bg-[#1a2d1c] dark:bg-white-700 rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      {link && (
        <a href={link} className="text-blue-500 hover:underline">
          Voir sur LinkedIn
        </a>
      )}
    </div>
  );
}