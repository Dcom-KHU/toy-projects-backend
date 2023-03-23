export interface GetImagesDto {
  offset: number;
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

export interface GetImageDto {
  color: string;
  ratio: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}
