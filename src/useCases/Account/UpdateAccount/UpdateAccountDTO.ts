export interface UpdateAccountDTO {
  account: {
    email: string;
    username: string;
    avatar?: Blob;
    user_id: string;
  };
}
