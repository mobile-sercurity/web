import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { createProducts, resetState } from "../features/product/productSlice";
import { createProduct } from "../api/product.api";
import { filterColorApi } from "../api/color.api";
import { filterSizeApi } from "../api/size.api";
import { MdOutlineClose } from "react-icons/md";

let schema = yup.object().shape({
  productName: yup.string().required("productName is Required"),
  supplier: yup.string().required("supplier is Required"),
  category: yup.string().required("category is Required"),
  price: yup.number().required("Price is Required"),
  quantity: yup.number().required("Quantity is Required"),
  size: yup
    .array()
    .min(1, "Pick at least one size")
    .required("Size is required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  // image: yup.string().required("image is Required"),
});

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "60px",
    background: "#f5f5f5",
  }),
  option: (provided, state) => ({
    ...provided,
    zIndex: 100,
  }),
};

const Addproduct = () => {
  const imageMaxSize = 5;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [images, setImages] = useState([]);
  const [arrImages, setArrImages] = useState([]);
  const [colorDetail, setColorDetail] = useState([]);
  const [sizeDetail, setSizeDetail] = useState([]);

  const getColorsDetail = async () => {
    const data = {
      color: "",
    };
    const params = {
      page: 1,
      limit: 10000,
    };

    await filterColorApi(data, params).then((res) => {
      const data = res?.data?.data;
      setColorDetail(data);
    });
  };

  const getSizesDetail = async () => {
    const data = {
      size: "",
    };
    const params = {
      page: 1,
      limit: 10000,
    };

    filterSizeApi(data, params)
      .then((res) => {
        const data = res?.data?.data;
        setSizeDetail(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getColorsDetail();
    getSizesDetail();
  }, []);

  const coloropt = [];
  colorDetail.forEach((i) => {
    coloropt.push({
      label: i.colorName,
      value: i.id,
    });
  });

  const sizeopt = [];
  sizeDetail.forEach((i) => {
    sizeopt.push({
      label: i.sizeName,
      value: i.id,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.size = size ? size : " ";
    // formik.values.images = img;
  }, [color, size]);

  const buildBody = (values) => {
    const bodyFormData = new FormData();
    bodyFormData.append("name", values.productName);
    bodyFormData.append("price", Number(values?.price));
    bodyFormData.append("quantity", Number(values?.quantity));
    bodyFormData.append("supplier", values.supplier);
    bodyFormData.append("category", values.category);

    for (let index = 0; index < size.length; index++) {
      const element = size[index];
      bodyFormData.append("sizeIds", Number(element));
    }

    for (let index = 0; index < color.length; index++) {
      const element = color[index];
      bodyFormData.append("colorIds", Number(element));
    }

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      bodyFormData.append("image", element);
    }
    return bodyFormData;
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      quantity: "",
      supplier: "",
      category: "",
      size: "",
      color: "",
      // image: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const newValue = buildBody(values);
      console.log("newValue...", newValue);
      createProduct(newValue)
        .then((res) => {
          if (res) {
            formik.resetForm();
            setColor([]);
            setSize([]);
            setTimeout(() => {
              dispatch(resetState());
            }, 3000);
            toast.success("Create product successful !");
            navigate("/admin/list-product");
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };

  const handleChangeSize = (e) => {
    setSize(e);
  };

  const handleChangeImage = (formik) => (e) => {
    const files = e.target.files;
    const arrFile = [];
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      arrFile.push(element);
    }
    setImages(arrFile);
  };

  const handleDeleteImage = (item, index) => {
    const newArrFile = images?.filter((item, i) => index !== i);
    setImages(newArrFile);
  };

  return (
    <div>
      <h3 className="mb-4 title">THÊM SẢN PHẨM</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          {/* <>{JSON.stringify(formik.values)}</> */}
          {/* product name */}
          <CustomInput
            type="text"
            label="Nhập tên sản phẩm"
            name="productName"
            onChng={formik.handleChange("productName")}
            onBlr={formik.handleBlur("productName")}
            val={formik.values.productName}
          />
          <div className="error">
            {formik.touched.productName && formik.errors.productName}
          </div>

          {/* price */}
          <CustomInput
            type="number"
            label="Nhập giá"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />

          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          {/* quantity */}
          <CustomInput
            type="number"
            label="Số lượng"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />

          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>

          {/* supplier */}
          <CustomInput
            type="text"
            label="Nhà cung cấp"
            name="supplier"
            onChng={formik.handleChange("supplier")}
            onBlr={formik.handleBlur("supplier")}
            val={formik.values.supplier}
          />
          <div className="error">
            {formik.touched.supplier && formik.errors.supplier}
          </div>

          {/* category */}
          <CustomInput
            type="text"
            label="Phân loại sản phẩm"
            name="category"
            onChng={formik.handleChange("category")}
            onBlr={formik.handleBlur("category")}
            val={formik.values.category}
          />
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          {/* Size */}
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Chọn kích cỡ"
            value={size}
            onChange={(i) => handleChangeSize(i)}
            options={sizeopt}
            styles={{ height: "60px", background: "#f5f5f5" }}
            size="large"
          />
          <div className="error">
            {formik.touched.size && formik.errors.size}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Chọn màu"
            value={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
            styles={customStyles}
            size="large"
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>

          <input
            type="file"
            label="Enter Product image"
            name="image"
            id="image"
            multiple
            onChange={handleChangeImage(formik)}
          />
          <div style={{ display: "flex" }}>
            {images?.length > 0 &&
              images?.map((item, index) => {
                item.preview = URL.createObjectURL(item);
                return (
                  <div
                    key={index}
                    style={{ margin: "0 0.4rem", position: "relative" }}
                  >
                    <img
                      src={item?.preview}
                      alt="images"
                      style={{
                        height: "76px",
                        width: "112px",
                      }}
                    />
                    <div
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        fontSize: "1.6rem",
                      }}
                      onClick={() => handleDeleteImage(item, index)}
                    >
                      <MdOutlineClose />
                    </div>
                  </div>
                );
              })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            THÊM SẢN PHẨM
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
