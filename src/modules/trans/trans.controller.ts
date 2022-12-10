import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Biller } from 'src/entities/billers.entity';
import { BillerService } from '../biller/biller.service';
import { NeelianService } from '../neelian/neelian.service';
import { UsppService } from '../uspp/uspp.service';
import { UsppPaymet } from '../uspp/ussp';
import { TranDto } from './dto/tran-dto';
import { Transaction } from './tran.model';
import { TransService } from './trans.service';

@Controller('trans')
export class TransController {
  constructor(
    private readonly tansService: TransService,
    private readonly neelianSeevice: NeelianService,
    private readonly usspService: UsppService,
    private readonly billerService: BillerService,
  ) {}

  @Post()
  async payFees(@Body() payData: TranDto) {
    // return this.tansService.payFees(payData);
    const payParam = UsppPaymet.genrateParams(payData);
    console.log(payParam);
    const payDta = new UsppPaymet(
      payData.billerId,
      payData.channelId,
      payData.billerKey,
      payData.amount,
      payData.currency,
      payParam,
      payData.branch,
    );
    console.log(payDta);
    const usppData = await this.usspService.pay(payDta);

    if (
      usppData &&
      usppData?.status === 'Success' &&
      usppData?.code === 200 &&
      usppData?.message === 'Success'
    ) {
      const biller = await this.billerService.findByBillerId(usppData.billerId);
      const tranData = new Transaction(
        usppData.uuid,
        payData.universityno,
        usppData.voucher,
        usppData.amt,
        usppData.commission,
        usppData.paymentM,
        usppData.curr,
        usppData.status,
        usppData.branch,
        usppData.account,
        usppData.tellerTranRef,
        usppData.chequeDate,
        usppData.chequeCollectRef,
        usppData.chequeNo,
        biller,
      );

      const data = await this.tansService.payFees(tranData);

      if (data){
        const neelian = await this.neelianSeevice.payFess({
        universityno: payData.universityno,
        amount: payData.amount,
        currency: payData.currency,
        class_no: payData.class_no,
        voucher_no: data.voucher,
        branch:payData.branch,
        fib:22
      });



      if(neelian){
        return {
        uniNo:payData.universityno,
        amount: payData.amount,
        commission:data.commission,
        voucher: data.voucher,
        tranDate:data.createdate,
        classNo: payData.class_no,
        branch:payData.branch,
        }
      }
      }


  }

  @Get()
  async fethTrans() {}

  @Get(':voucherNo')
  async fetchByVoucher(@Param('voucherNo') voucherNo: string) {}
}
