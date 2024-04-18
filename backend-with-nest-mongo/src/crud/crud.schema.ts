import { Prop ,Schema ,SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Crud {
    @Prop({required:true})
    name:string
              
    @Prop({required:true,unique:true})
    username:string;

    @Prop({ required:true })
    mobile:string;

    

}

export const crudSchema = SchemaFactory.createForClass(Crud)

