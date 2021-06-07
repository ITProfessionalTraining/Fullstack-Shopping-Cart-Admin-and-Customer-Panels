const REQUEST = require('supertest')
const app = require('../server');
const data = require('./__mocks__/Customer.mock')


describe('The welcome Page must be return not get', () => {

    it('should ', async() => {
        let getCustomerData = await REQUEST.get('');
        expect(getCustomerData.statusCode).toBe(200);
        
    });
    
});