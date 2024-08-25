import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Table,
  Button,
  Modal,
  Descriptions,
  Timeline,
} from "antd";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;

interface Order {
  key: string;
  date: string;
  invoiceNumber: string;
  status: string;
  orderNumber: string;
  value: string;
  orderName: string;
  details: {
    deliveryDate: string;
    supplier: string;
    address: string;
    statusHistory: { status: string; date: string }[];
  };
}

const Orders: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const showModal = (order: Order) => {
    setCurrentOrder(order);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "Datum kreiranja porudžbine",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Broj računa",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ color: status === "ISPORUČENO" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Broj porudžbine",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Vrednost",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Naziv porudžbine",
      dataIndex: "orderName",
      key: "orderName",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: Order) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Ponovi porudžbinu
        </Button>
      ),
    },
  ];

  const data: Order[] = [
    {
      key: "1",
      date: "21.09.2023.",
      invoiceNumber: "RF1820/23",
      status: "U OBRADI",
      orderNumber: "/",
      value: "4,350.00 RSD",
      orderName: "Porudžbina 1",
      details: {
        deliveryDate: "27.08.2023.",
        supplier: "Srma Group",
        address: "---",
        statusHistory: [
          { status: "U obradi", date: "03.08.2023." },
          { status: "Poslato", date: "25.08.2023." },
          { status: "Isporučeno", date: "27.08.2023." },
        ],
      },
    },
    {
      key: "2",
      date: "03.08.2023.",
      invoiceNumber: "RF2050/23",
      status: "ISPORUČENO",
      orderNumber: "17745",
      value: "67,200.00 RSD",
      orderName: "Mrežice 145g",
      details: {
        deliveryDate: "27.08.2023.",
        supplier: "Srma Group",
        address: "---",
        statusHistory: [
          { status: "U obradi", date: "03.08.2023." },
          { status: "Poslato", date: "25.08.2023." },
          { status: "Isporučeno", date: "27.08.2023." },
        ],
      },
    },
  ];

  return (
    <div
      style={{
        margin: 0,
        minHeight: "50vh",
        backgroundColor: "#fff",
      }}
    >
      <div className="mainBox">
        <div>
          <ul className="navBox" style={{ justifyContent: "center" }}>
            <li className="serviceBox">
              <h3 style={{ color: " white", margin: 0 }}>Porudžbine</h3>
            </li>
          </ul>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
        onRow={(record) => ({
          onClick: () => showModal(record),
        })}
      />
      <Modal
        title="Detalji porudžbine"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {currentOrder && (
          <>
            <Descriptions bordered>
              <Descriptions.Item label="Datum isporuke">
                {currentOrder.details.deliveryDate}
              </Descriptions.Item>
              <Descriptions.Item label="Poručioc">
                {currentOrder.details.supplier}
              </Descriptions.Item>
              <Descriptions.Item label="Adresa isporuke">
                {currentOrder.details.address}
              </Descriptions.Item>
            </Descriptions>
            <Title level={4} style={{ marginTop: "16px" }}>
              Istorija statusa
            </Title>
            <Timeline>
              {currentOrder.details.statusHistory.map((history, index) => (
                <Timeline.Item
                  key={index}
                  color={
                    history.status === "Isporučeno"
                      ? "green"
                      : history.status === "Poslato"
                      ? "blue"
                      : "red"
                  }
                >
                  {history.status}: {history.date}
                </Timeline.Item>
              ))}
            </Timeline>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
