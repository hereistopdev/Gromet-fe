import React from "react";
import Register from "./Register";
import Login from "./Login";
import baseStyle from "./Base.module.css";
import {Col, Row} from "antd";

const Auth = ({setAccount}) => {
    return (
        <>
            <div style={{paddingBottom: "125px"}}>
                <Row className={baseStyle.authBox}>
                    <Col xs={24} sm={12} className={baseStyle.borderBlue}>
                        <Login setAccount={setAccount} />
                    </Col>
                    <Col xs={24} sm={12}>
                        <Register setAccount={setAccount} />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Auth;