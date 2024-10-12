// src/context/DataContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const DataContext = createContext();

// Create Provider Component
export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        employees: [
            { id: 1, name: "Ali", position: "Developer" },
            { id: 2, name: "Sara", position: "Designer" }
        ],
        candidates: [
            { id: 1, name: "Bilal", appliedFor: "Developer" },
            { id: 2, name: "Aisha", appliedFor: "Designer" }
        ],
        jobs: [
            { id: 1, title: "Software Engineer", description: "Develop and maintain software" },
            { id: 2, title: "Graphic Designer", description: "Create visual concepts" }
        ],
        
    });

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

// Custom Hook to use DataContext
export const useData = () => {
    return useContext(DataContext);
};
