import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { LoggerService } from 'src/logger/logger.service';
import { UsppPaymet } from './ussp';

@Injectable()
export class UsppService {
  constructor(
    private readonly http: HttpService,
    private readonly logger: LoggerService,
  ) {}

  async pay(payDta: UsppPaymet) {
    const { data } = await firstValueFrom(
      this.http.post('/uspp/biller/payment/transfer', payDta).pipe(
        catchError((error: AxiosError) => {
          console.log({ error });
          this.logger.error('UsppService', error.response.data as string);
          throw 'An error happened!';
        }),
      ),
    );
    this.logger.log('UsppService', data);
    return data;
  }
}
