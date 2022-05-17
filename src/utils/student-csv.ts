import { FormConfigGenerationFormProps } from "./../components/FormConfigGeneration ";
import { StudentCSVProps } from "../types/student";
import moment from "moment";
import { monotonicFactory } from "ulid";
import { json2csv, json2csvAsync } from "json-2-csv";
export const convertJSONToCSV = async (data: StudentCSVProps[]) => {
  return await json2csvAsync(data);
};
export const randomNumber = (from: number, to: number): number => {
  return Math.floor(Math.random() * to) + from;
};

export const getId = () => {
  return new Date().getTime();
};

export const getRandomPhoneNumber = () => {
  const listFirstNUmber = [1, 2, 3, 5, 6, 7, 8, 9];
  const firstNUmber = listFirstNUmber[randomNumber(0, 7)];

  if (firstNUmber === 2) {
    return `${firstNUmber}${getId().toString().slice(4)}`;
  }

  return `${firstNUmber}${getId().toString().slice(5)}`;
};

export const generationStudent = ({
  hasBirthday,
  hasLocations,
  hasNumberPhone,
  hasGender,
  location,
}: Omit<FormConfigGenerationFormProps, "numberRows">) => {
  const ulid = monotonicFactory();

  const id = getId();

  const user = `student-csv-${ulid(id)}`;

  const date = new Date();
  date.setFullYear(date.getFullYear() - randomNumber(1, 60));
  date.setMonth(date.getMonth() - randomNumber(1, 12));
  date.setDate(date.getDate() - randomNumber(1, 28));

  const student: StudentCSVProps = {
    name: `${user}`,
    email: `${user}@gmail.com`,
    enrollment_status: randomNumber(1, 5),
    grade: randomNumber(0, 16),
    phone_number: hasNumberPhone
      ? Math.floor(100000000 + Math.random() * 900000000)
      : "",
    birthday: hasBirthday ? moment(date).format("YYYY/MM/DD") : "",
    gender: hasGender ? randomNumber(1, 2) : "",
    location: hasLocations ? location : "",
  };

  return student;
};

export const generationListStudent = ({
  numberRows,
  ...rest
}: FormConfigGenerationFormProps) => {
  const number = parseInt(numberRows);

  const students: StudentCSVProps[] = [];

  for (let i = 0; i < number; i++) {
    const student = generationStudent(rest);
    students.push(student);
  }

  return students;
};
