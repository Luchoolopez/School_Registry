import type { Grade } from "./grade.types";
import type { Absence } from "./absence.types";

export interface Student {
  id: number;
  school_id: number;
  first_name: string;
  last_name: string;
  createdAt?: string;
  updatedAt?: string;
  grades?: Grade[];
  absences?: Absence[];
}

export interface CreateStudentDTO {
  first_name: string;
  last_name: string;
}
