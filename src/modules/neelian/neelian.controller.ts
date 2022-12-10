import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { QueryByUniNoDto } from './dto/query-dto';
import { NeelianService } from './neelian.service';
import { Student } from './type';

@Controller('neelian')
export class NeelianController {
  constructor(private readonly apiService: NeelianService) {}

  @Get(':uniNo')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 404, description: 'No Record Found' })
  // @ApiResponseType(Student ,true)
  async findByUniNo(@Param() params: QueryByUniNoDto) {
    const uniNo = params.uniNo;
    return await this.apiService.queryByUniNo(uniNo);
  }
}
