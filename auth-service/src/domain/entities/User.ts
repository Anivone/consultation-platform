import { UserProps } from "./types";
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  Length,
  Matches,
  ValidateIf,
} from "class-validator";

export class User implements UserProps {
  id?: string;

  @IsEmail(undefined, {
    message: "Email is not valid",
  })
  email: string;

  @Length(4, 16, {
    message: "Password's length must be between 4 and 16 characters",
  })
  password: string;

  @IsNotEmpty({
    message: "First name must not be empty",
  })
  firstName: string;

  @IsNotEmpty({
    message: "Last name must not be empty",
  })
  lastName: string;

  @ValidateIf((o) => o.isConsultant)
  @IsNotEmpty({
    message: 'Phone number must be provided for Consultant'
  })
  @Matches(/^(?:\+38)?(0\d{9})$/, {
    message: "Phone number is not valid",
  })
  phoneNumber?: string;

  @ValidateIf((o) => o.isConsultant)
  @IsNotEmpty({
    message: "Region must be provided for Consultant",
  })
  region?: string;

  @ValidateIf((o) => o.isConsultant)
  @IsNotEmpty({
    message: "City must be provided for Consultant",
  })
  city?: string;
  isConsultant: boolean;
  middleName?: string;
  description?: string;

  @ValidateIf((o) => o.isConsultant)
  @IsNotEmpty({
    message: "Company name must be provided for Consultant",
  })
  company?: string;

  @ValidateIf((o) => o.isConsultant)
  @IsNotEmpty({
    message: "Specialty must be provided for Consultant",
  })
  specialty?: string;

  @ValidateIf((o) => o.isConsultant)
  @IsNotEmpty({
    message: "RatingId must be provided for Consultant",
  })
  ratingId?: string;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isConsultant: boolean = false,
    id?: string,
    phoneNumber?: string,
    region?: string,
    city?: string,
    middleName?: string,
    description?: string,
    company?: string,
    specialty?: string,
    ratingId?: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isConsultant = isConsultant;
    this.middleName = middleName;

    if (this.isConsultant) {
      if (!phoneNumber || !location || !company || !specialty || !ratingId) {
        throw new Error("Consultant specific properties must be required !");
      }
    }

    this.phoneNumber = phoneNumber;
    this.region = region;
    this.city = city;
    this.description = description;
    this.company = company;
    this.specialty = specialty;
    this.ratingId = ratingId;
  }

  static build({
    id,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    region,
    city,
    isConsultant,
    middleName,
    description,
    company,
    specialty,
    ratingId,
  }: UserProps) {
    return new User(
      email,
      password,
      firstName,
      lastName,
      isConsultant,
      id,
      phoneNumber,
      region,
      city,
      middleName,
      description,
      company,
      specialty,
      ratingId
    );
  }
}
