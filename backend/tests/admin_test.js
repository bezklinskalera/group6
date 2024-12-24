import mongoose from 'mongoose';
import { expect } from 'chai';
import Administrator from "../models/administrator.model.js";

describe('Administrator Model Test', function() {
  before(async function() {
    await mongoose.connect('mongodb+srv://bezklinskalera:1111@testcluster.weomi.mongodb.net/test_dashboard', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Administrator.deleteMany({}); // Очистити колекцію перед тестами
  });

  after(async function() {
    await mongoose.connection.close();
  });

  it('should add an administrator to the database', async function() {
    const adminData = {
      Surname: 'AdminSurname',
      Name: 'AdminName',
      Patronymic: 'Patronymic',
      id_department: 2,
      Email: 'admin@example.com',
      password: 'securePassword'
    };

    const admin = new Administrator(adminData); 
    const savedAdmin = await admin.save();

    expect(savedAdmin).to.have.property('_id');
    expect(savedAdmin.Surname).to.equal('AdminSurname');
    expect(savedAdmin.Name).to.equal('AdminName');
    expect(savedAdmin.Patronymic).to.equal('Patronymic');
    expect(savedAdmin.Email).to.equal('admin@example.com');

    const foundAdmin = await Administrator.findOne({ Surname: 'AdminSurname' });
    expect(foundAdmin).to.not.be.null;
    expect(foundAdmin).to.have.property('Email', 'admin@example.com');
  });
});
