import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PoolsService } from './pools.service';

@Controller('pools')
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  // GET /pools
  @Get()
  findAll() {
    return this.poolsService.findAll();
  }

  // GET /pools/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poolsService.findOne(id);
  }

  // POST /pools
  @Post()
  create(@Body() body: any) {
    return this.poolsService.create(body);
  }

  // PATCH /pools/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.poolsService.update(id, body);
  }

  // DELETE /pools/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.poolsService.remove(id);
    return { success: true };
  }
}

