import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./leftSidebar/LeftSideBar";

const MainLayout = () => {
  return (
    <div>
      <LeftSideBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
