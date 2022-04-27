export interface UserProps {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  region?: string;
  city?: string;
  isConsultant: boolean;
  middleName?: string;
  description?: string;
  company?: string;
  specialty?: string;
  ratingId?: string;
}
