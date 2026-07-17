import SubjectService from "./subject.service.js";
import { SUCCESS_MESSAGES } from "./subject.constants.js";

export const createSubject = async (req, res, next) => {
    try {
        const subject = await SubjectService.createSubject(req.body);
        res.status(201).json({
            success: true,
            message: SUCCESS_MESSAGES.SUBJECT_CREATED,
            data: subject,
        });
    } catch (error) {
        console.log("dd");
        next(error);
    }
};

export const getSubjects = async (req, res, next) => {
    try {
        const { page, limit, search, departmentId } = req.query;
        const result = await SubjectService.getSubjects(
            page ? parseInt(page) : undefined,
            limit ? parseInt(limit) : undefined,
            search,
            departmentId,
        );
        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.SUBJECTS_FETCHED,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getSubjectById = async (req, res, next) => {
    try {
        const subject = await SubjectService.getSubjectById(req.params.id);
        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.SUBJECT_FETCHED,
            data: subject,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubject = async (req, res, next) => {
    try {
        const subject = await SubjectService.updateSubject(
            req.params.id,
            req.body,
        );
        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.SUBJECT_UPDATED,
            data: subject,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSubject = async (req, res, next) => {
    try {
        await SubjectService.deleteSubject(req.params.id);
        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.SUBJECT_DELETED,
        });
    } catch (error) {
        next(error);
    }
};
