DROP PROCEDURE IF EXISTS new_user;
CREATE PROCEDURE new_user(
    IN first_name VARCHAR(100),
    IN last_name VARCHAR(100)
)
BEGIN
SET autocommit = 0 ;
proc: BEGIN 
    # Constants
    SET @first_name = first_name ;
    SET @last_name = last_name ;
    SET @default_sim_id = 1 ;
    SET @do_nothing_name = "Do Nothing" ;
    SET @do_nothing_id = (  SELECT ID 
                            FROM Team 
                            WHERE   name = @do_nothing_name AND
                                    SimulationID = @default_sim_id );
    SET @class_id = ( SELECT ClassID FROM Simulation WHERE ID = @default_sim_id );
        
    # Create the new student entry in Student
    SET @numRows = 1 ;
    INSERT INTO Student ( firstname, lastName, email, school, password, isActive )
        VALUES( @first_name, @last_name, 'email', 'school', 'password', 1 ) ;
    # Save StudentID
    SET @student_id = last_insert_id() ;

    # Check that data was added correctly, Rollback and exit if not
    SET @sanity_check = (SELECT Count(*) FROM Student WHERE ID = @student_id AND lastName = @last_name ) ;
    IF (@sanity_check != @numRows) THEN
        SELECT 'Student entry failed' ;
        ROLLBACK ;
        LEAVE proc;
    END IF ;

    # Create a copy of the Do Nothing Team
    SET @numRows = 1 ;
    CREATE TEMPORARY TABLE IF NOT EXISTS newTeam AS (SELECT * FROM Team WHERE ID = @do_nothing_id) ;
    # Change the team's name and ID, add it to Team table
    SET @team_name = CONCAT(@first_name, ' ', @last_name, "'s Team") ;
    UPDATE newTeam SET name = @team_name, ID = null ;
    INSERT INTO Team SELECT * FROM newTeam ;
    # Save TeamID for later
    SET @team_id = last_insert_id() ;

    # Check that data was added correctly
    SET @sanity_check = (SELECT Count(*) FROM Team WHERE ID = @team_id AND name = @team_name ) ;
    # Rollback and return if not
    IF (@sanity_check != @numRows) THEN
        SELECT 'Team entry failed' ;
        ROLLBACK ;
        LEAVE proc;
    END IF ;

    # Copy the Do Nothing team's TickData
    SET @numRows = (SELECT Count(*) FROM TickData WHERE TeamID = @do_nothing_id) ;
    CREATE TEMPORARY TABLE IF NOT EXISTS newTicks AS (SELECT * FROM TickData WHERE TeamID = @do_nothing_id) ;
    # Change the teamID and ID add it to Team
    UPDATE newTicks SET TeamID = @team_id, ID = null ;
    INSERT INTO TickData SELECT * FROM newTicks ;

    # Check that the data was added correctly
    SET @sanity_check = (SELECT Count(*) FROM TickData WHERE teamID = @team_id ) ;
    # Rollback and return if not
    IF (@sanity_check != @numRows) THEN
        SELECT 'TickData entries failed' ;
        ROLLBACK ;
        LEAVE proc;
    END IF ;

    # Copy the Do Nothing team's JobData
    SET @numRows = (SELECT Count(*) FROM JobData WHERE TeamID = @do_nothing_id) ;
    CREATE TEMPORARY TABLE IF NOT EXISTS newJobs AS (SELECT * FROM JobData WHERE TeamID = @do_nothing_id) ;
    # Change the teamID and ID add it to Team
    UPDATE newJobs SET TeamID = @team_id, ID = null ;
    INSERT INTO JobData SELECT * FROM newJobs ;

    # Check that the data was added correctly
    SET @sanity_check = (SELECT Count(*) FROM JobData WHERE teamID = @team_id ) ;
    # Rollback and return if not
    IF (@sanity_check != @numRows) THEN
        SELECT 'JobData entries failed' ;
        ROLLBACK ;
        LEAVE proc;
    END IF ;

    # Copy the Do Nothing team's Machine2Queue
    SET @numRows = (SELECT Count(*) FROM Machine2Queue WHERE TeamID = @do_nothing_id) ;
    CREATE TEMPORARY TABLE IF NOT EXISTS newQueue AS (SELECT * FROM Machine2Queue WHERE TeamID = @do_nothing_id) ;
    # Change the TeamID and ID, add it to Machine2Queue
    UPDATE newQueue SET TeamID = @team_id, ID = null ;
    INSERT INTO Machine2Queue SELECT * FROM newQueue ;

    # Check that the data was added correctly
    SET @sanity_check = (SELECT Count(*) FROM Machine2Queue WHERE TeamID = @team_id ) ;
    # Rollback and return if not
    IF (@sanity_check != @numRows) THEN
        SELECT 'Machine2Queue entries failed' ;
        ROLLBACK ;
        LEAVE proc;
    END IF ;

    # Create a StudentTeams Entry
    INSERT INTO StudentTeams
        VALUES ( @student_id, @team_id );

    # Create ClassStudents Entry
    INSERT INTO ClassStudents
        VALUES ( @class_id, @student_id );
    
    # Done!
    COMMIT ;
    
    SELECT @last_name, @team_id ;
END ;
SET autocommit = 1 ;
END ;