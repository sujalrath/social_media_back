import chai from 'chai';
import chaiHttp from 'chai-http';
import { hashedPassword, User } from '../src/Index.js';
import { server } from '../server.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('User Authentication', () => {

  // beforeEach(async () => {
  //   await User.deleteMany({});
  // });

  describe('POST /register', () => {
    it('should register a user successfully', (done) => {
      chai.request(server)
        .post('/api/user/register')
        .send({
          email: 'sujal@gmail.com',
          password: 'Admin@123',
          userName: 'sujal'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'User registered successfully');
          done();
        });
    });

    it('should not register with an existing email', async () => {
      await User.create({
        email: 'ritik@gmail.com',
        password: await hashedPassword('Admin@123'),
        userName: 'ritik'
      });

      const res = await chai.request(server)
        .post('/api/user/register')
        .send({
          email: 'ritik@gmail.com',
        password: 'Admin@123',
        userName: 'ritik'
        });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Email already exist');
    });

    it('should not register with an existing username', async () => {
      await User.create({
        email: 'sujal@gmail.com',
        password: await hashedPassword('Admin@123'),
        userName: 'sujal'
      });

      const res = await chai.request(server)
        .post('/api/user/register')
        .send({
          email: 'sujal@gmail.com',
        password: 'Admin@123',
        userName: 'sujal'
        });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Username already exist');
    });
  });

  // describe('POST /login', () => {
  //   it('should login a user successfully', async () => {
  //     await User.create({
  //       email: 'mailto:test@example.com',
  //       password: await hashedPassword('password123'),
  //       userName: 'testuser'
  //     });
      
  //     const res = await chai.request(server)
  //       .post('/login')
  //       .send({
  //         email: 'mailto:test@example.com',
  //         password: 'password123'
  //       });
      
  //     expect(res).to.have.status(200);
  //     expect(res.body).to.have.property('message', 'User logged in');
  //     expect(res.body).to.have.property('data');
  //     expect(res.body.data).to.have.property('token');
  //   });

  //   it('should not login with incorrect email', async () => {
  //     const res = await chai.request(server)
  //       .post('/login')
  //       .send({
  //         email: 'mailto:wrong@example.com',
  //         password: 'password123'
  //       });
      
  //     expect(res).to.have.status(401);
  //     expect(res.body).to.have.property('message', 'Incorrect email.');
  //   });

  //   it('should not login with incorrect password', async () => {
  //     await User.create({
  //       email: 'mailto:test@example.com',
  //       password: await hashedPassword('password123'),
  //       userName: 'testuser'
  //     });
      
  //     const res = await chai.request(server)
  //       .post('/login')
  //       .send({
  //         email: 'mailto:test@example.com',
  //         password: 'wrongpassword'
  //       });
      
  //     expect(res).to.have.status(401);
  //     expect(res.body).to.have.property('message', 'Incorrect password.');
  //   });
  // });
});
