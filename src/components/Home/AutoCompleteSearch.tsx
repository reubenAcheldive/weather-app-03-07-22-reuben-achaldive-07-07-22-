import React, { Dispatch,  SetStateAction,  } from 'react'

import { Cities } from '../../interfaces/Cities.modal';
export interface IAutoCompleteSearch {
  cities: Cities[], query: string, setQuery: Dispatch<SetStateAction<string>>
}


const AutoCompleteSearch = ({ cities, query, setQuery }: IAutoCompleteSearch) => {



  return (
    <div>

      <input onChange={(e) => setQuery(e.target.value)} value={query} type="text" list="cities" className='search' />
      <div>
        <datalist id={"cities"}>
          {cities.map((city: Cities, i) =>
            <option key={city.Key} value={city.Country.ID} >{city.Country.LocalizedName}</option>
          )}
        </datalist>
      </div>


    </div>
  );
}

export default AutoCompleteSearch