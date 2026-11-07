import { useCallback, useEffect, useState } from "react";
import type { Application } from "../models/application.ts";
import { getApplications } from "../services/applications.service.ts";
import { isUnauthorized } from "../utils/api.ts";

export const useApplications = (token: string, onUnauthorized: () => void) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    getApplications(token)
      .then(setApplications)
      .catch((reason: unknown) => {
        if (isUnauthorized(reason)) onUnauthorized();
        else setError(reason instanceof Error ? reason.message : "Erreur inconnue");
      })
      .finally(() => setIsLoading(false));
  }, [token, onUnauthorized]);

  useEffect(reload, [reload]);

  return { applications, isLoading, error, reload };
};
