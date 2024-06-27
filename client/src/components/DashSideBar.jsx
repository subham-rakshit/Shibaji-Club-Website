import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiChartPie,
} from "react-icons/hi";
import { FaUsersCog, FaComments } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux-slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

function DashSideBar() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("");
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const api = "/api/user/signout";
      const options = {
        method: "POST",
      };
      const res = await fetch(api, options);
      const data = await res.json();

      if (res.ok) {
        dispatch(signOutSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-2">
          {currentUser && currentUser.isAdmin && (
            <Link to="/admin-dashboard?tab=dashboard">
              <Sidebar.Item
                icon={HiChartPie}
                label={tab === "dashboard" && "Admin"}
                labelColor="dark"
                className={`font-[Inter] text-xs font-medium ${
                  tab === "dashboard" && "bg-[#e9e9e9] dark:bg-[#374151]"
                }`}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/admin-dashboard?tab=profile">
            <Sidebar.Item
              icon={HiUser}
              label={
                tab === "profile"
                  ? currentUser.isAdmin
                    ? "Admin"
                    : "User"
                  : ""
              }
              labelColor="dark"
              className={`font-[Inter] text-xs font-medium ${
                tab === "profile" && "bg-[#e9e9e9] dark:bg-[#374151]"
              }`}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/admin-dashboard?tab=posts">
              <Sidebar.Item
                icon={HiDocumentText}
                label={tab === "posts" && "Admin"}
                labelColor="dark"
                className={`font-[Inter] text-xs font-medium ${
                  tab === "posts" && "bg-[#e9e9e9] dark:bg-[#374151]"
                }`}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/admin-dashboard?tab=users">
              <Sidebar.Item
                icon={FaUsersCog}
                label={tab === "users" && "Admin"}
                labelColor="dark"
                className={`font-[Inter] text-xs font-medium ${
                  tab === "users" && "bg-[#e9e9e9] dark:bg-[#374151]"
                }`}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/admin-dashboard?tab=comments">
              <Sidebar.Item
                icon={FaComments}
                label={tab === "comments" && "Admin"}
                labelColor="dark"
                className={`font-[Inter] text-xs font-medium ${
                  tab === "comments" && "bg-[#e9e9e9] dark:bg-[#374151]"
                }`}
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="font-[Inter] text-xs font-medium cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSideBar;
