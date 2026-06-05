import type { RawMerchant } from './merchant';

export interface PublicApiResponse<T> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: T[];
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export type MerchantsApiResponse = PublicApiResponse<RawMerchant>;

export type MerchantsRouteResponse =
  { mode: 'merchants'; items: RawMerchant[]; totalCount: number; pageNo: number; numOfRows: number };

export interface WeatherApiResponse {
  weather: Array<{ description: string; icon: string }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  name: string;
}
