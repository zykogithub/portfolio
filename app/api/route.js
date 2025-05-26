// app/api/github/route.js
import { NextResponse } from 'next/server';
import * as fs from 'node:fs/promises';

/**
 * Fonction pour récupérer les dépôts GitHub.
 */
async function requestGithub() {
  try {
    let token = process.env.GITHUB_TOKEN;
    if (!token) {
      console.error("Token GitHub introuvable dans les variables d'environnement.");
    } 
    const url = `https://api.github.com/user/repos?visibility=all`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token.trim()}`, // trim important
        'Accept': 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error("Token GitHub invalide ou expiré.",{ status: response.status });
      else throw new Error(`Erreur lors de la récupération des dépôts : ${response.statusText}`,  { status: response.status });
    }
    const data = await response.json();

    // Traiter les dépôts pour obtenir le nom, la description, le lien et les langages
    let depots = await Promise.all(data.map(async (depot) => ({
      nom: depot.name,
      description: depot.description || "Pas de description",
      lien: depot.html_url,
      langages: await requestLangage(depot, token)
    })));
    depots = depots.sort((a, b) => a.nom.localeCompare(b.nom)).filter(depot => depot.nom !== "zykogithub")
    return depots;

  } catch (error) {
    console.error("Erreur inattendue : " + error.message);
  }
}

/**
 * Fonction pour récupérer les langages d'un dépôt GitHub.
 */
async function requestLangage(depot, token) {
  try {
    const url = `https://api.github.com/repos/${depot.owner.login}/${depot.name}/languages`;
    const response = !depot.private ? await fetch(url) : await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github+json'
      }
    });

    if (!response.ok) throw new Error("Erreur lors de la récupération des langages");

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur inattendue (langages) : " + error.message);
  }
}

/**
 * Route API qui retourne les dépôts publics GitHub.
 */
export async function GET() {
  try {
    const depots = await requestGithub();
    return NextResponse.json(depots);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
