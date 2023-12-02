import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ProyectoService } from "../services/proyecto.service";
import { CreateProyectoDto } from "../dto/create-proyecto.dto";
import { UpdateProyectoDto } from "../dto/update-proyecto.dto";

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Get()
  async findAll() {
    try {
      const proyectos = await this.proyectoService.findAll();
      return {
        message: 'Proyectos encontrados exitosamente',
        proyectos,
      };
    } catch (error) {
      throw new HttpException('Error al buscar proyectos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    const proyecto = await this.proyectoService.findOneById(id);
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }
    return {
      message: 'Proyecto encontrado exitosamente',
      proyecto,
    };
  }

  @Post()
  async createProyecto(@Body() createProyectoDto: CreateProyectoDto) {
    try {
      const proyecto = await this.proyectoService.createProyecto(createProyectoDto);
      return {
        message: `Proyecto creado exitosamente: ${proyecto.nombre}`,
        proyecto,
      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error al crear el proyecto',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateProyecto(@Param('id') id: number, @Body() updateProyectoDto: UpdateProyectoDto) {
    const proyecto = await this.proyectoService.updateProyecto(id, updateProyectoDto);
    return {
      message: 'Proyecto actualizado exitosamente',
      proyecto,
    };
  }

  @Delete(':id')
  async deleteProyecto(@Param('id') id: number) {
    await this.proyectoService.deleteProyecto(id);
    return {
      message: 'Proyecto eliminado exitosamente',
    };
  }
}