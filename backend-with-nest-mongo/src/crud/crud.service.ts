import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Crud,crudSchema } from './crud.schema';
import { from } from 'rxjs';
import { Model } from 'mongoose';
import { createDto } from './dto/create.dto';
@Injectable()
export class CrudService {

    constructor(@InjectModel(Crud.name) private crudModel:Model<Crud>){
  
    }

    getAllData(){
     return this.crudModel.find();
    }

    updateData(id:string,Data:Crud) {
     return this.crudModel.findByIdAndUpdate(id,Data,{new:true});
    }

    storeDate(Data:createDto):Promise<Crud>{
      try {
        const store = new this.crudModel(Data);
        return store.save();
      }catch(error){
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'Failed to create record !',
        }, HttpStatus.FORBIDDEN, {
          cause: error
        });
      }
    }

    delete(id:string){
      return this.crudModel.findByIdAndDelete(id);
    }


}
