import { UserService } from './../../service/UserService'
import { Model } from 'sequelize'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import { app } from '../../api/app'
import User from '../../database/entities/User'

chai.use(chaiHttp)

describe('POST /login', () => {
  describe('quando o campo "email" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({})
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "email" é obrigatório' })
    })
  })

  describe('quando o campo "password" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com', username: 'any_username' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" é obrigatório' })
    })
  })

  describe('quando o email não consta no banco de dados', () => {
    before(() => sinon.stub(Model, 'findOne').resolves(null))
    after(() => sinon.restore())

    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com', password: 'any_username' })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({
        error: 'Email ou Password são inválidos'
      })
    })
  })

  describe('quando o email é encontrado mas a senha é incorreta', () => {
    const user = {
      id: 1,
      email: 'any_email@mail.com',
      username: 'any_user',
      password: 'any_password'
    }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    before(() => sinon.stub(UserService.prototype, 'checkPassword').returns(false))
    after(() => sinon.restore())

    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com', password: '123456' })
      expect(httpResponse.status).to.equal(401)
    })
  })

  describe('quando as credenciais estão corretas', () => {
    const user = {
      id: 1,
      email: 'any_email@mail.com',
      username: 'any_user',
      password: 'any_password'
    }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    before(() => sinon.stub(UserService.prototype, 'checkPassword').returns(true))
    after(() => sinon.restore())

    it('deve retornar um status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com', password: '123456' })
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.have.property('token')
      expect(httpResponse.body.token).to.be.a('string')
    })
  })
})
