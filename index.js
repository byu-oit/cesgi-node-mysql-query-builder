const Select = require('./lib/select')
const Insert = require('./lib/insert')
const Update = require('./lib/update')
const Delete = require('./lib/delete')

class Builder {
  constructor () {
    this.queryId = -1

    this.params = []
    this.sql = ''

    this.clauses = []
    this.queries = []

    this._compile = () => {
      this.queries[this.queryId] = this.clauses.join(' ')
      this.sql = this.queries.map(query => {
        return `${query};`
      }).join('\n')
    }
  }
}

Builder.prototype.SELECT = Select
Builder.prototype.INSERT = Insert
Builder.prototype.UPDATE = Update
Builder.prototype.DELETE = Delete

module.exports = Builder