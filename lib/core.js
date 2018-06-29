exports.where = function where(expression) {
  if (!expression) return this

  if (typeof expression === 'string') {
    this.LIKE = like
    this.clauses.push(`WHERE ${expression}`)
  } else if (typeof expression === 'object') {
    this.ORDERBY = exports.orderBy
    this.LIMIT = exports.limit
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

function like (expression) {
  this.LIMIT = exports.limit
  this.ORDERBY = exports.orderBy
  if (!expression) return this

  this.clauses.push(`LIKE ?`)
  this.variables.push(expression)
  this._compile()

  return this
}

exports.orderBy = function orderBy (colNames, sort) {
  this.LIMIT = exports.limit
  this.DESC = desc
  this.ASC = asc
  if (!colNames) return this

  if (!Array.isArray(colNames)) colNames = [colNames]
  this.clauses.push(`ORDER BY ${colNames.map(colName => {
    this.variables.push(colName)
    return '?'
  }).join(', ')}`)
  this._compile()

  return this
}

function desc () {
  this.LIMIT = exports.limit
  this.clauses.push('DESC')
  this._compile()

  return this
}
function asc () {
  this.LIMIT = exports.limit
  this.clauses.push('ASC')
  this._compile()

  return this
}

exports.limit = function limit (rowCount) {
  this.OFFSET = offset
  if (!rowCount) return this

  this.clauses.push(`LIMIT ?`)
  this.variables.push(rowCount)
  this._compile()

  return this
}

function offset (offSet) {
  if (!offSet) return this
  this.clauses.push(`OFFSET ?`)
  this.variables.push(offSet)
  this._compile()

  return this
}