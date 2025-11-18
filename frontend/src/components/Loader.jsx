import React from "react";

export default function Loader({small}){
  return (
    <div className={small ? "loader small" : "loader"}>
      <div></div><div></div><div></div>
    </div>
  );
}
