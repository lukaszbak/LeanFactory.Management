DROP PROCEDURE IF EXISTS buy_machine_1;
CREATE PROCEDURE buy_machine_1(
    IN teamID INT,
    IN amount INT
)
proc: BEGIN
    SET @TeamID = teamID;
    SET @amount = amount;
    SET @machine1Cost = (SELECT machine1Cost
                        FROM SettingsSeed
                        WHERE ID = 
                            (SELECT SettingsSeedID
                            FROM Simulation
                            WHERE ID = 
                                (SELECT SimulationID
                                FROM Team
                                WHERE ID = @TeamID))) ;
    SET @totalCost = @amount * @machine1Cost ;
    
    SET @money = ( SELECT money FROM Team WHERE ID = @TeamID );
    IF @money > @totalCost THEN
        UPDATE Team
        SET numMachines1 = numMachines1 + @amount,
            money = money - @totalCost,
            machine1Bought = machine1Bought + @amount
        WHERE ID = @TeamID ;
    END IF ;
    
    SELECT numMachines1 FROM Team WHERE ID = @TeamID ;
END ;

DROP PROCEDURE IF EXISTS buy_machine_2;
CREATE PROCEDURE buy_machine_2(
    IN teamID INT,
    IN amount INT
)
proc: BEGIN
    SET @TeamID = teamID;
    SET @amount = amount;
    SET @machine2Cost = (SELECT machine2Cost
                        FROM SettingsSeed
                        WHERE ID = 
                            (SELECT SettingsSeedID
                            FROM Simulation
                            WHERE ID = 
                                (SELECT SimulationID
                                FROM Team
                                WHERE ID = @TeamID))) ;
    SET @totalCost = @amount * @machine2Cost ;
    
    SET @money = ( SELECT money FROM Team WHERE ID = @TeamID );
    IF @money > @totalCost THEN
        UPDATE Team
        SET numMachines2 = numMachines2 + @amount,
            money = money - @totalCost,
            machine2Bought = machine2Bought + @amount
        WHERE ID = @TeamID ;
    END IF ;
    
    SELECT numMachines2 FROM Team WHERE ID = @TeamID ;
END ;

DROP PROCEDURE IF EXISTS buy_machine_3;
CREATE PROCEDURE buy_machine_3(
    IN teamID INT,
    IN amount INT
)
proc: BEGIN
    SET @TeamID = teamID;
    SET @amount = amount;
    SET @machine3Cost = (SELECT machine3Cost
                        FROM SettingsSeed
                        WHERE ID = 
                            (SELECT SettingsSeedID
                            FROM Simulation
                            WHERE ID = 
                                (SELECT SimulationID
                                FROM Team
                                WHERE ID = @TeamID))) ;
    SET @totalCost = @amount * @machine3Cost ;
    
    SET @money = ( SELECT money FROM Team WHERE ID = @TeamID );
    IF @money > @totalCost THEN
        UPDATE Team
        SET numMachines3 = numMachines3 + @amount,
            money = money - @totalCost,
            machine3Bought = machine3Bought + @amount
        WHERE ID = @TeamID ;
    END IF ;
    
    SELECT numMachines3 FROM Team WHERE ID = @TeamID ;
END ;