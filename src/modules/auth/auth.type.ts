export type ILoginPayload = {
  email: string;
  password: string;
};

export type IRegisterPayload = {
  first_name: string;
  last_name: string;
  role: 'user' | 'admin' | 'agency';
  email: string;
  contact_no: string;
  about_user: string;
  profile_img: string;
  password: string;
};
