import { AuthService } from './auth.service';
import {
  Controller,

} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth('JWT')
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

}
