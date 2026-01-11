// Import de PrismaClient depuis le package Prisma
// PrismaClient permet de communiquer avec la base de données
import { PrismaClient } from "@prisma/client";

/*
  Cette fonction crée une nouvelle instance de PrismaClient.
  On l'appelle "Singleton" car on veut UNE SEULE instance
  de Prisma dans toute l'application.
*/
const prismaClientSingleton = () => {
  return new PrismaClient();
};

/*
  Partie spécifique à TypeScript.

  Ici, on étend l'objet global (globalThis) pour lui ajouter
  une propriété appelée "prismaGlobal".

  Cela permet de stocker Prisma globalement et d'éviter
  qu'il soit recréé plusieurs fois en développement.
*/
declare const globalThis: {
  // prismaGlobal aura le même type que ce que retourne
  // la fonction prismaClientSingleton (PrismaClient)
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/*
  On crée l'instance Prisma de cette manière :

  - Si globalThis.prismaGlobal existe déjà → on l'utilise
  - Sinon → on crée une nouvelle instance Prisma

  L'opérateur ?? signifie :
  "utilise la valeur de gauche si elle n'est pas null ou undefined"
*/
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

/*
  On exporte Prisma pour pouvoir l'utiliser partout dans le projet :
  import prisma from "@/lib/prisma";
*/
export default prisma;

/*
  Cette partie s'exécute uniquement en développement.

  En mode développement, Next.js recharge souvent les fichiers.
  Sans cette ligne, Prisma serait recréé à chaque fois → ERREUR.

  En production, cette ligne n'est pas nécessaire.
*/
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
