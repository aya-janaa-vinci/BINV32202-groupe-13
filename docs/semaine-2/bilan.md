— choix : 
On a commencé par lui demander de faire la partie backend et puis seulement le frontend, ça reste assez gros comme partie à implémenter d'un coup, la prochaine fois on demandera de procéder en plus petites étapes.


— Résultat : 
Un étudiant peut candidater à une offre publiée, avec ou sans message, consulter ses candidatures et leur statut et retirer une candidature tant qu'elle n'a pas encore été traitée. Les restrictions fonctionnent également : seuls les étudiants peuvent candidater, une offre non publiée n'accepte pas de candidature, une candidature déjà traitée ne peut plus être retirée.

On a eu des difficultés au début à comprendre le fonctionnement de MySQL comme on ne l'a jamais utilisé.

On a pas pu faire certains tests manuellement qui nécessitaient l'implémentation de fonctionnalités que l'on n'a pas encore dû faire.


— Modifications : 

décisions prises après lecture du plan :

Une seule candidature active est autorisée par étudiant et par offre.
Une candidature retirée est conservée dans l'historique avec le statut Retirée.
Après le retrait d'une candidature, l'étudiant peut candidater à nouveau à la même offre.


— Validation fonctionnelle : 

- candidature à une offre publiée avec message :
ok --> candidature envoyée

- candidature à une offre publiée sans message :
ok --> candidature envoyée

- présence de la candidature et de son statut après rechargement : 
ok --> toujours présents

- retrait d’une candidature encore en cours : 
ok --> elle devient "retirée"

- impossibilité de retirer une candidature déjà traitée : 
ok --> bouton retirer n'apparait pas

- séparation des candidatures de deux étudiants différents : 
ok --> chacun voit bien ses candidatures

- imposibilité de candidater pour les non étudiants : 
ok --> les autres n'ont pas le bouton candidater

- une offre non publiée n’accepte pas de candidature (testé avec fichier http comme impossible de le tester dans l'interface): 
ok --> "Cette offre n'est pas disponible"


— Qualité : 
Il renvoyait un message d'erreur comprenant le statut de l'erreur au client, on lui a demandé de changer ça pour que ce soit plus user friendly.
Réutilisation des conventions déjà présentes dans le code.
Contrôles de sécurité réalisés côté serveur.
Vérifications réalisées avec le lint, le type-check, les tests et la compilation.


— Tests et commandes :

-- commandes --
npm run lint
npm run typecheck
npm run test
npm run build
npm run check

-- résultats --
Lint : réussi
Vérification TypeScript : réussie
Compilation des applications frontend et backend : réussie
Tests backend : 117 tests réussis
Tests frontend : 48 tests réussis

-- Exemple de comportement couvert par un test --

Vérification qu'un étudiant ne peut pas posséder 2 candidatures actives pour la même offre.