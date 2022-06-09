const { Type, Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Pokemon Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      


      //// tests
      describe('Types Validator' , ()=>{
        it('should throw an error if name.length > 10', (done)=>{
          Type.create({name:'nombremayoradiez'})
          .then(()=> done(new Error('It requires a shorter name')))
          .catch(()=>done())
        });
        it('names should be unique, throw error if you repeat the types', (done)=>{
          Type.create({name:'soyhenry'})
          .then(()=>Types.create({name:'soyhenry'}))
          .then(()=>done(new Error('Names should be unique')))
          .catch(()=>done())
        }) 
      })
      ///



    });
  });
});
