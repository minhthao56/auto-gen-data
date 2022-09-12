import { FormConfigGenerationFormProps } from "./../components/FormConfigGeneration ";
import { StudentCSVProps } from "../types/student";
import moment from "moment";
import { monotonicFactory } from "ulid";
import { json2csvAsync } from "json-2-csv";
import googleLibphonenumber from "google-libphonenumber";

export const convertJSONToCSV = async (data: StudentCSVProps[]) => {
  return await json2csvAsync(data);
};
export const randomNumber = (from: number, to: number): number => {
  return Math.floor(Math.random() * to) + from;
};

export const getId = () => {
  return new Date().getTime();
};

export function randomString(length: number = 10) {
  let result = "";
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(Math.random() * 62);
    const charCode = (rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48);
    result += String.fromCharCode(charCode);
  }
  return result;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function checkValidNumberPhone(
  parseValue: string,
  parseCountry: string
): boolean | undefined {
  const phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance();
  return phoneUtil.isValidNumberForRegion(
    phoneUtil.parse(parseValue, parseCountry),
    parseCountry
  );
}

export const getRandomNumber = () => {
  return new Date().getTime();
};

export const getRandomPhoneNumber = async () => {
  await delay(1);
  const listFirstNUmber = [1, 2, 3, 5, 6, 7, 8, 9];
  const firstNUmber = listFirstNUmber[randomNumber(0, 7)];

  if (firstNUmber === 2) {
    return `${firstNUmber}${getId().toString().slice(4)}`;
  }

  return `${firstNUmber}${getId().toString().slice(5)}`;
};

export const getRandomUserPhoneNumber = (
  comparePhoneNumber?: string
): string => {
  const phoneNumber: string = getRandomNumber().toString();

  if (phoneNumber === comparePhoneNumber) {
    return getRandomUserPhoneNumber(comparePhoneNumber);
  }

  return phoneNumber;
};

export const generationStudent = async ({
  hasPhoneticName,
  hasBirthday,
  hasLocations,
  hasNumberPhone,
  hasGender,
  hasHomeAddress,
  hasTags,
  location,
  tag,
  prefecture,
}: Omit<FormConfigGenerationFormProps, "numberRows">) => {
  const ulid = monotonicFactory();

  const id = getId();

  const lastName = `student-csv-${ulid(id)}`;
  const firstName = `${randomString()}@gmail.com`;
  const name = `${lastName} ${firstName}`;
  const email = `${lastName}.${firstName}`;
  const firstNamePhonetic = `first-${randomString()}`;
  const lastNamePhonetic = `last-${randomString()}`;
  const homeAddress = hasHomeAddress
    ? {
        postal_code: randomNumber(10000, 99999),
        prefecture,
        city: randomString(),
        street1: randomString(),
        street2: randomString(),
      }
    : {};
  const studentPhoneNumber = getRandomUserPhoneNumber();

  const phoneNumber = hasNumberPhone
    ? {
        student_phone_number: studentPhoneNumber,
        home_phone_number: getRandomUserPhoneNumber(studentPhoneNumber),
        contact_preference: 1,
      }
    : {};

  const date = new Date();
  date.setFullYear(date.getFullYear() - randomNumber(1, 60));
  date.setMonth(date.getMonth() - randomNumber(1, 12));
  date.setDate(date.getDate() - randomNumber(1, 28));

  const _student = hasPhoneticName
    ? {
        last_name: lastName,
        first_name: firstName,
        last_name_phonetic: lastNamePhonetic,
        first_name_phonetic: firstNamePhonetic,
      }
    : {
        name,
      };

  const student: StudentCSVProps = {
    ..._student,
    email,
    enrollment_status: randomNumber(1, 5),
    grade: randomNumber(0, 16),
    birthday: hasBirthday ? moment(date).format("YYYY/MM/DD") : "",
    gender: hasGender ? randomNumber(1, 2) : "",
    location: hasLocations ? location : "",
    tag: hasTags ? tag : "",
    ...homeAddress,
    ...phoneNumber,
  };

  return student;
};

export const generationListStudent = async ({
  numberRows,
  ...rest
}: FormConfigGenerationFormProps) => {
  const number = parseInt(numberRows);

  const students: StudentCSVProps[] = [];

  for (let i = 0; i < number; i++) {
    const student = await generationStudent(rest);
    students.push(student);
  }

  return students;
};
