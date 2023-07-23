import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

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

    async function getCity(id) {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8000/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8000/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log("DATA: ", data);
            setCities((cities) => [...cities, data]);

        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity
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

