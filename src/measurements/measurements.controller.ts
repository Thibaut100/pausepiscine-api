import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('measurements')
@UseGuards(AuthGuard('jwt'))
export class MeasurementsController {
    constructor(private readonly measurementsService: MeasurementsService) { }

    @Post()
    create(@Request() req: any, @Body() createMeasurementDto: any) {
        return this.measurementsService.create(req.user.userId, createMeasurementDto);
    }

    @Get()
    findAll(@Request() req: any, @Query('poolId') poolId?: string) {
        return this.measurementsService.findAll(req.user.userId, poolId);
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        return this.measurementsService.findOne(id, req.user.userId);
    }
}
