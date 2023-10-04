import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, filterProductApi } from "../api/product.api";
import { PAGE_SIZE } from "../constants/page.constants";
import { toast } from "react-toastify";
import { Box, Button, IconButton, Pagination } from "@mui/material";
import ModalDeleteProduct from "../modal/ModalDeleteProduct";
import FormSearchProduct from "./product/FormSearchProduct";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Size",
    dataIndex: "size",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    productName: "",
    colorIds: [],
    sizeIds: [],
  };

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [productDetail, setProductDetail] = useState(null);
  const [openModalDeleteProduct, setOpenModalDeleteProduct] = useState(false);
  const [reload, setReload] = useState(0);
  const [itemProduct, setItemProduct] = useState(null);

  const getProductDetail = async () => {
    const params = {
      page: page,
      limit: PAGE_SIZE,
    };
    filterProductApi(initialValues, params)
      .then((res) => {
        const data = res?.data?.products;
        setProductDetail(data);
        setTotalCount(res?.data?.totalPage);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    getProductDetail();
  }, [page, reload]);

  const handleClickBtnAddProduct = () => {
    navigate("/admin/product");
  };

  const handleOpenModalDelete = (item) => {
    setOpenModalDeleteProduct(true);
    setItemProduct(item);
  };

  const handleCloseModalDeleteProduct = () => {
    setOpenModalDeleteProduct(false);
  };

  const handleDeleteProduct = () => {
    const data = {
      id: itemProduct?.id,
    };
    deleteProduct(data)
      .then((res) => {
        if (res) {
          toast.success("Delete product successful !");
          setReload(reload + 1);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleClickBtnUpdate = (id) => {
    navigate(`/admin/update-product/${id}`);
  };

  // const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productDetail?.length; i++) {
    data1.push({
      key: i + 1,
      id: productDetail[i]?.id ?? "",
      name: productDetail[i]?.product_name ?? "",
      category: productDetail[i].category ? productDetail[i].category : "",
      color: productDetail[i].colors
        ? productDetail[i].colors?.map((item) => item?.colorName) + ","
        : "",
      size: productDetail[i]?.sizes
        ? productDetail[i]?.sizes?.map((item) => item?.sizeName) + ","
        : "",
      price: `${productDetail[i]?.price?.toLocaleString()}`,
      action: (
        <>
          <Box>
            <IconButton
              className="ms-3 fs-3 text-danger"
              onClick={() => handleClickBtnUpdate(productDetail[i]?.id)}
            >
              <BiEdit />
            </IconButton>

            <IconButton
              className="ms-3 fs-3 text-danger"
              onClick={() => handleOpenModalDelete(productDetail[i])}
            >
              <AiFillDelete />
            </IconButton>
          </Box>
        </>
      ),
    });
  }

  const onChangePage = (e, pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <ModalDeleteProduct
        open={openModalDeleteProduct}
        onClose={handleCloseModalDeleteProduct}
        deleteProduct={handleDeleteProduct}
      />
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 className="mb-4 title">Products</h3>
          <Button
            sx={{ marginBottom: "1.5rem" }}
            onClick={handleClickBtnAddProduct}
          >
            Add product
          </Button>
        </Box>
        <Box sx={{ marginBottom: "1rem" }}>
          <FormSearchProduct
            page={page}
            setProductDetail={setProductDetail}
            setTotalCount={setTotalCount}
          />
        </Box>
        <div>
          <Table columns={columns} dataSource={data1} pagination={false} />
          <Pagination page={page} count={totalCount} onChange={onChangePage} />
        </div>
      </div>
    </>
  );
};

export default Productlist;
