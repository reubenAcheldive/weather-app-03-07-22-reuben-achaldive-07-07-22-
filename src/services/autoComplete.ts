import { instance } from "./instance";
import { Cities } from "../interfaces/Cities.modal";
import { api_key } from "./api_reference";

export const fetchByAutoComplete = async (query:string) => {
  return await instance.get<Cities[]>(
    `/autocomplete?apikey=${api_key}&q=${query}`
  );
};
