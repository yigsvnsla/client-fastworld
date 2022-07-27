export interface SingInI{
    email:string,
    password:string
}

export interface SingUpI{
    dni:number
    name:string
    lastname:string
    phone:string
    mail:string
    password:string
}

export interface SingInResponseI{
    email:string,
    password:string
}

export interface SingUpResponseI{
    dni:number
    name:string
    lastname:string
    phone:string
    mail:string
    password:string
}
