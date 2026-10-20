import { useState } from "react";
import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import OfferTable from "../components/OfferTable.tsx";
import { useOffers } from "../hooks/useOffers.ts";
import { PERIOD_CODES, type PeriodCode } from "../models/offer.ts";
import { PERIOD_LABELS } from "../utils/labels.ts";
import type { User } from "../models/user.ts";

interface OffersPageProps {
  user: User;
  token: string;
  onUnauthorized: () => void;
}

const DESCRIPTIONS = {
  ADMIN: "Toutes les offres, tous statuts confondus.",
  STUDENT: "Les offres publiées.",
  CONTACT: "Les offres que vous avez déposées.",
} as const;

const PERIOD_FILTER_LABELS: Record<PeriodCode, string> = {
  P1: "P1",
  P2: "P2",
  OTHER: "Autre",
};

const OffersPage = ({ user, token, onUnauthorized }: OffersPageProps) => {
  const [period, setPeriod] = useState<PeriodCode | undefined>(undefined);
  const { offers, isLoading, error } = useOffers(token, period, onUnauthorized);

  const renderContent = () => {
    if (error) return <ErrorState message={error} />;
    if (isLoading) return <LoadingState />;
    if (offers.length === 0) return <EmptyState message="Aucune offre à afficher." />;
    return (
      <>
        <p className="result-count">
          {offers.length} offre{offers.length > 1 ? "s" : ""}
        </p>
        <OfferTable offers={offers} />
      </>
    );
  };

  return (
    <section>
      <h1>Offres de stage</h1>
      <p>{DESCRIPTIONS[user.kind]}</p>
      <label htmlFor="period-filter">Période</label>
      <select
        id="period-filter"
        value={period ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          setPeriod(value === "" ? undefined : (value as PeriodCode));
        }}
      >
        <option value="">Toutes les périodes</option>
        {PERIOD_CODES.map((periodCode) => (
          <option key={periodCode} value={periodCode}>
            {PERIOD_FILTER_LABELS[periodCode] ?? PERIOD_LABELS[periodCode]}
          </option>
        ))}
      </select>
      {renderContent()}
    </section>
  );
};

export default OffersPage;
