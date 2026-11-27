# Scénarios de tests end-to-end : recherche d'offres par titre (EF-30)

## Conditions initiales (communes)

- **Données** : seed standard de l'application (base réinitialisée).
- **Connexion** : sur la page « Connexion de démonstration », choisir « Louis Claes » (étudiant), sans mot de passe, puis ouvrir « Offres » dans la navigation.
- **Rôle** : `STUDENT`.
- **Offres visibles par l'étudiant** (publiées, 2026-2027, P2) :
  - « Assistant conversationnel interne »
  - « Tableau de bord de qualité des données »
  - « Application React de gestion de flotte »
  - « API REST de facturation »
- **Offre non visible** : « Refonte du portail client » (statut « Soumise »), qui ne doit jamais apparaître pour un étudiant.
- **État initial** : page « Offres de stage » affichée, 4 offres listées, champ « Rechercher par titre » vide.

| Numéro | Scénario | Actions dans l'interface | Résultat attendu |
|:---:|---|---|---|
| 1 | **Recherche avec résultat** | Saisir `ASSISTANT CONVERSATIONNEL` (en majuscules) dans « Rechercher par titre ». | Une seule offre est affichée : « Assistant conversationnel interne » (statut Publiée). Les trois autres offres ne sont plus affichées. « Refonte du portail client » n'apparaît pas. La recherche ignore la casse. |
| 2 | **Recherche sans résultat** | Saisir `ZZZ_OFFRE_INEXISTANTE_2026` dans « Rechercher par titre ». | Aucune offre n'est affichée et le message « Aucune offre ne correspond à la recherche. » est visible. |

## Justification du choix

- **Scénario 1 (nominal)** : un mot présent dans le titre, saisi en majuscules pour vérifier en même temps l'insensibilité à la casse et le filtrage.
- **Scénario 2 (limite)** : une recherche sans résultat, qui vérifie le message adapté.