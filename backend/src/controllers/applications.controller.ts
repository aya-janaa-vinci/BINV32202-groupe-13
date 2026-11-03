import { Router } from "express";
import { toApplicationDto } from "../mappers/application.mapper.ts";
import { getCurrentUser } from "../middlewares/authenticate.ts";
import type { ApplicationsService } from "../services/applications.service.ts";
import { HttpError } from "../utils/httpError.ts";

const parseId = (value: string, name: string): number => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "INVALID_ID", `${name} invalide`);
  }
  return id;
};

export const createApplicationsRouter = (service: ApplicationsService) => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json(service.listMine(getCurrentUser(req)).map(toApplicationDto));
  });

  router.post("/offers/:offerId", (req, res) => {
    const message = req.body?.message;
    if (message !== undefined && message !== null && typeof message !== "string") {
      throw new HttpError(400, "INVALID_MESSAGE", "Le message doit être une chaîne de caractères");
    }
    const application = service.apply(
      getCurrentUser(req),
      parseId(req.params.offerId, "offerId"),
      message?.trim() || null,
    );
    res.status(201).json(toApplicationDto(application));
  });

  router.delete("/:applicationId", (req, res) => {
    service.withdraw(getCurrentUser(req), parseId(req.params.applicationId, "applicationId"));
    res.status(204).send();
  });

  return router;
};
