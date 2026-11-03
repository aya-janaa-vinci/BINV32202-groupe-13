-- Un étudiant ne peut avoir qu'une candidature active par offre.
-- Les candidatures retirées restent historisées et peuvent être recréées.
CREATE UNIQUE INDEX applications_one_active_per_offer_student
  ON applications (offer_id, student_id)
  WHERE status <> 'WITHDRAWN';
