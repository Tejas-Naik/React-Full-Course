import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import { Suspense, lazy } from "react";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from './components/CountryList';
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import AppLayout from "./pages/AppLayout";
// import HomePage from "./pages/Homepage";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";

const HomePage = lazy(()=>import("./pages/Homepage"));
const AppLayout = lazy(()=>import("./pages/AppLayout"));
const Login = lazy(()=>import("./pages/Login"));
const NotFound = lazy(()=>import("./pages/NotFound"));
const Pricing = lazy(()=>import("./pages/Pricing"));
const Product = lazy(()=>import("./pages/Product"));

// dist/assets/index-684e7e48.css   30.16 kB │ gzip:   5.07 kB
// dist/assets/index-9c32df1e.js   525.39 kB │ gzip: 148.86 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
              <Route index element={<Navigate replace to='cities' />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App;
