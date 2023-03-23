import { GetImageDto, RGB } from '@1/app.interface';
import { PNG } from 'pngjs';

const getRGB = (color: string): RGB => {
  const res: RGB = {
    r: parseInt(color.substring(0, 2)),
    g: parseInt(color.substring(2, 4)),
    b: parseInt(color.substring(4, 6)),
  };
  return res;
};

export const genImage = (getImageDto: GetImageDto): PNG => {
  const width = 200 * getImageDto.ratio;
  const height = 200 * (1 / getImageDto.ratio);
  const { r, g, b } = getRGB(getImageDto.color);
  const image: PNG = new PNG({
    width: width,
    height: height,
  });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * 4;
      image.data[idx] = r; // R
      image.data[idx + 1] = g; // G
      image.data[idx + 2] = b; // B
      image.data[idx + 3] = 255; // A
    }
  }
  return image;
};
