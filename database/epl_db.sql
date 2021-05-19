-- Data Definition Queries for each page

-- Create epl_seasons table
DROP TABLE IF EXISTS `epl_seasons`;
CREATE TABLE `epl_seasons` (
    `seasonID` int(11) NOT NULL AUTO_INCREMENT,
    `seasonStartDate` date NOT NULL,
    `seasonEndDate` date NOT NULL,
    `matchOfTheSeasonID` int(11) NOT NULL,
    PRIMARY KEY (`seasonID`),
    FOREIGN KEY (`matchOfTheSeasonID`) REFERENCES `epl_matches`(`matchID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create epl_teams table
DROP TABLE IF EXISTS `epl_teams`;
CREATE TABLE `epl_teams` (
    `teamID` int(11) NOT NULL AUTO_INCREMENT,
    `teamName` varchar(255) NOT NULL UNIQUE,
    `city` varchar(255) NOT NULL,
    `headCoachLname` varchar(255) NOT NULL,
    `playerID` int(11) NOT NULL,
    PRIMARY KEY (`teamID`),
    FOREIGN KEY (`playerID`) REFERENCES `epl_top_players`(`playerID`),
    UNIQUE KEY `teamName` (`teamName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create epl_top_players table
DROP TABLE IF EXISTS `epl_top_players`;
CREATE TABLE `epl_top_players` (
    `playerID` int(11) NOT NULL AUTO_INCREMENT,
    `playerFname` varchar(255) NOT NULL,
    `playerLname` varchar(255) NOT NULL,
    `teamID` int(11) NOT NULL,
    `nationality` varchar(255) NOT NULL,
    PRIMARY KEY (`playerID`),
    FOREIGN KEY (`teamID`) REFERENCES `epl_teams`(`teamID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create epl_matches table
DROP TABLE IF EXISTS `epl_matches`;
CREATE TABLE `epl_matches` (
    `matchID` int(11) NOT NULL AUTO_INCREMENT,
    `matchDate` date NOT NULL,
    `teamHome` varchar(255) NOT NULL,
    `teamHomeScore` int(11) NOT NULL,
    `teamAway` varchar(255) NOT NULL,
    `teamAwayScore` int(11) NOT NULL,
    `teamWon` varchar(255) NOT NULL,
    PRIMARY KEY (`matchID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create season_champion_teams table
DROP TABLE IF EXISTS `season_champion_teams`;
CREATE TABLE `season_champion_teams` (
    `seasonID` int(11) NOT NULL,
    `teamID` int(11) NOT NULL,
    FOREIGN KEY (`seasonID`) REFERENCES `epl_seasons`(`seasonID`),
    FOREIGN KEY (`teamID`) REFERENCES `epl_teams`(`teamID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

