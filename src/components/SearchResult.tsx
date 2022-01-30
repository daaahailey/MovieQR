import React from "react";

export const SearchResult = ({ searchValue, isClicked }: any) => {
    return (
        isClicked && searchValue ? 
        <p>{searchValue}</p>
        : <p>default display (when search value is empty)</p>
    )
}