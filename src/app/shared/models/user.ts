export interface User {
  id?:number
  username:string
  name: string
  email: string
  password: string
  token?: string
}

export interface UserAuth{
  email: string
  password: string
}
