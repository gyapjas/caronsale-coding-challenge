/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */

export { CarOnSaleClientQuery } from './CarOnSaleClientQuery';
export { CarOnSaleClientResponse } from './CarOnSaleClientResponse';

export interface ICarOnSaleClient {

  getRunningAuctions(query?: CarOnSaleClientQuery): Promise<CarOnSaleClientResponse>

}
