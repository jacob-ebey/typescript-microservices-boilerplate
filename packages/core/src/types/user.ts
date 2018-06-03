export interface UserModel {
  id: string | number
  username: string
  password: string
  email: string
  phone?: string
  salt: string
}
