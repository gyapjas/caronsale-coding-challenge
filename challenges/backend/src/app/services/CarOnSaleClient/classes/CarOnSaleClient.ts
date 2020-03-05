// I like this way
// import { ICarOnSaleClient, CarOnSaleClientQuery, CarOnSaleClientResponse } from './../interface/ICarOnSaleClient';
// but more people like this
import {
  ICarOnSaleClient,
  CarOnSaleClientQuery,
  ICarOnSaleClientResponse,
} from './../interface/ICarOnSaleClient';

import DataProvider from './DataProvider';
import CarOnSaleClientResponse from './CarOnSaleClientResponse';

export default class CarOnSaleClient implements ICarOnSaleClient {
  public getRunningAuctions(query?: CarOnSaleClientQuery): Promise<ICarOnSaleClientResponse> {

    // TODO: make it more robust
    // TODO: dont use password(s) hardcoded or whatever that goes to repo (hier ist enabled for challenge by company)

    const defaultUser =  {
      email: 'salesman@random.com',
      password: '123test',
    };
    const { user = defaultUser } = query || {};

    const dataProvider = new DataProvider(user.email, user.password);

    // TODO: fix this (i'd like this solution)
    // Property 'fetchAuctions' does not exist on type 'Promise<DataProvider>'
    // return dataProvider
    //   .login()
    //   .fetchAuctions()
    //   .then(auctions => new CarOnSaleClientResponse(user, auctions));

    // as workaround

    return dataProvider
      .login()
      .then(() => {
        return dataProvider.fetchAuctions()
          .then(auctions => new CarOnSaleClientResponse(user, auctions));
      });
  }
}
