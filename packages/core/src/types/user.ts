export interface UserProfile {
  id: string | number
  username: string
  email: string
  phone?: string
}

export interface UserModel extends UserProfile {
  password: string
  salt: string
}
