exports.where = function (expression) {
  this.LIKE = exports.like
  this.ORDERBY = exports.orderBy
  this.LIMIT = exports.limit
  if (!expression) return this

  if (typeof expression === 'string') {
    this.clauses.push(`WHERE ${expression}`)
  } else if (typeof expression === 'object') {
    delete this.LIKE
    let clause = []
    const colNames = Object.keys(expression)
    colNames.forEach((colName) => {
      clause.push(`${colName} = ?`)
      this.variables.push(expression[colName])
    })
    clause = `WHERE ${clause.join(' AND ')}`
    this.clauses.push(clause)
  } else {
    throw new Error('Parameter type error in WHERE function')
  }
  this._compile()

  return this
}

exports.like = function (expression) {
  this.LIMIT = exports.limit
  this.ORDERBY = exports.orderBy
  if (!expression) return this

  this.clauses.push(`LIKE ?`)
  this.variables.push(expression)
  this._compile()

  return this
}

exports.orderBy = function (colNames) {
  this.LIMIT = exports.limit
  if (!colNames) return this

  if (!Array.isArray(colNames)) colNames = [colNames]
  this.clauses.push(`ORDER BY ${colNames.map(colName => {
    this.variables.push(colName)
    return '?'
  }).join(', ')}`)
  this._compile()

  return this
}

exports.limit = function (rowCount) {
  this.OFFSET = exports.offset
  if (!rowCount) return this

  this.clauses.push(`LIMIT ?`)
  this.variables.push(rowCount)
  this._compile()

  return this
}

exports.offset = function (offSet) {
  if (!offSet) return this
  this.clauses.push(`OFFSET ?`)
  this.variables.push(offSet)
  this._compile()

  return this
}