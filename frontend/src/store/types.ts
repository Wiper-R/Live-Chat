interface User{
    id: string;
    firstname: string;
    lastname: string;
    avatar: string;
    username: string;
    email: string;
}

interface Payload {
    [key: string]: any;
  }
  
  interface Action {
    type: string;
    payload?: Payload;
  }
  

export type {User};
export type {Action};