function Insert (tableName) {
  if (!tableName) throw new Error('Missing tableName in INSERT function')
  this.VALUES = values
  this.queryId++

  this.clauses.push(`INSERT INTO ${tableName}`)
  this._compile()

  return this
}

function values (newResource) {
  if (!newResource) throw new Error('Missing expression in INSERT function')

  const columns = Object.keys(newResource)
  this.clauses.push(`(${columns.join(', ')}) VALUES (${columns.map(column => {
    this.params.push(newResource[column])
    return '?'
  }).join(', ')})`)
  this._compile()

  return this
}

module.exports = Insert