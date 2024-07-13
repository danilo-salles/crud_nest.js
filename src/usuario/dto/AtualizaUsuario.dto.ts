import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";


export class AtualizaUsuarioDTO{

    @IsNotEmpty({message: "O nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsEmail(undefined, {message: "O email informado é invalido"})
    @EmailUnico({message: "O email só já está sendo utilizado"})
    @IsOptional()
    email: string;

    @MinLength(6, {message: "A senha precisa ter no minimo 6 caracteres"})
    @IsOptional()
    senha: string;
} 