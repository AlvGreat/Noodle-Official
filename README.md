# Noodle-Official
Official Noodle Discord bot featuring a currency system using MySQL and various API calls.

## Setup Steps:

1. Clone repository and install a text editor/IDE of choice + Node.js
2. Install MySQL Server to run a server locally and MySQL Workbench to test queries manually. (If you have a remote server, skip this step)
3. Add MySQL connection details and Discord bot token in `config.json`
4. Run the following queries to create the correct database/table names for the bot. 
```sql
CREATE DATABASE Noodle;

USE DATABASE Noodle;

CREATE TABLE Noodle (
id VARCHAR(30), 
xp INT, 
cur BIGINT,
multiplier FLOAT DEFAULT 1,
shield INT DEFAULT 0,
badge1 INT DEFAULT 0,
badge2 INT DEFAULT 0,
badge3 INT DEFAULT 0,
badge4 INT DEFAULT 0,
badge5 INT DEFAULT 0,
badge6 INT DEFAULT 0,
health INT default 100,
kills INT default 0, 
stick INT default 0, 
knife INT default 0, 
sword INT default 0, 
badgeE1 INT default 0, 
lightsaber INT default 0, 
basketball INT default 0, 
pistol INT default 0, 
blaster INT default 0, 
sniper INT default 0, 
miniPotion INT default 0, 
healthPotion INT default 0, 
maxPotion INT default 0, 
overdosePotion INT default 0, 
boxesBought INT default 0 
);
```

## Other Details:
##### Node.js version:
Node.js 12.18.1

##### To install npm packages: 
```sh
npm install
```

##### Execution Instruction on Command Line:
```sh
npm start
```
OR
```
node index.js
```

