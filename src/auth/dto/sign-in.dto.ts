import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty ()
  password: string;

  @ApiProperty()
  @IsNotEmpty ()
  deviceName: string;

  @ApiProperty()
  @IsNotEmpty ()
  deviceToken: string;

  @ApiProperty()
  @IsNotEmpty ()
  os: string;

}
