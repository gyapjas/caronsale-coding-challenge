import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import "reflect-metadata";

import CarOnSaleClient from './services/CarOnSaleClient/classes/CarOnSaleClient';

@injectable()
export class AuctionMonitorApp {

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger) {
    }

    public async start(): Promise<any> {

        this.logger.log(`Auction Monitor started.`);

        // TODO: Retrieve auctions and display aggregated information (see README.md)

      const service = new CarOnSaleClient();

      return service
        .getRunningAuctions()
        .then(response => {
          this.logger.log(response.toJSON());
          process.exitCode = 0;
        })
        .catch(error => {
          this.logger.log(`AuctionMonitorApp.start(): ${error.message || error}`);
          process.exitCode = -1;
        });
    }

}
