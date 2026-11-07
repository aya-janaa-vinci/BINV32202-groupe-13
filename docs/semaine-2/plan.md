# Plan — Parcours étudiant des candidatures

## Problème et approche

Le cahier des charges `docs/cdc_gesta_developpement.md` impose trois capacités côté étudiant :
consulter les offres publiées de l'année courante, candidater avec un message facultatif,
consulter ses candidatures et retirer une candidature encore non traitée. Le schéma initial
contient déjà `applications`, mais l'API et le frontend ne couvrent aujourd'hui que la liste
des offres.

L'implémentation proposée conserve l'architecture existante (migration SQLite, repository,
service, contrôleur, DTO, hooks et pages React), avec des contrôles d'autorisation dans le
backend et des tests d'intégration API et frontend.

## Trois étapes fonctionnelles

1. **Candidater**
   - Afficher le catalogue détaillé des offres `PUBLISHED` de l'année académique courante.
   - Permettre à un étudiant d'ouvrir le détail et de soumettre un message facultatif.
   - Refuser côté backend toute offre non publiée, tout utilisateur non étudiant et toute
     candidature active déjà existante pour le couple étudiant/offre.
   - Retourner un statut initial `IN_PROGRESS` (« En cours »).

2. **Consulter ses candidatures**
   - Ajouter une route authentifiée listant uniquement les candidatures de l'étudiant connecté.
   - Exposer l'offre, l'entreprise, l'année/période, le message, la date et le statut traduit
     par le frontend.
   - Prévoir le filtre par année courante par défaut, conformément à EF-72, à confirmer si
     l'historique doit être affiché dans cette vue.

3. **Retirer une candidature**
   - Ajouter une action dédiée qui passe une candidature `IN_PROGRESS` à `WITHDRAWN`.
   - Interdire le retrait après sélection ou rejet, et empêcher l'accès à la candidature d'un
     autre étudiant.
   - Rendre l'action visible uniquement quand elle est applicable et actualiser la liste après
     succès. Une nouvelle candidature est possible après ce retrait.

## Fichiers et composants concernés

- `backend/src/db/migrations/002_applications_constraints.sql` (ou migration équivalente) :
  unicité offre/étudiant et index/contraintes nécessaires, sans effacer les données existantes.
- `backend/src/models/offer.ts` et nouveaux modèles `application.ts` :
  statuts, DTO et types de détail.
- `backend/src/repositories/applications.repository.ts` et éventuellement évolution de
  `offers.repository.ts` : lecture, création et transition atomique d'une candidature.
- `backend/src/services/applications.service.ts` :
  règles RG-02, RG-03 et EF-32/EF-33, vérification de propriété et transitions.
- `backend/src/controllers/applications.controller.ts` et évolution du contrôleur offres :
  `GET` des offres détaillées, `POST` candidature, `GET` mes candidatures, `DELETE`/action de
  retrait.
- `backend/src/app.ts` : branchement des routes et dépendances.
- `backend/tests/applications.test.ts`, évolution de `offers.test.ts` et des tests de migration/
  contraintes : cas nominaux, rôles, statuts, doublons, isolation des étudiants et transitions.
- `frontend/src/models`, `services`, `hooks` et `utils/guards.ts` : contrats et appels API.
- `frontend/src/pages/OffersPage.tsx` et composants associés : détail, formulaire de candidature
  et feedback d'erreur/succès.
- nouvelle page `frontend/src/pages/ApplicationsPage.tsx`, hook et composants de tableau :
  consultation et retrait.
- `frontend/src/App.tsx`, navigation/layout et tests frontend associés.
- `backend/http/*.http` et documentation API si les exemples de l'API sont maintenus à jour.

## Vérifications et tests envisagés

- Migration sur base vide et base déjà initialisée ; vérification de l'unicité `(offer_id,
  student_id)` et des clés étrangères.
- API : étudiant peut candidater uniquement à une offre publiée ; message absent/présent ;
  année courante ; refus 401/403/404/409 selon le cas ; aucun champ interne dans les DTO.
- API : liste strictement limitée à l'étudiant connecté ; statuts `IN_PROGRESS`, `SELECTED`,
  `REJECTED`, `WITHDRAWN` ; retrait idempotence/erreur explicite et impossibilité après traitement.
- API : administrateur/contact ne peuvent pas utiliser les actions étudiant, et une candidature
  d'un autre étudiant ne fuit aucune donnée.
- Frontend : catalogue, ouverture du détail, soumission, erreurs, affichage des statuts et
  retrait conditionnel ; tests des guards et des états de chargement/erreur.
- Exécuter les suites Vitest backend et frontend ciblées, puis le type-check/build des deux
  packages si les tests ciblés passent.

## Décisions métier à clarifier

- **Retrait et nouvelle candidature** : une candidature retirée est conservée avec le statut
  `WITHDRAWN`, le retrait est autorisé uniquement quand elle est `IN_PROGRESS`, et le même
  étudiant peut ensuite candidater à nouveau à la même offre.
- **Doublon actif** : un étudiant ne peut avoir qu'une candidature non retirée par offre ; une
  contrainte unique simple sur `(offer_id, student_id)` ne convient donc pas, car elle empêcherait
  une nouvelle candidature après retrait. Le backend doit appliquer cette règle et la base doit
  la sécuriser avec une contrainte/index partiel si compatible avec les données existantes.
- **Année** : confirmer si « consulter ses candidatures » montre seulement l'année courante par
  défaut avec un filtre d'historique, ou uniquement l'année courante.
- **Catalogue** : préciser si le détail doit afficher un contact précis et la localité lorsqu'une
  offre possède plusieurs contacts, et quels champs sont obligatoires pour la recherche.
- **Concurrence** : confirmer le comportement attendu si deux soumissions/une sélection et un
  retrait arrivent simultanément (réponse métier attendue, sans notification automatique).
