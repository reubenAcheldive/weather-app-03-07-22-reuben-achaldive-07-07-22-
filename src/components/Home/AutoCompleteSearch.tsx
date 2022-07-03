import React, { FC } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AutoComplete } from '../../interfaces/AutoComplete.modal';
const AutoCompleteSearch:FC<{countries:AutoComplete[]}> = ({countries=[]}) => {
    return (
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.Country.LocalizedName}
          renderOption={(props, option) => (
           <span> {option?.Country.LocalizedName} ({option.Country.ID}) </span>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      );
}

export default AutoCompleteSearch