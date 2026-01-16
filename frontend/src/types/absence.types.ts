export interface Absence {
  id: number;
  student_id: number;
  date: string;
  justified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAbsenceDTO {
  date: string; // YYYY-MM-DD
  justified?: boolean;
}
