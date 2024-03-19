import { IsArray, IsInt, IsString, IsUrl } from 'class-validator';

export class CreateWishlistlistDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  @IsInt({each: true})
  itemsId: number[];
}
