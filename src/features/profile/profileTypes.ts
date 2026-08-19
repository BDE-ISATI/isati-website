export type UsernameFields = {
    newUsername: string,
}

export type PasswordFields = {
    oldPassword: string,
    password: string,
    passwordConfirm: string
}

export type DeleteAccountFields = {
    password: string,
}