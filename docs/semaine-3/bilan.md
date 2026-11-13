1. Inventaire :

| Élément | Emplacement | Rôle | Exemple | Vérification effectuée |
|----------|----------|----------|----------|----------|
| AGENTS.md | Racine du projet | Définit les conventions de développement | Règles sur les routes, l'authentification et les tests | Lecture et comparaison avec les conventions Web 2 |
| docs/architecture.md | Documentation | Décrit la structure frontend/backend | Organisation en pages, services et composants | Analyse de l'architecture |
| package.json | Frontend / Backend | Définit les scripts du projet | npm run check, npm run test | Vérification des commandes disponibles |
| tsconfig*.json | Frontend / Backend | Configuration TypeScript | strict: true | Vérification du typage strict |
| frontend/.oxlintrc.json | Frontend | Configuration du linter | Règles Oxlint | Vérification de la qualité du code |
| vite.config.ts | Frontend | Configuration du proxy | Proxy /api | Vérification de la communication frontend/backend |

2. Couverture des exigences EF-32 et EF-33

- Matrice EF-32 / EF-33

| Exigence | Cas | Test correspondant | Couverture | Remarque |
|-----------|-----------|-----------|-----------|-----------|
| EF-32 | Candidature sur offre publiée | Test existant | Couvert | |
| EF-32 | Double candidature active | refuse une double candidature active | Couvert | |
| EF-32 | Candidature sur offre non publiée | refuse de candidater à une offre non publiée | Couvert | Test ajouté |
| EF-32 | L'étudiant voit uniquement ses candidatures | liste uniquement les candidatures de l'étudiant connecté | Partiel | Une liste vide ferait réussir le test |
| EF-33 | Retrait d'une candidature active | Test existant | Couvert | |
| EF-33 | Retrait d'une candidature déjà traitée | refuse le retrait d'une candidature déjà traitée | Couvert | |
| EF-33 | Statut invalide | refuse un statut de candidature inconnu | Couvert (BD) | Validation au niveau base de données |

Manques identifiés :
    - Le test de consultation des candidatures ne   garantit pas qu'au moins une candidature soit retournée
    - Le test sur les offres non publiées vérifie la réponse de l'API mais pas l'absence d'insertion en base
    - Le statut invalide est testé au niveau base de données uniquement

3. Modifications et vérifications

| Fichier | Modification |
|----------|----------|
| applications.test.ts | Ajout du test "refuse de candidater à une offre non publiée" |
| constraints.test.ts | Ajout du test "refuse un statut de candidature inconnu" |

Commande exécutée :

npm run check

Résultats :
Lint backend/frontend	OK
Typecheck backend/frontend	OK
Tests backend	119 réussis
Tests frontend	48 réussis
Build backend/frontend	OK

- Limites
Une seule offre non publiée est testée.
Aucune vérification explicite de l'absence de création de candidature.
Validation du statut invalide uniquement au niveau de la base de données.

4. Audit des guides

- Correspondances observées
Token dans Authorization : Oui
Vérification de l'authentification : Oui
TypeScript strict : Oui
Linter configuré : Oui
Proxy /api : Oui
Pages dans un dossier pages : Partielle
Services HTTP séparés : Partielle
Gestion du token via utilitaires : Partielle

- Écarts identifiés
Attente Web 2 : Écart constaté
types.ts centralisé : Non documenté
Interfaces XxxProps : Non documenté
Composant par dossier PascalCase : Non documenté
export default avec fonctions fléchées : Non documenté
import type : Non documenté explicitement
Callbacks onXxx / handleXxx : Non documenté
Retour explicite des fonctions async : Non documenté
Routes en kebab-case : Non documenté
Formulaires contrôlés : Non documenté


- Contradiction identifiée
État partagé via Outlet context typé >< Passage du token et de la déconnexion par props

- Recommandations
Documenter davantage les conventions frontend.
Clarifier les choix concernant le partage d'état.