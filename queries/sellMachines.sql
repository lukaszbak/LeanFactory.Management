DROP PROCEDURE IF EXISTS sell_machine_1;
CREATE PROCEDURE sell_machine_1(
    IN teamID INT,
    IN amount INT
)
proc: BEGIN
    SET @TeamID = teamID;
    SET @amount = amount;
    SET @sellPrice = ( SELECT machine1SellPrice
                        FROM SettingsSeed
                        WHERE ID = 
                            (SELECT SettingsSeedID
                            FROM Simulation
                            WHERE ID = 
                                (SELECT SimulationID
                                FROM Team
                                WHERE ID = @TeamID))) ;
    SET @totalPrice = @amount * @sellPrice ;
    
    SET @machines = ( SELECT numMachines1 FROM Team WHERE ID = @TeamID );
    IF @machines > @amount THEN
        UPDATE Team
        SET numMachines1 = numMachines1 - @amount,
            money = money + @totalPrice,
            machine1Sold = machine1Sold + @amount
        WHERE ID = @TeamID ;
    END IF ;
    
    SELECT numMachines1 FROM Team WHERE ID = @TeamID ;
END ;

DROP PROCEDURE IF EXISTS sell_machine_2;
CREATE PROCEDURE sell_machine_2(
    IN teamID INT,
    IN amount INT
)
proc: BEGIN
    SET @TeamID = teamID;
    SET @amount = amount;
    SET @sellPrice = ( SELECT machine2SellPrice
                        FROM SettingsSeed
                        WHERE ID = 
                            (SELECT SettingsSeedID
                            FROM Simulation
                            WHERE ID = 
                                (SELECT SimulationID
                                FROM Team
                                WHERE ID = @TeamID))) ;
    SET @totalPrice = @amount * @sellPrice ;
    
    SET @machines = ( SELECT numMachines2 FROM Team WHERE ID = @TeamID );
    IF @machines > @amount THEN
        UPDATE Team
        SET numMachines2 = numMachines2 - @amount,
            money = money + @totalPrice,
            machine2Sold = machine2Sold + @amount
        WHERE ID = @TeamID ;
    END IF ;
    
    SELECT numMachines2 FROM Team WHERE ID = @TeamID ;
END ;

DROP PROCEDURE IF EXISTS sell_machine_3;
CREATE PROCEDURE sell_machine_3(
    IN teamID INT,
    IN amount INT
)
proc: BEGIN
    SET @TeamID = teamID;
    SET @amount = amount;
    SET @sellPrice = ( SELECT machine3SellPrice
                        FROM SettingsSeed
                        WHERE ID = 
                            (SELECT SettingsSeedID
                            FROM Simulation
                            WHERE ID = 
                                (SELECT SimulationID
                                FROM Team
                                WHERE ID = @TeamID))) ;
    SET @totalPrice = @amount * @sellPrice ;
    
    SET @machines = ( SELECT numMachines3 FROM Team WHERE ID = @TeamID );
    IF @machines > @amount THEN
        UPDATE Team
        SET numMachines3 = numMachines3 - @amount,
            money = money + @totalPrice,
            machine3Sold = machine3Sold + @amount
        WHERE ID = @TeamID ;
    END IF ;
    
    SELECT numMachines3 FROM Team WHERE ID = @TeamID ;
END ;