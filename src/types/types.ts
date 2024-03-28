import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export interface FindWishOptions {
  select?: {
    name?: boolean;
    link?: boolean;
    image?: boolean;
    price?: boolean;
    description?: boolean;
    raised?: boolean;
    copied?: boolean;
  };
  relations: {
    offers?: boolean;
    owner?: boolean;
    wishlists?: boolean;
  }
}