import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDTO,
  ) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido,
    );
    return pedidoCriado;
  }
  @Get()
  async listaPedido(@Query('usuarioId') usuarioId: string) {
    const pedidoUsuario = await this.pedidoService.buscaPedidoUsuario(
      usuarioId,
    );
    return pedidoUsuario;
  }

  @Patch(':id')
  async atualizaPedido(
    @Param(':id') pedidoId: string,
    @Body() dadosAtualizacao: AtualizaPedidoDTO,
  ) {
    const atualizaPedido = await this.pedidoService.atualizaPedido(
      pedidoId,
      dadosAtualizacao,
    );
    return atualizaPedido;
  }
}
