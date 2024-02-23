import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password.dto';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  private secret = '';

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.secret = configService.get<string>('OTP_SECRET');
  }

  async signUp(signUpDto: SignUpDto) {
    var userExists = false;
    var refferer = null;
    await this.usersService.findOneByEmail(signUpDto.email)
      .then((user) => {
        userExists = true;
      }).catch((err) => {
        userExists = false;
      });
    
    if (userExists) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.create({
      email: signUpDto.email,
      password: await this.hashPassword(signUpDto.password),
      name: `${signUpDto.firstName} ${signUpDto.lastName}`,
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      username: signUpDto.userName,
      address: signUpDto.address,
      city: signUpDto.city,
      state: signUpDto.state,
      country: signUpDto.country,
      profileImage: signUpDto.profileImage,
      coverImage: signUpDto.coverImage,
    }).then((_user) => {
      return { password: undefined, pin: undefined, ..._user };
    }).catch((err) => {
      throw new HttpException(
        err.message,
        HttpStatus.BAD_REQUEST,
      );
    });

    // todo generate and send otp

    return {
      user,
      message: `Account created successfully, please login to continue`,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { password, ...user } = await this.usersService.findOneByEmail(
      signInDto.email,
    ).catch((err) => {
      throw new HttpException(
        'Could not authenticate user with provided credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    });

    const validPassword = await this.comparePassword(
      signInDto.password,
      password,
    );
    if (!user || !validPassword) {
      throw new HttpException(
        'Could not authenticate user with provided credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const payload = { user: user, userId: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }


  //check for user with email
  async checkUserWithEmail(email: string) {
    return await this.usersService.findOneByEmail(email);
  }

  //check for user with username
  async checkUserWithUsername(username: string) {
    return await this.usersService.findOneByUsername(username);
  }


  async resetPassword(id: string, resetPasswordDto: ResetPasswordDto) {
    // get user
    const { password, ...user } = await this.usersService.findOne(id)
      .catch((err) => {
        throw new HttpException(
          'Account was not found',
          HttpStatus.NOT_FOUND,
        );
      });
    if (!user) {
      throw new HttpException('Account was not found', HttpStatus.NOT_FOUND);
    }
    if (resetPasswordDto.password !== resetPasswordDto.passwordConfirmation) {
      throw new HttpException(
        'Password and Password Confirmation does not match',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    
    // hotp.options = { digits: 4 };
    const hash = await this.hashPassword(
      resetPasswordDto.password,
    );
  
    // update the password
    const result = await this.usersService.update(user.id, {
      password: hash,
    });

 
    if (result) {
      return {
        message: 'Password reset successfully!',
      };
    }
    throw new HttpException(
      'Unable to reset your password ',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async hashPassword(password: string) {
    const result = await bcrypt.hash(password, 12);
    return result;
  }

  async comparePassword(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash);
    return result;
  }
}
