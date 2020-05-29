'use strict'

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./build/bundle.esm')
} else {
	module.exports = require('./build/bundle.esm.min')
}
