import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipeService {
    constructor(private prismaService: PrismaService) { }

    //create recipe
}
