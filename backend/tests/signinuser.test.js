import { signinUser } from "../controllers/student.controller.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Group from "../models/group.model.js"; 
import Administrator from "../models/administrator.model.js";

jest.mock('../models/student.model.js');
jest.mock('../models/teacher.model.js');
jest.mock('../models/administrator.model.js');
jest.mock('../models/group.model.js');

describe("signinUser", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        Email: "test@example.com",
        password: "password",
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Мокаємо методи, що використовуються у тестах
    Group.findOne = jest.fn();  // Мокаємо Group.findOne
  });

  it("має повернути 200, якщо користувач успішно увійшов як студент", async () => {
    // Мокаємо повернення студентського користувача
    Student.findOne.mockResolvedValue({
      _id: "studentId",
      Email: "test@example.com",
      password: "password",
      group_code: "group123",
      toObject: jest.fn().mockReturnValue({
        _id: "studentId",
        Email: "test@example.com",
        password: "password",
        group_code: "group123",
      })
    });

    // Мокаємо групу студента
    const groupMock = { group_code: "group123", group_name: "Group A" };
    Group.findOne.mockResolvedValue(groupMock);

    await signinUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      userType: "student",
      data: {
        _id: "studentId",
        Email: "test@example.com",
        password: "password",
        group_code: "group123",
        groupDetails: groupMock,
      },
    });
  });

  it("має повернути 404, якщо група для студента не знайдена", async () => {
    Student.findOne.mockResolvedValue({
      _id: "studentId",
      Email: "test@example.com",
      password: "password",
      group_code: "group123",
      toObject: jest.fn().mockReturnValue({
        _id: "studentId",
        Email: "test@example.com",
        password: "password",
        group_code: "group123",
      })
    });

    // Мокаємо, що групи не знайдено
    Group.findOne.mockResolvedValue(null);

    await signinUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Group not found for this student.",
    });
  });

  it("має повернути 404, якщо користувач не знайдений", async () => {
    Student.findOne.mockResolvedValue(null);
    Teacher.findOne.mockResolvedValue(null);
    Administrator.findOne.mockResolvedValue(null);

    await signinUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found.",
    });
  });

  it("має повернути 401, якщо неправильний пароль", async () => {
    Student.findOne.mockResolvedValue({
      _id: "studentId",
      Email: "test@example.com",
      password: "wrongpassword",
      toObject: jest.fn().mockReturnValue({
        _id: "studentId",
        Email: "test@example.com",
        password: "wrongpassword",
      })
    });

    await signinUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid password.",
    });
  });
});
