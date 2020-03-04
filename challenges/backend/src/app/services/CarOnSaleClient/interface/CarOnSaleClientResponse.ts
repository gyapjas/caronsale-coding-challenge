import IAction from './../types/Auction';

export type CarOnSaleClientResponse = {
  user: {
    email: string,
  },
  auctionsCount: number,
  bidsAverage: number,
  auctionProgress: number,
  auctions: Array<Action>,
}
