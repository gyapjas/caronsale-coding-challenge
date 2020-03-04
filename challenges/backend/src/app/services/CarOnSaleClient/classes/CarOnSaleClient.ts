// I like this way
// import { ICarOnSaleClient, CarOnSaleClientQuery, CarOnSaleClientResponse } from './../interface/ICarOnSaleClient';
// but more people like this
import {
  ICarOnSaleClient,
  CarOnSaleClientQuery,
  CarOnSaleClientResponse,
} from './../interface/ICarOnSaleClient';

export default class CarOnSaleClient implements ICarOnSaleClient {
  getRunningAuctions(query?: CarOnSaleClientQuery): Promise<CarOnSaleClientResponse> {
    return undefined;
  }
}
