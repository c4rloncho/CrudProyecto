
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';


@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'nombre', type: 'varchar', length: 255 })
  nombre: string;

  @Column({ nullable: false, name: 'creador_id' }) // Nueva columna para almacenar el ID del creador
  creadorId: number;
  // Añadir columna 'descripcion'
  @Column({ nullable: true, type: 'text' })
  descripcion: string;

  // Añadir columna 'fechaCreacion' que registra automáticamente la fecha de creación
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  
  @Column({ array: true, nullable: true })
  EquiposIds: number[] 

  @Column({array:true, nullable:true})
  Tareas: number[]
}
