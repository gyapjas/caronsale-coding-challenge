/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */

export { CarOnSaleClientQuery } from './CarOnSaleClientQuery';
export { ICarOnSaleClientResponse } from './ICarOnSaleClientResponse';

export interface ICarOnSaleClient {

  getRunningAuctions(query?: CarOnSaleClientQuery): Promise<ICarOnSaleClientResponse>

}
