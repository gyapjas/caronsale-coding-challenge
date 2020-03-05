import 'mocha';
import { expect } from 'chai';
import nock from 'nock';

import DataProvider from './DataProvider';
import { hashPassword } from './../helpers/passwordHelper';

describe('DataProvider', () => {

  const user = {
    email: 'user@foo.bar',
    password: 'password',
  }

  beforeEach(() => {
    nock.cleanAll();
    nock.disableNetConnect();
  });

  describe('#constructor()', () => {
    it('should create `hashedPassword` property in created instance', () => {
      expect((new DataProvider(null, null)).hashedPassword).match(/.+/);
    });
  });

  describe('#login()', () => {
    it('should return a Promise', () => {
      const dataProvider = new DataProvider(null, null);

      nock(dataProvider.server).put(/.*/, /.*/).reply(200, {});

      expect(dataProvider.login()).be.a('promise');
    });

    context('succesfull', () => {
      it('should persist `access token` in DataProvider instance', () => {
        const dataProvider = new DataProvider(user.email, user.password);

        nock(dataProvider.server)
          .put(`/api/v1/authentication/${ user.email }`, { password: hashPassword(user.password) })
          .reply(201, {
            token: 'access-token',
          });

        return dataProvider
          .login()
          .then(() =>  {
            expect(dataProvider.accessToken).eq('access-token');
          });
      });
    });

    context('unsuccesfull', () => {
      it('should let bubble up the error', () => {
        const dataProvider = new DataProvider(user.email, user.password);

        nock(dataProvider.server)
          .put(`/api/v1/authentication/${ user.email }`, { password: hashPassword(user.password) })
          .reply(400, {});

        return dataProvider
          .login()
          .then(() =>  {
            throw 'Error has been catched in DataProvide#login()';
          })
          .catch(error => {
            if (typeof error == 'string') {
              throw error;
            }
            else {
              expect(dataProvider.accessToken).eq(null);
            }
          });
      });
    });
  });

  describe('#fetchAuctions()', () => {

    let dataProvider;
    let scope;

    beforeEach(() => {
      dataProvider = new DataProvider(user.email, user.password);

      const reqheaders = {
          userid: user.email,
          authtoken: /.*/,
        };

      scope = nock(dataProvider.server, { reqheaders })
        .get(`/api/v2/auction/buyer`);
    })

    it('should return a Promise', () => {
      scope.reply(200, {});
      expect(dataProvider.fetchAuctions()).be.a('promise');
    });

    context('succesfull', () => {
      it('should return user\'s auction(s)', () => {
        scope.replyWithFile(200, __dirname + '/spec-data/api-v2-auction-buyer.auctions.json');
        return dataProvider
          .fetchAuctions()
          .then( auctions =>  {

            // TODO: make it more elegant and precise

            expect(auctions).be.an('array');
            expect(auctions.length).eq(7);
          });
      });
    });

    context('unsuccesfull', () => {
      it('should let bubble up the error', () => {
        scope.reply(401, { items: [] });
        return dataProvider
          .fetchAuctions()
          .then(() =>  {
            throw 'Error has been catched in DataProvide#fetchAuctions()';
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
