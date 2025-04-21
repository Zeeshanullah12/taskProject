export type createUserDto ={
    name: string,
    email: string,
    password: string,
    status: string
}

export type updateUserDto = {
    name?: string
    email?: string
    password?: string
    newPassword: string
  }