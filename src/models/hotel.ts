export type Hotel = {
  location: {
    country: string,
    geo: {
      [key: string]: number
    },
    state: string | null,
    name: string,
  },
  priceAvg: number,
  pricePercentile: {
    [key: string]: number
  },
  hotelName: string,
  stars: number,
  locationId: number,
  hotelId: number,
  priceFrom: number
};
