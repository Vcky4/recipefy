import { ApiProperty } from '@nestjs/swagger';
import { Genders } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty({ required: false })
  country: string;

  @ApiProperty()
  email: string;

  password: string;

  @ApiProperty()
  profileImage?: string;

  @ApiProperty()
  coverImage?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  gender?: Genders;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  bio?: string;
  name: string;

  @ApiProperty()
  dateOfBirth?: Date;
  emailVerifiedAt?: Date;
  phoneNumberVerifiedAt?: Date;
}
