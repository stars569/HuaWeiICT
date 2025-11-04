export type authInfo = {
    user: User | null,
    token: string | null,
    accept: boolean,
    login: (user: User, token: string) => void,
    logout: () => void
}

export type User = {
    username: string
}

export type registerForm = {
    username: string,
    password: string
}

export type basicResponse = {
    data: data
}

export type data = {
    message: string
}