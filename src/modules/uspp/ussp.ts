import { TranDto } from './../trans/dto/tran-dto';
import { v4 as uuidv4 } from 'uuid';
import * as date from 'date-and-time';

export class UsppPaymet {
  private billerId: string;
  private uuid: string;
  private channelId: number;
  private billerKey: string;
  private amount: number;
  private parameters: Parmas;
  private transDateTime: string;
  private branchCode: string;
  private currency: string;

  constructor(
    billerId: string,
    channelId: number,
    billerKey: string,
    amount: number,
    currency: string,
    parameters: Parmas,
    branchCode: string,
  ) {
    this.billerId = billerId;
    (this.uuid = uuidv4()), (this.channelId = channelId);
    this.billerKey = billerKey;
    this.amount = amount;
    this.transDateTime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    this.branchCode = branchCode;
    this.parameters = parameters;
    this.currency = currency;
    this.branchCode = branchCode;
  }

  public static genrateParams(payM: TranDto): Parmas | null {
    if (payM.paymentMethod === 20) {
      return { account: payM.account };
    } else if (payM.paymentMethod === 10) {
      return { tellerTransRef: payM.tellerTranRef };
    } else if (payM.paymentMethod === 30) {
      return {
        chequeDate: payM.chequeDate,
        chequeCollectRef: payM.chequeCollectRef,
        chequeNo: payM.chequeNo,
      };
    } else return null;
  }
}

export interface ChequeParam {
  chequeDate: string;
  chequeCollectRef: string;
  chequeNo: string;
}
export interface TransferParam {
  account: string;
}

export interface CashParam {
  tellerTransRef: string;
}
export type Parmas = ChequeParam | TransferParam | CashParam;
