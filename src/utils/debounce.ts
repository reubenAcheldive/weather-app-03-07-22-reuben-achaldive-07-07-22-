export const debounceSearch = async (func: any, timeout = 300) => {
  setTimeout(() =>  func, timeout);
};
