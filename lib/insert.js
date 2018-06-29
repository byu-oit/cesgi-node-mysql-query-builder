function Insert (tableName) {
  this._setup()
  this.VALUES = values

  this.clauses.push(`INSERT`)

  if (!tableName) {
    this.IGNORE = ignore
    this.INTO = into
  } else {
    this.clauses.push(`INTO ${tableName}`)
  }

  this._compile()
  return this
}

function ignore () {
  this.VALUES = values
  this.INTO = into

  this.clauses.push('IGNORE')
  this._compile()

  return this
}

function into (tableName) {
  this.VALUES = values
  if (!tableName) return this

  this.clauses.push(`INTO ${tableName}`)
  this._compile()

  return this
}

function values (newResource) {
  if (!newResource) return this

  const columns = Object.keys(newResource)
  this.clauses.push(`(${columns.join(', ')}) VALUES (${columns.map(column => {
    this.variables.push(newResource[column])
    return '?'
  }).join(', ')})`)
  this._compile()

  return this
}

module.exports = Insert