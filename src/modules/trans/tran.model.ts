import { PaymentM } from 'src/modules/trans/dto/tran-dto';
import { Biller } from 'src/entities/billers.entity';

export enum Status {
  PEENDING = 'peending',
  FAILED = 'faild',
  PAYED = 'payed',
  COMPLETED = 'completed',
}

export class Transaction {
  private uuid: string;
  private billId: string;
  private voucher: string;
  private amt: number;
  private commission: number;
  private paymentM: PaymentM;
  private curr: string;
  private status: Status;
  private branch: string;
  private account?: string;
  private tellerTranRef?: string;
  private chequeDate: string;
  private chequeCollectRef?: string;
  private chequeNo?: string;
  private createdBy: string;
  private biller: Biller;

  constructor(
    uuid,
    billId,
    voucher,
    amt,
    commission,
    paymentM,
    curr,
    status,
    branch,
    account,
    tellerTranRef,
    chequeDate,
    chequeCollectRef,
    chequeNo,
    biller,
  ) {
    (this.uuid = uuid),
      (this.billId = billId),
      (this.voucher = voucher),
      (this.amt = amt);
    this.commission = commission;
    (this.paymentM = paymentM),
      (this.curr = curr),
      (this.status = status),
      (this.branch = branch),
      (this.account = account),
      (this.tellerTranRef = tellerTranRef),
      (this.chequeDate = chequeDate),
      (this.chequeCollectRef = chequeCollectRef),
      (this.chequeNo = chequeNo),
      (this.biller = biller);
  }
}
