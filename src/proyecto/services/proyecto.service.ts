import { Proyecto } from "../entities/proyecto.entity";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateProyectoDto } from "../dto/create-proyecto.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProyectoDto } from "../dto/update-proyecto.dto";
import { create } from "domain";
import { throwError } from "rxjs";

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

async function verificarIds(createProyectoDto: CreateProyectoDto) {

    if(createProyectoDto.EquiposId != null && createProyectoDto.EquiposId.length > 0 ){
      
      try{
        const response = await this.httpService
        .get('http://ruta-del-servicio-equipo/equipos-por-ids', { params: { ids: createProyectoDto.EquiposId } })
        .toPromise()
        .then(response => response.data as Proyecto[]);
      }
    
      catch(error){
        throw new HttpException('error al verificar ids de equipo', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
    else{
      await this.proyectoRepository.save(createProyectoDto)
    }

}
