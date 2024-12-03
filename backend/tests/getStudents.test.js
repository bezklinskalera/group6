import { getStudents } from "../controllers/student.controller";
import Student from "../models/student.model";
import { jest } from "@jest/globals";

jest.mock("../models/student.model");

describe("getStudents", () => {
    it("має повернути список студентів із кодом 200", async () => {
        const mockStudents = [{ Name: "John" }, { Name: "Jane" }];
        Student.find.mockResolvedValue(mockStudents);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getStudents(req, res);

        expect(Student.find).toHaveBeenCalledWith({});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockStudents });
    });

    it("має повернути код 500 у випадку помилки сервера", async () => {
        Student.find.mockRejectedValue(new Error("Database Error"));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getStudents(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Server Error" });
    });
});
