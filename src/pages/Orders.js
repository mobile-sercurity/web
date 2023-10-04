import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BsClipboard } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { SlNote } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { filterOrderApi, getAllOrderApi } from "../api/order.api";
import { Box, Button, IconButton, Pagination } from "@mui/material";
import ModalUpdateStatusOrder from "../modal/ModalUpdateStatusOrder";
import moment from "moment/moment";
const columns = [
  {
    title: "ID",
    dataIndex: "ordering_id",
  },
  {
    title: "Order Number",
    dataIndex: "order_number",
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
  },
  {
    title: "Expiration Date",
    dataIndex: "expiration_date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const intitialValues = {
    orderNumber: "",
    status: "",
  };

  const [allOrderDetail, setAllOrderDetail] = useState([]);
  const [openModalUpdateStatus, setOpenModalUpdateStatus] = useState(false);
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getAllOrder = async () => {
    const params = {
      page: 1,
      limit: 10,
    };

    await filterOrderApi(intitialValues, params).then((res) => {
      const data = res?.data?.data;
      setTotalPage(res?.data?.totalPage);
      setAllOrderDetail(data);
    });
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleOpenModalStatus = (id) => {
    setId(id);
    setOpenModalUpdateStatus(true);
  };

  const handleCloseModalStatus = () => {
    setOpenModalUpdateStatus(false);
  };

  const onChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const data1 = [];
  for (let i = 0; i < allOrderDetail?.length; i++) {
    data1.push({
      ordering_id: allOrderDetail[i].ordering_id,
      order_number: allOrderDetail[i]?.order_number,
      order_date: moment(allOrderDetail[i]?.order_date).format("DD-MM-YYYY"),
      expiration_date: moment(allOrderDetail[i]?.expiration_date).format(
        "DD-MM-YYYY"
      ),
      status: allOrderDetail[i]?.status,
      action: (
        <>
          <Link
            to={`/admin/order/${allOrderDetail[i].ordering_id}`}
            className=" fs-3 text-danger"
          >
            <BsClipboard />
          </Link>
          <IconButton
            className="fs-3 text-danger"
            sx={{ paddingTop: "0" }}
            onClick={() =>
              handleOpenModalStatus(allOrderDetail[i]?.ordering_id)
            }
          >
            <SlNote />
          </IconButton>
        </>
      ),
    });
  }
  return (
    <>
      {openModalUpdateStatus && (
        <ModalUpdateStatusOrder
          open={openModalUpdateStatus}
          onClose={handleCloseModalStatus}
          id={id}
          getAllOrder={getAllOrder}
        />
      )}
      <div>
        <h3 className="mb-4 title">Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} pagination={false} />
          <Pagination
            page={page}
            count={totalPage}
            onChange={onChangePage}
            sx={{ marginTop: "1.2rem" }}
          />
        </div>
      </div>
    </>
  );
};

export default Orders;
