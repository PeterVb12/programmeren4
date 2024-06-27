// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const server = require('../index')
// chai.should()
// chai.use(chaiHttp)
// const userService = require('../src/services/user.service')
// const helper = require('../src/util/helper')
// const endpointToTest = '/api/user'

// describe('UC-201 Registreren als nieuwe user', () => {
//     it('TC-201-1 Verplicht veld ontbreekt', (done) => {
//         chai.request(server)
//             .post(endpointToTest)
//             .send({})
//             .end((err, res) => {
//                 chai.expect(res).to.have.status(400)
//                 chai.expect(res.body.message).to.include(
//                     'Missing required fields'
//                 )
//                 chai.expect(res.body.data).to.be.an('object').that.is.empty
//                 done()
//             })
//     })

//     it('TC-201-2 Niet-valide emailadress', (done) => {
//         chai.request(server)
//             .post(endpointToTest)
//             .send({
//                 firstName: 'Get',
//                 lastName: 'Test',
//                 emailAdress: 'get.testexample.com',
//                 password: 'Validpassword1',
//                 phoneNumber: '0612345678',
//                 street: '123 Test Street',
//                 city: 'Test City'
//             })
//             .end((err, res) => {
//                 chai.expect(res).to.have.status(400)
//                 chai.expect(res.body.message).to.include(
//                     'Invalid emailadress format'
//                 )
//                 chai.expect(res.body.data).to.be.an('object').that.is.empty
//                 done()
//             })
//     })

//     it('TC-201-3 Niet-valide wachtwoord', (done) => {
//         chai.request(server)
//             .post(endpointToTest)
//             .send({
//                 firstName: 'Get',
//                 lastName: 'Test',
//                 emailAdress: 'get.test@example.com',
//                 password: 'notvalidpassword',
//                 phoneNumber: '0612345678',
//                 street: '123 Test Street',
//                 city: 'Test City'
//             })
//             .end((err, res) => {
//                 chai.expect(res).to.have.status(400)
//                 chai.expect(res.body.message).to.include(
//                     'Invalid password format'
//                 )
//                 chai.expect(res.body.data).to.be.an('object').that.is.empty
//                 done()
//             })
//     })


// })
