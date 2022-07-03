import { instance } from "./instance";
import { AutoComplete } from "../interfaces/AutoComplete.modal";
import { api_key } from "./api_reference";

export const fetchByAutoComplete = async (query: string='i') => {
  return await instance.get<AutoComplete[]>(
    `/autocomplete?apikey=${api_key}&q=${query}`
  );
};
