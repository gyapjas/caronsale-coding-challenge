import axios from 'axios';

import Auction from './../types/Auction';
import { hashPassword } from './../helpers/passwordHelper';

// TODO: introduce settings.json or similar and `SERVER` should be defined there and picked up from there

const SERVER = 'https://caronsale-backend-service-dev.herokuapp.com';

export default class DataProvider {
  props: {
    accessToken: string,
    hashedPassword: string,
    server: string,
    userEmail: string,
  };

  constructor(userEmail: string, plainPassword: string) {

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

  set accessToken(value: string) {
    this.props.accessToken = value;
  }

  login(): Promise<any> {
    const url = this.createUrl(`/api/v1/authentication/${ this.props.userEmail }`);;
    const data = { password: this.props.hashedPassword };
    return axios
      .put(url, data)
      .then(response => this.accessToken = response.data.token);
  }

  fetchAuctions(): Promise<Array<Auction>> {
    const url = this.createUrl('/api/v2/auction/buyer');
    return axios
      .get(url)
      .then(response => response.data.items);
  }

  private createUrl(path: string): string {
    return this.server + path;
  }
}
