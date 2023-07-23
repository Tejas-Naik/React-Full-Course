import { createContext, useContext, useEffect, useReducer, useState } from "react";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ""
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true,
            }

        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }

        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }

        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            }

        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload)
            }

        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default: throw new Error("Unknown action type")

    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);


    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: 'loading' });
            try {
                const response = await fetch("http://localhost:8000/cities");
                const data = await response.json();
                dispatch({ type: 'cities/loaded', payload: data });
            } catch (err) {
                dispatch({ type: 'rejected', payload: 'There was an error loading data' })
            }
        }

        fetchCities();
    }, []);


    async function getCity(id) {
        console.log(+id === currentCity.id)
        dispatch({ type: 'loading' });
        try {
            const response = await fetch(`http://localhost:8000/cities/${id}`);
            const data = await response.json();
            dispatch({ type: "city/loaded", payload: data });
        } catch (err) {
            dispatch({ type: 'rejected', payload: 'There was an error loading city data' })
        }
    }

    async function createCity(newCity) {
        dispatch({ type: 'loading' });
        try {

            const response = await fetch(`http://localhost:8000/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log("DATA: ", data);
            dispatch({ type: 'city/created', payload: data });
        } catch (err) {
            dispatch({ type: 'rejected', payload: 'There was an error Creating city' })
        }
    }
    async function deleteCity(id) {
        dispatch({ type: 'loading' });
        try {
            await fetch(`http://localhost:8000/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: 'city/deleted', payload: id })
        } catch (err) {
            dispatch({ type: 'rejected', payload: 'There was an error deleting city' })
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity
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

