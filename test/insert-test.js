/* global describe it beforeEach */
const Builder = require('../index')
const { expect } = require('chai')

describe('MySQL Insert Statement Builder', function () {
  let Sql
  beforeEach(function () {
    Sql = new Builder()
  })

  describe('INSERT', function () {
    it('should form the insert clause and parameters', function () {
      const next = Sql.INSERT('persons')

      expect(next.sql).to.equal('INSERT INTO persons;')
      expect(next.params.length).to.equal(0)
    })
  })

  describe('INSERT IGNORE', function () {
    it('should form the insert clause and parameters', function () {
      const next = Sql.INSERT().IGNORE().INTO('persons')

      expect(next.sql).to.equal('INSERT IGNORE INTO persons;')
      expect(next.params.length).to.equal(0)
    })
  })

  describe('INSERT', function () {
    it('should form the insert-values clause and parameters', function () {
      const next = Sql.INSERT('persons').VALUES({ name: 'John', age: 25})

      expect(next.sql).to.equal('INSERT INTO persons (name, age) VALUES (?, ?);')
      expect(next.params.length).to.equal(2)
    })
  })
})