import { AddressInfo } from "./AddressInfo";

export interface BreweryInfo {
    name: string;
    address: AddressInfo;
    lat: number;
    long: number;
}