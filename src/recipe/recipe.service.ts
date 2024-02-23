import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
    constructor(private prismaService: PrismaService) { }

    //create recipe
    async create(data: CreateRecipeDto) {
        return this.prismaService.recipe.create({
            data,
        });
    }

    //find all recipes
    async findAll() {
        return this.prismaService.recipe.findMany();
    }

    //find one recipe
    async findOne(id: string) {
        return this.prismaService.recipe.findUnique({
            where: { id },
        });
    }

    //update recipe
    async update(id: string, data: UpdateRecipeDto) {
        return this.prismaService.recipe.update({
            where: { id },
            data,
        });
    }

    //delete recipe
    async remove(id: string) {
        return this.prismaService.recipe.delete({
            where: { id },
        });
    }
}
