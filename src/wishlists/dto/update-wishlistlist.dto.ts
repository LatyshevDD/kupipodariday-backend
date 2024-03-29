import { PartialType } from '@nestjs/swagger';
import { CreateWishlistsDto } from './create-wishlists.dto';
import { IsArray, IsInt, IsString, IsUrl } from 'class-validator';

export class UpdateWishlistlistDto extends PartialType(CreateWishlistsDto) {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  @IsString({each: true})
  itemsId: string[];
}
