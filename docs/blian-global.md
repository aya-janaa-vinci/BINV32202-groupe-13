# Bilan global du projet

## Ce que j'ai appris

Je dois être honnête : l'IA, ce n'est pas du tout un domaine qui m'attire à la base. Je ne serais jamais allée apprendre ça de mon côté, et je n'aurais jamais ouvert un outil comme Copilot dans le but de m'en servir sérieusement. Je trouve quand même bien qu'on l'ait vu à l'école, justement parce que sinon je serais passée à côté, et que c'est de plus en plus présent dans le métier.

Ce que j'en retiens de concret :

- **L'IA ne remplace pas la relecture.** Plusieurs fois, Copilot a affirmé avoir corrigé quelque chose alors que le fichier n'avait pas changé, ou a écrit des tests faux (par exemple une recherche `DONNEES` alors que le titre contient des accents, ou le mot `chatbot` qui n'était pas dans le titre). Si je n'avais pas relu, j'aurais validé des tests qui ne pouvaient pas réussir. Ce qu'il dit n'est pas une preuve : il faut vérifier soi-même.
- **Les skills et les consignes** (`AGENTS.md`, `copilot-instructions.md`) guident vraiment l'agent. Avec le skill TDD, Copilot écrit les tests d'abord et s'arrête pour attendre notre accord. J'ai aussi vu que le déclenchement automatique ne marche pas toujours du premier coup.
- **Le TDD**, avec un test qui échoue pour la bonne raison avant d'écrire le code, puis qui passe. Voir un test rouge devenir vert m'a aidée à comprendre à quoi sert un test.
- **Auditer des tests** : un test qui passe ne prouve pas forcément quelque chose. Par exemple, un `every(...)` sur une liste vide renvoie toujours vrai.
- **MCP et Playwright** : MCP permet à l'agent de piloter un navigateur pour explorer l'application, alors que Playwright Test donne des tests qu'on garde et qu'on relance sans IA. J'ai bien vu la différence quand on a cassé la recherche volontairement : les tests ont échoué, puis tout est repassé après restauration.
- **Le travail pratique** : Git (commits séparés, branches, PR), la gestion des ports, du backend et du seed, et les erreurs du quotidien (502, Chrome introuvable, push refusé).

## Ce que je n'ai pas appris mais que j'aurais aimé apprendre

- Comment écrire de bons prompts de manière plus méthodique, plutôt que d'essayer jusqu'à ce que ça marche.
- Comment mettre les tests (y compris E2E) dans une vraie chaîne CI/CD, avec GitHub Actions.
- Aller plus loin sur les tests : le frontend de la page des candidatures n'a pas été testé, et plusieurs manques de l'audit n'ont pas été traités par manque de temps.
- Les hooks, que je n'ai pas eu le temps d'essayer.

## Conclusion

Je ne deviendrai pas spécialiste de l'IA, mais je sais maintenant m'en servir avec esprit critique : lui donner un cadre, relire ce qu'elle produit et garder des tests pour vérifier. C'est ce qui me servira le plus plus tard.