import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { LoggerService } from 'src/logger/logger.service';
import { payDto } from './dto/pay-dto';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';

@Injectable()
export class NeelianService {
  constructor(
    private readonly http: HttpService,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {}
  async queryByUniNo(uniNo: string) {
    const { data } = await firstValueFrom(
      this.http.get(`/neelain/${uniNo}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error('NeelianService', error.response.data as string);
          throw this.exceptionService.internalServerErrorException({
            message: 'NEElIAN SERVICE DOWN',
          });
        }),
      ),
    );
    this.logger.log('NeelianService', data);
    return data;
  }

  async payFess(payData: payDto) {
    const { data } = await firstValueFrom(
      this.http.post('/neelain', payData).pipe(
        catchError((error: AxiosError) => {
          this.logger.error('NeelianService', error.response.data as string);
          throw 'An error happened!';
        }),
      ),
    );
    this.logger.log('NeelianService', data);
    return data;
  }
}
