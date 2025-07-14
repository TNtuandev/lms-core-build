export type User = {
  id: string;
  email: string;
  name: string;
  type: UserType
};

export enum UserType {
  LEARNER = "learner",
  INSTRUCTOR = "instructor",
}