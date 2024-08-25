import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import EditModal from "./EditModal";
import axios from "axios";
import { baseApi } from "../../../../constants";

interface User {
  id: string;
  key: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string;
  createdAt: string;
  delete: string;
  rebate: object;
}

type Props = {
  users: User[];
  categories: string[];
  DeleteById: (id: string) => void;
  verifyPhone: (id: string) => void;
  verifyEmail: (id: string) => void;
  getAllUsers: () => void;
};

const UserTables: React.FC<Props> = ({
  users,
  DeleteById,
  verifyPhone,
  verifyEmail,
  getAllUsers,
  categories,
}) => {
  const [data, setData] = useState<User[]>([]);

  const handleUpdate = async (updatedUser: User) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/users/updateUser`, { data: updatedUser }, header)
        .then((res) => {
          alert("Updated Successfully");
          getAllUsers();
        })
        .catch((err) => {});
    }
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "Email Status",
      dataIndex: "isEmailVerified",
      key: "isEmailVerified",
      render: (v, record) => {
        return v ? (
          <Tag color="green">Verified</Tag>
        ) : (
          <Button
            size="small"
            type="primary"
            onClick={() => verifyEmail(record.email)}
          >
            Send SMS
          </Button>
        );
      },
    },
    {
      title: "Phone Status",
      dataIndex: "isPhoneVerified",
      key: "isPhoneVerified",
      render: (v, record) =>
        v ? (
          <Tag color="green">Verified</Tag>
        ) : (
          <Button
            size="small"
            type="primary"
            onClick={() => verifyPhone(record.email)}
          >
            Verify {record.id}
          </Button>
        ),
    },
    {
      title: "Rebate",
      dataIndex: "rebate",
      key: "rebate",
      render: (v) => (v.length ? v[0].value : 0),
    },

    {
      title: "Joined From",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => new Date(v).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "delete",
      dataIndex: "delete",
      render: (v: string, val: User) => (
        <ButtonGroup>
          <EditModal
            user={val}
            onUpdate={handleUpdate}
            categories={categories}
          />
          <Button size="middle" onClick={() => DeleteById(val.email)}>
            Delete
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  useEffect(() => {
    setData(
      users.map((v, i) => ({
        ...v,
        key: i.toString(),
        delete: v.key,
      }))
    );
  }, [users]);

  return <Table columns={columns} dataSource={data} />;
};

export default UserTables;
