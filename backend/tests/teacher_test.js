import mongoose from 'mongoose';
import { expect } from 'chai';
import Teacher from "../models/teacher.model.js";

describe('Teacher Model CRUD Operations', function() {
  this.timeout(5000); // Збільшення таймауту для тесту

  before(async function() {
    await mongoose.connect('mongodb+srv://bezklinskalera:1111@testcluster.weomi.mongodb.net/test_dashboard', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Teacher.deleteMany({}); // Очистити колекцію перед тестами
  });

  after(async function() {
    await mongoose.connection.close();
  });

  it('should add a teacher to the database', async function() {
    const teacherData = {
      Surname: 'TeacherSurname',
      Name: 'TeacherName',
      Patronymic: 'Patronymic',
      name_department: 'Math',
      Email: 'teacher@example.com',
      password: 'securePassword'
    };

    const teacher = new Teacher(teacherData); 
    const savedTeacher = await teacher.save();

    expect(savedTeacher).to.have.property('_id');
    expect(savedTeacher.Surname).to.equal('TeacherSurname');
    expect(savedTeacher.Name).to.equal('TeacherName');
    expect(savedTeacher.Patronymic).to.equal('Patronymic');
    expect(savedTeacher.name_department).to.equal('Math');
    expect(savedTeacher.Email).to.equal('teacher@example.com');
  });

  it('should retrieve a teacher by Surname', async function() {
    const foundTeacher = await Teacher.findOne({ Surname: 'TeacherSurname' });
    expect(foundTeacher).to.not.be.null;
    expect(foundTeacher.Email).to.equal('teacher@example.com');
  });

  it('should update a teacher\'s information', async function() {
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { Surname: 'TeacherSurname' },
      { Email: 'updated_teacher@example.com' },
      { new: true }
    );

    expect(updatedTeacher).to.not.be.null;
    expect(updatedTeacher.Email).to.equal('updated_teacher@example.com');
  });

  it('should delete a teacher from the database', async function() {
    const deletedTeacher = await Teacher.findOneAndDelete({ Surname: 'TeacherSurname' });
    expect(deletedTeacher).to.not.be.null;

    const remainingTeachers = await Teacher.find({});
    expect(remainingTeachers).to.have.length(0); // Перевіряємо, що колекція порожня
  });
});
