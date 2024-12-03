import { getStudentsByGroup } from "../controllers/student.controller";
import Group from "../models/group.model";
import Student from "../models/student.model";
import { jest } from "@jest/globals";

jest.mock("../models/group.model");
jest.mock("../models/student.model");

describe("getStudentsByGroup", () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("має повернути студентів групи з кодом 200", async () => {
        const mockGroup = { group_code: "G123" };
        const mockStudents = [{ Name: "John" }, { Name: "Jane" }];

        Group.findOne.mockResolvedValue(mockGroup);
        Student.find.mockResolvedValue(mockStudents);

        const req = { params: { groupCode: "G123" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getStudentsByGroup(req, res);

        expect(Group.findOne).toHaveBeenCalledWith({ group_code: "G123" });
        expect(Student.find).toHaveBeenCalledWith({ group_code: "G123" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockStudents });
    });

    it("має повернути 404, якщо група не знайдена", async () => {
        Group.findOne.mockResolvedValue(null);

        const req = { params: { groupCode: "G123" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getStudentsByGroup(req, res);

        expect(Group.findOne).toHaveBeenCalledWith({ group_code: "G123" });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Group not found." });
    });

    it("має повернути 500 у разі помилки сервера", async () => {
        Group.findOne.mockRejectedValue(new Error("Database Error"));

        const req = { params: { groupCode: "G123" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getStudentsByGroup(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Server Error." });
    });

    it("має повернути 400, якщо groupCode не передано", async () => {
        const req = { params: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getStudentsByGroup(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Group code is required." });
    });
});
