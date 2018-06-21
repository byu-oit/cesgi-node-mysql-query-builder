const { where } = require('./core')

function Delete (tableName) {
  this._setup()
  this.WHERE = where
  if (!tableName) return this

  this.clauses.push(`DELETE FROM ${tableName}`)
  this._compile()

  return this
}

module.exports = Delete