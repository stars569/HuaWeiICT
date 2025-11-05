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

export type loginForm = {
    username: string,
    password: string
}

export type basicResponse = {
    data: basicData
}

export type basicData = {
    message: string
}

export type loginData = basicData & {
    token: string
}

export type loginResponse = {
    data: loginData
}