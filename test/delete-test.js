/* global describe it beforeEach */
const Builder = require('../index')
const { expect } = require('chai')

describe('MySQL Delete Statement Builder', function () {
  let Sql
  beforeEach(function () {
    Sql = new Builder()
  })

  describe('DELETE', function () {
    it('should form the delete clause and parameters', function () {
      const {sql, params} = Sql.DELETE('persons')
      expect(sql).to.equal('DELETE FROM persons;')
      expect(params.length).to.equal(0)
    })
  })

  describe('WHERE', function () {
    it('should return the where-condition clause and parameters', function () {
      const {sql, params} = Sql.DELETE('persons').WHERE({name: 'John'})

      expect(sql).to.equal('DELETE FROM persons WHERE name = ?;')
      expect(params.length).to.equal(1)
    })
  })

  describe('LIKE', function () {
    it('should return the like clause and parameters', function () {
      const {sql, params} = Sql.DELETE('persons').WHERE('name').LIKE('%John%')

      expect(sql).to.equal('DELETE FROM persons WHERE name LIKE ?;')
      expect(params.length).to.equal(1)
    })
  })

  describe('ORDER BY', function () {
    it('should return the where-condition clause and parameters', function () {
      const {sql, params} = Sql.DELETE('persons').WHERE({name: 'John'}).ORDERBY('id')

      expect(sql).to.equal('DELETE FROM persons WHERE name = ? ORDER BY ?;')
      expect(params.length).to.equal(2)
    })
  })

  describe('LIMIT', function () {
    it('should return the where-condition clause and parameters', function () {
      const {sql, params} = Sql.DELETE('persons').WHERE({name: 'John'}).ORDERBY('id').LIMIT(100)

      expect(sql).to.equal('DELETE FROM persons WHERE name = ? ORDER BY ? LIMIT ?;')
      expect(params.length).to.equal(3)
    })
  })

  describe('OFFSET', function () {
    it('should return the where-condition clause and parameters', function () {
      const {sql, params} = Sql.DELETE('persons').WHERE({name: 'John'}).ORDERBY('id').LIMIT(100).OFFSET(50)

      expect(sql).to.equal('DELETE FROM persons WHERE name = ? ORDER BY ? LIMIT ? OFFSET ?;')
      expect(params.length).to.equal(4)
    })
  })
})