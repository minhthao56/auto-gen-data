export interface StudentCSVProps {
  name?: string;
  first_name?: string;
  last_name?: string;
  first_name_phonetic?: string;
  last_name_phonetic?: string;
  email: string;
  enrollment_status: number;
  grade: number;
  phone_number?: number | string;
  birthday?: string;
  gender?: number | string;
  location?: string;
  tag?: string;
  student_phone_number?: string;
  home_phone_number?: string;
  contact_preference?: number;
  postal_code?: number;
  prefecture?: string;
  city?: string;
  street1?: string;
  street2?: string;
}
