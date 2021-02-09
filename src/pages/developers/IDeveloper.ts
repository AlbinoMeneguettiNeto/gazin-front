type GenderType = "M" | "F";

export default interface IDevelopers {
  id?: number;
  name: string;
  age: number;
  hobby: string;
  gender: GenderType;
  birthday: string;
  created_at?: string;
  updated_at?: string;
}
