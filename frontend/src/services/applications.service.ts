import type { Application } from "../models/application.ts";
import { API_URL, ApiError, readJson } from "../utils/api.ts";
import { isApplication, isApplicationList } from "../utils/guards.ts";

export const getApplications = async (token: string, signal?: AbortSignal): Promise<Application[]> => {
  const response = await fetch(`${API_URL}/applications`, {
    headers: { Authorization: token },
    signal,
  });
  return readJson(response, isApplicationList, "Chargement des candidatures impossible");
};

export const applyToOffer = async (
  token: string,
  offerId: number,
  message: string,
): Promise<Application> => {
  const response = await fetch(`${API_URL}/applications/offers/${offerId}`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return readJson(response, isApplication, "Candidature impossible");
};

export const withdrawApplication = async (token: string, applicationId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/applications/${applicationId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "object" &&
      body.error !== null &&
      "message" in body.error &&
      typeof body.error.message === "string"
        ? body.error.message
        : `Retrait impossible (statut ${response.status})`;
    throw new ApiError(response.status, message);
  }
};
