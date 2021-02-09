type GenderType = "M" | "F";

export default interface IFormData {
  name: string;
  age: number;
  hobby: string;
  gender: GenderType;
  birthday: string;
}
