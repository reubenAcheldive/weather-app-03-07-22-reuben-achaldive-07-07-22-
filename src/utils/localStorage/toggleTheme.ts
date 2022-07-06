export const setItemToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
  return;
};

export const getItemForChangeThemeColor = (key: string) => {
  const value = localStorage.getItem(key);
  if (value !== null) {
    console.log(JSON.parse(value));
    return JSON.parse(value);
  }
};
// "locations"