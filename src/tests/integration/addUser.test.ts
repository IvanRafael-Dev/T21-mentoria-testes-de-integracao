import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Model } from 'sequelize'
import sinon from 'sinon'
import { app } from '../../api/app'
import User from '../../database/entities/User'

chai.use(chaiHttp)

describe('POST /users', () => {
  describe('quando o campo "email" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({})
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "email" é obrigatório' })
    })
  })

  describe('quando o campo "username" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'any_email@mail.com' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "username" é obrigatório' })
    })
  })

  describe('quando o campo "password" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'any_email@mail.com', username: 'any_username' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" é obrigatório' })
    })
  })

  describe('quando a requisição é feita com sucesso', () => {
    const newUser = {
      id: 4,
      username: 'any_username',
      email: 'any_email@mail.com'
    }

    before(() => {
      sinon.stub(Model, 'findOne').resolves(null)
      sinon.stub(Model, 'create').resolves(newUser as User)
    })
    after(() => sinon.restore())
    it('deve retornar um status 201', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'any_email@mail.com', username: 'any_username', password: 'any_password' })
      expect(httpResponse.status).to.equal(201)
      expect(httpResponse.body).to.have.all.keys(['id', 'username', 'email'])
    })
  })
})
