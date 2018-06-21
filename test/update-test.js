/* global describe it beforeEach */
const Builder = require('../index')
const { expect } = require('chai')

describe('MySQL Update Statement Builder', function () {
  let Sql
  beforeEach(function () {
    Sql = new Builder()
  })

  describe('UPDATE', function () {
    it('should form the update clause and parameters', function () {
      const {sql, params} = Sql.UPDATE('persons')

      expect(sql).to.equal('UPDATE persons;')
      expect(params.length).to.equal(0)
    })
  })

  describe('SET', function () {
    it('should form the set clause and parameters', function () {
      const {sql, params} = Sql.UPDATE('persons').SET({ name: 'John Doe', age: 25})

      expect(sql).to.equal('UPDATE persons SET (name = ?, age = ?);')
      expect(params.length).to.equal(2)
    })
  })

  describe('WHERE', function () {
    it('should form the where-condition clause and parameters', function () {
      const {sql, params} = Sql.UPDATE('persons').SET({ name: 'John Doe', age: 25}).WHERE({name: 'John'})

      expect(sql).to.equal('UPDATE persons SET (name = ?, age = ?) WHERE name = ?;')
      expect(params.length).to.equal(3)
    })
  })
})