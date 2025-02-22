import { Outlet } from "react-router-dom";
import Navbar from "../pages/commonPage/Navbar";


const RootPage = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
}

export default RootPage;
