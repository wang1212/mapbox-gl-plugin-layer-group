'use strict'

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./build/bundle.umd')
} else {
	module.exports = require('./build/bundle.umd.min')
}
