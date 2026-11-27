# Bilan de la semaine 5 : MCP et tests end-to-end avec Playwright

## 1. Scénarios

Les deux scénarios sont décrits dans [`e2e/recherche-offres/scenarios.md`](../e2e/recherche-offres/scenarios.md). Ils portent sur la recherche d'offres par titre (EF-30) et partent du seed standard, avec l'étudiant Louis Claes (profil choisi sur la page de connexion de démonstration, sans mot de passe).

**Justification du choix**

- **Scénario 1 (cas nominal) : recherche avec résultat.** On saisit `ASSISTANT CONVERSATIONNEL` en majuscules. Ce cas vérifie en même temps le filtrage, l'insensibilité à la casse et la règle de visibilité (l'offre « Refonte du portail client », non publiée, ne doit jamais apparaître pour un étudiant).
- **Scénario 2 (cas limite) : recherche sans résultat.** On saisit `ZZZ_OFFRE_INEXISTANTE_2026`. Ce cas vérifie que la liste est vide et que le message « Aucune offre ne correspond à la recherche. » s'affiche.

Ces deux comportements sont visibles dans l'interface, et jusqu'ici la recherche n'était testée qu'avec l'API ou avec une API simulée (tests de la semaine 9), jamais de bout en bout.

## 2. Playwright MCP

**Mise en place** : serveur lancé avec `npx -y @playwright/mcp@latest --isolated --port 8931`, configuré dans `.mcp.json` (type `http`, URL `http://localhost:8931/mcp`). Les outils Playwright sont bien apparus dans Copilot.

**Incidents rencontrés**

- Au premier essai, Chrome était introuvable (`Chromium distribution 'chrome' is not found`, solution proposée : `npx playwright install chrome`).
- Au deuxième essai, la page de connexion affichait une erreur 502 : le backend n'était pas démarré, donc les utilisateurs de démonstration ne se chargeaient pas.

Une fois ces deux points réglés, l'application s'est ouverte correctement.

**Scénarios exécutés : 1 puis 2** (conversation : `docs/conversation-5-mcp.md`)

- **Scénario 1** : connexion en Louis Claes, ouverture de « Offres », saisie de `ASSISTANT CONVERSATIONNEL`. Résultat : un seul résultat, « Assistant conversationnel interne » (statut Publiée), aucune autre offre affichée. Réussi.
- **Scénario 2** : saisie de `ZZZ_OFFRE_INEXISTANTE_2026`. Résultat : aucune offre affichée, message exact « Aucune offre ne correspond à la recherche. » visible. Réussi.

**Appels d'outils observés**

| Outil | Paramètres | Ce qu'il a renvoyé |
|---|---|---|
| Navigate to a URL (`browser_navigate`) | `http://localhost:5173` | La page « Gesta », écran « Connexion de démonstration » avec les sections administrateurs, étudiants et contacts. |
| Page snapshot (`browser_snapshot`) | profondeur 6 puis 10 | L'arbre d'accessibilité de la page, avec les références des éléments (par exemple `e27` pour « Louis Claes, étudiant »). |
| Click (`browser_click`) | cible `e27`, « Louis Claes, étudiant » | La connexion réussie ; le snapshot suivant montre la page d'accueil de l'étudiant. |
| Fill form (`browser_fill_form`) | champ « Rechercher par titre », valeur `ASSISTANT CONVERSATIONNEL` | La saisie ; le snapshot suivant montre la liste filtrée sur une seule offre. |

**Limites**

- Les scénarios ont été exécutés avec le compte Louis Claes et ces deux recherches : `scenarios.md` a été aligné sur ce qui a réellement été exécuté.
- Copilot a recopié les étapes dans ses demandes plutôt que de lire `scenarios.md`.
- Le fait que le navigateur ait été piloté est confirmé par les appels d'outils et leurs résultats (snapshots différents avant et après la saisie), pas seulement par le compte rendu de Copilot.

## 3. Playwright Test

**Fichiers créés ou modifiés**

- `playwright.config.ts` : `baseURL` sur `http://localhost:5173`, et un `webServer` à deux entrées (backend sur `/health`, frontend sur le port 5173) avec `reuseExistingServer`.
- `e2e/recherche-offres/recherche-offres.spec.ts` : les deux tests, un par scénario, avec le numéro du scénario dans leur nom.
- `e2e/frontend-url.spec.ts` : petit test qui ouvre `/` et vérifie le titre « Gesta » (validation de la configuration). Il a d'abord échoué (`Cannot navigate to invalid URL`, faute de `baseURL`) puis réussi après la configuration.
- `e2e/example.spec.ts` (exemple généré par l'installateur, qui testait playwright.dev) supprimé.

**Principales assertions**

- Avant chaque test (`beforeEach`) : connexion en « Louis Claes », ouverture de « Offres », vérification de l'état initial (4 offres affichées, « Refonte du portail client » absente).
- **Scénario 1** : le tableau contient 2 lignes (l'en-tête et une offre), la ligne « Assistant conversationnel interne » contient « Publiée », les trois autres offres et « Refonte du portail client » sont absentes.
- **Scénario 2** : aucun tableau n'est affiché et le message exact « Aucune offre ne correspond à la recherche. » est visible.
- Les sélecteurs passent par les rôles et les libellés (`getByRole`), pas par des classes CSS.

**Répétabilité** : les tests ne modifient aucune donnée et ne dépendent pas de leur ordre. Le backend utilise une base SQLite persistante (`backend/data/gesta.db`) et le seed n'est inséré que si la base est vide. Si la base a été modifiée, `npm run db:reset` (backend arrêté) la remet au seed standard.

**Exécutions** (3 navigateurs : chromium, firefox, webkit)

| Commande | Résultat |
|---|---|
| `npx playwright test` (avec `example.spec.ts`) | 15 tests réussis (28,7 s) |
| `npx playwright test --headed` | 15 tests réussis (33,6 s) |
| `npx playwright test --headed` (2ᵉ fois) | 15 tests réussis (33,8 s) |
| `npx playwright test` (après suppression de `example.spec.ts`) | 9 tests réussis (18,6 s) |

Les tests passent donc plusieurs fois de suite.

**`npm run check`** : réussi. Lint : 0 avertissement, 0 erreur (backend et frontend). Typecheck : OK. Tests backend : 126 réussis. Tests frontend : 50 réussis. Build : OK. Cette commande ne lance pas les tests E2E, qui restent à exécuter explicitement avec `npx playwright test`.

## 4. Vérification : le test détecte-t-il un défaut ?

- **Défaut temporaire** : dans `backend/src/controllers/offers.controller.ts`, le contrôleur validait toujours `q` mais ne le transmettait plus au service, donc la recherche ne filtrait plus.
- **Échec constaté** : 6 tests sur 9 échouent (les deux scénarios sur les trois navigateurs). Scénario 1 : `Expected: 2 / Received: 5` (toutes les offres restent affichées). Scénario 2 : le tableau est encore présent (`Expected: 0 / Received: 1`) ou le message vide n'apparaît pas (firefox). Le test `frontend-url` passe, ce qui montre que la configuration et la connexion sont saines : l'échec vient bien du défaut.
- **Restauration** : après avoir remis le contrôleur d'origine, les 9 tests réussissent (18,6 s). Le défaut n'est pas commité.
- **Limite** : l'assertion « aucun tableau » du scénario 2 peut passer trop tôt, pendant l'affichage de « Chargement… ». C'est l'assertion sur le message qui protège vraiment ce test.

## 5. Comparaison

**1. Que permet Playwright MCP dans la conversation avec l'agent ? Quelle action précise avez-vous vue passer par un outil MCP ?**

Avec Playwright MCP, Copilot peut vraiment ouvrir un navigateur et s'en servir comme un utilisateur : aller sur une page, cliquer, écrire dans un champ, regarder ce qu'il y a à l'écran. Du coup il peut tester l'application tout seul, sans qu'on écrive la moindre ligne de code.

Ce qu'on a vu passer même si c'était très très rapide : il a cliqué sur « Louis Claes, étudiant » pour se connecter, puis il a rempli le champ « Rechercher par titre » et on a bien vu qu'il ne restait qu'une seule offre affichée.

**2. Qu'apportent les scripts Playwright Test que le compte rendu d'un test par MCP n'apporte pas ?**

Un script on le garde dans le projet et on peut le relancer quand on veut, sans IA. Avec MCP, on a juste un compte rendu de Copilot qui nous dit "c'est vérifié ", et on doit lui faire confiance. Là, les assertions sont écrites noir sur blanc, donc le résultat est toujours le même.
On l'a bien vu avec le défaut : quand on a cassé la recherche, 6 tests ont échoué tout seuls, et après avoir tout remis, les 9 sont repassés.

**3. Dans quel cas préféreriez-vous une exploration interactive avec MCP ? Dans quel cas préféreriez-vous un test automatisé ?**

On prendrait MCP pour découvrir une fonctionnalité ou vérifier vite fait que qlq chose marche, par exemple pour voir comment la page est construite avant d'écrire des tests, ou pour reproduire un bug à la main. C'est rapide et on a rien à écrire.

Je prendrais un test automatisé si je veux être sûr que ça marche tout le temps : avant de fusionner une PR, après avoir modifié du code, ou pour une fonctionnalité importante qu'on ne veut pas casser par accident. Au final les deux se complètent : MCP pour explorer, Playwright Test pour garder la vérification.


### Crédits utilisés
26%