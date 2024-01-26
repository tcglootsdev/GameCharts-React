import React from "react";

// Components
import RectLoader from "@/components/rectloader";

const DataItem = ({ label, info, className, loading }) => {
  return (
    <div className={"app-stat d-flex flex-column justify-content-baseline align-items-center " + className}>
      {!loading && <div className="h6 text-center text-uppercase font-weight-bold text-shadow mb-1">{info}</div>}
      {loading && <RectLoader width={100} height={35} backgroundColor="#2a3143" foregroundColor="#111111" />}
      <span className="h4 font-secondary text-center text-shadow mt-0">{label}</span>
    </div>
  );
};

DataItem.defaultProps = {
  className: "",
};

export default DataItem;
