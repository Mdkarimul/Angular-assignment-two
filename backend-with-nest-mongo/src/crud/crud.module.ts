import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Crud,crudSchema } from './crud.schema';

@Module({
  imports : [MongooseModule.forFeature([{name:Crud.name,schema:crudSchema}])],
  providers: [CrudService],
  controllers: [CrudController]
})
export class CrudModule {}
