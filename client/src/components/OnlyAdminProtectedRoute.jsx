import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function OnlyAdmiProtectedRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return (
    <>
      {currentUser && currentUser.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default OnlyAdmiProtectedRoute;
