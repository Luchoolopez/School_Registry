export interface Grade {
  id: number;
  student_id: number;
  concept: string;
  value: number;
  date: string;
}

export interface CreateGradeDTO {
  concept: string;
  value: number;
  date: string; // YYYY-MM-DD
}
