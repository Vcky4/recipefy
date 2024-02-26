import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PaginationDto } from './dto/pagination.dto';
import { formatPagination } from 'src/helpers';

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
    async findAll(search: string, pagination: PaginationDto) {
        return this.prismaService.recipe.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        ingredients: {
                            has: search,
                        }
                    },
                    {
                        instruction: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ],
            },
            skip: pagination.page * pagination.pageSize,
            take: parseInt(pagination.pageSize.toString()),
        }).then((data) => {
            return formatPagination(data, pagination);
        }).catch((error) => {
            throw new Error(`Error: ${error}`);
        })
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
