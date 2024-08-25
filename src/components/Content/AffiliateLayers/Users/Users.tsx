import React, { useEffect, useState } from "react";
import { Button, Card, Space } from "antd";
import { useBreadCrumbsUpdateContext } from "../Context/BreadCrumbsContext";
import axios from "axios";
import { baseApi } from "../../../../constants";
import UserTables from "./UserTable";
import useAppContext from "../../../../provider/AppContext";

const Users: React.FC = () => {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  const [carts, setCarts] = useState([]);
  const [myOrders, setMyOrders] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [userType, setUserType] = useState<any>(
    localStorage.getItem("currentUser")
  );

  const { state, dispatch } = useAppContext();

  const updateValue = (v: number) => {
    dispatch({ type: "SET_VALUE", payload: v });
  };
  const getAllUsersWithID = () => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/cart/getAllUsersWithID`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarts(res.data.data);
        updateValue(res.data.data.length);
      });
  };

  const getAllUsers = () => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/users/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarts(res.data.data.filter((v: any) => v.status !== 0));

        updateValue(res.data.data.filter((v: any) => v.status !== 0).length);
      });
  };

  const getCartsByRole = () => {
    userType === "ADMIN" ? getAllUsers() : getAllUsersWithID();
  };

  useEffect(() => {
    routeHistoryUpdate(["Početna", "Users"]);
    getAllUsers();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/products/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => {
        if (res.data.data) {
          const arr: string[] = [];
          res.data.data.map((v: any) => {
            if (v.kategorija_artikla && !arr.includes(v.kategorija_artikla)) {
              arr.push(v.kategorija_artikla);
            }
          });
          setCategories(arr);
        }
      });
  }, []);

  const DeleteAll = async () => {
    let token = localStorage.getItem("accessToken");
    await axios
      .get(`${baseApi}/users/DeleteAllusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("deleted successfully!");
        getAllUsers();
      });
  };

  const DeleteById = async (id: any) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/users/DeleteUserByID`, { selected: id }, header)
        .then((res) => {
          alert("Deleted Successfully");
          getAllUsers();
        })
        .catch((err) => {});
    }
  };

  const verifyPhone = async (id: any) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/users/VerifyPhoneById`, { selected: id }, header)
        .then((res) => {
          alert("Verified Successfully");
          getAllUsers();
        })
        .catch((err) => {});
    }
  };

  const verifyEmail = async (id: any) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/users/VerifyEmailById`, { selected: id }, header)
        .then((res) => {
          alert("Sent Successfully.");
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="block">
      <div className="container">
        <div className="my-cart space-between">
          <h6>All Users : {carts.length || 0}</h6>
          <Button type="primary" className="btn-add" onClick={DeleteAll}>
            Delete All Users
          </Button>
        </div>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <UserTables
            users={carts}
            categories={categories}
            DeleteById={DeleteById}
            verifyPhone={verifyPhone}
            verifyEmail={verifyEmail}
            getAllUsers={getAllUsers}
          />
        </Space>
      </div>
    </div>
  );
};

export default Users;
