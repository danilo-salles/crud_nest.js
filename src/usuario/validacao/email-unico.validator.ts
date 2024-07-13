import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {

    constructor(private UsuarioRepository: UsuarioRepository) { }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioEmailExiste = await this.UsuarioRepository.existeComEmail(value)
        return !usuarioEmailExiste;
    }
}

export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: EmailUnicoValidator
        })
    }
}