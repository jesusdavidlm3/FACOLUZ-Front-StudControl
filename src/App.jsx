import React, { useContext } from "react";
import NavBar from "./components/NavBar";
import ContextProvider from "./context/ContextProvider";
import Router from './components/Router'
import { routerContext } from "./context/routerContext";

const App = () => {

    const {view} = useContext(routerContext)

    return(
        <ContextProvider>
            <div className="Root">
                { view != "Login" && <NavBar /> }
                <Router/>
            </div>
        </ContextProvider>
    )
}

export default App;