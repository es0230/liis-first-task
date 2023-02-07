import { Hotel } from "./hotel";

export type AppData = {
    city: string,
    checkIn: string,
    duration: number,
    hotels: Hotel[],
};