import { ILedgerquantities } from "./ILedgerquantities"

export interface ILedger
{
  name: string, 
  year: number,
  ledgerquantities:ILedgerquantities[],
  readonly profit:number,
  readonly loss:number,
  readonly creditSum:number,
  readonly  debitSum:number,
  id:number

}

