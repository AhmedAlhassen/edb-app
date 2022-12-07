import { CreateSubjectDto } from './create-subject-dto';
import { SubjectService } from './subject.service';
import { Body, Controller, Param } from '@nestjs/common';
import {
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRoleDto } from '../role/update-role-dto';

@Controller('subject')
@ApiTags('Subject')
export class SubjectController {
  constructor(private readonly subService: SubjectService) {}

  @Post()
  async createSubject(@Body() data: CreateSubjectDto) {
    return await this.subService.createSubject(data);
  }

  @Get()
  findAll() {
    return this.subService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateRoleDto) {
    return this.subService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subService.remove(+id);
  }
}
