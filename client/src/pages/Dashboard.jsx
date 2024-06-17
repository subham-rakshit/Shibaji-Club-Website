import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSideBar, DashProfile } from "../components";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("");
    }
  }, [location.search]);
  return (
    <div className="min-h-screen mt-[65px] lg:mt-[76px] flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* :TODO Side Bar */}
        <DashSideBar />
      </div>
      {/* :TODO Right Portion */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
};

export default Dashboard;
