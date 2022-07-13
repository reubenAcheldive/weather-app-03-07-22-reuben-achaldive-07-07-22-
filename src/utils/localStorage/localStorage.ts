import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";

export const setItemToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemForChangeThemeColor = (key: string) => {
  const value = localStorage.getItem(key);

  if (value !== null) {
    return JSON.parse(value);
  }
};

export const getTemporaryValue = (key: string) => {
  const value = localStorage.getItem(key);

  if (value !== null) {
    return JSON.parse(value);
  }
};
let x: ICurrentConditions[] = [];
export function saveAndUpdateFavorite(conditions: ICurrentConditions) {
  if (!localStorage.getItem("favorites")) {
    setItemToLocalStorage("favorites", [conditions]);
  }

  const getFromLocalStorage: ICurrentConditions[] = JSON.parse(
    localStorage.getItem("favorites")!
  );
  if (getFromLocalStorage) {
    const index = getFromLocalStorage.findIndex(
      (item) =>
        item.cityName?.toLocaleLowerCase() ===
        conditions.cityName?.toLocaleLowerCase()
    );
  
    if (index === -1) {
      x.push(conditions, ...getFromLocalStorage);
      setItemToLocalStorage('favorites',x)
      x = [];
    }
  }
}

// export const saveAndUpdateFavorit
