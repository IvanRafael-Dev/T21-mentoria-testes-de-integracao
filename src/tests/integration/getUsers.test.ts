import { Model } from 'sequelize'
import jwt from 'jsonwebtoken'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import { app } from '../../api/app'
import User from '../../database/entities/User'

chai.use(chaiHttp)

describe('GET /users', () => {
  describe('quando o token não é informado', () => {
    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/users')
      expect(httpResponse.status).to.equal(401)
    })
  })

  describe('quando o token é inválido', () => {
    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/users')
        .set('authorization', 'invalid_token')
      expect(httpResponse.status).to.equal(401)
    })
  })

  describe('quando o token é válido', () => {
    const users = [{
      id: 4,
      username: 'any_username',
      email: 'any_email@mail.com'
    }]

    before(() => {
      sinon.stub(jwt, 'verify').returns()
      sinon.stub(Model, 'findAll').resolves(users as User[])
    })
    after(() => sinon.restore())

    it('deve retornar um status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/users')
        .set('authorization', 'valid_token')
      expect(httpResponse.status).to.equal(200)
    })
  })
})
