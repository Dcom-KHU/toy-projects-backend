import { IsNumber } from 'class-validator';

export class GetImagesDto {
  @IsNumber()
  offset: number;
  @IsNumber()
  limit: number;
}

export interface Image {
  src: string;
}

export interface ReturnImagesDto {
  data: Image[];
  hasMore: boolean;
  count: number;
  next: string;
}

export class GetImageDto {
  color: string;
  @IsNumber()
  ratio: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}
