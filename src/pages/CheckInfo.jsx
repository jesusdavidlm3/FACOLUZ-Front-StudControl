import React from "react";
import { Input } from "antd";

const CheckInfo = () => {
    return(
        <div className="CheckInfo">
            <h1 className="purple">Consultar informacion</h1>
            <Input.Search size="large" placeholder="Ingrese cedula a consultar"/>
        </div>
    )
}

export default CheckInfo;