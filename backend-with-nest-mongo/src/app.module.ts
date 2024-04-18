import { Module } from '@nestjs/common';
import { CrudModule } from './crud/crud.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${encodeURIComponent("Md7861942")}:${encodeURIComponent("Md7861942@k")}@crud.xpqm72v.mongodb.net/crud?retryWrites=true&w=majority`,{
    }),
    CrudModule,
     UserModule
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
