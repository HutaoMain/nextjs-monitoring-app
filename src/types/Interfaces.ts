export interface IJob {
  _id: string;
  email: string;
  jobName: string;
  companyName: string;
  jobDescription: string;
  askingSalary: number;
  status: string;
  createdAt: string;
}

export interface IUser {
  email: string;
  email_verified: boolean;
  name: string;
  pciture: string;
  given_name: string;
  family_name: string;
}
