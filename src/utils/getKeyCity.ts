import { CompleteCities } from "../interfaces/Cities.interface";

export function getKeyOfCity(cities: CompleteCities[] | null, val: string) {
  if (cities)
    return cities?.find(
      (c) => c.LocalizedName.toLocaleLowerCase() === val.toLocaleLowerCase()
    );
}
