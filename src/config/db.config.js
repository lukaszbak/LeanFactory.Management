//set the server to run on port 80 unless a commandline argument is passed in
function getPort() {
    if (process.argv.length > 2) {
        return process.argv[2];
    } else {
        return 80;
    }
}



let config = {};

config.db = {
    host: 'mysql-1.c5wvvhaj5rwj.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'tcp12345',
    database: 'db3'
};

config.port = getPort();

module.exports = config;