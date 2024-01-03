import React from "react";

const ConvertStatusOrder = (props) => {
  const { item } = props;
  if (item == "PendingConfirm") {
    return (
      <div
        style={{
          color: "black",
          backgroundColor: "yellow",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == "PendingConfirm" ? "Chờ xác nhận" : ""}
      </div>
    );
  } else if (item == "Confirmed") {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "green",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == "Confirmed" ? "Đã xác nhận" : ""}
      </div>
    );
  } else if (item == "Shipped") {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "#015c92",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == "Shipped" ? "Đã giao thành công" : ""}
      </div>
    );
  } else if (item == "Completed") {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "green",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == "Completed" ? "Đã hoàn thành" : ""}
      </div>
    );
  } else if (item == "Cancelled") {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "red",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == "Cancelled" ? "Đã hủy" : ""}
      </div>
    );
  }
};
export default ConvertStatusOrder;
