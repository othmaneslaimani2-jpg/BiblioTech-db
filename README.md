# 🏛️ BiblioTech - API de Gestion de Catalogue de Bibliothèque

[![Node.js Version](https://img.shields.io/badge/node_js-%3E%3D_18.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express_js-v4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-v14%2B-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Postman](https://img.shields.io/badge/postman-tested-FF6C37?logo=postman&logoColor=white)](https://www.postman.com/)

## 📝 Contexte du Projet
Dans le cadre d'une collaboration entre notre établissement et la société **BiblioTech** (spécialisée dans la digitalisation des services culturels au Maroc), ce projet consiste à concevoir un prototype backend minimaliste pour moderniser la gestion d'une bibliothèque municipale. 

L'objectif est de remplacer le système actuel basé sur des fiches cartonnées et des registres manuscrits par une **API REST** fonctionnelle et performante, qui servira de fondation à la future application web de consultation du catalogue en temps réel pour les habitants.

---

## 🛠️ Technologies Utilisées
Pour respecter les contraintes de simplicité et de performance (développement en 1 jour), l'architecture se concentre sur l'essentiel :
* **Runtime :** Node.js
* **Framework Web :** Express.js
* **Base de données :** PostgreSQL (via le pilote `pg`)
* **Tests & Validation :** Postman

---

## 💾 Structure de la Base de Données

Les données métiers sont stockées dans une table PostgreSQL nommée `livres`. Chaque livre répond aux critères suivants :

### Propriétés d'un livre :
* `id` : Clé primaire, incrémentation automatique (`SERIAL`)
* `titre` : Chaîne de caractères (`VARCHAR`), obligatoire
* `auteur` : Chaîne de caractères (`VARCHAR`), obligatoire
* `categorie` : Chaîne de caractères parmi (*Romans, Sciences, Histoire, Jeunesse, Bandes dessinées, Poésie, Informatique, Langues*)
* `annee_publication` : Entier (`INTEGER`)
* `disponible` : Booléen (`BOOLEAN`), par défaut `true`

### Script SQL de création de table :
```sql
CREATE TABLE livres (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    auteur VARCHAR(255) NOT NULL,
    categorie VARCHAR(100) NOT NULL,
    annee_publication INTEGER,
    disponible BOOLEAN DEFAULT true
);

-- Données de test initiales (Optionnel)
INSERT INTO livres (titre, auteur, categorie, annee_publication, disponible) VALUES
('Le Passé Simple', 'Driss Chraïbi', 'Romans', 1954, true),
('Introduction aux Algorithmes', 'Thomas H. Cormen', 'Informatique', 2009, true),
('Tintin au Tibet', 'Hergé', 'Bandes dessinées', 1960, false);
