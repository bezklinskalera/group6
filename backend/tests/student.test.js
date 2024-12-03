import { signupStudent } from "../controllers/student.controller";
import Student from "../models/student.model";
import Group from "../models/group.model";
import { jest } from "@jest/globals";

// Мокування моделей
jest.mock("../models/student.model");
jest.mock("../models/group.model");

describe("signupStudent", () => {
    it("має повернути помилку 400, якщо обов’язкові поля відсутні", async () => {
        const req = { body: { Name: "John" } }; // Неповний запит
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await signupStudent(req, res);

        expect(res.status).toHaveBeenCalledWith(400); // Перевірка статусу
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all required fields.",
        }); // Перевірка відповіді
    });

    it("має повернути 404, якщо групу не знайдено", async () => {
        Group.findOne.mockResolvedValue(null); // Імітація відсутньої групи
        const req = {
            body: { Surname: "Doe", Name: "John", Patronymic: "Ivanov", Email: "john@example.com", group_code: "G123", password: "1234" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await signupStudent(req, res);

        expect(Group.findOne).toHaveBeenCalledWith({ group_code: "G123" });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Group with this group_code not found.",
        });
    });

    it("має повернути 400, якщо студент із таким іменем уже існує в групі", async () => {
        Group.findOne.mockResolvedValue({ group_code: "G123" });
        Student.findOne.mockResolvedValue({}); // Імітація того, що студент уже є в групі
        const req = {
            body: { Surname: "Doe", Name: "John", Patronymic: "Ivanov", Email: "john@example.com", group_code: "G123", password: "1234" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await signupStudent(req, res);

        expect(Student.findOne).toHaveBeenCalledWith({
            Surname: "Doe",
            Name: "John",
            Patronymic: "Ivanov",
            group_code: "G123",
        });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "A student with this full name already exists in the group.",
        });
    });

    it("слід створити студента та оновити групу", async () => {
        Group.findOne.mockResolvedValue({ group_code: "G123" });
        Student.findOne.mockResolvedValue(null); // Імітація того, що такого студента ще немає
        const saveMock = jest.fn().mockResolvedValue();
        Student.mockImplementation(() => ({ save: saveMock }));

        const updateOneMock = jest.fn().mockResolvedValue();
        Group.updateOne = updateOneMock;

        const req = {
            body: { Surname: "Doe", Name: "John", Patronymic: "Ivanov", Email: "john@example.com", group_code: "G123", password: "1234" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await signupStudent(req, res);

        expect(saveMock).toHaveBeenCalled(); // Перевірка виклику методу save
        expect(Group.updateOne).toHaveBeenCalledWith(
            { group_code: "G123" },
            { $inc: { total_number_of_students: 1 } }
        ); // Перевірка оновлення групи
        expect(res.status).toHaveBeenCalledWith(201); // Перевірка статусу
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true })); // Перевірка відповіді
    });

    
});
