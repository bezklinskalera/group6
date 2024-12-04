import { getTeachersByDepartment } from "../controllers/student.controller";
import Department from "../models/department.model";
import Teacher from "../models/teacher.model";
import { jest } from "@jest/globals";

jest.mock("../models/department.model");
jest.mock("../models/teacher.model");

describe("getTeachersByDepartment", () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("має повернути викладачів кафедри з кодом 200", async () => {
        const mockDepartment = { name_department: "Computer Science" };
        const mockTeachers = [{ name: "John Doe" }, { name: "Jane Smith" }];

        Department.findOne.mockResolvedValue(mockDepartment);
        Teacher.find.mockResolvedValue(mockTeachers);

        const req = { params: { nameDepartment: "Computer Science" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getTeachersByDepartment(req, res);

        expect(Department.findOne).toHaveBeenCalledWith({ name_department: "Computer Science" });
        expect(Teacher.find).toHaveBeenCalledWith({ name_department: "Computer Science" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockTeachers });
    });

    it("має повернути 404, якщо кафедра не знайдена", async () => {
        Department.findOne.mockResolvedValue(null);

        const req = { params: { nameDepartment: "Nonexistent Department" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getTeachersByDepartment(req, res);

        expect(Department.findOne).toHaveBeenCalledWith({ name_department: "Nonexistent Department" });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Department not found." });
    });

    it("має повернути 500 у разі помилки сервера", async () => {
        Department.findOne.mockRejectedValue(new Error("Database Error"));

        const req = { params: { nameDepartment: "Computer Science" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getTeachersByDepartment(req, res);

        expect(console.error).toHaveBeenCalledWith("Error in getTeachersByDepartment:", "Database Error");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Server Error." });
    });

    it("має повернути 400, якщо nameDepartment не передано", async () => {
        const req = { params: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getTeachersByDepartment(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Department name is required." });
    });
});
