import type { Db } from "../db/database.ts";
import type { ApplicationDbo } from "../models/application.ts";

interface ApplicationParams {
  studentId: number;
  offerId: number;
  message: string | null;
}

const selectApplications = `
  SELECT a.id, a.offer_id, a.student_id, a.message, a.status, a.applied_at,
         o.title AS offer_title, c.short_name AS company_short_name,
         ay.label AS academic_year_label, p.code AS period_code
  FROM applications a
  JOIN offers o ON o.id = a.offer_id
  JOIN companies c ON c.id = o.company_id
  JOIN academic_years ay ON ay.id = o.academic_year_id
  JOIN periods p ON p.id = o.period_id
`;

export const createApplicationsRepository = (db: Db) => {
  const findByStudent = db.prepare<{ studentId: number }, ApplicationDbo>(
    `${selectApplications}
     WHERE a.student_id = @studentId
       AND ay.is_current = 1
     ORDER BY a.applied_at DESC`,
  );
  const findById = db.prepare<{ id: number; studentId: number }, ApplicationDbo>(
    `${selectApplications}
     WHERE a.id = @id AND a.student_id = @studentId`,
  );
  const findActive = db.prepare<{ offerId: number; studentId: number }, { id: number }>(
    `SELECT id FROM applications
     WHERE offer_id = @offerId AND student_id = @studentId AND status <> 'WITHDRAWN'
     LIMIT 1`,
  );
  const insert = db.prepare<ApplicationParams, { id: number }>(
    `INSERT INTO applications (offer_id, student_id, message)
     VALUES (@offerId, @studentId, @message)
     RETURNING id`,
  );
  const withdraw = db.prepare<{ id: number; studentId: number }, { changes: number }>(
    `UPDATE applications
     SET status = 'WITHDRAWN'
     WHERE id = @id AND student_id = @studentId AND status = 'IN_PROGRESS'`,
  );

  return {
    findByStudent: (studentId: number) => findByStudent.all({ studentId }),
    findById: (id: number, studentId: number) => findById.get({ id, studentId }),
    findActive: (offerId: number, studentId: number) => findActive.get({ offerId, studentId }),
    create: (offerId: number, studentId: number, message: string | null) =>
      insert.get({ offerId, studentId, message })?.id,
    withdraw: (id: number, studentId: number) => withdraw.run({ id, studentId }).changes,
  };
};

export type ApplicationsRepository = ReturnType<typeof createApplicationsRepository>;
