import React from "react";
import { Layout, Menu, Typography, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;

const Promotions: React.FC = () => {
  return (
    <Content
      style={{
        margin: 0,
        minHeight: 280,
        backgroundColor: "#fff",
      }}
    >
      <div className="mainBox">
        <div>
          <ul className="navBox" style={{ justifyContent: "center" }}>
            <li className="serviceBox">
              <h3 style={{ color: " white", margin: 0 }}>Promocije/popusti</h3>
            </li>
          </ul>
        </div>
      </div>
      <Row>
        <Col span={24}>
          <img
            src="https://via.placeholder.com/300x400"
            alt="Promotion 1"
            style={{ width: "70%", marginBottom: "16px" }}
          />
        </Col>
        {/* <Col span={24}>
          <img
            src="https://via.placeholder.com/300x400"
            alt="Promotion 2"
            style={{ width: "70%", marginBottom: "16px" }}
          />
        </Col> */}
      </Row>
      <Button
        type="primary"
        icon={<span className="anticon anticon-file-pdf" />}
      >
        Preuzmi PDF
      </Button>
    </Content>
  );
};

export default Promotions;
