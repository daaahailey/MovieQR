import React from "react";
import { useState } from "react";
import { SearchResult } from "./SearchResult";

export const SearchBox = () => {

    const [initialValue, setInitialValue] = useState("");
    const [value, setValue] = useState("");
    const [click, setClick] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setValue(initialValue);
        setClick(true);
        setInitialValue("");
    }
    // console.log(value);
    // console.log(initialValue);

    return (
        <div>
            <label htmlFor="search">Search Contents</label>
            <input type="search" id="search" value={initialValue} placeholder="Search contents"
                onChange={(event) => setInitialValue(event.target.value)} />
            <button type="submit" onClick={handleClick}>Search</button>
            {click && <SearchResult searchValue={value} isClicked={click} />}
        </div>
    )
}