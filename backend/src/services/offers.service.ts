import { toOffer } from "../mappers/offer.mapper.ts";
import type { Offer, PeriodCode } from "../models/offer.ts";
import type { User } from "../models/user.ts";
import type { OfferFilter, OffersRepository } from "../repositories/offers.repository.ts";
import { HttpError } from "../utils/httpError.ts";
import { hasContactRole, isAdmin, isStudent } from "./permissions.ts";

/**
 * Offres visibles selon le profil (CdC § 4) : toutes pour l'administrateur, les offres
 * publiées pour l'étudiant, les offres qu'il a déposées pour un déposant.
 */
const visibilityFilter = (viewer: User, period?: PeriodCode): OfferFilter => {
  const filter = isAdmin(viewer)
    ? {}
    : isStudent(viewer)
      ? { status: "PUBLISHED" as const }
      : hasContactRole(viewer, "DEPOSITOR")
        ? { depositorContactId: viewer.id }
        : (() => {
            throw new HttpError(403, "FORBIDDEN", "Vous n'avez pas accès aux offres");
          })();

  return period === undefined ? filter : { ...filter, period };
};

export const createOffersService = (repository: OffersRepository) => ({
  listOffers: (viewer: User, period?: PeriodCode): Offer[] =>
    repository.findAll(visibilityFilter(viewer, period)).map(toOffer),
});

export type OffersService = ReturnType<typeof createOffersService>;
