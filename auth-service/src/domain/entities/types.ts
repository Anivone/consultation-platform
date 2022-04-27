export type Location = {
  region: string;
  city: string;
}

export interface UserProps {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  location?: Location;
  isConsultant: boolean;
  middleName?: string;
  description?: string;
  company?: string;
  specialty?: string;
  ratingId?: string;
}

export interface CustomerProps
  extends Omit<
    UserProps,
    "description" | "company" | "specialty" | "ratingId"
  > {}

export interface ConsultantProps extends Omit<Required<UserProps>, 'id'> {
  id?: string;
}
