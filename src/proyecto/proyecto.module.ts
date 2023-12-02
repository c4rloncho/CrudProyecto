import { Module } from '@nestjs/common';
import { ProyectoService } from './services/proyecto.service';
import { ProyectoController } from './controllers/proyecto.controller';

@Module({
  controllers: [ProyectoController],
  providers: [ProyectoService],
})
export class ProyectoModule {}
