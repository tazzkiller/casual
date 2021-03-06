var MersenneTwister = require('mersenne-twister');

// Pseudorandom number generator
var generator = new MersenneTwister();

var array_of = function(n, generator) {
	var result = [];
	for (var i = 0; i < n; ++i) {
		result.push(generator());
	}

	return result;
};

var provider = {
	integer: function(from, to) {
		from = typeof from === 'undefined' ? -1000 : from - 0;
		to   = typeof to   === 'undefined' ? +1000 : to - 0;

		return Math.floor(provider.random() * to + from);
	},

	digit: function() {
		return Math.abs(provider.integer(0) % 10);
	},

	random: function() {
		return generator.random();
	},

	double: function(from, to) {
		from = typeof from === 'undefined' ? -1000 : from - 0;
		to   = typeof to   === 'undefined' ? +1000 : to - 0;

		return from + (to - from) * provider.random();
	},

	array_of_digits: function(n) {
		n = n || 7;
		return array_of(n, provider.digit);
	},

	array_of_integers: function(n) {
		n = n || 7;
		return array_of(n, provider.integer);
	},

	array_of_doubles: function(n) {
		n = n || 7;
		return array_of(n, provider.double);
	},

	seed: function(seed) {
		generator.init_seed(seed);
	}
};

module.exports = provider;
