export interface IUserLoginSuccesResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
