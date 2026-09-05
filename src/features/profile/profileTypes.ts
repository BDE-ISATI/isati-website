import type { UserWithRoles } from "@/shared/types/sharedTypes";

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

export type ProfileOutletContext = {
  user: UserWithRoles,
  isForeign: boolean
}

