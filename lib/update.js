const { where } = require('./core')

function Update (tableName) {
  this._setup()
  this.SET = set
  if (!tableName) return this

  this.clauses.push(`UPDATE ${tableName}`)
  this._compile()

  return this
}

function set (newResource) {
  this.WHERE = where
  if (!newResource) return this

  const columns = Object.keys(newResource)
  this.clauses.push(`SET ${columns.map(column => {
    this.variables.push(newResource[column])
    return `${column} = ?`
  }).join(', ')}`)
  this._compile()

  return this
}

module.exports = Update