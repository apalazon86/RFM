var deployd = require('deployd');

var dpd = deployd({
	port: process.env.app_port || '2403',
	db: {
		connectionString: 'mongodb://apalazon:1234@ds011382.mlab.com:11382/rfmdb?authMechanism=SCRAM-SHA-1'
	}
});

dpd.listen();