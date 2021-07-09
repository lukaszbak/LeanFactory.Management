let simulation = {};

let db = require('./database.js');

//Use this as an example
simulation.database_test = function(req, res) {
    db.query("SELECT * from Student", function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

// req.query.amount
simulation.register = function(req, res) { // Done
    const sql = "CALL new_user( ? , ? ) ;"
    const values = [req.query.firstName, req.query.lastName]
    console.log(values)
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows[0]);
        //console.log(rows[0]);
    });
}

simulation.test_get_student = function(req, res) {
    //console.log(req.query);
    //console.log(req.params);
    db.query("SELECT * from Student WHERE firstName = ?", req.query.id, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

simulation.test_get_teams = function(req, res) {
    db.query("SELECT * from Team", function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

simulation.parameter_test = function(req, res) {
        db.query("SELECT * from Student", function(err, rows) {
            if (err) throw err;
            console.log(req.query);
            res.json(rows);
        });
    }
    /*
     database_test({name: "kyle", ID: 145})
    req.quelocalhost:3000/api/database_test?name=kyle&ID=145
    database_test({name: "kyle", ID: 145})
    req.query.name
    */
simulation.get_ticksPerDay = function(req, res) { // Done
    const sql = "SELECT ticksPerDay\
        FROM SettingsSeed\
        WHERE ID =\
            (SELECT SettingsSeedID\
            FROM Simulation\
            WHERE ID =\
                (SELECT SimulationID\
                FROM Team\
                WHERE ID = ?))"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        console.log(rows[0].ticksPerDay)
        res.json(rows[0]);
    });
}



simulation.sidebar = function(req, res) {
        const sql1 = "SELECT money\
                FROM Team\
                WHERE ID = ?"

        const sql2 = "SELECT MAX(tickNum) AS tickNum\
                FROM TickData\
                WHERE TeamID = ?"

        const sql3 = "SELECT simLength, ticksPerDay\
                FROM SettingsSeed\
                WHERE ID =\
                    (SELECT SettingsSeedID\
                    FROM Simulation\
                    WHERE ID =\
                        (SELECT SimulationID\
                        FROM Team\
                        WHERE ID = ?))"

        const values = [req.session.passport.user.teamID]
            //console.log("TEAMID: " + values[0])
        db.query(sql1, values, function(err, rows1) {
            if (err) throw err;
            //console.log("Step1")
            db.query(sql2, values, function(err, rows2) {
                if (err) throw err;
                //console.log("Step2")
                db.query(sql3, values, function(err, rows3) {
                    if (err) throw err;
                    //console.log("Step3")
                    //console.log(rows3[0])
                    //console.log(rows3[0].ticksPerDay);
                    //console.log(rows2[0].tickNum + " " + rows3[0].ticksPerDay + " " + rows3[0].simLength)
                    var cDay = Math.floor(rows2[0].tickNum / rows3[0].ticksPerDay)
                    var eDay = rows3[0].simLength / rows3[0].ticksPerDay
                    res.json({
                        money: rows1[0].money,
                        currentDay: cDay,
                        endDay: eDay,
                    });
                });
            });
        });
    }
    // ===============    FACTORY MACHINES PAGE ============================= 

//req.session.passport.user.teamID
simulation.current_cash = function(req, res) { // Done
    const sql = "SELECT money\
                FROM Team\
                WHERE ID = ?"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.machineNum (or any other variable wanted) HAD DOUBLE ?
//req.query.teamID
simulation.get_team_variable = function(req, res) {
    const sql = "SELECT ?? as data\
                FROM Team\
                WHERE ID = ?"
    const values = [req.query.column, req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(Object.assign({}, rows[0]));
    });
}

//req.query.teamID
simulation.machine_buy_prices = function(req, res) { // Done
    const sql = "SELECT machine1cost, machine2Cost, machine3Cost\
                FROM SettingsSeed\
                WHERE ID =\
                    (SELECT SettingsSeedID\
                    FROM Simulation\
                    WHERE ID =\
                        (SELECT SimulationID\
                        FROM Team\
                        WHERE ID = ?))"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
simulation.current_queue1 = function(req, res) { // Done
    const sql = "SELECT machine1Queue\
                FROM TickData\
                WHERE TeamID = ?"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
simulation.current_queue2 = function(req, res) { // Done
    const sql = "SELECT *\
                FROM Machine2Queue\
                WHERE TeamID = ?"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
simulation.current_queue3 = function(req, res) { // Done
    const sql = "SELECT machine3Queue\
                FROM TickData\
                WHERE TeamID = ?"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

// req.query.amount
simulation.buy_machine1 = function(req, res) { // Done
    const sql = "CALL buy_machine_1( ? , ? ) ;"
    const values = [req.session.passport.user.teamID, req.query.amount]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

// req.query.amount
simulation.buy_machine2 = function(req, res) { // Done
    const sql = "CALL buy_machine_2( ? , ? ) ;"
    const values = [req.session.passport.user.teamID, req.query.amount]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

// req.query.amount
simulation.buy_machine3 = function(req, res) { // Done
    const sql = "CALL buy_machine_3( ? , ? ) ;"
    const values = [req.session.passport.user.teamID, req.query.amount]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

simulation.machine1_prices = function(req, res) { // Done
    const sql = "SELECT machine1Cost, machine1SellPrice \
                FROM SettingsSeed \
                WHERE ID = ( SELECT SettingsSeedID \
                            FROM Simulation \
                            WHERE ID = ( SELECT SimulationID \
                                        FROM Team \
                                        WHERE ID = ?));"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

simulation.machine2_prices = function(req, res) { // Done
    const sql = "SELECT machine2Cost, machine2SellPrice \
                FROM SettingsSeed \
                WHERE ID = ( SELECT SettingsSeedID \
                            FROM Simulation \
                            WHERE ID = ( SELECT SimulationID \
                                        FROM Team \
                                        WHERE ID = ?));"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

simulation.machine3_prices = function(req, res) { // Done
    const sql = "SELECT machine3Cost, machine3SellPrice \
                FROM SettingsSeed \
                WHERE ID = ( SELECT SettingsSeedID \
                            FROM Simulation \
                            WHERE ID = ( SELECT SimulationID \
                                        FROM Team \
                                        WHERE ID = ?));"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}



// req.query.amount
simulation.sell_machine1 = function(req, res) { // Done
    const sql = "CALL sell_machine_1( ? , ? ) ;"
    const values = [req.session.passport.user.teamID, req.query.amount]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

// req.query.amount
simulation.sell_machine2 = function(req, res) { // Done
    const sql = "CALL sell_machine_2( ? , ? ) ;"
    const values = [req.session.passport.user.teamID, req.query.amount]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

// req.query.amount
simulation.sell_machine3 = function(req, res) { // Done
    const sql = "CALL sell_machine_3( ? , ? ) ;"
    const values = [req.session.passport.user.teamID, req.query.amount]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}


//req.query.teamID
simulation.machine1_tick_data = function(req, res) { // Done
    const sql = "SELECT tickNum, machine1Queue as queue, process1Productivity as productivity, numMachines1 as numMachines\
                FROM TickData T\
                Where TeamID = ?\
                ORDER BY tickNum ASC"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        //console.log(rows)
        res.json(rows);
    });
}

//req.query.teamID
simulation.machine2_tick_data = function(req, res) { // Done
    const sql = "SELECT tickNum, machine2Queue1 as queue, machine2Queue3 as queue2, process2Productivity as productivity, process4Productivity as productivity2, numMachines2 as numMachines, machine2Priority\
                FROM TickData\
                WHERE TeamID = ?\
                ORDER BY tickNum ASC"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
simulation.machine3_tick_data = function(req, res) { // Done
    const sql = "SELECT tickNum, machine3Queue as queue, process3Productivity as productivity, numMachines3 as numMachines\
                FROM TickData\
                WHERE TeamID = ?\
                ORDER BY tickNum ASC"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
//req.query.priority
simulation.set_machine2_priority = function(req, res) { // Done
    const sql = "UPDATE Team\
                SET machine2Priority = ?\
                WHERE ID = ?"
    const values = [+req.query.priority, req.session.passport.user.teamID]
    if (values[0] >= 0 && values[0] <= 2) {
        try {
            db.query(sql, values, function(err, rows) {
                res.json(rows);
            });
        } catch (err) {
            window.alert("Database Busy");
        }
    } else {
        res.json({})
    }
}

//req.query.teamID
simulation.current_priority = function(req, res) { // Done
    const sql = "SELECT machine2Priority\
                FROM Team\
                WHERE ID = ?"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
simulation.export_machine_data = function(req, res) { // Done
    const sql = "SELECT tickNum,\
                        machine1Queue, process1Productivity, numMachines1,\
                        machine2Queue1, machine2Queue3, process2Productivity, machine2Priority, numMachines2, process4Productivity\
                        machine3Queue, process3Productivity, numMachines3\
                FROM TickData\
                WHERE TeamID = ?\
                ORDER BY tickNum ASC"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

// ===============    Materials and Jobs Page =========================

//req.query.teamID
simulation.contract_type = function(req, res) {
    const sql = "SELECT contractType\
                FROM Team\
                WHERE ID = ?"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
//req.query.type
simulation.set_contract_type = function(req, res) {
    const sql = "UPDATE Team\
                SET contractType = ?\
                WHERE ID = ?"
    const values = [req.query.type, req.session.passport.user.teamID]
    try {
        db.query(sql, values, function(err, rows) {
            res.json(rows);
        });
    } catch (err) {
        window.alert("Database Busy");
    }
}

//req.query.teamID
simulation.get_contract_info = function(req, res) {
    const sql = "SELECT kitsPerType1, kitsPerType2, kitsPerType3, timePerType1, timePerType2, timePerType3, \
                    revenuePerType1, revenuePerType2, revenuePerType3, ticksPerDay \
                FROM SettingsSeed \
                WHERE ID = \
                    (SELECT SettingsSeedID\
                    FROM Simulation\
                    WHERE ID = \
                        (SELECT SimulationID\
                        FROM Team\
                        WHERE ID = ?))"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

simulation.get_material_info = function(req, res) {
    const sql = "SELECT orderAmount, orderThreshhold, materials, lastMaterialOrderTick, shipmentCost, materialShipmentLength, lastMaterialOrderAmount, ticksPerDay, pricePerMaterial \
                    FROM TickData, Team, SettingsSeed, Simulation \
                    WHERE Team.ID = ? AND TickData.TeamID = ? AND Team.SimulationID = Simulation.ID AND SettingsSeed.ID = Simulation.SettingsSeedID AND TickData.tickNum = \
                    (SELECT MAX(tickNum) FROM TickData WHERE teamID = ?)"

    const values = [req.session.passport.user.teamID, req.session.passport.user.teamID, req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

simulation.set_material_order_amount = function(req, res) {
    const sql = "UPDATE Team\
                SET orderAmount = ?\
                WHERE ID = ?"

    const values = [req.query.amount, req.session.passport.user.teamID]
    if (!isNaN(values[0])) {
        db.query(sql, values, function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    } else res.json({})
}

simulation.set_material_order_threshold = function(req, res) {
    const sql = "UPDATE Team\
                SET orderThreshhold = ?\
                WHERE ID = ?"

    const values = [req.query.amount, req.session.passport.user.teamID]
    if (!isNaN(values[0])) {
        try {
            db.query(sql, values, function(err, rows) {
                res.json(rows);
            });
        } catch (err) {
            window.alert("Database Busy");
        }
    } else res.json({})


}

// ===============    SALES FINANCES PAGE ============================= 

//req.query.teamID
simulation.contract_type = function(req, res) {
    const sql = "SELECT contractType\
                FROM Team\
                WHERE ID = ?"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
//req.query.type
simulation.set_contract_type = function(req, res) {
    const sql = "UPDATE Team\
                SET contractType = ?\
                WHERE ID = ?"
    const values = [req.query.type, req.session.passport.user.teamID]
    if (+req.query.type >= 0 && req.query.type <= 2) {
        try {
            db.query(sql, values, function(err, rows) {
                res.json(rows);
            });
        } catch (err) {
            window.alert("Database Busy");
        }
    } else {
        res.json({})
    }
}

//req.query.teamID
simulation.get_contract_info = function(req, res) {
    const sql = "SELECT kitsPerType1, kitsPerType2, kitsPerType3, timePerType1, timePerType2, timePerType3, \
                    revenuePerType1, revenuePerType2, revenuePerType3, ticksPerDay \
                FROM SettingsSeed \
                WHERE ID = \
                    (SELECT SettingsSeedID\
                    FROM Simulation\
                    WHERE ID = \
                        (SELECT SimulationID\
                        FROM Team\
                        WHERE ID = ?))"
    const values = [req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
simulation.jobs_completed = function(req, res) {
    const sql = "SELECT jobsCompleted1, jobsCompleted2, jobsCompleted3\
                FROM TickData\
                WHERE TeamID = ? AND tickNum = \
                            (SELECT MAX(tickNum) FROM TickData \
                            WHERE TeamID = ?)"
    const values = [req.session.passport.user.teamID, req.session.passport.user.teamID]
    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    });
}

//req.query.teamID
simulation.jobs_in_progress = function(req, res) {
    const sql1 = "SELECT contract, numjobs, startTick, endTick\
                FROM JobData\
                WHERE TeamID = ? AND isFinished = FALSE\
                ORDER BY startTick ASC"

    const sql2 = "SELECT COUNT (numJobs) as numJobsInProgress1\
                FROM JobData\
                WHERE TeamID = ? AND isFinished = FALSE AND contract = 0\
                "

    const sql3 = "SELECT COUNT (numJobs) as numJobsInProgress2\
                FROM JobData\
                WHERE TeamID = ? AND isFinished = FALSE AND contract = 1\
                "

    const sql4 = "SELECT COUNT (numJobs) as numJobsInProgress3\
                FROM JobData\
                WHERE TeamID = ? AND isFinished = FALSE AND contract = 2\
                "

    const values = [req.session.passport.user.teamID]
    if (+req.query.getAll == 1) {
        db.query(sql1, values, function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    } else {
        db.query(sql2, values, function(err, rows1) {
            if (err) throw err;
            db.query(sql3, values, function(err, rows2) {
                if (err) throw err;
                db.query(sql4, values, function(err, rows3) {
                    if (err) throw err;
                    res.json({
                        numJobsInProgress1: rows1[0].numJobsInProgress1,
                        numJobsInProgress2: rows2[0].numJobsInProgress2,
                        numJobsInProgress3: rows3[0].numJobsInProgress3
                    });
                });
            });
        });
    }
}

//req.query.teamID
simulation.get_finances = function(req, res) {
    const sql1 = "SELECT startingCash, startingMachine1, startingMachine2, startingMachine3,\
                        machine1Cost, machine2Cost, machine3Cost, machine1Bought, machine2Bought,\
                        machine3Bought, machine1Sold, machine2Sold, machine3Sold, machine1SellPrice,\
                        machine2SellPrice, machine3SellPrice\
                FROM SettingsSeed, Team\
                WHERE SettingsSeed.ID = \
                    (SELECT SettingsSeedID\
                    FROM Simulation\
                    WHERE ID = \
                        (SELECT SimulationID\
                        FROM Team\
                        WHERE ID = ?))\
                AND Team.ID = ?"


    const sql2 = "SELECT SUM(revenueEarned) AS revenueEarned\
                    FROM JobData\
                    WHERE TeamID = ? AND isFinished = TRUE"


    const sql4 = "SELECT materialsBought, pricePerMaterial, numShipments, shipmentCost As pricePerShipment\
                FROM Team, SettingsSeed, Simulation\
                WHERE Team.ID = ? AND Simulation.ID = Team.SimulationID AND SettingsSeed.ID = (SELECT SettingsSeedID\
                    FROM Simulation\
                    WHERE ID = \
                        (SELECT SimulationID\
                        FROM Team\
                        WHERE ID = ?))"

    const sql5 = "SELECT SUM(interestEarned) AS interestSum\
                    FROM TickData\
                    WHERE TickData.TeamID = ?"

    const values = [req.session.passport.user.teamID]
    const values2 = [req.session.passport.user.teamID, req.session.passport.user.teamID]

    db.query(sql1, values2, function(err, rows1) {
        if (err) throw err;
        db.query(sql2, values, function(err, rows2) {
            if (err) throw err;
            db.query(sql4, values2, function(err, rows4) {
                if (err) throw err;
                db.query(sql5, values, function(err, rows5) {
                    if (err) throw err;
                    console.log("1Bought " + +rows1[0].machine1Bought)
                    console.log("2Bought " + +rows1[0].machine2Bought)
                    console.log("3Bought " + +rows1[0].machine3Bought)
                    console.log("1Sold " + +rows1[0].machine1Sold)
                    console.log("2Sold " + +rows1[0].machine2Sold)
                    console.log("3Sold " + +rows1[0].machine3Sold)
                    var totalCost = (((+rows1[0].machine1Bought) * rows1[0].machine1Cost) - (+rows1[0].machine1Sold * rows1[0].machine1SellPrice))
                    console.log("totalCost1:" + totalCost)
                    totalCost += ((+rows1[0].machine2Bought) * rows1[0].machine2Cost) - (+rows1[0].machine2Sold * rows1[0].machine2SellPrice)
                    console.log("totalCost2:" + totalCost)
                    totalCost += ((+rows1[0].machine3Bought) * rows1[0].machine3Cost) - (+rows1[0].machine3Sold * rows1[0].machine3SellPrice)
                    console.log("totalCost3:" + totalCost)
                    res.json({
                        startingCash: rows1[0].startingCash,
                        revenue: rows2[0].revenueEarned,
                        interest: rows5[0].interestSum,
                        equipmentCosts: totalCost,
                        inventoryCosts: ((rows4[0].materialsBought * rows4[0].pricePerMaterial) + (rows4[0].numShipments * rows4[0].pricePerShipment))
                    });
                });
            });
        });
    });
}

simulation.get_standings = function(req, res) {
    const sql = "SELECT ID, name, money\
                FROM Team\
                WHERE SimulationID = \
                    (SELECT SimulationID\
                    FROM Team\
                    WHERE ID = ?)\
                ORDER BY money DESC "


    const values = [req.session.passport.user.teamID]

    db.query(sql, values, function(err, rows) {
        if (err) throw err;
        res.json(rows);
    })
}




module.exports = simulation;