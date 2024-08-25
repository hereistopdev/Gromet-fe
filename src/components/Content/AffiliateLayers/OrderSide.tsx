import React, { useEffect, useState } from "react";
import { Button, Drawer, Space } from "antd";
import "./OrderSide.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Product } from "./ProductPage";
import { getImagePath } from "../../../hooks/helpers";
import { baseApi } from "../../../constants";
import axios from "axios";
import { Link } from "react-router-dom";
import useAppContext from "../../../provider/AppContext";

interface Props {
  product: any;
  value: number;
}

const OrderSide = ({ product, value }: Props) => {
  const [open, setOpen] = useState(false);
  const [carts, setCarts] = useState([]);
  const [rebate, setRebate] = useState<number>(0);

  useEffect(() => {
    const temp = JSON.parse(String(sessionStorage.getItem("rebate")));
    const category = product.kategorija_artikla;
    temp &&
      temp.forEach((v: any) => {
        if (v.category == category) {
          setRebate(v.value);
        }
      });
  }, []);
  const imagePath = getImagePath(product as Product);

  const imageSrc = `${baseApi}/assets/products/` + imagePath + ".webp";

  const addToCart = async () => {
    console.log("create order");
    try {
      const token: string | null = localStorage.getItem("accessToken");
      if (token) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        if (value && product._id) {
          console.log("Project to add: ", product._id);

          return await axios
            .post(
              `${baseApi}/cart/createCart`,
              {
                count: value,
                itemNum: product._id,
                status: 0,
              },
              header
            )
            .then((res) => {
              setLoading(false);
              // setOpen(false);
              getAllCartsWithID();
              return res.data.data;
            })
            .catch((err) => {
              console.log("error", err);
            });
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.error("Error create new product:", error);
    }
  };

  const showDrawer = () => {
    addToCart();
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllCartsWithID();
    console.log(product, value, carts);
  }, [product, value]);

  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useAppContext();

  const updateValue = (v: number) => {
    dispatch({ type: "SET_VALUE", payload: v });
  };

  const handleOk = async () => {
    console.log("okay");
    setLoading(true);
    setOpen(false);
    // try {
    //   const token: string | null = localStorage.getItem("accessToken");
    //   if (token) {
    //     const header = {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };

    //     if (value && product._id) {
    //       console.log("Project to add: ", product._id);

    //       return await axios
    //         .post(
    //           `${baseApi}/cart/createCart`,
    //           {
    //             count: value,
    //             itemNum: product._id,
    //             status: 0,
    //           },
    //           header
    //         )
    //         .then((res) => {
    //           alert("Added to Cart");
    //           setLoading(false);
    //           setOpen(false);
    //           getAllCartsWithID();
    //           return res.data.data;
    //         })
    //         .catch((err) => {
    //           console.log("error", err);
    //         });
    //     } else {
    //       console.log("error");
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error create new product:", error);
    // }
  };

  const getAllCartsWithID = () => {
    console.log("hi");
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/cart/getAllCartsWithID`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarts(res.data.data);
        updateValue(res.data.data.length);
        console.log("cart", res.data.data);
      });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Dodaj u korpu
      </Button>
      <Drawer
        title="Korpa za kupovinu"
        onClose={onClose}
        open={open}
        className="drawer-header"
        headerStyle={{
          backgroundColor: "#004d8c",
          color: "white",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div>
            {carts &&
              carts.map((v: any, index: number) => {
                return (
                  <div
                    className="divProductImg divProductImgSelectedThumbnail"
                    style={{
                      border: "2px solid #004d8c",
                      display: "flex",
                      alignItems: "center",
                      padding: "5px",
                      margin: "5px 0px",
                    }}
                  >
                    <LazyLoadImage
                      effect="blur"
                      onClick={() => {}}
                      alt={v?.itemNum?.naziv_artikla}
                      src={
                        `${baseApi}/assets/products/` +
                        getImagePath(v.itemNum as Product) +
                        ".webp"
                      }
                      onContextMenu={() => {
                        return false;
                      }}
                    />
                    <div style={{ width: "100%" }}>
                      <div style={{ margin: "5px" }}>
                        {v.itemNum?.naziv_artikla}
                      </div>
                      <div style={{ margin: "5px" }}>
                        <b>Količina:</b> {v.count}
                      </div>
                      <div style={{ margin: "5px" }}>
                        <b>Ukupna vrednost bez PDV-a:</b>{" "}
                        {Number(
                          (v.count * v.itemNum?.price * (100 - rebate)) / 100
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* {!Array.isArray(product?.slike) &&
              product?.slike &&
              !product?.slike?.includes(",") && (
                <div
                  className="divProductImg divProductImgSelectedThumbnail"
                  style={{
                    border: "2px solid #004d8c",
                    display: "flex",
                    alignItems: "center",
                    padding: "5px",
                  }}
                >
                  <LazyLoadImage
                    effect="blur"
                    onClick={() => {}}
                    alt={product?.naziv_artikla}
                    src={imageSrc}
                    onContextMenu={() => {
                      return false;
                    }}
                  />
                  <div style={{ width: "100%" }}>
                    <div style={{ margin: "5px" }}>{product.naziv_artikla}</div>
                    <div style={{ margin: "5px" }}>
                      <b>Količina:</b> {value}
                    </div>
                    <div style={{ margin: "5px" }}>
                      <b>Ukupna vrednost bez PDV-a:</b>{" "}
                      {(value * product.price * (100 - rebate)) / 100}
                    </div>
                  </div>
                </div>
              )} */}
          </div>

          <Link
            to="/cart"
            style={{
              position: "absolute",
              bottom: "0",
              textAlign: "center",
            }}
          >
            <Button
              type="primary"
              style={{
                width: "270px",
              }}
            >
              Pogledaj korpu
            </Button>
          </Link>

          <Button
            type="primary"
            style={{
              position: "absolute",
              bottom: "50px",
              width: "270px",
              textAlign: "center",
            }}
            onClick={handleOk}
          >
            Nastavi kupovinu
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default OrderSide;
