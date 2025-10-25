import React from "react";
import { Table, Input, message } from "antd";
import useTableData from "@/composables/useTableData";

const Dashboard = () => {
  const {
    data,
    loading,
    pagination,
    handleTableChange,
    setSearch,
    rowSelection,
    selectedRowKeys,
  } = useTableData("https://6694d9704bd61d8314c8e499.mockapi.io/products", {
    onSelectChange: (keys) => {
      message.info(`Bạn đã chọn ${keys.length} dòng`);
      // ở đây có thể call API batch delete / update ...
      console.log("Row selected:", keys);
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: true,
      filters: [
        { text: "Nhỏ hơn 10", value: "lt10" },
        { text: "Từ 10 đến 20", value: "10-20" },
        { text: "Lớn hơn 20", value: "gt20" },
      ],
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  return (
    <div>
      <Input.Search
        placeholder="Tìm kiếm..."
        onInput={(val) => setSearch(val.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey="id"
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Dashboard;
