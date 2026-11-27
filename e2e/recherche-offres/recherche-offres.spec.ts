import { expect, test } from '@playwright/test';

const offerTitles = [
  'Assistant conversationnel interne',
  'Tableau de bord de qualité des données',
  'Application React de gestion de flotte',
  'API REST de facturation',
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Connexion de démonstration' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Louis Claes', exact: true }).click();
  await page.getByRole('link', { name: 'Offres', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Offres de stage' })).toBeVisible();

  const rows = page.getByRole('table').getByRole('row');
  await expect(rows).toHaveCount(offerTitles.length + 1);
  for (const title of offerTitles) {
    await expect(page.getByRole('row', { name: new RegExp(title) })).toHaveCount(1);
  }
  await expect(page.getByRole('row', { name: /Refonte du portail client/ })).toHaveCount(0);
});

test('Scénario 1 : recherche avec résultat, sans tenir compte de la casse', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Rechercher par titre' }).fill(
    'ASSISTANT CONVERSATIONNEL',
  );

  const rows = page.getByRole('table').getByRole('row');
  await expect(rows).toHaveCount(2);
  await expect(
    page.getByRole('row', { name: /Assistant conversationnel interne/ }),
  ).toContainText('Publiée');

  for (const title of [
    'Tableau de bord de qualité des données',
    'Application React de gestion de flotte',
    'API REST de facturation',
    'Refonte du portail client',
  ]) {
    await expect(page.getByRole('row', { name: new RegExp(title) })).toHaveCount(0);
  }
});

test('Scénario 2 : recherche sans résultat, affiche le message vide', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Rechercher par titre' }).fill(
    'ZZZ_OFFRE_INEXISTANTE_2026',
  );

  await expect(page.getByRole('table')).toHaveCount(0);
  await expect(
    page.getByText('Aucune offre ne correspond à la recherche.', { exact: true }),
  ).toBeVisible();
});
