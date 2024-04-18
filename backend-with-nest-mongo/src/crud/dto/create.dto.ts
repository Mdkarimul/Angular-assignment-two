import { IsEmail, IsNotEmpty, isPhoneNumber } from "class-validator";


export class createDto {
     
    @IsNotEmpty()
    name:string;
    @IsEmail()
    @IsNotEmpty()
    username:string;
    @IsNotEmpty()
    mobile:string; 
}