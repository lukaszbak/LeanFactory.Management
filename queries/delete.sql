DROP PROCEDURE IF EXISTS delete_user;
CREATE PROCEDURE delete_user(
    IN first_name VARCHAR(100),
    IN last_name VARCHAR(100)
)
BEGIN
SET @first = first_name ;
SET @last = last_name ;
SET @teamName = CONCAT(@first, ' ', @last, '\'s Team');
SET @students1 = ( Select Count(*) From Student WHERE firstName = @first AND lastName = @last );
SET @teams1 = ( Select Count(*) From Team WHERE name = @teamName );

SET @teamID = ( SELECT ID FROM Team WHERE name = @teamName );
SET @studentID = (SELECT ID FROM Student WHERE firstName = @first AND lastName = @last );
DELETE FROM TickData WHERE TeamID = @teamID ;
DELETE FROM JobData WHERE TeamID = @teamID ;
DELETE FROM Machine2Queue WHERE TeamID = @teamID ;
DELETE FROM StudentTeams WHERE TeamID = @teamID ;
DELETE FROM ClassStudents WHERE StudentID = @studentID ;
DELETE FROM Student WHERE ID = @studentID;
DELETE FROM Team WHERE ID = @teamID ;

SET @students2 = ( Select Count(*) From Student WHERE firstName = @first AND lastName = @last );
SET @teams2 = ( Select Count(*) From Team WHERE name = @teamName );
SELECT @students1, @teams1, @students2, @teams2 ;
END ;

DROP PROCEDURE IF EXISTS delete_team;
CREATE PROCEDURE delete_team(
    IN teamID INT
)
BEGIN
    SET @teamID = teamID ;
    SET @first = (SELECT firstName FROM Student
        WHERE ID = ( SELECT StudentID FROM StudentTeams WHERE TeamID = @teamID)) ;
    SET @last = (SELECT lastName FROM Student
        WHERE ID = ( SELECT StudentID FROM StudentTeams WHERE TeamID = @teamID)) ;
    CALL delete_user( @first, @last ) ;
END;