import React, {useState} from "react";
import {FilterModel} from "../components/model/filterModel";

export const FilterContext = React.createContext(null);

export const FilterProvider = ({children}) => {
    const [filter, setFilter] = useState(new FilterModel());

    const updateFilter = (newFilter) => {
        setFilter(newFilter);
    }

    const value = {filter, updateFilter};
    return (<FilterContext.Provider value={value}>
        {children}
    </FilterContext.Provider>);
}