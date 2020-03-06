import axios from 'axios';

import { Auction } from './../types/Auction';
import { hashPassword } from './../helpers/passwordHelper';

// TODO: introduce settings.json or similar and `SERVER` should be defined there and picked up from there

const SERVER = 'https://caronsale-backend-service-dev.herokuapp.com';

export default class DataProvider {
  private props: {
    accessToken: string,
    hashedPassword: string,
    server: string,
    userEmail: string,
  }

  public constructor(userEmail: string, plainPassword: string) {

    const server = SERVER;
    const hashedPassword = hashPassword(plainPassword);

    this.props = {
      accessToken: null,
      hashedPassword,
      userEmail,
      server
    };
  }

  get server(): string {
    return this.props.server;
  }

  get hashedPassword(): string {
    return this.props.hashedPassword;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get userEmail(): string {
    return this.props.userEmail;
  }

  // FIXME: tslint: `ERROR: 47:3  adjacent-overload-signatures  All 'accessToken' signatures should be adjacent` but why?
  /* tslint:disable */

  set accessToken(value: string) {
    this.props.accessToken = value;
  }

  /* tslint:enable */

  public login(): Promise<DataProvider> {
    const url = this.createUrl(`/api/v1/authentication/${ this.userEmail }`);;
    const data = { password: this.hashedPassword };

    return axios
      .put(url, data)
      .then(response => {
        this.accessToken = response.data.token;
        return this
    });
  }

  public fetchAuctions(): Promise<Auction[]> {
    const url = this.createUrl('/api/v2/auction/buyer/');
    const headers = { ...this.createAuthHeaders() };

    return axios
      .get(url, { headers })
      .then(response => response.data.items);
  }

  private createUrl(path: string): string {
    return this.server + path;
  }

  private createAuthHeaders(): { userid: string, authtoken: string } {
    return {
      userid: this.userEmail,
      authtoken: this.accessToken,
    }
  }
}
