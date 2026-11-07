import { useState } from "react";
import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import StatusBadge from "../components/StatusBadge.tsx";
import { useApplications } from "../hooks/useApplications.ts";
import { withdrawApplication } from "../services/applications.service.ts";
import { isUnauthorized } from "../utils/api.ts";
import { PERIOD_LABELS } from "../utils/labels.ts";

interface ApplicationsPageProps {
  token: string;
  onUnauthorized: () => void;
}

const STATUS_LABELS = {
  IN_PROGRESS: "En cours",
  SELECTED: "Retenue",
  REJECTED: "Non retenue",
  WITHDRAWN: "Retirée",
} as const;

const ApplicationsPage = ({ token, onUnauthorized }: ApplicationsPageProps) => {
  const { applications, isLoading, error, reload } = useApplications(token, onUnauthorized);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleWithdraw = async (id: number) => {
    try {
      await withdrawApplication(token, id);
      setActionError(null);
      reload();
    } catch (reason) {
      if (isUnauthorized(reason)) onUnauthorized();
      else setActionError(reason instanceof Error ? reason.message : "Retrait impossible");
    }
  };

  if (error) return <ErrorState message={error} />;
  if (isLoading) return <LoadingState />;
  if (applications.length === 0) return <EmptyState message="Aucune candidature à afficher." />;

  return (
    <section>
      <h1>Mes candidatures</h1>
      {actionError && <ErrorState message={actionError} />}
      <div className="table-wrapper">
        <table className="data-table">
          <thead><tr><th>Offre</th><th>Entreprise</th><th>Année</th><th>Statut</th><th>Action</th></tr></thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.offerTitle}</td>
                <td>{application.companyShortName}</td>
                <td>{application.academicYear} — {PERIOD_LABELS[application.period]}</td>
                <td><StatusBadge label={STATUS_LABELS[application.status]} tone="neutral" /></td>
                <td>
                  {application.status === "IN_PROGRESS" && (
                    <button type="button" onClick={() => handleWithdraw(application.id)}>Retirer</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApplicationsPage;
