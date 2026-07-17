// import { Suspense, lazy } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// // ----------------------------------------------------------------------
// // Lazy Loading Modules
// // ----------------------------------------------------------------------
// // Auth
// const Login = lazy(() => import("../features/auth/pages/Login"));
// const ForgotPassword = lazy(
//     () => import("../features/auth/pages/ForgotPassword"),
// );
// const ResetPassword = lazy(
//     () => import("../features/auth/pages/ResetPassword"),
// );
// const Unauthorized = lazy(() => import("../features/auth/pages/Unauthorized"));

// // Protected Layout/Guard
// const ProtectedRoute = lazy(
//     () => import("../features/auth/components/ProtectedRoute"),
// );
// const AppLayout = lazy(() => import("../components/layout/AppLayout"));

// // Modules
// const Dashboard = lazy(() => import("../features/dashboard/Pages/Dashboard"));

// // Departments Module
// const DepartmentList = lazy(
//     () => import("../features/departments/Pages/DepartmentList"),
// );
// const AddDepartment = lazy(
//     () => import("../features/departments/Pages/AddDepartment"),
// );
// const EditDepartment = lazy(
//     () => import("../features/departments/Pages/EditDepartment"),
// );

// // const Students = lazy(() => import("../pages/Students"));
// // const Faculty = lazy(() => import("../pages/Faculty"));
// // const Subjects = lazy(() => import("../pages/Subjects"));
// // const Attendance = lazy(() => import("../pages/Attendance"));
// // const Timetable = lazy(() => import("../pages/Timetable"));
// // const Results = lazy(() => import("../pages/Results"));
// // const Profile = lazy(() => import("../pages/Profile"));
// // const Settings = lazy(() => import("../pages/Settings"));
// // const NotFound = lazy(() => import("../pages/NotFound"));

// // ----------------------------------------------------------------------
// // Loading Fallback
// // ----------------------------------------------------------------------
// const PageLoader = () => (
//     <div
//         style={{
//             display: "flex",
//             height: "100vh",
//             alignItems: "center",
//             justifyContent: "center",
//         }}
//     >
//         <h3>Loading...</h3>
//     </div>
// );

// const AppRoutes = () => {
//     return (
//         <Suspense fallback={<PageLoader />}>
//             <Routes>
//                 {/* Public Routes */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/forgot-password" element={<ForgotPassword />} />
//                 <Route path="/reset-password" element={<ResetPassword />} />
//                 <Route path="/unauthorized" element={<Unauthorized />} />

//                 {/* Protected Routes */}
//                 <Route element={<ProtectedRoute />}>
//                     <Route element={<AppLayout />}>
//                         <Route
//                             path="/"
//                             element={<Navigate to="/dashboard" replace />}
//                         />
//                         <Route path="/dashboard" element={<Dashboard />} />

//                         {/* Department Routes */}
//                         <Route
//                             path="/departments"
//                             element={<DepartmentList />}
//                         />
//                         <Route
//                             path="/departments/add"
//                             element={<AddDepartment />}
//                         />
//                         <Route
//                             path="/departments/:id/edit"
//                             element={<EditDepartment />}
//                         />

//                     </Route>
//                 </Route>

//                 {/* 404 Catch-All */}
//                 {/* <Route path="*" element={<NotFound />} /> */}
//             </Routes>
//         </Suspense>
//     );
// };

// export default AppRoutes;

import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ----------------------------------------------------------------------
// Lazy Loading Modules
// ----------------------------------------------------------------------
// Auth
const Login = lazy(() => import("../features/auth/pages/Login"));
const ForgotPassword = lazy(
    () => import("../features/auth/pages/ForgotPassword"),
);
const ResetPassword = lazy(
    () => import("../features/auth/pages/ResetPassword"),
);
const Unauthorized = lazy(() => import("../features/auth/pages/Unauthorized"));

// Protected Layout/Guard
const ProtectedRoute = lazy(
    () => import("../features/auth/components/ProtectedRoute"),
);
const AppLayout = lazy(() => import("../components/layout/AppLayout"));

// Modules
const Dashboard = lazy(() => import("../features/dashboard/Pages/Dashboard"));

// Departments Module
const DepartmentList = lazy(
    () => import("../features/departments/Pages/DepartmentList"),
);
const AddDepartment = lazy(
    () => import("../features/departments/Pages/AddDepartment"),
);
const EditDepartment = lazy(
    () => import("../features/departments/Pages/EditDepartment"),
);

// Subjects Module
const SubjectList = lazy(
    () => import("../features/subjects/pages/SubjectList"),
);
const AddSubject = lazy(() => import("../features/subjects/pages/AddSubject"));
const EditSubject = lazy(
    () => import("../features/subjects/pages/EditSubject"),
);

// ----------------------------------------------------------------------
// Loading Fallback
// ----------------------------------------------------------------------
const PageLoader = () => (
    <div
        style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <h3>Loading...</h3>
    </div>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route
                            path="/"
                            element={<Navigate to="/dashboard" replace />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* Department Routes */}
                        <Route
                            path="/departments"
                            element={<DepartmentList />}
                        />
                        <Route
                            path="/departments/add"
                            element={<AddDepartment />}
                        />
                        <Route
                            path="/departments/:id/edit"
                            element={<EditDepartment />}
                        />

                        {/* Subject Routes */}
                        <Route path="/subjects" element={<SubjectList />} />
                        <Route path="/subjects/add" element={<AddSubject />} />
                        <Route
                            path="/subjects/:id/edit"
                            element={<EditSubject />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
