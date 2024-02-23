import { PrismaService } from './../prisma/prisma.service';
import { User as UserModel } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }
  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async createOrUpdate(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = await this.findOneByEmail(createUserDto.email);
    if (!user) {
      return this.prismaService.user.create({
        data: createUserDto,
      });
    }
    // update the user
    // remove the password field
    const { password, ...data } = createUserDto;
    if (
      typeof data.name === 'object' &&
      !Array.isArray(data.name) &&
      data.name !== null
    ) {
      data.name = data['name']['givenName'];
    }

    return this.prismaService.user.update({
      where: { id: user.id },
      data: data,
    });
  }

  findAll(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<UserModel> {
    try {
      return await this.prismaService.user.findUniqueOrThrow({
        where: { id },
      })
    } catch (err) {
      throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND);
    }
  }
  async findOneByEmail(email: string): Promise<UserModel> {
    try {
      return await this.prismaService.user.findUniqueOrThrow({
        where: { email },
      })
    } catch (err) {
      throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND);
    }
  }


  //check for user with username
  async findOneByUsername(username: string): Promise<UserModel> {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: { username },
      })
    } catch (err) {
      throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND);
    }
  }


  update(id: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    })
  }


  remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }


  makeString(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
