import mongoose from 'mongoose';
import { expect } from 'chai';
import Student from "../models/student.model.js";

describe('Student Model CRUD Operations', function() {
  this.timeout(5000); // Збільшення таймауту для тесту

  before(async function() {
    await mongoose.connect('mongodb+srv://bezklinskalera:1111@testcluster.weomi.mongodb.net/test_dashboard', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Student.deleteMany({}); // Очистити колекцію перед тестами
  });

  after(async function() {
    await mongoose.connection.close();
  });

  it('should add a student to the database', async function() {
    const studentData = {
      Surname: 'StudentSurname',
      Name: 'StudentName',
      Patronymic: 'Patronymic',
      group_code: 'CS101',
      Email: 'student@example.com',
      password: 'securePassword'
    };

    const student = new Student(studentData); 
    const savedStudent = await student.save();

    expect(savedStudent).to.have.property('_id');
    expect(savedStudent.Surname).to.equal('StudentSurname');
    expect(savedStudent.Name).to.equal('StudentName');
    expect(savedStudent.Patronymic).to.equal('Patronymic');
    expect(savedStudent.group_code).to.equal('CS101');
    expect(savedStudent.Email).to.equal('student@example.com');
  });

  it('should retrieve a student by Surname', async function() {
    const foundStudent = await Student.findOne({ Surname: 'StudentSurname' });
    expect(foundStudent).to.not.be.null;
    expect(foundStudent.Email).to.equal('student@example.com');
  });

  it('should update a student\'s information', async function() {
    const updatedStudent = await Student.findOneAndUpdate(
      { Surname: 'StudentSurname' },
      { Email: 'updated_student@example.com' },
      { new: true }
    );

    expect(updatedStudent).to.not.be.null;
    expect(updatedStudent.Email).to.equal('updated_student@example.com');
  });

  it('should delete a student from the database', async function() {
    const deletedStudent = await Student.findOneAndDelete({ Surname: 'StudentSurname' });
    expect(deletedStudent).to.not.be.null;

    const remainingStudents = await Student.find({});
    expect(remainingStudents).to.have.length(0); // Перевіряємо, що колекція порожня
  });
});
