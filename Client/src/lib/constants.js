/**
 * Global Constants for College ERP
 * Centralized configuration to ensure consistency across the application.
 */

// Application Metadata
export const APP_NAME = "College ERP";
export const APP_VERSION = "1.0.0";

// User Roles
export const ROLES = {
    ADMIN: "ADMIN",
    FACULTY: "FACULTY",
    STUDENT: "STUDENT",
};

// Attendance Status
export const ATTENDANCE_STATUS = {
    PRESENT: "PRESENT",
    ABSENT: "ABSENT",
};

// User Details
export const GENDER = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER",
};

// Academic Constants
export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const DEPARTMENTS = [
    "Computer Science Engineering",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Information Technology",
];

// UI Configuration
export const DEFAULT_PAGE_SIZE = 10;

// Application Routes
export const ROUTES = {
    DASHBOARD: "/dashboard",
    STUDENTS: "/students",
    FACULTY: "/faculty",
    DEPARTMENTS: "/departments",
    SUBJECTS: "/subjects",
    ATTENDANCE: "/attendance",
    TIMETABLE: "/timetable",
    RESULTS: "/results",
    PROFILE: "/profile",
    SETTINGS: "/settings",
};
