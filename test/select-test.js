/* global describe it beforeEach */
const Builder = require('../index')
const { expect } = require('chai')

describe('MySQL Select Statement Builder', function () {
  let Sql
  beforeEach(function () {
    Sql = new Builder()
  })

  describe('SELECT', function () {
    it('should form the select-all clause and parameters', function () {
      const {sql, params} = Sql.SELECT('*')
      expect(sql).to.equal('SELECT *;')
      expect(params.length).to.equal(0)
    })

    it('should form the select-multiple-columns clause and parameters', function () {
      const {sql, params} = Sql.SELECT(['id', 'name', 'email'])
      expect(sql).to.equal('SELECT id, name, email;')
      expect(params.length).to.equal(0)
    })
  })

  describe('FROM', function () {
    it('should return the from-table-name clause and parameters', function () {
      const {sql, params} = Sql.SELECT('*').FROM('persons')
      
      expect(sql).to.equal('SELECT * FROM persons;')
      expect(params.length).to.equal(0)
    })
  })

  describe('WHERE', function () {
    it('should return the where-condition clause and parameters', function () {
      const {sql, params} = Sql.SELECT('*').FROM('persons').WHERE({id: 1, name: 'John'})
      
      expect(sql).to.equal('SELECT * FROM persons WHERE id = ? AND name = ?;')
      expect(params.length).to.equal(2)
    })
  })

  describe('ORDER BY', function () {
    it('should return the where-condition clause and parameters', function () {
      const {sql, params} = Sql.SELECT('*').FROM('persons').WHERE({id: 1, name: 'John'}).ORDERBY('id')
      
      expect(sql).to.equal('SELECT * FROM persons WHERE id = ? AND name = ? ORDER BY ?;')
      expect(params.length).to.equal(3)
    })
  })

  describe('LIMIT', function () {
    it('should return the where-condition clause and parameters', function () {
      const {sql, params} = Sql.SELECT('*').FROM('persons').WHERE({id: 1, name: 'John'}).ORDERBY('id').LIMIT(100)
      
      expect(sql).to.equal('SELECT * FROM persons WHERE id = ? AND name = ? ORDER BY ? LIMIT ?;')
      expect(params.length).to.equal(4)
    })
  })

  describe('OFFSET', function () {
    it('should return the where-condition clause and parameters', function () {
      const {sql, params} = Sql.SELECT('*').FROM('persons').WHERE({id: 1, name: 'John'}).ORDERBY('id').LIMIT(100).OFFSET(50)
      
      expect(sql).to.equal('SELECT * FROM persons WHERE id = ? AND name = ? ORDER BY ? LIMIT ? OFFSET ?;')
      expect(params.length).to.equal(5)
    })
  })
})