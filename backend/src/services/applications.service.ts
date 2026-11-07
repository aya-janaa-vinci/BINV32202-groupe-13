import { toApplication } from "../mappers/application.mapper.ts";
import type { Application } from "../models/application.ts";
import type { User } from "../models/user.ts";
import type { ApplicationsRepository } from "../repositories/applications.repository.ts";
import { HttpError } from "../utils/httpError.ts";
import { isStudent } from "./permissions.ts";

interface OfferApplicationRepository {
  isPublished(offerId: number): boolean;
}

export const createApplicationsService = (
  repository: ApplicationsRepository,
  offersRepository: OfferApplicationRepository,
) => {
  const requireStudent = (user: User) => {
    if (!isStudent(user)) {
      throw new HttpError(403, "FORBIDDEN", "Seuls les étudiants peuvent gérer leurs candidatures");
    }
  };

  return {
    listMine: (user: User): Application[] => {
      requireStudent(user);
      return repository.findByStudent(user.id).map(toApplication);
    },
    apply: (user: User, offerId: number, message: string | null): Application => {
      requireStudent(user);
      if (!offersRepository.isPublished(offerId)) {
        throw new HttpError(404, "OFFER_NOT_FOUND", "Cette offre n'est pas disponible");
      }
      if (repository.findActive(offerId, user.id)) {
        throw new HttpError(409, "APPLICATION_EXISTS", "Vous avez déjà candidaté à cette offre");
      }
      const id = repository.create(offerId, user.id, message);
      if (id === undefined) {
        throw new HttpError(500, "APPLICATION_CREATION_FAILED", "La candidature n'a pas pu être créée");
      }
      const application = repository.findById(id, user.id);
      if (!application) {
        throw new HttpError(500, "APPLICATION_CREATION_FAILED", "La candidature n'a pas pu être relue");
      }
      return toApplication(application);
    },
    withdraw: (user: User, applicationId: number): void => {
      requireStudent(user);
      const application = repository.findById(applicationId, user.id);
      if (!application) {
        throw new HttpError(404, "APPLICATION_NOT_FOUND", "Candidature introuvable");
      }
      if (application.status !== "IN_PROGRESS") {
        throw new HttpError(409, "APPLICATION_ALREADY_PROCESSED", "Cette candidature a déjà été traitée");
      }
      repository.withdraw(applicationId, user.id);
    },
  };
};

export type ApplicationsService = ReturnType<typeof createApplicationsService>;
