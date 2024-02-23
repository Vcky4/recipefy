import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    ingredients: string[];

    @ApiProperty()
    instruction: string;

    @ApiProperty()
    diet: string[];

    @ApiProperty({ required: false })
    video: string;

    @ApiProperty()
    images: string[];

    @ApiProperty()
    userId: string;

    @ApiProperty()
    origin: string;

}
