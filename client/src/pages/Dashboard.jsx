import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DashSideBar,
  DashProfile,
  DashPosts,
  DashVideos,
  DashUsers,
  DashComment,
  DashboardComponent,
  DashTrial,
} from "../components";

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
    <div className="min-h-screen mt-[60px] sm:mt-[70px] flex flex-col md:flex-row">
      {/* Dashboard Left Side Bar */}
      <div>
        <DashSideBar />
      </div>
      {/* Dashboard COntent According to selected tab */}
      {tab === "dashboard" && <DashboardComponent />}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "videos" && <DashVideos />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComment />}
      {tab === "trials" && <DashTrial />}
    </div>
  );
};

export default Dashboard;
