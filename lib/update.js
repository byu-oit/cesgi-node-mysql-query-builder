function Update (tableName, newResource) {
  if (!tableName) throw new Error('Missing tableName in INSERT function')
  if (!newResource) throw new Error('Missing expression in INSERT function')
  this.WHERE = where
  this.queryId++

  const columns = Object.keys(newResource)
  this.clauses.push(`UPDATE ${tableName} SET (${columns.map(column => {
    this.params.push(newResource[column])
    return `${column} = ?`
  }).join(', ')})`)
  this._compile()

  return this
}

const where = function (whereCondition) {
  if (!whereCondition) throw new Error('Missing parameter is WHERE function')

  let clause = []
  const colNames = Object.keys(whereCondition)
  colNames.forEach((colName) => {
    clause.push(`${colName} = ?`)
    this.params.push(whereCondition[colName])
  })
  clause = `WHERE ${clause.join(' AND ')}`
  this.clauses.push(clause)
  this._compile()

  return this
}

module.exports = Update