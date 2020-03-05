import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import DataProvider from './DataProvider';
import CarOnSaleClient from './CarOnSaleClient';
import CarOnSaleClientResponse from './CarOnSaleClientResponse';


describe('CarOnSaleClient', () => {

  let stubs;
  let carOnSaleClient;

  function stubFetchAuctions(response) {
    stubs.push(sinon.stub(DataProvider.prototype, 'fetchAuctions').returns(Promise.resolve(response)));
  }

  function stubFetchAuctionsFails(response) {
    stubs.push(sinon.stub(DataProvider.prototype, 'fetchAuctions').returns(Promise.reject(response)));
  }

  beforeEach(() => {
    carOnSaleClient = new CarOnSaleClient();
    stubs = [];
    stubs.push(sinon.stub(DataProvider.prototype, 'login').returns(Promise.resolve()));
  });

  afterEach(() => {
    stubs.forEach(stub => stub.restore());
  });

  const user = {
    email: 'user@foo.bar',
    password: 'password',
  }


  describe('#getRunningAuctions()', () => {
    context('successfull', () => {
      it('should deliver user\'s auctions with some additional data', () => {
        stubFetchAuctions([]);

        return carOnSaleClient
          .getRunningAuctions()
          .then(response => {
            expect(response).to.be.instanceof(CarOnSaleClientResponse);
          });
      });
    });

    context('unsuccessfull', () => {
      it('should let bubble up the error', () => {
        stubFetchAuctionsFails(new Error('something went wrong'));

        return carOnSaleClient
          .getRunningAuctions()
          .then(() =>  {
            throw 'Error has been catched in CarOnSaleClient#getRunnningAuctions()';
          })
          .catch(error => {
            if (typeof error == 'string') {
              throw error;
            }
            else {
              // we got the error that was expected
              expect(true).eq(true);
            }
          });
      });
    });
  });
});
