import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            {/* Integrated Sidebar Component */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Integrated Navbar Component */}
                <Navbar />

                {/* Main Content Area & Outlet */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
                    {/* Outlet renders the matched child route (e.g., Students, Faculty, Attendance) */}
                    <Outlet />
                </main>

                {/* Integrated Footer Component */}
                <Footer />
            </div>
        </div>
    );
};

export default AppLayout;
