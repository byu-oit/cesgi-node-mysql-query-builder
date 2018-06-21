/* global describe it beforeEach */
const Builder = require('../index')
const { expect } = require('chai')

describe('MySQL Multi-Statement Builder', function () {
  let Sql
  beforeEach(function () {
    Sql = new Builder()
  })

  describe('SELECT', function () {
    it('should form the select, delete, insert, and update clauses and parameters', function () {
      const tableName = 'persons'
      const condition = {id: 1}
      const resource = {name: 'John', age: 25}
      const {queries, sql, params} = Sql.SELECT('*').FROM(tableName).WHERE(condition)
        .DELETE(tableName).WHERE(condition)
        .INSERT(tableName).VALUES(resource)
        .UPDATE(tableName).SET(resource)

      expect(queries[0].sql).to.equal('SELECT * FROM persons WHERE id = ?;')
      expect(queries[0].params[0]).to.equal(1)
      expect(queries[0].params.length).to.equal(1)

      expect(queries[1].sql).to.equal('DELETE FROM persons WHERE id = ?;')
      expect(queries[1].params[0]).to.equal(1)
      expect(queries[1].params.length).to.equal(1)

      expect(queries[2].sql).to.equal('INSERT INTO persons (name, age) VALUES (?, ?);')
      expect(queries[2].params[0]).to.equal('John')
      expect(queries[2].params[1]).to.equal(25)
      expect(queries[2].params.length).to.equal(2)

      expect(queries[3].sql).to.equal('UPDATE persons SET (name = ?, age = ?);')
      expect(queries[3].params[0]).to.equal('John')
      expect(queries[3].params[1]).to.equal(25)
      expect(queries[3].params.length).to.equal(2)

      // Check current {sql, params} variables
      expect(sql).to.equal('UPDATE persons SET (name = ?, age = ?);')
      expect(params[0]).to.equal('John')
      expect(params[1]).to.equal(25)
      expect(params.length).to.equal(2)
    })
  })
})