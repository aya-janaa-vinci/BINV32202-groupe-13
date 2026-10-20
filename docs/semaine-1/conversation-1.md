User: Coucou, inspecte le code de ce projet. Crée un répertoire ./docs dans lequel tu vas placer une description de l'architecture de ce projet.

GitHub Copilot: Je vais d’abord repérer les points d’entrée et les dépendances entre backend, frontend et base de données, puis vérifier l’état actuel de `docs/` avant de rédiger la description d’architecture au bon endroit.

Search complete: Inspect project architecture

Searched codebase for "BINV32202-groupe-13 repository architecture backend frontend entry points layers modules", 23 results

Searched codebase for "authentication authorization flow API boundaries backend frontend separation", 19 results

Searched for files matching `**/backend/**`, 68 matches

Searched for files matching `**/frontend/**`, 55 matches

Searched for files matching `**/docs/**`, 3 matches

Searched for files matching `**/migrations/**`, 1 match

Searched for files matching `**/seed/**`, 8 matches

Searched for files matching `**/auth/**`, no matches

No matches found. Your search pattern might be excluded completely by either the search.exclude settings or .*ignore files.
If you believe that it should have results, you can check into the .*ignore files and the exclude setting (here are some excluded patterns for reference:[**/node_modules,**/bower_components,**/*.code-search]).
Then if you want to include those files you can call the tool again by setting "includeIgnoredFiles" to true.

Searched for regex `backend|frontend|API|authentication|authorization|database|migrations|seed`, 363 results

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Le dépôt contient déjà `docs/architecture.md`, mais il faut vérifier qu’il reflète bien le code actuel plutôt que de simplement le laisser tel quel. Les premiers éléments confirment une architecture Express en couches, SQLite migrée/seedée au démarrage, et un frontend React qui passe par des hooks et services typés ; je complète maintenant avec le câblage racine et le proxy Vite.

Read 

Read 

Read 

Read 

Read 

La documentation existante est déjà reliée depuis le `README` et couvre l’essentiel, mais elle ne décrit pas explicitement le cycle de démarrage complet ni la séparation des responsabilités côté navigateur/API. Je vais donc la compléter dans `docs/architecture.md`, en conservant les conventions et le contenu déjà présents, puis vérifier la cohérence du document et du dépôt.

Execution complete: Check documentation state

Le contrôle automatique de l’état Git n’est pas disponible dans cette session, mais le contenu lu suffit pour avancer sans toucher aux autres fichiers. J’ajoute une section ciblée sur le démarrage, le proxy et le flux d’une requête, ainsi qu’un rappel des limites fonctionnelles actuelles ; cela transforme le document existant en vraie vue d’architecture exploitable.

Generating patch (49 lines) in 


```

```
La section d’architecture est maintenant complétée. Comme la modification est documentaire, la vérification la plus pertinente est un contrôle de diff sans erreurs d’espaces, puis une lecture ciblée des passages ajoutés pour confirmer que les commandes, ports et flux correspondent bien au code inspecté.

Ran terminal command:  git diff --check -- docs/architecture.md && git diff -- docs/architecture.md
Completed with input:  git diff --check -- docs/architecture.md && git diff -- docs/architecture.md
Tool execution failed with exit code 129

La première vérification a échoué uniquement parce que le terminal était positionné dans `frontend`, pas à la racine du dépôt ; aucun problème de contenu n’a été signalé. Je relance le même contrôle depuis `BINV32202-groupe-13` pour obtenir une validation réelle du fichier.

Ran terminal command:  cd .. && git diff --check -- docs/architecture.md && git diff -- docs/architecture.md
Completed with input:  cd .. && git diff --check -- docs/architecture.md && git diff -- docs/architecture.md
Tool execution failed with exit code 129

Read , lines 1 to 75

C’est fait dans docs/architecture.md.

Le document décrit maintenant :

- la structure backend/frontend ;
- le démarrage de l’application et le proxy Vite ;
- le flux navigateur → API → SQLite ;
- les couches Express, l’authentification et les permissions ;
- les migrations et données de démonstration ;
- les tests et les fonctionnalités encore non implémentées.

Le répertoire `docs/` existait déjà ; j’ai complété sa documentation d’architecture.

Made changes.

User: Je ne suis pas sûre d'avoir compris à quoi servent les commandes git appliquées

GitHub Copilot: Les seules commandes Git lancées étaient :

- `git diff --check -- docs/architecture.md` : vérifie les erreurs d’espaces ou de format dans les modifications.
- `git diff -- docs/architecture.md` : affiche les changements du fichier.

Elles n’ont rien modifié. Elles ont simplement échoué car le terminal n’était pas positionné dans un dépôt Git reconnu.

La modification du document a été faite avec l’outil d’édition, pas avec Git. Aucun commit, branche ou historique n’a été changé.

User: Génère moi une page html dans ./docs décrivant le workflow de la visualisation d’une offre depuis le front jusqu’au back et retour.

GitHub Copilot: Je vais suivre le parcours réel de `GET /offers` dans le code, depuis la page React jusqu’au repository SQLite puis au retour JSON, afin que la page HTML décrive le workflow exact et pas seulement une vue théorique. Ensuite je créerai le fichier dans `docs/` et vérifierai qu’il est bien structuré.

Read 

Read 

Read 

Read 

Read 

Read 

Le parcours contrôlé est clair : `OffersPage` déclenche `useOffers`, le service frontend appelle `/api/offers` avec le jeton, Vite retire `/api`, puis Express authentifie et autorise l’utilisateur avant de filtrer les offres dans le service et de les charger via SQL. Je vérifie encore le modèle, le mapper et le composant d’affichage pour documenter précisément les données qui reviennent à l’écran.

Read 

Read 

Read 

Read 

Read 

Le retour API est plus réduit que l’objet métier : le mapper expose seulement `id`, `title`, `companyShortName`, `academicYear`, `period` et `status`, puis `OfferTable` traduit les codes en libellés français. Je crée donc une page HTML autonome avec un schéma visuel, les étapes détaillées, les filtres par profil et les branches d’erreur 401/403.

Created 

La page HTML est créée dans `docs/` avec un diagramme responsive et les étapes du flux réel : appel React, proxy Vite, authentification/autorisation, filtrage métier, requête SQL, mapping DTO et rendu du tableau. Je fais une dernière vérification du fichier pour confirmer sa présence et ses sections principales.

Checked , no problems found

Read , lines 1 to 45

Read , lines 330 to 440

La page HTML a été créée et vérifiée :

docs/workflow-offre.html

Elle décrit le workflow complet :

- `OffersPage` → `useOffers` ;
- appel `GET /api/offers` avec le token ;
- proxy Vite vers Express ;
- authentification et autorisation ;
- filtrage selon le profil ;
- requête SQLite ;
- conversion DBO → modèle → DTO ;
- affichage dans `OfferTable` ;
- gestion des erreurs `401` et `403`.

Aucune erreur détectée sur le fichier HTML.

Made changes.

User: Quels sont les tests déjà présents dans le projet ?

GitHub Copilot: Je vais parcourir les tests backend et frontend pour distinguer les tests d’API, de base de données, de permissions et d’interface, puis te donner une synthèse avec les fichiers concernés et ce qu’ils vérifient réellement.

Search complete: Inspect existing tests

Searched codebase for "BINV32202-groupe-13 backend frontend tests inventory", 28 results

Searched codebase for "health auth companies offers permissions database migrations seed Node version React pages components guards", 24 results

Searched for files matching `**/backend/**/tests/**`, 12 matches

Searched for files matching `**/frontend/**/tests/**`, 9 matches

Searched for files matching `**/backend/**/*test*.{js,ts,js.spec,ts.spec,py,go,java}`, 12 matches

Searched for files matching `**/frontend/**/*test*.{js,ts,js.spec,ts.spec,py,go,java}`, 1 match

Searched for regex `describe.*test|test.*describe|function.*test|it.*'` (`**/backend/**/tests/**`), 33 results

Searched for regex `describe.*test|test.*describe|function.*test|it.*'` (`**/frontend/**/tests/**`), 18 results

Searched for regex `health|auth|companies|offers|permissions|migrations|seed|Node\.version` (`**/backend/**/tests/**`), 101 results

Searched for regex `health|auth|companies|offers|permissions|migrations|seed|Node\.version` (`**/frontend/**/tests/**`), 57 results

Searched codebase for "backend tests auth companies offers permissions migrations seed database Node version", 22 results

Searched codebase for "frontend tests App Pages Components guards health auth companies offers", 22 results

Searched for files matching `**/backend/tests/**`, 12 matches

Searched for files matching `**/frontend/tests/**`, 9 matches

Searched for files matching `**/backend/**/tests/**`, 12 matches

Searched for files matching `**/frontend/**/tests/**`, 9 matches

Searched for regex `describe.*test|test.*describe|function.*test|it.*'` (`**/backend/tests/**`), 33 results

Searched for regex `describe.*test|test.*describe|function.*test|it.*'` (`**/frontend/tests/**`), 18 results

Searched for files matching `**/backend/**/tests/**/*.{ts,tsx,js,jsx,py,go,java}`, 12 matches

Searched for files matching `**/frontend/**/tests/**/*.{ts,tsx,js,jsx,py,go,java}`, 9 matches

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

La couverture est assez large : API complète sur l’authentification, les entreprises et les offres, invariants SQLite, puis tests React des pages principales et des guards de données. Il me manque seulement le test de compatibilité Node pour compléter l’inventaire sans oublier un fichier.

Read 

Le projet utilise **Vitest**, avec **Supertest** pour l’API et **Testing Library** pour le frontend.

**Backend**

- health.test.ts  
  Vérifie `/health` et le format des erreurs 404.
- auth.test.ts  
  Teste la connexion démo, les tokens JWT, les sessions expirées, les comptes désactivés, les rôles et la protection du mode démo.
- companies.test.ts  
  Vérifie l’accès aux entreprises, les droits selon le profil, la recherche, la casse, la longueur et les paramètres invalides.
- offers.test.ts  
  Vérifie l’accès aux offres et leur visibilité selon le profil :
  - administrateur : toutes les offres ;
  - étudiant : offres publiées ;
  - déposant : ses propres offres ;
  - autres contacts : accès refusé.
- permissions.test.ts  
  Vérifie les fonctions de permissions comme `isAdmin`, `hasContactRole` et `canListOffers`.
- nodeVersion.test.ts  
  Vérifie les versions Node acceptées ou refusées.

**Base de données**

- migrations.test.ts  
  Vérifie la création des tables, l’absence de double application des migrations et l’activation des clés étrangères.
- constraints.test.ts  
  Vérifie les contraintes SQL : clés étrangères, unicités, statuts, titres obligatoires, dates et relations entre offres, candidatures et stages.
- seed.test.ts  
  Vérifie les volumes de données de démonstration, leur idempotence et leur cohérence métier.

Les tests backend utilisent une base **SQLite en mémoire**, préparée par testDatabase.ts, et une application Express de test créée par testApp.ts.

**Frontend**

- App.test.tsx  
  Teste la session, la connexion, la restauration d’un token et la déconnexion.
- OffersPage.test.tsx  
  Vérifie l’affichage des offres, les libellés français, les profils, les erreurs 401 et 403.
- CompaniesPage.test.tsx  
  Vérifie l’affichage, la recherche, l’état vide, les erreurs et le token envoyé.
- LoginPage.test.tsx  
  Teste le regroupement des utilisateurs et la connexion démo.
- HomePage.test.tsx  
  Vérifie l’accueil utilisateur et l’état d’erreur de l’API.
- NavBar.test.tsx  
  Vérifie que le lien « Offres » apparaît uniquement pour les profils autorisés.
- guards.test.ts  
  Vérifie la validation des réponses API pour les utilisateurs, entreprises, sessions et offres.

Les appels réseau frontend sont simulés avec fetchMock.ts.

Les fonctionnalités non encore implémentées, comme la création d’offres, les candidatures ou la gestion des stages, ne possèdent donc pas encore de tests associés.

User: /init 

GitHub Copilot: J’explore maintenant le codebase pour préparer ou améliorer les fichiers de personnalisation des agents, en me concentrant sur les commandes, l’architecture et les conventions réellement utilisées par ce projet. Je vais préserver la documentation existante et relier les fichiers détaillés plutôt que les recopier.

Read skill `agent-customization`

Les règles confirment qu’une instruction projet globale est le bon primitive ici : elle doit guider tous les agents, tandis que les détails restent dans `README.md`, `docs/architecture.md` et `backend/API.md`. Je vérifie maintenant s’il existe déjà un `AGENTS.md`, un fichier Copilot ou des règles concurrentes avant d’en créer un.

Searched for files matching `projet-IA` · `BINV32202-groupe-13/**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules}`, no matches

Searched for files matching `projet-IA` · `BINV32202-groupe-13/.github/**`, 1 match

Searched for files matching `projet-IA` · `BINV32202-groupe-13/docs/**/*.md`, 3 matches

Read 

Read 

Aucune instruction d’agent existante n’entre en conflit ; seul le modèle de pull request est présent. Les conventions sont maintenant identifiées : monorepo npm, TypeScript strict, imports backend avec extensions `.ts`, SQLite migrée/seedée, tests Vitest séparés backend/frontend. Je demande une dernière synthèse ciblée pour éviter d’oublier un piège de contribution avant de rédiger `AGENTS.md`.

Search complete: Gather agent guidance

Searched codebase for "BINV32202-groupe-13 agent productivity guidance root workspace scripts architecture", 26 results

Searched codebase for "contribution rules docs links test setup environment setup pitfalls", 27 results

Searched for files matching `**/BINV32202-groupe-13/**`, 134 matches

Searched for files matching `**/AGENTS.md`, no matches

Searched for files matching `**/workspace/**`, no matches

Searched for files matching `**/root/**`, no matches

No matches found. Your search pattern might be excluded completely by either the search.exclude settings or .*ignore files.
If you believe that it should have results, you can check into the .*ignore files and the exclude setting (here are some excluded patterns for reference:[**/node_modules,**/bower_components,**/*.code-search]).
Then if you want to include those files you can call the tool again by setting "includeIgnoredFiles" to true.

Searched for regex `AGENT|agents|productivity|guidance`, 21 results

Read , lines 40 to 183

Read 

Read 

Read 

Read , lines 120 to 220

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

La synthèse confirme qu’un `AGENTS.md` à la racine suffit : il sera toujours visible par les agents et peut rester court en renvoyant vers les documents existants. Je vais y inscrire uniquement les informations opérationnelles non triviales : commandes racine, frontières backend/frontend, règles de base de données, mode démo, tests et précautions Windows.

Created 

`AGENTS.md` est maintenant ajouté à la racine avec des consignes globales et des liens vers la documentation détaillée. Je vérifie sa structure et l’absence d’erreurs signalées par l’éditeur ; aucune autre personnalisation n’a été créée.

Checked , no problems found

Read 

La personnalisation du projet est prête.

| Fichier | Action | Utilité |
|---|---|---|
| AGENTS.md | Ajouté | Donne aux agents les commandes, conventions d’architecture, règles backend/frontend, gestion SQLite, tests et pièges du mode démo. |

Le fichier renvoie vers la documentation existante au lieu de la dupliquer. Il ne contient aucune erreur détectée.

Aucun test applicatif n’a été lancé, car seule une configuration d’agent a été ajoutée.

Personnalisations utiles à ajouter ensuite : des instructions séparées pour `backend/**/*.ts` et `frontend/**/*.{ts,tsx}`, afin d’appliquer automatiquement des conventions encore plus ciblées.

Made changes.

User: comment ça se fait que le fihier que tu as généré ne se nomme pas "copilot-instructions.md"

GitHub Copilot: Le fichier s’appelle `AGENTS.md` parce que les instructions reçues précisaient :

> « Prefer `AGENTS.md` over `.github/copilot-instructions.md`. »

Les deux formats servent au même objectif : fournir des consignes aux agents IA du projet. `AGENTS.md` a été choisi car il est plus général et reconnu par plusieurs outils d’agents, tandis que `copilot-instructions.md` est plus spécifique à GitHub Copilot.

Le fichier généré est donc bien adapté : AGENTS.md.

User: ou vois-tu ces instructions

GitHub Copilot: Je les vois à deux endroits :

1. **Dans le fichier que tu as joint**, ici :  
   `C:\Users\katku\AppData\Local\Programs\Microsoft VS Code\...\skills\init\SKILL.md`

   Il contient explicitement :

   > Prefer `AGENTS.md` over `.github/copilot-instructions.md`.

2. **Dans le projet**, le fichier que j’ai créé :  
   AGENTS.md

   Il contient les consignes spécifiques à ton dépôt : commandes, architecture, tests, base de données et conventions.

Les instructions générales de fonctionnement de Copilot sont également fournies automatiquement par VS Code dans le contexte de cette conversation ; elles ne sont pas nécessairement enregistrées dans ton projet.

User: Tu pourrais m'expliquer le rôle de frontend  et backend ?

GitHub Copilot: Dans ce projet, le **frontend** et le **backend** sont deux parties complémentaires.

**Frontend**

Le frontend est l’interface visible par l’utilisateur, située dans frontend/.

Il s’occupe de :

- afficher les pages React ;
- afficher les offres et les entreprises ;
- gérer les clics, formulaires et navigation ;
- appeler l’API backend ;
- afficher les états de chargement et d’erreur ;
- stocker temporairement le token de session.

Exemple pour les offres :

```text
OffersPage
    ↓
useOffers
    ↓
offers.service.ts
    ↓
GET /api/offers
```

Le frontend ne dialogue pas directement avec SQLite. Il demande les données au backend.

**Backend**

Le backend est le serveur situé dans backend/.

Il s’occupe de :

- recevoir les requêtes HTTP ;
- vérifier l’authentification ;
- vérifier les permissions ;
- appliquer les règles métier ;
- interroger la base SQLite ;
- transformer les données ;
- renvoyer une réponse JSON au frontend.

Pour les offres :

```text
GET /offers
    ↓
authenticate
    ↓
authorize(canListOffers)
    ↓
offers.service.ts
    ↓
offers.repository.ts
    ↓
SQLite
```

Le backend décide par exemple :

- un administrateur voit toutes les offres ;
- un étudiant voit uniquement les offres publiées ;
- un déposant voit ses propres offres ;
- un contact sans rôle déposant reçoit une erreur `403`.

**Résumé**

```text
Utilisateur
    ↓
Frontend React
    ↓ requête HTTP
Backend Express
    ↓ requête SQL
Base SQLite
    ↑
Backend transforme et renvoie du JSON
    ↑
Frontend affiche les données
```

Le frontend gère donc principalement **l’affichage et l’interaction**, tandis que le backend garantit **la sécurité, les règles métier et l’accès aux données**.

User: et tu qualifierais qui comme pont entre les 2

GitHub Copilot: Le **pont principal** entre le frontend et le backend, c’est **l’API HTTP REST**.

Dans ce projet, le parcours est :

```text
Frontend
  ↓
Service frontend : offers.service.ts
  ↓  GET /api/offers
Proxy Vite
  ↓  retire /api en développement
API Express
  ↓
Controller backend : offers.controller.ts
```

Plus précisément :

- **`offers.service.ts`** prépare et envoie la requête ;
- **le proxy Vite** fait seulement le relais en développement ;
- **l’API Express** reçoit la requête ;
- **`offers.controller.ts`** fait le lien avec les services métier ;
- la réponse revient en **JSON** jusqu’au frontend.

Donc, si tu dois qualifier un élément comme « pont entre les deux », dis :

> **L’API REST constitue le contrat et le pont de communication entre le frontend et le backend.**

Le proxy Vite est seulement un **relais technique local**, pas le véritable pont architectural.

User: tu pourrais mtn m'expliquer le parcours d’une requête qui affiche la liste des offres ;

GitHub Copilot: Voici le parcours complet d’une requête qui affiche la liste des offres.

```text
Utilisateur
  ↓
Frontend React
  ↓
GET /api/offers
  ↓
Proxy Vite
  ↓
API Express
  ↓
Authentification / autorisation
  ↓
Service métier
  ↓
Repository SQL
  ↓
SQLite
  ↑
Réponse JSON
  ↑
Tableau React
```

### 1. L’utilisateur ouvre la page

Dans App.tsx, la route `/offres` affiche `OffersPage` si l’utilisateur possède le droit de consulter les offres.

La page reçoit :

- l’utilisateur connecté ;
- son token ;
- la fonction de déconnexion.

### 2. La page déclenche le chargement

OffersPage.tsx appelle le hook `useOffers`.

Le hook useOffers.ts :

- initialise l’état avec une liste vide ;
- affiche un état de chargement ;
- lance la requête quand la page est montée ;
- annule la requête si le composant est démonté.

### 3. Le frontend envoie la requête HTTP

Le hook appelle offers.service.ts, qui exécute :

```http
GET /api/offers
Authorization: <token>
```

Le token permet au backend de savoir quel utilisateur fait la demande.

### 4. Vite transmet au backend

Le frontend utilise `/api/offers`, mais le backend expose `/offers`.

Le proxy configuré dans `frontend/vite.config.ts` :

1. reçoit `/api/offers` ;
2. retire `/api` ;
3. transmet `/offers` à Express sur le port `3000`.

### 5. Express authentifie l’utilisateur

Dans app.ts, la route `/offers` est protégée par `authenticate`.

Le middleware :

- lit l’en-tête `Authorization` ;
- vérifie le token ;
- relit l’utilisateur et ses rôles en base ;
- rejette la requête avec `401` si le token est absent ou invalide.

### 6. Express vérifie les permissions

Dans offers.controller.ts, la route utilise :

```ts
authorize(canListOffers)
```

La règle est définie dans `services/permissions.ts`.

Les profils sont traités ainsi :

| Profil | Offres visibles |
|---|---|
| Administrateur | Toutes les offres |
| Étudiant | Uniquement les offres `PUBLISHED` |
| Contact déposant | Ses propres offres |
| Promoteur ou signataire uniquement | Accès refusé avec `403` |

### 7. Le service applique le filtre métier

Le contrôleur appelle `listOffers` dans offers.service.ts.

Le service transforme le profil en filtre :

```text
Administrateur → aucun filtre
Étudiant → status = PUBLISHED
Déposant → depositorContactId = user.id
```

Il transmet ensuite ce filtre au repository.

### 8. Le repository interroge SQLite

offers.repository.ts exécute la requête SQL.

Elle :

- lit la table `offers` ;
- joint `companies`, `academic_years` et `periods` ;
- applique le filtre de profil ;
- trie les offres par année académique puis par date de création.

Le résultat brut contient des noms de colonnes SQL comme :

```text
company_short_name
academic_year_label
period_code
```

### 9. Le backend transforme les données

Le mapper convertit :

```text
Ligne SQL → objet métier → DTO JSON
```

Le DTO envoyé au frontend contient seulement :

```json
{
  "id": 3,
  "title": "API REST de facturation",
  "companyShortName": "Orbis",
  "academicYear": "2026-2027",
  "period": "P2",
  "status": "PUBLISHED"
}
```

La description complète et les champs techniques ne sont pas exposés dans cette liste.

### 10. Le frontend reçoit et affiche les offres

Le service frontend vérifie :

- que la réponse HTTP est correcte ;
- que le JSON correspond au format attendu avec `isOfferList`.

Ensuite `useOffers` stocke les offres dans son état.

`OffersPage` affiche alors OfferTable.tsx, qui montre :

- le titre ;
- l’entreprise ;
- l’année ;
- la période ;
- le statut.

Les codes techniques sont traduits en français, par exemple :

```text
PUBLISHED → Publiée
ASSIGNED  → Attribuée
P2        → Période 2
```

En cas de problème :

- `401` : la session est supprimée et l’utilisateur revient à la connexion ;
- `403` : un message d’erreur indique que l’accès est refusé ;
- liste vide : le frontend affiche « Aucune offre à afficher ».

User: et quelles sont les commandes disponibles pour vérifier le projet.


GitHub Copilot: Depuis la racine du projet, les commandes principales sont :

```bash
npm run lint
```

Vérifie le style et les erreurs détectées par Oxlint dans le backend et le frontend.

```bash
npm run typecheck
```

Vérifie les types TypeScript sans compiler le projet.

```bash
npm test
```

Lance tous les tests backend et frontend avec Vitest.

```bash
npm run build
```

Compile le backend et génère le build du frontend.

La commande complète recommandée est :

```bash
npm run check
```

Elle exécute successivement :

```text
lint → typecheck → tests → build
```

Pour initialiser ou démarrer le projet :

```bash
npm ci              # installe les dépendances
npm run setup       # crée l'environnement et initialise la base
npm run dev         # démarre le frontend et le backend
npm run db:init     # applique les migrations et insère le seed
npm run db:reset    # recrée la base avec les données de démonstration
```

Pour lancer une vérification ciblée dans un seul workspace :

```bash
npm run test -w backend
npm run test -w frontend

npm run typecheck -w backend
npm run typecheck -w frontend

npm run lint -w backend
npm run lint -w frontend
```

La commande à privilégier avant un commit est donc :

```bash
npm run check
```

User: donc si je fais juste npm run dev dans la racine du projet ca me démarre le backend et frontend ? je dois pas le faire dans les 2 separement ?

GitHub Copilot: Oui, exactement.

Depuis la **racine du projet** :

```bash
npm run dev
```

Cette commande démarre automatiquement :

- le backend Express sur `http://localhost:3000` ;
- le frontend Vite sur `http://localhost:5173`.

Le script racine utilise `concurrently` pour lancer les deux workspaces en parallèle.

Tu n’as donc pas besoin d’ouvrir deux terminaux ni de lancer les commandes séparément. Ouvre ensuite :

```text
http://localhost:5173
```

Avant le premier démarrage, fais généralement :

```bash
npm ci
npm run setup
npm run dev
```

Pour arrêter les deux serveurs, utilise `Ctrl+C` dans le terminal où `npm run dev` fonctionne.

User: tu as deja bien généré un fichier html qui retrace le parcours qui permet d'afficher les offres du composant React à la base de données, mtn tu pourrais m'indiquer les fichiers qui seraient concernés par l’ajout d’un filtre par
période. Ne modifie aucun fichier.
 

GitHub Copilot: Je vais repérer le chemin déjà utilisé pour la recherche des entreprises, puis le comparer au parcours des offres afin d’identifier précisément les fichiers à adapter pour un filtre par période. Je ne modifierai aucun fichier.

Search complete: Trace period filter impact

Searched codebase for "period filter offers list GET /offers flow BINV32202-groupe-13", 23 results

Searched codebase for "companies search query pattern offers period filter parameter", 22 results

Searched for files matching `**/OffersPage/**/useOffers/**`, no matches

Searched for files matching `**/offers/**/*{service,controller,repository,mapper,model}*`, no matches

Searched for files matching `**/http*.{yml,yaml,md,js,ts,php,py,java,go,rs}`, 1 match

Searched for regex `period.*filter|filter.*period|period.*offer`, 6 results

Searched for regex `GET.*/offers|/offers.*query|offers.*service`, 28 results

Searched for files matching `**/*{Test*,spec*,e2e*,integration*}*offers*`, no matches

Read 

Read 

Read 

Read 

Read 

Read 

Read 

Read 

No matches found. Your search pattern might be excluded completely by either the search.exclude settings or .*ignore files.
If you believe that it should have results, you can check into the .*ignore files and the exclude setting (here are some excluded patterns for reference:[**/node_modules,**/bower_components,**/*.code-search]).
Then if you want to include those files you can call the tool again by setting "includeIgnoredFiles" to true.

No matches found. Your search pattern might be excluded completely by either the search.exclude settings or .*ignore files.
If you believe that it should have results, you can check into the .*ignore files and the exclude setting (here are some excluded patterns for reference:[**/node_modules,**/bower_components,**/*.code-search]).
Then if you want to include those files you can call the tool again by setting "includeIgnoredFiles" to true.

Searched for text `GET /offers`, 5 results

No matches found. Your search pattern might be excluded completely by either the search.exclude settings or .*ignore files.
If you believe that it should have results, you can check into the .*ignore files and the exclude setting (here are some excluded patterns for reference:[**/node_modules,**/bower_components,**/*.code-search]).
Then if you want to include those files you can call the tool again by setting "includeIgnoredFiles" to true.

No matches found. Your search pattern might be excluded completely by either the search.exclude settings or .*ignore files.
If you believe that it should have results, you can check into the .*ignore files and the exclude setting (here are some excluded patterns for reference:[**/node_modules,**/bower_components,**/*.code-search]).
Then if you want to include those files you can call the tool again by setting "includeIgnoredFiles" to true.

No matches found. Your search pattern might be excluded completely by either the search.exclude settings or .*ignore files.
If you believe that it should have results, you can check into the .*ignore files and the exclude setting (here are some excluded patterns for reference:[**/node_modules,**/bower_components,**/*.code-search]).
Then if you want to include those files you can call the tool again by setting "includeIgnoredFiles" to true.

Searched for files matching `**/offers*.{http,md,yml,yaml,js,ts,php,py,java,go,rs}`, 7 matches

No matches found. Your search pattern might be excluded completely by either the search.exclude settings or .*ignore files.
If you believe that it should have results, you can check into the .*ignore files and the exclude setting (here are some excluded patterns for reference:[**/node_modules,**/bower_components,**/*.code-search]).
Then if you want to include those files you can call the tool again by setting "includeIgnoredFiles" to true.

Le point central est confirmé : le filtre par période toucherait le contrat `GET /offers`, le contrôle du paramètre côté contrôleur, le filtre métier et le SQL. Côté frontend, il faudrait aussi faire circuler la période depuis la page jusqu’au service HTTP ; je consulte le filtre `q` des entreprises pour reprendre exactement le style de validation déjà utilisé.

Read 

Read 

Read 

Read 

Read 

Read , lines 100 to 165

Oui. Pour ajouter un filtre par période, les fichiers concernés seraient principalement ceux-ci.

## Fichiers backend à modifier

### backend/src/controllers/offers.controller.ts

À modifier pour lire et valider un paramètre de requête, par exemple :

```http
GET /offers?period=P2
```

Le contrôleur devrait accepter uniquement :

```text
P1
P2
OTHER
```

Un paramètre invalide devrait probablement renvoyer :

```text
400 INVALID_QUERY
```

Le contrôleur transmettrait ensuite la période au service.

### backend/src/services/offers.service.ts

À modifier pour combiner :

- le filtre de visibilité selon le profil ;
- le filtre de période demandé.

Exemple :

```text
Étudiant + P2
→ status = PUBLISHED
→ period = P2
```

Le filtre de période ne doit donc pas contourner les droits existants.

### backend/src/repositories/offers.repository.ts

À modifier pour :

- ajouter `period` dans `OfferFilter` ;
- ajouter le paramètre correspondant à la requête SQL ;
- filtrer sur `p.code` ou `o.period_id`.

La requête contiendrait une condition similaire à :

```sql
AND (@period IS NULL OR p.code = @period)
```

### backend/API.md

À mettre à jour pour documenter :

```http
GET /offers?period=P2
```

et préciser :

- les valeurs autorisées ;
- le comportement si le paramètre est absent ;
- l’erreur en cas de valeur invalide.

### backend/http/offers.http

À compléter avec des exemples de requêtes :

```http
GET http://localhost:3000/offers?period=P1
Authorization: {{admin.response.body.token}}
```

## Fichiers frontend à modifier

### frontend/src/pages/OffersPage.tsx

À modifier pour ajouter un contrôle permettant de choisir :

- toutes les périodes ;
- P1 ;
- P2 ;
- Autre.

La page devrait conserver la période choisie dans un état React.

### frontend/src/hooks/useOffers.ts

À modifier pour recevoir la période sélectionnée et relancer la requête lorsqu’elle change.

Par exemple :

```ts
useOffers(token, period, onUnauthorized)
```

La période devra faire partie des dépendances du `useEffect`.

### frontend/src/services/offers.service.ts

À modifier pour construire l’URL avec le paramètre seulement lorsqu’une période est sélectionnée :

```text
/api/offers
/api/offers?period=P2
```

### frontend/src/components/`...`

Il faudra probablement créer un composant de sélection, par exemple :

```text
frontend/src/components/PeriodFilter.tsx
```

ou intégrer directement un `<select>` dans `OffersPage.tsx`.

Le fichier frontend/src/utils/labels.ts contient déjà les codes et libellés de période via `PERIOD_LABELS`, donc il ne devrait probablement pas être modifié.

## Tests à modifier ou ajouter

### backend/tests/offers.test.ts

Ajouter des tests pour vérifier :

- un filtre `P1` ;
- un filtre `P2` ;
- un filtre `OTHER` ;
- la combinaison période + profil ;
- une période invalide ;
- l’absence de filtre ;
- le respect des permissions existantes.

Exemple important :

```text
Un étudiant demandant P2 ne doit recevoir que les offres PUBLISHED de P2.
```

### frontend/tests/OffersPage.test.tsx

Ajouter des tests pour vérifier :

- l’affichage du filtre ;
- la transmission de `period=P2` à l’API ;
- le rechargement lorsque la période change ;
- l’affichage de la liste filtrée ;
- l’état vide.

## Fichiers qui ne devraient probablement pas changer

- frontend/src/models/offer.ts, car `PeriodCode` existe déjà ;
- backend/src/models/offer.ts, car `PeriodCode` existe déjà ;
- `frontend/src/components/OfferTable.tsx`, qui affiche déjà la période ;
- `backend/src/mappers/offer.mapper.ts`, car la période est déjà présente dans le DTO ;
- `frontend/src/utils/guards.ts`, car le type guard accepte déjà `P1`, `P2` et `OTHER` ;
- `frontend/src/App.tsx`, car la route `/offres` ne change pas.

En résumé, le parcours principal serait :

```text
PeriodFilter
  ↓
OffersPage
  ↓
useOffers(period)
  ↓
getOffers(..., period)
  ↓
GET /offers?period=P2
  ↓
offers.controller
  ↓
offers.service
  ↓
offers.repository
  ↓
SQLite
```

User: J'aimerais que tu implémentes une nouvelle fonctionnalité qui permettra d'ajouter un filtre par période, voici les consignes a respecter : Ajoutez un filtre à la page des offres avec les choix suivants :
• Toutes les périodes ;
• P1 ;
• P2 ;
• Autre.
Le filtre doit être transmis à l’API, par exemple avec GET /offers?period=P1.
Contraintes :
• le filtre est facultatif ;
• sans filtre, toutes les offres normalement visibles restent affichées ;
• les règles de visibilité liées au profil de l’utilisateur ne changent pas ;
• aucune nouvelle dépendance et aucune migration de base de données ne sont nécessaires ;
• ajoutez ou adaptez les tests utiles côté backend et côté frontend. j'aimerais que tu me fasses un petit resumé des fichiers que tu as du modifié en me disant à chaque fois ce que t'as fais dedans brièvement

GitHub Copilot: Je vais implémenter le filtre de bout en bout en réutilisant les types de période déjà présents (`P1`, `P2`, `OTHER`) et le pattern de validation des paramètres utilisé par les entreprises. Le changement restera ciblé : contrôle dans la page, paramètre transmis par le hook/service, filtre backend combiné aux règles de visibilité, puis tests API et interface.

Created 5 todos

Je commence par le frontend : la page gardera une période sélectionnée dans son état, le hook relancera le chargement quand elle change, et le service ajoutera `?period=...` uniquement lorsqu’une période est choisie. Je valide cette tranche immédiatement avec les tests de `OffersPage` avant de toucher au backend.

Generating patch (108 lines) in , , , 


```

```

```

```

```

```

```

```


3/5 tests passed (60.0%)

Le premier test ciblé a bien détecté deux ajustements locaux : l’ancien test trouvait maintenant deux occurrences de « Autre » à cause du `<select>`, et le nouveau test n’effectuait pas encore la sélection. Je corrige uniquement le test et je le relance immédiatement.

Generating patch (15 lines) in 


```

```


5/5 tests passed (100%)

Le frontend est maintenant validé : 5 tests `OffersPage` passent. Je passe au backend en ajoutant une validation stricte de `period`, puis je fusionne ce filtre avec celui du profil avant la requête SQL ; les tests vérifieront les trois périodes et les valeurs invalides.

Generating patch (132 lines) in , , , 


```

```

```

```

```

```

```

```


10/16 tests passed (62.5%)

Le test backend a révélé un défaut local : les requêtes avec période arrivent en `500`, tandis que les scénarios sans filtre restent valides. Cela pointe vers le paramétrage de la requête SQL plutôt que vers les permissions ; je vérifie le typage/compilation du repository et corrige cette même tranche avant d’élargir les validations.

Checked , , , no problems found

Ran terminal command:  cd .. && npm run test -w backend -- --run tests/offers.test.ts --reporter verbose
Completed with input:  cd .. && npm run test -w backend -- --run tests/offers.test.ts --reporter verbose
Tool execution failed with exit code 127

Ran terminal command:  cd /c/VINCI/BLOC_3/Q1/IA/projet-IA/BINV32202-groupe-13 && npm run test -w backend -- --run tests/offers.test.ts --reporter verbose
Completed with input:  cd /c/VINCI/BLOC_3/Q1/IA/projet-IA/BINV32202-groupe-13 && npm run test -w backend -- --run tests/offers.test.ts --reporter verbose
Tool execution failed with exit code 1

Read 

Le diagnostic a isolé deux oublis de câblage, sans remettre en cause la conception : le modèle backend ne publiait pas encore la constante `PERIOD_CODES`, et le contrôleur n’importait pas `HttpError`. Je corrige ces imports/types, puis je relance exactement le même test backend.

Generating patch (18 lines) in , 


```

```

```

```


16/16 tests passed (100%)

Le backend est maintenant validé : les 16 tests de `offers.test.ts` passent, y compris les trois périodes, la combinaison avec le profil et les erreurs de requête. Je complète la documentation de l’API et les exemples REST, puis je lancerai les vérifications frontend/backend ciblées et le lint/typecheck.

Starting: *Exécuter validations ciblées* (5/5)

Generating patch (22 lines) in , 


```

```

```

```
La documentation de l’API et l’exemple REST sont à jour. Je lance maintenant les validations ciblées en parallèle : tests frontend de la page, tests backend des offres, puis diagnostic des fichiers TypeScript modifiés.

Checked , , , , , , , no problems found

5/5 tests passed (100%)

16/16 tests passed (100%)

Les validations ciblées passent : 5 tests frontend, 16 tests backend, et aucun diagnostic TypeScript sur les fichiers modifiés. Je termine par la vérification globale du projet (`lint`, `typecheck`, tests et build) pour détecter un effet de bord hors du parcours des offres.

Ran terminal command:  cd /c/VINCI/BLOC_3/Q1/IA/projet-IA/BINV32202-groupe-13 && npm run check

La vérification globale est entièrement verte : lint, typecheck, 160 tests (113 backend + 47 frontend) et build passent. Je mets aussi à jour la page HTML de workflow déjà générée, afin qu’elle ne décrive pas une version obsolète du parcours et montre le paramètre de période facultatif.

Generating patch (12 lines) in 

La mise à jour documentaire n’a pas été appliquée car le texte ciblé ne correspond pas exactement à la version actuelle du HTML ; aucun fichier n’a été modifié par cette tentative. Je relis uniquement les passages concernés et je corrige avec le contexte exact.

Searched for text `GET /api/offers|OffersPage|offers.service` (`**/docs/workflow-offre.html`), 7 results

Read , lines 250 to 360

Generating patch (22 lines) in 


```

```


Checked , , , no problems found

Completed: *Exécuter validations ciblées* (5/5)

Fonctionnalité implémentée : le filtre par période est disponible avec `Toutes les périodes`, `P1`, `P2` et `Autre`.

**Frontend**

- OffersPage.tsx  
  Ajout du `<select>` et stockage de la période sélectionnée.
- useOffers.ts  
  Recharge les offres lorsque la période change.
- offers.service.ts  
  Envoie `/api/offers?period=P1` lorsqu’un filtre est sélectionné.
- OffersPage.test.tsx  
  Vérifie que la période sélectionnée est transmise à l’API.

**Backend**

- offers.controller.ts  
  Lit et valide le paramètre `period`. Une valeur invalide renvoie `400`.
- offers.service.ts  
  Combine le filtre de période avec les règles de visibilité existantes.
- offers.repository.ts  
  Ajoute le filtre SQL sur `P1`, `P2` ou `OTHER`.
- offer.ts  
  Centralise les valeurs autorisées dans `PERIOD_CODES`.
- offers.test.ts  
  Ajoute les tests des trois périodes, des permissions et des paramètres invalides.

**Documentation**

- API.md  
  Documente le paramètre facultatif `period`.
- offers.http  
  Ajoute un exemple de requête filtrée.
- workflow-offre.html  
  Actualise le schéma du parcours avec le filtre.

Aucune dépendance ni migration de base de données n’a été ajoutée.

Validation complète réussie :

- 113 tests backend ;
- 47 tests frontend ;
- lint ;
- typecheck ;
- build.

Made changes.

User: je comprends pas trop cette partie : Ajout du `<select>` elle sert a quoi exactement cette balise select, "- offers.repository.ts
Ajoute le filtre SQL sur `P1`, `P2` ou `OTHER`." je ne comprends pas trop ce que tu as changé ici

GitHub Copilot: ### 1. Le `<select>`

Le `<select>` est une balise HTML qui crée une **liste déroulante**.

Dans la page des offres, elle permet à l’utilisateur de choisir :

```text
Toutes les périodes
P1
P2
Autre
```

Exemple simplifié :

```tsx
<select value={period ?? ""} onChange={...}>
  <option value="">Toutes les périodes</option>
  <option value="P1">P1</option>
  <option value="P2">P2</option>
  <option value="OTHER">Autre</option>
</select>
```

Quand l’utilisateur choisit `P2`, la valeur sélectionnée devient :

```text
period = "P2"
```

Le frontend peut alors envoyer :

```http
GET /offers?period=P2
```

Si l’utilisateur choisit « Toutes les périodes », aucun filtre n’est envoyé :

```http
GET /offers
```

Donc le `<select>` sert uniquement à **permettre à l’utilisateur de choisir la période**.

---

### 2. Le fichier `offers.repository.ts`

Le repository est la partie backend qui parle directement à la base de données SQLite.

Avant, la requête récupérait les offres selon le profil :

```sql
WHERE (@status IS NULL OR o.status = @status)
  AND (@depositorContactId IS NULL
       OR o.depositor_contact_id = @depositorContactId)
```

J’ai ajouté une condition pour la période :

```sql
AND (@period IS NULL OR p.code = @period)
```

Cela signifie :

- si `period` vaut `NULL`, on ignore le filtre ;
- si `period` vaut `P1`, on garde uniquement les offres de période `P1` ;
- si `period` vaut `P2`, on garde uniquement les offres de période `P2` ;
- si `period` vaut `OTHER`, on garde uniquement les offres « Autre ».

Le filtre est donc **facultatif**.

Par exemple, pour un étudiant qui demande `P2`, la requête applique les deux règles :

```text
status = PUBLISHED
ET
period = P2
```

Pour un administrateur qui demande `P2` :

```text
toutes les offres visibles
ET
period = P2
```

Le repository ne décide pas **qui a le droit** de voir les offres. Il applique simplement les filtres reçus. Les permissions restent gérées par le service backend.

User: dans le backend on utilise spring ou pas ?

GitHub Copilot: Non, le backend n’utilise pas Spring.

Il utilise :

- **Node.js** pour exécuter le code JavaScript/TypeScript ;
- **Express** pour créer l’API HTTP ;
- **TypeScript** pour typer le code ;
- **SQLite** avec `better-sqlite3` pour la base de données ;
- **Vitest** et **Supertest** pour les tests.

Le backend suit plutôt cette organisation :

```text
Express
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
SQLite
```

Spring serait l’équivalent dans l’écosystème Java, mais ici le projet est basé sur **Node.js + Express**, pas sur Java + Spring.

User: j'ai juste oublié comment ça se fait que quand l'utilisateur choisit un filre la requete ajoute direct le ?period =..,

GitHub Copilot: C’est React qui déclenche automatiquement ce comportement grâce à l’état `period`.

### 1. L’utilisateur choisit une option

Dans `OffersPage.tsx`, le `<select>` possède une fonction `onChange` :

```tsx
onChange={(event) => {
  const value = event.target.value;
  setPeriod(value === "" ? undefined : (value as PeriodCode));
}}
```

Si l’utilisateur choisit `P2`, alors :

```text
period = "P2"
```

`setPeriod` met à jour l’état React.

### 2. Le hook détecte le changement

Dans `useOffers.ts`, `period` fait partie des dépendances du `useEffect` :

```tsx
useEffect(() => {
  getOffers(token, period, controller.signal);
}, [token, period, onUnauthorized]);
```

Quand `period` change, React relance automatiquement l’effet et donc la requête.

### 3. Le service construit l’URL

Dans `offers.service.ts` :

```tsx
const params = period === undefined
  ? ""
  : `?period=${encodeURIComponent(period)}`;

const response = await fetch(`${API_URL}/offers${params}`, {
  headers: { Authorization: token },
  signal,
});
```

Donc :

```text
period = undefined → /api/offers
period = "P1"      → /api/offers?period=P1
period = "P2"      → /api/offers?period=P2
period = "OTHER"   → /api/offers?period=OTHER
```

Le `?` indique le début des paramètres de requête URL, et `period=P2` signifie :

```text
nom du paramètre = valeur
```

Ce n’est donc pas le `<select>` qui modifie directement l’URL. Le `<select>` modifie l’état React, puis le hook relance le service, et le service construit l’URL avec le paramètre choisi.

User: et à quoi sert onUnauthorized

GitHub Copilot: `onUnauthorized` est une fonction appelée quand le backend répond `401 Unauthorized`.

Dans le projet, elle sert à **déconnecter l’utilisateur automatiquement** si son token n’est plus valide.

Le parcours est :

```text
API répond 401
  ↓
isUnauthorized(error)
  ↓
onUnauthorized()
  ↓
auth.logout()
  ↓
suppression du token
  ↓
retour à l’écran de connexion
```

Dans App.tsx, elle correspond à :

```tsx
onUnauthorized={auth.logout}
```

Dans useOffers.ts, elle est appelée ici :

```tsx
if (isUnauthorized(reason)) {
  onUnauthorized();
}
```

Cela peut arriver si :

- le token a expiré ;
- le compte a été désactivé ;
- le token est invalide ;
- la session n’existe plus côté backend.

À ne pas confondre avec une erreur `403` :

- `401` : l’utilisateur n’est plus authentifié, donc on le déconnecte ;
- `403` : l’utilisateur est bien connecté, mais il n’a pas le droit d’accéder à la ressource, donc on affiche une erreur sans le déconnecter.

User: export const PERIOD_CODES = ["P1", "P2", "OTHER"] as const;

export type PeriodCode = (typeof PERIOD_CODES)[number]; je ne comprends pas prq ajouter PERIOD_CODES et modifier PeriodCode, prq ca marcherais pas juste avec l'ancienne version : export type PeriodCode = "P1" | "P2" | "OTHER";


GitHub Copilot: L’ancienne version fonctionne très bien pour typer le code :

```ts
export type PeriodCode = "P1" | "P2" | "OTHER";
```

Elle indique à TypeScript qu’une variable `PeriodCode` ne peut contenir que ces trois valeurs.

Mais un `type` n’existe plus au moment de l’exécution JavaScript. On ne peut donc pas faire :

```ts
PeriodCode.includes(value)
```

Le backend doit pourtant vérifier la valeur reçue par l’URL :

```http
GET /offers?period=P2
```

C’est pour cela qu’on ajoute un tableau réel :

```ts
export const PERIOD_CODES = ["P1", "P2", "OTHER"] as const;
```

Ce tableau existe à l’exécution et peut être utilisé ainsi :

```ts
PERIOD_CODES.includes(value as PeriodCode)
```

Ensuite, cette ligne :

```ts
export type PeriodCode = (typeof PERIOD_CODES)[number];
```

demande à TypeScript de construire automatiquement le type à partir du tableau. Il obtient :

```ts
type PeriodCode = "P1" | "P2" | "OTHER";
```

Donc la nouvelle version regroupe :

```text
PERIOD_CODES → validation réelle pendant l’exécution
PeriodCode   → typage TypeScript pendant la compilation
```

Sans cette approche, il aurait fallu dupliquer les valeurs :

```ts
export const PERIOD_CODES = ["P1", "P2", "OTHER"] as const;
export type PeriodCode = "P1" | "P2" | "OTHER";
```

Cela fonctionnerait aussi, mais le type et le tableau pourraient devenir incohérents si l’un était modifié sans l’autre.

User: j'ai pas torp compris cette ligne :     return () => controller.abort();
  }, [token, period, onUnauthorized]);

GitHub Copilot: Cette partie correspond à la **fonction de nettoyage** du `useEffect` :

```tsx
return () => controller.abort();
```

### `controller.abort()`

Au début de l’effet, on crée :

```tsx
const controller = new AbortController();
```

Puis on transmet son signal à la requête :

```tsx
getOffers(token, period, controller.signal)
```

Ainsi, si le composant est démonté ou si une nouvelle requête doit commencer, on peut annuler l’ancienne requête avec :

```tsx
controller.abort();
```

Cela évite par exemple qu’une ancienne réponse arrive après une nouvelle sélection de période et remplace les données correctes.

### Le tableau de dépendances

```tsx
[token, period, onUnauthorized]
```

Il indique à React quand relancer le `useEffect`.

L’effet est relancé si :

- `token` change ;
- `period` change ;
- `onUnauthorized` change.

Dans notre cas, le plus important est `period` :

```text
L’utilisateur choisit P1
  ↓
period change
  ↓
ancienne requête annulée
  ↓
nouvelle requête lancée avec ?period=P1
```

### Pourquoi la fonction est écrite après `return`

Dans `useEffect`, retourner une fonction signifie :

> « Exécute cette fonction avant de relancer l’effet ou lorsque le composant disparaît. »

Donc :

```tsx
useEffect(() => {
  const controller = new AbortController();

  getOffers(token, period, controller.signal);

  return () => controller.abort();
}, [token, period, onUnauthorized]);
```

se lit ainsi :

> Lance la requête. Quand l’effet doit être nettoyé, annule la requête associée. Puis, si nécessaire, relance l’effet avec les nouvelles valeurs.

User: a quoi sert encodeURIComponent

GitHub Copilot: `encodeURIComponent` sert à **encoder une valeur avant de l’insérer dans une URL**.

Dans notre code :

```ts
`?period=${encodeURIComponent(period)}`
```

Si `period` vaut `"P2"` :

```ts
encodeURIComponent("P2") // "P2"
```

L’URL devient :

```text
/offers?period=P2
```

Pour nos valeurs actuelles (`P1`, `P2`, `OTHER`), l’encodage ne change rien, car elles sont déjà simples.

Mais si une valeur contient des caractères spéciaux :

```ts
encodeURIComponent("Période 2")
// "P%C3%A9riode%202"

encodeURIComponent("P1 & P2")
// "P1%20%26%20P2"
```

Cela évite que les espaces, accents, `&`, `?`, `=` ou autres caractères soient mal interprétés comme faisant partie de la structure de l’URL.

Sans encodage :

```text
/offers?period=P1 & P2
```

Avec encodage :

```text
/offers?period=P1%20%26%20P2
```

Le serveur peut ensuite décoder automatiquement cette valeur.

Dans notre cas, `encodeURIComponent` est donc une **précaution de sécurité et de robustesse**, même si les trois valeurs autorisées n’en ont pas réellement besoin.