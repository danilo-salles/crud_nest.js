

import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto'

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepositor: UsuarioRepository) { }

    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {

        const usuarioEntity = new UsuarioEntity();

        usuarioEntity.email = dadosUsuario.email;
        usuarioEntity.senha = dadosUsuario.senha;
        usuarioEntity.nome = dadosUsuario.nome;
        usuarioEntity.id = uuid();

        this.usuarioRepositor.salvar(usuarioEntity);
        return {
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuario criado com sucesso'
        };
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepositor.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );

        return usuariosLista;
    }
    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepositor.atualiza(id, novosDados);
        

        return {
            usuario: usuarioAtualizado,
            message: 'Usuario atualizado com sucesso',
        }
    }
    @Delete('/:id')
    async removeUsuario(@Param('id') id: string){
        const usuarioRemovido = await this.usuarioRepositor.remove(id);

        return{
            usuario: usuarioRemovido,
            message: 'Usuario removido com sucesso'
        }
    }
    
}