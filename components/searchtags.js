'use client';
import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '@/style/layout.css';

export default function SearchTags() {
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      defaultValue={[top100Films[13]]}
      filterSelectedOptions
      className='searchtags'
      renderInput={(params) => (
        <TextField
          {...params}
          label="Find Hashtags..."
          placeholder=""
        />
      )}
    />
  );
}

const top100Films = [
  { title: 'Education', year: 1994 },
  { title: 'Freedom', year: 1994 },
  { title: 'SEC A', year: 1994 },
  { title: 'Justice', year: 1994 },
  { title: 'Gonz', year: 1994 },
  { title: 'Xavier', year: 1994 },
  { title: 'Iggys', year: 1994 },
];