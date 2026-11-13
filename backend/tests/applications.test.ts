import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { APPLICATION, OFFER, STUDENT } from "../src/db/seed/seedIds.ts";
import { createTestApp, tokenFor } from "./helpers/testApp.ts";

let app: ReturnType<typeof createTestApp>;

beforeEach(() => {
  app = createTestApp();
});

describe("candidatures étudiant", () => {
  it("liste uniquement les candidatures de l'étudiant connecté", async () => {
    const response = await request(app)
      .get("/applications")
      .set("Authorization", tokenFor("STUDENT", STUDENT.LUCAS_DUPONT));

    expect(response.status).toBe(200);
    expect(response.body.every((application: { offerId: number }) => application.offerId === OFFER.FLEET_APP)).toBe(true);
  });

  it("refuse de candidater à une offre non publiée", async () => {
    const response = await request(app)
      .post(`/applications/offers/${OFFER.CLIENT_PORTAL}`)
      .set("Authorization", tokenFor("STUDENT", STUDENT.LUCAS_DUPONT))
      .send();

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("OFFER_NOT_FOUND");
  });

  it("refuse une double candidature active", async () => {
    const response = await request(app)
      .post(`/applications/offers/${OFFER.FLEET_APP}`)
      .set("Authorization", tokenFor("STUDENT", STUDENT.LUCAS_DUPONT))
      .send({ message: "Nouvelle candidature" });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("APPLICATION_EXISTS");
  });

  it("permet de recandidater après un retrait", async () => {
    const withdrawn = await request(app)
      .delete("/applications/1")
      .set("Authorization", tokenFor("STUDENT", STUDENT.LUCAS_DUPONT));
    expect(withdrawn.status).toBe(204);

    const reapplied = await request(app)
      .post(`/applications/offers/${OFFER.FLEET_APP}`)
      .set("Authorization", tokenFor("STUDENT", STUDENT.LUCAS_DUPONT))
      .send({ message: "Je recandidate" });

    expect(reapplied.status).toBe(201);
    expect(reapplied.body.status).toBe("IN_PROGRESS");
    expect(reapplied.body.message).toBe("Je recandidate");
  });

  it("refuse le retrait d'une candidature déjà traitée", async () => {
    const response = await request(app)
      .delete(`/applications/${APPLICATION.MATEUSZ_CLOUD_MIGRATION}`)
      .set("Authorization", tokenFor("STUDENT", STUDENT.MATEUSZ_KOWALSKI));

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("APPLICATION_ALREADY_PROCESSED");
  });
});
