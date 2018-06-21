const { where, orderBy, limit } = require('./core')

function Select (expression) {
  this._setup()
  this.FROM = from
  if (!expression) return this

  this.clauses.push(`SELECT ${Array.isArray(expression) ? expression.join(', ') : expression}`)
  this._compile()

  return this
}

function from (tableName) {
  this.WHERE = where
  this.ORDERBY = orderBy
  this.LIMIT = limit
  if (!tableName) return this

  this.clauses.push(`FROM ${tableName}`)
  this._compile()

  return this
}

module.exports = Select