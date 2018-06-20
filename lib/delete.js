function Delete (tableName) {
  if (!tableName) throw new Error('Missing parameter is FROM function')
  this.WHERE = where
  this.queryId++

  this.clauses.push(`DELETE FROM ${tableName}`)
  this._compile()

  return this
}

const where = function (whereCondition) {
  if (!whereCondition) throw new Error('Missing parameter is WHERE function')
  this.ORDERBY = orderBy
  this.LIMIT = limit

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

const orderBy = function (colNames) {
  if (!colNames) throw new Error('Missing parameter is ORDERBY function')
  this.LIMIT = limit

  if (!Array.isArray(colNames)) colNames = [colNames]
  this.clauses.push(`ORDER BY ${colNames.map(colName => {
    this.params.push(colName)
    return '?'
  }).join(', ')}`)
  this._compile()

  return this
}

const limit = function (rowCount) {
  if (!rowCount) throw new Error('Missing parameter is LIMIT function')
  this.OFFSET = offset
  this.clauses.push(`LIMIT ?`)
  this.params.push(rowCount)
  this._compile()

  return this
}

const offset = function (offSet) {
  if (!offSet) throw new Error('Missing parameter is OFFSET function')
  this.clauses.push(`OFFSET ?`)
  this.params.push(offSet)
  this._compile()

  return this
}

module.exports = Delete