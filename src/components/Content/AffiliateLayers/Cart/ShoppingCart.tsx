import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./ShoppingCart.css";
import { baseApi } from "../../../../constants";
import { getImagePath } from "../../../../hooks/helpers";
import { Product } from "../ProductPage";
import axios from "axios";
const { Title, Text } = Typography;

interface Props {
  products: any;
  setProducts: React.Dispatch<React.SetStateAction<any>>;
  getCartsByRole: () => void;
}

const ShoppingCart: React.FC<Props> = ({
  products,
  setProducts,
  getCartsByRole,
}) => {
  const totalWithoutTax = products.reduce(
    (sum: any, product: any) => sum + product.count * product.itemNum?.price,
    0
  );
  const totalWithTax = products.reduce(
    (sum: any, product: any) =>
      sum + product.count * product.itemNum?.price * 0.916,
    0
  );

  useEffect(() => {
    console.log(products);
  }, []);

  const [userType, setUserType] = useState<any>(
    localStorage.getItem("currentUser")
  );

  const proveProduct = async (id: any) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/cart/ProveOrderByID`, { product_id: id }, header)
        .then((res) => {
          alert("Proved Successfully");
          getCartsByRole();
        })
        .catch((err) => {});
    }
  };

  const orderProduct = async (id: any, index: number) => {
    const temp: any = products[index];
    if (temp.count > temp.itemNum.count) {
      alert(`Total number of products are only ", ${temp.itemNum.count}`);
      return;
    }
    console.log(temp);
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/cart/SetOrderByID`, { product_id: id }, header)
        .then((res) => {
          alert("Ordered Successfully");
          getCartsByRole();
        })
        .catch((err) => {});
    }
  };

  const removeProduct = async (id: any) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/cart/DeleteCartrByID`, { product_id: id }, header)
        .then((res) => {
          alert("Canceled Successfully");
          getCartsByRole();
        })
        .catch((err) => {});
    }
  };

  const createOrder = async () => {
    const token: string | null = localStorage.getItem("accessToken");
    const userEmail: string | null = localStorage.getItem("userEmail");

    if (!token || !userEmail) {
      alert("User is not authenticated or email is missing.");
      return;
    }

    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const orderData = products.map((product: any) => ({
      itemNum: product.itemNum._id,
      prodCode: product.itemNum.sifra_proizvoda[0],
      prodName: product.itemNum.naziv_artikla,
      prodCate: product.itemNum.potkategorija[0],
      unit: product.itemNum.jedinica_mere,
      salePrice: product.itemNum?.price,
      status: "Pending",
      author: userEmail,
    }));

    console.log("orderData", orderData);
    console.log("products", products);

    try {
      const response = await axios.post(`${baseApi}/orders`, orderData, header);

      alert("Ordered Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to place the order.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card className="shopping_cart_card">
        <Row gutter={[16, 16]}>
          <Col
            span={24}
            style={{
              backgroundColor: "gray",
              padding: "8px",
            }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col
                span={4}
                style={{
                  textAlign: "left",
                  padding: "10px 20px",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                Proizvod
              </Col>
              <Col
                span={6}
                style={{
                  padding: "10px 20px",
                  color: "white",
                  fontWeight: "bolder",
                }}
              ></Col>
              <Col
                span={4}
                style={{
                  padding: "10px 20px",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                Količina
              </Col>
              <Col
                span={5}
                style={{
                  textAlign: "center",
                  padding: "10px 20px",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                Cena bez PDV-a
              </Col>
              <Col
                span={5}
                style={{
                  textAlign: "center",
                  padding: "10px 20px",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                Cena sa PDV-om
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {products.map((product: any, index: number) => (
            <Col span={24} key={product?._id}>
              <Row gutter={[16, 16]} align="middle">
                <Col span={4}>
                  <img
                    alt={product?.itemNum?.naziproduct_artikla}
                    src={
                      `${baseApi}/assets/products/` +
                      getImagePath(product?.itemNum as Product) +
                      ".webp"
                    }
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col span={6}>
                  <Title level={4}>{product?.itemNum?.naziv_artikla}</Title>
                  <Text>
                    Model: {product?.itemNum?.naziv_proizvoda_model[0]}
                  </Text>
                  <br />
                  <Text>
                    Šifra artikla: {product?.itemNum?.sifra_proizvoda[0]}
                  </Text>
                  <br />
                  <Button type="link">Dodaj u listu želja</Button>
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  <p>{product.count}</p>
                  <Button
                    onClick={() => orderProduct(product._id, index)}
                    disabled={product.status == 1}
                  >
                    Izmeni količinu
                  </Button>

                  {userType === "ADMIN" && (
                    <Button
                      onClick={() => proveProduct(product._id)}
                      type="primary"
                    >
                      Prove Order
                    </Button>
                  )}
                </Col>
                <Col span={5} style={{ textAlign: "center" }}>
                  <Text strong style={{ fontSize: "20px" }}>
                    {Number(product.count * product.itemNum?.price).toFixed(2)}{" "}
                    RSD
                  </Text>
                </Col>
                <Col span={5} style={{ textAlign: "center" }}>
                  <Text strong style={{ fontSize: "20px" }}>
                    {Number(
                      product.count * product.itemNum?.price * 0.916
                    ).toFixed(2)}{" "}
                    RSD
                  </Text>
                </Col>

                <Button
                  type="link"
                  danger
                  onClick={() => removeProduct(product._id)}
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: 0,
                  }}
                >
                  <DeleteOutlined /> Ukloni proizvod
                </Button>
              </Row>
              <hr />
            </Col>
          ))}
        </Row>

        <Row>
          <Col
            span={24}
            style={{
              backgroundColor: "gray",
              textAlign: "center",
              padding: "8px",
            }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col
                span={24}
                style={{
                  textAlign: "center",
                  padding: "10px 20px",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                Ukupno
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "left" }}>
            <div style={{ paddingTop: "20px" }}>
              <Text>
                Ukupna vrednost korpe: {totalWithoutTax.toFixed(2)} RSD
              </Text>
              <br />
              <Text>Ukupan PDV: {totalWithTax - totalWithoutTax} RSD</Text>
              <br />
              <Text>Valuta plaćanja: do 30.11.2023.</Text>
              <br />
              <Text style={{ fontSize: "20px" }}>
                Ukupna vrednost sa PDV-om: {totalWithTax.toFixed(2)} RSD
              </Text>
              <br />
              <br />
              <Checkbox style={{ color: "red" }}>
                Želim da me pozove moj komercijalista
              </Checkbox>
              <br />
              <Checkbox style={{ color: "red" }}>
                Želim da se razmotri dodatni rabat
              </Checkbox>
              <br />
              <Checkbox style={{ color: "red" }}>
                Želim da dodam novi proizvod
              </Checkbox>
              <br />
              <Button
                type="primary"
                style={{ margin: "5px 0px", width: "200px" }}
              >
                Izaberi još proizvoda
              </Button>
              <br />
              <Button
                type="primary"
                style={{ margin: "5px 0px", width: "200px" }}
              >
                Izprazni korpu
              </Button>
            </div>
          </div>
          <div>
            <div style={{ paddingTop: "60px", textAlign: "left" }}>
              <Title level={5}>Izaberite način plaćanja*</Title>
              <Checkbox style={{ color: "red" }}>
                Preuzimanje u našem magacinu
              </Checkbox>
              <br />
              <Checkbox style={{ color: "red" }}>
                Isporuka našim transportom
              </Checkbox>
              <br />
              <Checkbox style={{ color: "red" }}>
                Isporuka kurirskom službom u vašoj režiji
              </Checkbox>
              <br />
              <Checkbox style={{ color: "red" }}>
                Isporuka kurirskom službom u našoj režiji
              </Checkbox>
              <br />

              <Button
                type="primary"
                style={{ float: "right", marginTop: "20px", width: "100%" }}
                onClick={createOrder}
              >
                Pošalji porudžbinu
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShoppingCart;
