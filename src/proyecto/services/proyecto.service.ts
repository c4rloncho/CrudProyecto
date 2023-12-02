import { Proyecto } from "../entities/proyecto.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateProyectoDto } from "../dto/create-proyecto.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProyectoDto } from "../dto/update-proyecto.dto";
import { create } from "domain";

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
  ) {}

  async findAll(): Promise<Proyecto[]> {
    return this.proyectoRepository.find();
  }

  async createProyecto(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    verificarIds(createProyectoDto);
    const nuevoProyecto = this.proyectoRepository.create(createProyectoDto);
    return await this.proyectoRepository.save(nuevoProyecto);
  }

  async findOneById(id: number): Promise<Proyecto> {
    return this.proyectoRepository.findOne({ where: { id } });
  }

  async updateProyecto(id: number, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    if (updateProyectoDto.nombre) {
      proyecto.nombre = updateProyectoDto.nombre;
    }

    if (updateProyectoDto.descripcion) {
      proyecto.descripcion = updateProyectoDto.descripcion;
    }

    return this.proyectoRepository.save(proyecto);
  }

  async deleteProyecto(id: number): Promise<void> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    await this.proyectoRepository.remove(proyecto);
  }
}

function verificarIds(createProyectoDto: CreateProyectoDto) {
 
}
