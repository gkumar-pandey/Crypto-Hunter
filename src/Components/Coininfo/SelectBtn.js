import React from "react";

const SelectBtn = ({ children, onClick, selected }) => {
  const coustemStyle = {
    selectbtn: {
      border: "1px solid gold",
      borderRadius: "5px",
      padding: "10px",
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&: hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
    },
  };
  return (
    <span onClick={onClick} style={coustemStyle.selectbtn}>
      {children}
    </span>
  );
};

export default SelectBtn;
