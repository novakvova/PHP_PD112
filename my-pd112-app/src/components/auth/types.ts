import {IUploadedFile} from "../../interfaces/forms";

export interface IRegisterForm {
    lastName: string,
    name: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string,
    image: IUploadedFile|null
}

export interface IRegister {
    lastName: string,
    name: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string,
    image: string | undefined
}

export interface ILogin {
    email: string,
    password: string,
}

export interface ILoginResult {
    token: string,
}

export interface IUser {
    name: string,
    email: string,
    image: string,
    lastName: string
}