import { ICarOnSaleClientResponse } from './../interface/ICarOnSaleClient';
import { Auction } from './../types/Auction';

export default class CarOnSaleClientResponse implements ICarOnSaleClientResponse {
  public user: {
    email: string,
  };
  public auctionsCount: number;
  public bidsAverage: number;
  public auctionProgress: number;
  public auctions: Auction[];

  public constructor(user, auctions: Auction[]) {
    this.user = { email: user.email };
    this.auctionsCount = 0;
    this.bidsAverage = 0;
    this.auctions = auctions;

    this.init();
  }

  public toJSON(): string {
    return this.toJSON();
  }

  private init(): void {
    const aggregated = this.auctions.reduce( (hsh, auction) => {
      ++hsh.auctionsCount;
      hsh.sumNumBids = hsh.sumNumBids + (auction.numBids || 0);
      auction.auctionProgress = (auction.minimumRequiredAsk || 0) !== 0
        ? (auction.currentHighestBidValue || 0) / auction.minimumRequiredAsk
        : 0;
      return hsh
    }, {
      auctionsCount: 0,
      sumNumBids: 0,
    });

    this.auctionsCount = aggregated.auctionsCount;
    this.bidsAverage = this.auctionsCount > 0 ? aggregated.sumNumBids / this.auctionsCount : 0;
  }
}
