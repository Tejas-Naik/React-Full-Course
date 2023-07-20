import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        setIsLoading(true);
        fetch("http://localhost:8000/cities")
            .then(res => res.json())
            .then(data => {
                setCities(data);
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CityContext was used outside of the CityProvider")
    return context;
}

export { CitiesProvider, useCities };

