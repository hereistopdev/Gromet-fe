import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Checkbox, Select } from "antd";
import { FormInstance } from "antd/lib/form";
import SearchInput from "./SearchInput";

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

interface EditModalProps {
  user: User;
  categories: string[];
  onUpdate: (user: User) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  user,
  onUpdate,
  categories,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm<User>();
  const [rebateArr, setRebateArr] = useState<any>([]);
  const [newVal, setNewVal] = useState(0);
  const [newCat, setNewCat] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(-1);

  const handle_newRebate = () => {
    setEditing(true);
    setNewCat("");
    setNewVal(0);
    setEditId(-1);
  };

  const handleFinish = (values: Partial<User>) => {
    values.rebate = [...rebateArr];
    onUpdate({ ...user, ...values });
    setVisible(false);
  };

  const handleDelete = (id: number) => {
    const arr = rebateArr.filter((_: any, index: number) => index !== id);

    setNewCat("");
    setNewVal(0);
    setEditId(-1);
    setRebateArr(arr);
  };

  const handleUpdate = (id: number) => {
    setEditId(id);
    setNewCat(rebateArr[id].category);
    setNewVal(rebateArr[id].value);
    setEditing(true);
  };
  const handleAdd = () => {
    if (!newCat) return;
    const arr = [...rebateArr];
    if (editId == -1) {
      arr.push({
        category: newCat,
        value: newVal,
      });
    } else {
      arr[editId] = {
        category: newCat,
        value: newVal,
      };
    }
    setRebateArr(arr);
    setEditing(false);
  };

  useEffect(() => {
    const temp = user.rebate;
    setRebateArr(temp);
  }, [user]);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Edit User
      </Button>
      <Modal
        title="Edit User"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Update
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            email: user.email,
            username: user.username,
            roles: user.roles,
            rebate: user.rebate,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="rebate" label="Rebate">
            {rebateArr.map((v: any, index: number) => {
              return (
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <div style={{ margin: "5px" }}>
                    <span style={{ fontSize: "13px", paddingLeft: "10px" }}>
                      Category
                    </span>
                    <Input value={v?.category} disabled />
                  </div>
                  <div style={{ margin: "5px" }}>
                    <span style={{ fontSize: "13px", paddingLeft: "10px" }}>
                      Value
                    </span>
                    <Input value={v?.value} disabled />
                  </div>
                  <Button
                    style={{ width: "80px", marginBottom: "5px" }}
                    onClick={() => handleUpdate(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ width: "80px", marginBottom: "5px" }}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}

            {editing ? (
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <div style={{ margin: "5px" }}>
                  <span style={{ fontSize: "13px", paddingLeft: "10px" }}>
                    Category
                  </span>
                  <SearchInput
                    categories={categories}
                    val={newCat}
                    func={setNewCat}
                  />
                </div>
                <div style={{ margin: "5px" }}>
                  <span style={{ fontSize: "13px", paddingLeft: "10px" }}>
                    Value
                  </span>
                  <Input
                    value={newVal}
                    onChange={(e: any) => setNewVal(e.target.value)}
                  />
                </div>

                <Button
                  style={{ width: "225px", marginBottom: "5px" }}
                  onClick={() => handleAdd()}
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button onClick={handle_newRebate}>+ Add</Button>
            )}
            {/* <Input /> */}
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="roles"
            label="Roles"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select>
              <Select.Option value="ADMIN">ADMIN</Select.Option>
              <Select.Option value="USER">USER</Select.Option>
              <Select.Option value="MODERATOR">MODERATOR</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="isEmailVerified" valuePropName="checked">
            <Checkbox>Email Verified</Checkbox>
          </Form.Item>
          <Form.Item name="isPhoneVerified" valuePropName="checked">
            <Checkbox>Phone Verified</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
