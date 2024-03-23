import React, { useState } from "react";
import FillData from "./FillData";
import LiveProductData from "./LiveProductData";

const Dashboard = (props) => {
  const [activeTab, setActiveTab] = useState("fillData");
  console.log("product", props.product);

  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("fillData")}
          className={activeTab === "fillData" ? "active" : ""}
        >
          Fill Data
        </button>
        <button
          onClick={() => setActiveTab("liveProductData")}
          className={activeTab === "liveProductData" ? "active" : ""}
        >
          Live Product Data
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "fillData" ? (
          <FillData
            formData={props.product}
            setProductForEdit={props.setProductForEdit}
          />
        ) : (
          <LiveProductData />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
