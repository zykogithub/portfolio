// app/api/github/route.js
import { NextResponse } from 'next/server';
import * as fs from 'node:fs/promises';

/**
 * Fonction pour récupérer les dépôts GitHub.
 */
async function requestGithub() {
  try {
    let token = "";
    try {
      token = await fs.readFile('token.txt', 'utf-8');
    } catch (error) {
      token = process.env.GITHUB_TOKEN; 
    }

    const url = `https://api.github.com/user/repos?visibility=all`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token.trim()}`, // trim important
        'Accept': 'application/vnd.github+json'
      }
    });

    if (!response.ok) throw new Error("Erreur lors de la récupération des dépôts");

    const data = await response.json();

    // Traiter les dépôts pour obtenir le nom, la description, le lien et les langages
    const depots = await Promise.all(data.map(async (depot) => ({
      nom: depot.name,
      description: depot.description || "Pas de description",
      lien: depot.html_url,
      langages: await requestLangage(depot, token.trim())
    })));

    return depots;

  } catch (error) {
    throw new Error("Erreur inattendue : " + error.message);
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
    throw new Error("Erreur inattendue (langages) : " + error.message);
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
