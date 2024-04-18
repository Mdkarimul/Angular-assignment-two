import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { createDto } from './dto/create.dto';
import { CrudService } from './crud.service';
import { Crud } from './crud.schema';
import mongoose from 'mongoose';

@Controller('crud')
export class CrudController {
    constructor(private crudService:CrudService) {
    }

    @Get()
  async  getData():Promise<Crud[]>{
    const data = await this.crudService.getAllData();
    if(!data.length){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
      error: 'Data not found !'
      },HttpStatus.NOT_FOUND);
    }
    return data;
    }

    @Post()
    createData(@Body() data:createDto):Promise<Crud>{
     return this.crudService.storeDate(data);
    }

    @Put('/:id')
   async updateData(@Param("id") id :string,
    @Body() Data:Crud
    ) {
      try{
        return await this.crudService.updateData(id,Data);
      }catch(error){
        throw new HttpException("Update failed !",HttpStatus.EXPECTATION_FAILED);
      }
    }

    @Delete(":id")
    async deleteData(@Param('id') id:string){
         const isvalid = mongoose.Types.ObjectId.isValid(id);
         if(!isvalid){
            throw new HttpException('invalid id',404);
         }
         const deletedUser = await this.crudService.delete(id);
         if(!deletedUser){
             return new HttpException("User not found",404);
         }
       return deletedUser;
     }
}
