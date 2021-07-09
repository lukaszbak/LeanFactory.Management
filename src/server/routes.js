// This file defines the behavior of all HTTP requests made to the server


//this module exports is how this file gets used.
//The parameter is the Express app for the server.
// use require(./app/routes.js)(app) to call the following function


let simulation = require("./simulation.js");
let db = require('./database.js');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


passport.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        (username, password, done) => {

            sql = "SELECT Student.lastName AS name, StudentTeams.TeamID as teamID FROM Student JOIN  StudentTeams ON Student.ID = StudentTeams.StudentID WHERE Student.lastName = ? AND StudentTeams.teamID = ?"
            db.query(sql, [username, password], function(err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    done(null, Object.assign({}, rows[0]))
                } else {
                    done(null, false, { message: 'Incorrect username or password' })
                }
            });
        }
    )
)


passport.serializeUser((user, done) => {
    done(null, { id: user.ID, name: user.lastName, teamID: user.teamID })
})


passport.deserializeUser((user, done) => {
    sql = "SELECT * FROM Student WHERE ID = ?"
    db.query(sql, [user.ID], function(err, rows) {
        if (err) throw err;
        done(null, Object.assign({}, rows[0]))
    });
})


const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(app, dir) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.post("/api/login", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).send([user, "Cannot log in", info]);
            }
            req.login(user, err => {
                res.send("Logged in");
            });
        })(req, res, next);
    });

    app.get("/api/logout", function(req, res) {
        req.logout();
        return res.send();
    });

    app.get('/api/register', function(req, res) {
        console.log("in route reg");
        simulation.register(req, res)
    })

    app.get("/api/user", authMiddleware, (req, res) => {
        sql = "SELECT * FROM Student WHERE ID = ?"
        db.query(sql, [req.session.passport.user.id], function(err, rows) {
            if (err) throw err;
            res.send({ user: Object.assign({}, rows[0]) })
        });
    })



    app.get("/api/get_user_teams", authMiddleware, (req, res) => {

        const sql = "SELECT ID, name, isActive\
                    FROM Team JOIN StudentTeams\
                    ON Team.ID = StudentTeams.TeamID\
                    WHERE StudentID = ?"

        const values = [req.session.passport.user.id]
        db.query(sql, values, function(err, rows) {
            if (err) throw err;
            res.json({ teams: rows })
        });
    })


    app.get('/api/get_ticksPerDay', function(req, res) {
        simulation.get_ticksPerDay(req, res)
    })

    app.get('/api/sidebar', function(req, res) {
        simulation.sidebar(req, res)
    })

    //================ Real Routes =============

    app.get('/api/current_cash', function(req, res) {
        simulation.current_cash(req, res)

        //send res to front-end
    });

    app.get('/api/get_standings', function(req, res) {
        simulation.get_standings(req, res)
    });

    app.get('/api/get_team_variable', function(req, res) {
        simulation.get_team_variable(req, res)

        //send res to front-end
    });

    app.get('/api/machine_buy_prices', function(req, res) {
        simulation.machine_buy_prices(req, res)

        //send res to front-end
    });

    app.get('/api/current_queue1', function(req, res) {
        simulation.current_queue1(req, res)

        //send res to front-end
    });

    app.get('/api/current_queue2', function(req, res) {
        simulation.current_queue2(req, res)

        //send res to front-end
    });

    app.get('/api/current_queue3', function(req, res) {
        simulation.current_queue3(req, res)

        //send res to front-end
    });

    app.get('/api/buy_machine1', function(req, res) {
        simulation.buy_machine1(req, res)

        //send res to front-end
    });

    app.get('/api/buy_machine2', function(req, res) {
        simulation.buy_machine2(req, res)

        //send res to front-end
    });

    app.get('/api/buy_machine3', function(req, res) {
        simulation.buy_machine3(req, res)

        //send res to front-end
    });

    app.get('/api/sell_machine1', function(req, res) {
        simulation.sell_machine1(req, res)

        //send res to front-end
    });

    app.get('/api/sell_machine2', function(req, res) {
        simulation.sell_machine2(req, res)

        //send res to front-end
    });

    app.get('/api/sell_machine3', function(req, res) {
        simulation.sell_machine3(req, res)

        //send res to front-end
    });

    app.get('/api/machine1_prices', function(req, res) {
        simulation.machine1_prices(req, res)

        //send res to front-end
    });

    app.get('/api/machine2_prices', function(req, res) {
        simulation.machine2_prices(req, res)

        //send res to front-end
    });

    app.get('/api/machine3_prices', function(req, res) {
        simulation.machine3_prices(req, res)

        //send res to front-end
    });

    app.get('/api/machine1_tick_data', function(req, res) {
        simulation.machine1_tick_data(req, res)

        //send res to front-end
    });

    app.get('/api/machine2_tick_data', function(req, res) {
        simulation.machine2_tick_data(req, res)

        //send res to front-end
    });

    app.get('/api/machine3_tick_data', function(req, res) {
        simulation.machine3_tick_data(req, res)

        //send res to front-end
    });

    app.get('/api/set_machine2_priority', function(req, res) {
        simulation.set_machine2_priority(req, res)

        //send res to front-end
    });

    app.get('/api/current_priority', function(req, res) {
        simulation.current_priority(req, res)

        //send res to front-end
    });

    app.get('/api/export_machine_data', function(req, res) {
        simulation.export_machine_data(req, res)

        //send res to front-end
    });

    // ================ Jobs and Materials ================

    app.get('/api/get_material_info', function(req, res) {
        simulation.get_material_info(req, res)

    });

    app.get('/api/set_material_order_amount', function(req, res) {
        simulation.set_material_order_amount(req, res)
    });

    app.get('/api/set_material_order_threshold', function(req, res) {
        simulation.set_material_order_threshold(req, res)
    });
    // ================= Sales Page =======================

    app.get('/api/contract_type', function(req, res) {
        simulation.contract_type(req, res)

        //send res to front-end
    });

    app.get('/api/set_contract_type', function(req, res) {
        simulation.set_contract_type(req, res)

        //send res to front-end
    });

    app.get('/api/jobs_completed', function(req, res) {
        simulation.jobs_completed(req, res)

        //send res to front-end
    });

    app.get("/api/get_contract_info", function(req, res) {
        simulation.get_contract_info(req, res)

        //send res to front end
    })

    app.get('/api/jobs_in_progress', function(req, res) {
        simulation.jobs_in_progress(req, res)

        //send res to front-end
    });

    app.get('/api/get_finances', function(req, res) {
        simulation.get_finances(req, res)

        //send res to front-end
    });







    // application -------------------------------------------------------------

    // app.get('/factory', function(req, res) {
    //     // load the single view file (angular will handle the page updates on the front-end)
    //     res.sendFile(dir + '/public/todo.html');
    // });


    // app.get('*', function(req, res) {
    //     // load the single view file (angular will handle the page updates on the front-end)
    //     res.sendFile(dir + '/public/index.html');
    // });



}