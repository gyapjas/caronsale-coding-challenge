import { ICarOnSaleClientResponse } from './../interface/ICarOnSaleClient';
import Auction from './../types/Auction';

export default class CarOnSaleClientResponse implements ICarOnSaleClientResponse {
  user: {
    email: string,
  };
  auctionsCount: number;
  bidsAverage: number;
  auctionProgress: number;
  auctions: Array<Auction>;

  constructor(user, auctions: Array<Auction>) {
    this.user = { email: user.email };
    this.auctionsCount = 0;
    this.bidsAverage = 0;
    this.auctionProgress = 0;
    this.auctions = auctions;
  }

  toJSON(): string {
    return this.toJSON();
  }
}
