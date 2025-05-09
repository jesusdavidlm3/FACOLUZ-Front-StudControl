import React, { useState, useContext } from "react";
import { routerContext } from '../context/routerContext'
import Asignature from '../pages/Asignature'
import CheckAsign from '../pages/CheckAsign'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Section from '../pages/Section'
import Sections from '../pages/Sections'
import ManageSemester from "../pages/ManageSemester";

const Router = () => {
    
    const {view} = useContext(routerContext)

    try{
        switch(view){
            case "Asignature": return <Asignature />
            case "CheckAsign": return <CheckAsign />
            case "Home": return <Home />
            case "Login": return <Login />
            case "Section": return <Section />
            case "Sections": return <Sections />
            case "ManageSemester": return <ManageSemester/>
            default: <ErrorPage />
        }
    }catch(err){
        return <ErrorPage />
    }

}

export default Router