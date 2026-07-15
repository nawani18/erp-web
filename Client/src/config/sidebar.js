export const adminNavigation = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: "LayoutDashboard",
        path: "/dashboard",
    },
    { id: "students", title: "Students", icon: "Users", path: "/students" },
    { id: "faculty", title: "Faculty", icon: "UserCheck", path: "/faculty" },
    {
        id: "departments",
        title: "Departments",
        icon: "Building2",
        path: "/departments",
        children: [
            {
                id: "departments-list",
                title: "Department List",
                path: "/departments",
            },
            {
                id: "departments-add",
                title: "Add Department",
                path: "/departments/add",
            },
        ],
    },
    { id: "subjects", title: "Subjects", icon: "BookOpen", path: "/subjects" },
    {
        id: "attendance",
        title: "Attendance",
        icon: "CalendarCheck",
        path: "/attendance",
    },
    {
        id: "timetable",
        title: "Timetable",
        icon: "CalendarDays",
        path: "/timetable",
    },
    { id: "results", title: "Results", icon: "FileText", path: "/results" },
    { id: "profile", title: "Profile", icon: "UserCircle", path: "/profile" },
    { id: "settings", title: "Settings", icon: "Settings", path: "/settings" },
];

export const facultyNavigation = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: "LayoutDashboard",
        path: "/dashboard",
    },
    { id: "students", title: "Students", icon: "Users", path: "/students" },
    { id: "subjects", title: "Subjects", icon: "BookOpen", path: "/subjects" },
    {
        id: "attendance",
        title: "Attendance",
        icon: "CalendarCheck",
        path: "/attendance",
        children: [
            {
                id: "attendance-mark",
                title: "Mark Attendance",
                path: "/attendance/mark",
            },
            {
                id: "attendance-reports",
                title: "Reports",
                path: "/attendance/reports",
            },
        ],
    },
    {
        id: "timetable",
        title: "Timetable",
        icon: "CalendarDays",
        path: "/timetable",
    },
    {
        id: "results",
        title: "Results",
        icon: "FileText",
        path: "/results",
        children: [
            {
                id: "results-upload",
                title: "Upload Marks",
                path: "/results/upload",
            },
            {
                id: "results-view",
                title: "View Results",
                path: "/results/view",
            },
        ],
    },
    { id: "profile", title: "Profile", icon: "UserCircle", path: "/profile" },
    { id: "settings", title: "Settings", icon: "Settings", path: "/settings" },
];

export const studentNavigation = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: "LayoutDashboard",
        path: "/dashboard",
    },
    {
        id: "subjects",
        title: "My Subjects",
        icon: "BookOpen",
        path: "/subjects",
    },
    {
        id: "attendance",
        title: "My Attendance",
        icon: "CalendarCheck",
        path: "/attendance",
    },
    {
        id: "timetable",
        title: "Timetable",
        icon: "CalendarDays",
        path: "/timetable",
    },
    { id: "results", title: "Results", icon: "FileText", path: "/results" },
    { id: "profile", title: "Profile", icon: "UserCircle", path: "/profile" },
    { id: "settings", title: "Settings", icon: "Settings", path: "/settings" },
];

export const sidebarConfig = {
    ADMIN: adminNavigation,
    FACULTY: facultyNavigation,
    STUDENT: studentNavigation,
};
