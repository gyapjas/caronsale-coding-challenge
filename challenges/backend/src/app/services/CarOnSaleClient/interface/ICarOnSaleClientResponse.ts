import { Auction } from './../types/Auction';

export interface ICarOnSaleClientResponse {
  user: {
    email: string,
  },
  auctionsCount: number,
  bidsAverage: number,
  auctions: Auction[],

  public toJSON(): string
}
