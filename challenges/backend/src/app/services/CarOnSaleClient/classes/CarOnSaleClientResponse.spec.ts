import 'mocha';
import { expect } from 'chai';

import { Auction } from './../types/Auction';
import CarOnSaleClientResponse from './CarOnSaleClientResponse';

describe('CarOnSaleClientResponse', () => {

  const user = {
    email: 'user@foo.bar',
    password: '',
  }

  function createResponse(auctions?: Auction[]) {
    auctions = auctions || []
    return new CarOnSaleClientResponse(user, auctions);
  }


  describe('#constructor()', () => {
    describe('property `user`', () => {
      it('should be set to given argument (without password)', () => {
        const response = createResponse();
        expect(response.user).eql({ email: user.email });
      });
    });

    describe('property `auctions`', () => {
      context('empty array', () => {
        it('should be accepted', () => {
          const response = createResponse([]);
          expect(response.auctions).eql([]);
        });
      });

      context('non empty array', () => {
        it('should be set to given argument', () => {
          const response = createResponse([{ foo: 1 }, { bar: 2 }]);
          expect(response.auctions).eql([{ foo: 1, auctionProgress: 0 }, { bar: 2, auctionProgress: 0 }]);
        });
      });
    });

    describe('property `auctionsCount`', () => {
      context('empty array', () => {
        it('should be set to 0', () => {
          const response = createResponse([]);
          expect(response.auctionsCount).eq(0);
        });
      });

      context('non empty array', () => {
        it('should be set to `auctions.length`', () => {
          const response = createResponse([{ foo: 1 }, { bar: 2 }, { baz: 3 }]);
          expect(response.auctionsCount).eq(3);
        });
      });
    });

    describe('property `bidsAverage`', () => {
      context('empty array', () => {
        it('should be set to 0', () => {
          const response = createResponse([]);
          expect(response.bidsAverage).eq(0);
        });
      });

      context('non empty array', () => {
        it('should be set to `sum(numBids) / auctionsCount`', () => {
          const response = createResponse([{ numBids: 0 }, { numBids: 10 }, { numBids: 20 }]);
          expect(response.bidsAverage).eq(10);
        });
      });
    });

    describe('property `auctionProgress` injected in auction', () => {
      context('empty array', () => {
        // nothing to do :)
      });

      context('non empty array', () => {
        it('should be set in auction to `currentHighestBidValue / minimumRequiredAsk`', () => {
          const response = createResponse([{ currentHighestBidValue: 40, minimumRequiredAsk: 80 }, { currentHighestBidValue: 120, minimumRequiredAsk: 40 }]);
          const auctionProgresses = [0, 1].map(idx => response.auctions[idx].auctionProgress);
          expect(auctionProgresses).eql([0.5, 3]);
        });

        // maybe we will use rounding
        // it('should be set rounded to 6 decimal place', () => {
        //   const response = createResponse([{ currentHighestBidValue: 40, minimumRequiredAsk: 120 }]);
        //   expect(response.auctions[0].auctionProgress).eq(0.333333);
        // });

         it('should have max 16 decimal place', () => {
           const response = createResponse([{ currentHighestBidValue: 40, minimumRequiredAsk: 120 }]);
           expect(response.auctions[0].auctionProgress).eq(0.3333333333333333);
         });
      });

      context('when `minimumRequiredAsk` is 0', () => {
        it('should not abort, but set to 0', () => {
          const response = createResponse([{ currentHighestBidValue: 40, minimumRequiredAsk: 0 }]);
          expect(response.auctions[0].auctionProgress).eq(0);
        });
      });

      context('when `currentHighestBidValue` is 0', () => {
        it('should be set to 0', () => {
          const response = createResponse([{ currentHighestBidValue: 0, minimumRequiredAsk: 120 }]);
          expect(response.auctions[0].auctionProgress).eq(0);
        });
      });
    });
  });
});
