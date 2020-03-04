import 'mocha';
import { expect } from 'chai';

import CarOnSaleClient from './CarOnSaleClient';

describe('CarOnSaleClient', () => {
  describe('#getRunningAuctions()', () => {
    it('should return `undefined`', () => {
      const client = new CarOnSaleClient();
      expect(client.getRunningAuctions()).eq(undefined);
    });
  });
});
