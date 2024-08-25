import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, InputNumber } from "antd";
import type { InputNumberProps } from "antd";
import "./OrderModal.css";
import { baseApi } from "../../../constants";
import axios from "axios";

type Props = {
  product: any;
};

const OrderModal = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const order_count_ref = useRef<HTMLInputElement>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);

    try {
      const token: string | null = localStorage.getItem("accessToken");
      if (token) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        if (order_count_ref.current?.value && product._id) {
          return await axios
            .post(
              `${baseApi}/cart/createCart`,
              {
                count: order_count_ref.current?.value,
                itemNum: product._id,
                status: 0,
              },
              header
            )
            .then((res) => {
              alert("Added to Cart");
              setLoading(false);
              setOpen(false);
              return res.data.data;
            })
            .catch((err) => {});
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.error("Error create new product:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <>
      <Button onClick={showModal} className="divProductActionQuantity">
        Order
      </Button>
      <Modal
        open={open}
        title="Naručite proizvod"
        onOk={handleOk}
        onCancel={handleCancel}
        className="Modal-order"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Otkazati
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Dodaj u košaricu
          </Button>,
        ]}
      >
        <div style={{ padding: "20px" }}>
          <div className="item-info">
            <div className="item-info-label">Naziv Artikla : </div>
            <div className="item-info-value">{product.naziv_artikla}</div>
          </div>
          <div className="item-info">
            <div className="item-info-label">Računati : </div>
            <div className="item-info-value">{product.count}</div>
          </div>
          <div className="item-info">
            <div className="item-info-label">Transportno pakovanjet : </div>
            <div className="item-info-value">
              {product.transportno_pakovanje}
            </div>
          </div>

          <div className="item-info">
            <div className="item-info-label">Minimalno Pakovanje : </div>
            <div className="item-info-value">{product.minimalno_pakovanje}</div>
          </div>

          <div className="item-info">
            <div className="item-info-label">broj narudžbi: </div>
            <div className="item-info-value">
              <InputNumber
                min={0}
                max={product.count}
                defaultValue={0}
                onChange={onChange}
                size="small"
                ref={order_count_ref}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderModal;
