import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request } from 'express';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';

@ApiBearerAuth('JWT')
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('sign-up')
  @ApiResponse({ type: CreateUserDto })
  signUp(@Req() req: Request, @Body() signUpDto: SignUpDto) {
    // signUpDto.gender = signUpDto.gender.toUpperCase() as Genders
    // if (signUpDto.gender !== "MALE" && signUpDto.gender != "FEMALE") {
    //   return 'Invalid Gender, should be male or female';
    // }
    signUpDto.profileImage = `${req.protocol}://${req.get('Host')}/media/avatar/default.png`;
    signUpDto.coverImage = `${req.protocol}://${req.get('Host')}/media/avatar/cover.png`;
    const result = this.authService.signUp(signUpDto);
    return result;
  }

  @Post('sign-in')
  @ApiResponse({ type: CreateUserDto })
  signIn(@Body() signInDto: SignInDto) {
    const result = this.authService.signIn(signInDto);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  @ApiResponse({ type: CreateUserDto })
  resetPassword(@Req() req, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(req.user.id, resetPasswordDto);
  }

  //check if user if email exists
  @Get('check-email/:email')
  @ApiResponse({ type: CreateUserDto })
  checkEmail(@Param('email') email: string) {
    return this.authService.checkUserWithEmail(email);
  }

  //check if user if username exists
  @Get('check-username/:username')
  @ApiResponse({ type: CreateUserDto })
  checkUsername(@Param('username') username: string) {
    return this.authService.checkUserWithUsername(username);
  }
}
