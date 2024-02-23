import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@ApiBearerAuth('JWT')
@Controller('recipe')
@ApiTags('recipe')
export class RecipeController {
    constructor(
        private recipeService: RecipeService,
    ) { }

    //create recipe
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ type: CreateRecipeDto })
    create(@Req() req, @Body() createRecipeDto: CreateRecipeDto) {
        createRecipeDto.userId = req.user.id;
        return this.recipeService.create(createRecipeDto);
    }

    //find all recipes
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ type: CreateRecipeDto, isArray: true })
    findAll() {
        return this.recipeService.findAll();
    }

    //find one recipe
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiResponse({ type: CreateRecipeDto })
    findOne(@Req() req, @Param('id') id: string) {
        return this.recipeService.findOne(id);
    }

    //update recipe
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiResponse({ type: CreateRecipeDto })
    update(@Req() req, @Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipeService.update(id, updateRecipeDto);
    }

    //delete recipe
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiResponse({ type: CreateRecipeDto })
    remove(@Req() req, @Param('id') id: string) {
        return this.recipeService.remove(id);
    }

}
