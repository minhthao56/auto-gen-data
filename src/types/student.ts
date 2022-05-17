export interface StudentCSVProps {
  name: string;
  email: string;
  enrollment_status: number;
  grade: number;
  phone_number?: number | string;
  birthday?: string;
  gender?: number | string;
  location?: string;
}
