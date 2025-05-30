export type CreateAccountDTO = {
  account: {
    user_id: string;
    username: string;
    email: string;
    favorite_genres: string[];
    avatar?: Blob;
  };
};
