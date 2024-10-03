export type PostType = {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  website: string;
};

export type PostFormType = {
  title: FormDataEntryValue | null;
  userId: FormDataEntryValue | null;
  body: FormDataEntryValue | null;
};
