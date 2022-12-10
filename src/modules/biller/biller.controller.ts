import { UpdateBillerDto } from 'src/modules/biller/dto/update-biller-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BillerService } from './biller.service';
import { CreateBillerDto } from './dto/create-biller-dto';

@Controller('biller')
@ApiTags('Biller')
export class BillerController {
  constructor(private readonly billerService: BillerService) {}

  @Post()
  async createSubject(@Body() data: CreateBillerDto) {
    return await this.billerService.createSubject(data);
  }

  @Get()
  findAll() {
    return this.billerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateBillerDto) {
    return this.billerService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billerService.remove(+id);
  }
}
