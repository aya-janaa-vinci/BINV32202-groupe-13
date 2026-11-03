// Préfixe des appels au backend ; le proxy Vite le retire avant de transmettre.
export const API_URL = "/api";

/** Erreur d'un appel à l'API, avec le statut HTTP reçu. */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Vrai quand l'API signale une session absente, expirée ou invalide. */
export const isUnauthorized = (error: unknown): boolean =>
  error instanceof ApiError && error.status === 401;

const readErrorMessage = async (response: Response, fallback: string): Promise<string> => {
  try {
    const body: unknown = await response.json();
    if (
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "object" &&
      body.error !== null &&
      "message" in body.error &&
      typeof body.error.message === "string"
    ) {
      return body.error.message;
    }
  } catch {
    // Les réponses sans JSON utilisent le message de repli.
  }
  return fallback;
};

/**
 * Vérifie le statut de la réponse, puis valide son contenu JSON avec un type guard.
 * À n'utiliser que pour une réponse avec corps (pas après un 204 No Content).
 */
export const readJson = async <T>(
  response: Response,
  isExpected: (value: unknown) => value is T,
  failureMessage: string,
): Promise<T> => {
  if (!response.ok) {
    const fallback = `${failureMessage} (statut ${response.status})`;
    throw new ApiError(response.status, await readErrorMessage(response, fallback));
  }
  const data: unknown = await response.json();
  if (!isExpected(data)) {
    throw new Error("Réponse inattendue de l'API");
  }
  return data;
};
