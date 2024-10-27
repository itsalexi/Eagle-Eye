'use client';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '@/style/layout.css';

export default function SearchTags({ selectedTags, onTagsChange }) {
    const handleTags = (event, newValue) => {
        onTagsChange(newValue);
    };

    return (
        <Autocomplete
            multiple
            id="tags-standard"
            options={tags}
            onChange={handleTags}
            value={selectedTags}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            className="searchtags"
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Find Hashtags..."
                    placeholder=""
                />
            )}
        />
    );
}

const tags = ['SEC A', 'Gonz', 'Xavier', 'Iggys', 'Blue Eagle Gym', 'MVP'];
