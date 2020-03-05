import Auction from './../types/Auction';

export interface ICarOnSaleClientResponse {
  user: {
    email: string,
  },
  auctionsCount: number,
  bidsAverage: number,
  auctionProgress: number,
  auctions: Array<Auction>,

  public toJSON(): string
}
