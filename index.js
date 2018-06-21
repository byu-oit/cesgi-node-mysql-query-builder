const Select = require('./lib/select')
const Insert = require('./lib/insert')
const Update = require('./lib/update')
const Delete = require('./lib/delete')

class Builder {
  constructor () {
    this.queryId = -1
    this.queries = [] // A collection of queries ( i.e. {sql, params}... )
    this._compile = () => {
      this.sql = this.clauses.join(' ') + ';'
      this.params = this.variables

      this.queries[this.queryId] = { sql: this.sql , params: this.params }
    }
    this._setup = () => {
      this.queryId++
      this.clauses = [] // Individual clauses for the current SQL statement
      this.variables = [] // Variables of the current SQL statement
      this.params = [] // Single parameter array
      this.sql = '' // Single SQL statement
    }
  }
}

Builder.prototype.SELECT = Select
Builder.prototype.INSERT = Insert
Builder.prototype.UPDATE = Update
Builder.prototype.DELETE = Delete

module.exports = Builder