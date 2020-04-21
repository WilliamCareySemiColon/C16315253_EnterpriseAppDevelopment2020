This text file will describe how to be able to run the application

1) Ensure the Mongo Server is running at "localhost:27017"

(OPTIONAL STEP) - ensure the Mongo Client is running

2) Open Command prompt and Navigate to the "DatabaseScripts Folder"

==> C16315253_EnterpriseAppDevelopment2020\NumerlogyTarot\DatabaseScripts

3) run "node MongoMoveTempFiles.js". This would provide sample data used inside the application. 
The only data requirement was some of the user details, such as username and password, to create and test the login section)

4) When this server is completed is task, which is writing all four users to the database, close the server using ctl + c

5) Navigate one directory back (cd ..)

6) run "node server.js". This is the actual server running itself.

7) on the broswer, type in "localhost:7777"

8) When done with the application, close the browser and close the server using ctl + c