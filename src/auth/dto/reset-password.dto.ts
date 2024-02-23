import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    passwordConfirmation: string;

    @ApiProperty()
    @IsNotEmpty()
    deviceName: string;

    @ApiProperty()
    @IsNotEmpty()
    deviceToken: string;
    
    @ApiProperty()
    @IsNotEmpty()
    os: string;

}