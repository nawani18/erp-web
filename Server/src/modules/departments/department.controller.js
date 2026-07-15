import DepartmentService from "./department.service.js";
import { SUCCESS_MESSAGES } from "./department.constants.js";
import {
    createDepartmentSchema,
    updateDepartmentSchema,
} from "./department.validation.js";

const createDepartment = async (req, res, next) => {
    try {
        const validatedData = createDepartmentSchema.parse(req.body);
        const department =
            await DepartmentService.createDepartment(validatedData);

        res.status(201).json({
            success: true,
            message: SUCCESS_MESSAGES.DEPARTMENT_CREATED,
            data: department,
        });
    } catch (error) {
        next(error);
    }
};

const getDepartments = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        const result = await DepartmentService.getDepartments(
            page,
            limit,
            search,
        );

        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.DEPARTMENTS_FETCHED,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getDepartmentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const department = await DepartmentService.getDepartmentById(id);

        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.DEPARTMENT_FETCHED,
            data: department,
        });
    } catch (error) {
        next(error);
    }
};

const updateDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validatedData = updateDepartmentSchema.parse(req.body);
        const department = await DepartmentService.updateDepartment(
            id,
            validatedData,
        );

        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.DEPARTMENT_UPDATED,
            data: department,
        });
    } catch (error) {
        next(error);
    }
};

const deleteDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        await DepartmentService.deleteDepartment(id);

        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.DEPARTMENT_DELETED,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
};
