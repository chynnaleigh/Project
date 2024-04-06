import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

const Layout = () => {
    return (
        <div className="bg-background-yellow min-h-screen">
            <TopBar></TopBar>

            <Outlet />
        </div>
    );
};

export default Layout;
