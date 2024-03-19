import { PartialType } from '@nestjs/swagger';
import { CreateWishlistlistDto } from './create-wishlistlist.dto';
import { IsArray, IsInt, IsString, IsUrl } from 'class-validator';

export class UpdateWishlistlistDto extends PartialType(CreateWishlistlistDto) {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  @IsInt({each: true})
  itemsId: number[];
}
