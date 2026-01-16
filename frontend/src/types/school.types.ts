export interface School {
  id: number;
  user_id: number;
  name: string;
  academic_year: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSchoolDTO {
  name: string;
  academic_year: number;
}
