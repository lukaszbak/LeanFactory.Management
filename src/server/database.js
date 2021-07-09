let database = {};
let mysql = require('mysql');
let defaultConfig = require('../config/db.config.js').db;
let con = null;

//create a database connection with the given configurations or the defaults located in config.js
database.createConnection = function(configurations = defaultConfig) {
    return mysql.createConnection(configurations);
}


//Query the database This creates and closes a temporary connection.
database.query = function(sql, values, next) {
    if (arguments.length == 2) {
        next = values;
        values = null;
    }

    let connection = this.createConnection();
    connection.connect((err) => {
        if (err) throw err;
    });

    //console.log("IN DB.JS")

    
    
    // connection.beginTransaction(function(err) {
    //     console.log("IN transaction")

        // if (err) throw err;
        connection.query(sql, values, function(err) {
            // console.log("IN Query")

            if (err) {
                // connection.rollback(function() {
                    throw err;
                // });
            }
            // connection.commit(function(err) {
            //     console.log("IN commit")

            //     if (err) {
            //         connection.rollback(function() {
            //             throw err;
            //             console.log("IN rollback")
            //         });
            //     }
            connection.end();
            if (err) throw err; // close the connection
            next.apply(this, arguments);
                // Execute the callback


            });
        // });

    // });
    // next.apply(this, arguments);
}

database.querySync = async function(sql, values, next) {
    if (arguments.length == 2) {
        next = values;
        values = null;
    }

    let connection = this.createConnection();
    connection.connect((err) => {
        if (err) throw err;
    });

    await connection.query(sql, values, function(err) {

        connection.end(); // close the connection

        if (err) throw err;

        // Execute the callback
        next.apply(this, arguments);
    });
}

//example query

/*
//must require this just once
let db = require(./app/database.js');


//query the database
db.query("SELECT * from this_table WHERE ?", {id: 1}, function(err, rows) {
    if(err) throw err;
    console.log(rows);
});

*/




module.exports = database;