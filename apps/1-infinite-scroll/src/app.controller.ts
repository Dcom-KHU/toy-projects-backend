import {
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  GetImageDto,
  GetImagesDto,
  Image,
  ReturnImagesDto,
} from './app.interface';
import { PNG } from 'pngjs';
import { genImage } from './util/genImage';
import { getRandomColor, getRandomRatio } from './util/getRandomAttribute';

@Controller('images')
export class AppController {
  @Get()
  findAll(@Query() getImagesDto: GetImagesDto, @Req() req: Request) {
    let { offset, limit } = getImagesDto;
    if (!offset) {
      offset = 0;
    }
    if (!limit) {
      limit = 10;
    }

    if (limit > 200) {
      throw new NotFoundException('no data');
    }
    if (limit - offset > 10) {
      throw new NotAcceptableException('too many request');
    }

    const images: Image[] = [];

    for (let idx = offset; idx < limit; idx = idx + 1) {
      images.push({
        src: `${
          req.baseUrl
        }/images/${idx}?color=${getRandomColor()}&ratio=${getRandomRatio()}`,
      });
    }
    const res: ReturnImagesDto = {
      data: images,
      next: `${req.baseUrl}/images?offset=${offset + 10}&limit=${limit + 10}`,
      hasMore: limit <= 200,
      count: Math.min(limit - offset, 10),
    };
    console.log(res);
    return res;
  }

  @Get(':id')
  find(
    @Param() id: string,
    @Query() getImageDto: GetImageDto,
    @Res() res: Response,
  ) {
    const image = genImage(getImageDto);
    const buffer = PNG.sync.write(image);
    res.type('image/png');
    res.send(buffer);
  }
}
