import mongoose from 'mongoose';
import { expect } from 'chai';
import Administrator from "../models/administrator.model.js";

describe('Administrator Model CRUD Operations', function() {
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
  });

  it('should retrieve an administrator by Surname', async function() {
    const foundAdmin = await Administrator.findOne({ Surname: 'AdminSurname' });
    expect(foundAdmin).to.not.be.null;
    expect(foundAdmin.Email).to.equal('admin@example.com');
  });

  it('should update an administrator\'s information', async function() {
    const updatedAdmin = await Administrator.findOneAndUpdate(
      { Surname: 'AdminSurname' },
      { Email: 'updated@example.com' },
      { new: true }
    );
    
    expect(updatedAdmin).to.not.be.null;
    expect(updatedAdmin.Email).to.equal('updated@example.com');
  });

  it('should delete an administrator from the database', async function() {
    const deletedAdmin = await Administrator.findOneAndDelete({ Surname: 'AdminSurname' });
    expect(deletedAdmin).to.not.be.null;
    
    const remainingAdmins = await Administrator.find({});
    expect(remainingAdmins).to.have.length(0); // Перевіряємо, що колекція порожня
  });
});
