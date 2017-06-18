<h1>Server simulator built with Nodejs, JavaScript, HTML, CSS and MongoDB as Database</h1>

<h2>The project is deployed to Heroku, you can find it here:</h2><p style="color:blue"><strong>https://shielded-shore-87531.herokuapp.com/servers</strong></p>

<p><strong>How to run it:</strong></p>

<p>Set up your node environment, donwload the project and run in the console <em>node app.js</em>, make sure you have installed mongoDB</p>

<p><strong>How this project is structured:</strong></p>

<p>The goal is to build an application that can be flexible enough to do full CRUD with authentication/authorization and simulate server management. The folders are divided by definition and purpose:</p>

<p><strong>Logs: You will find a file called log.js that it's used for log configuration along with Winston package(npm). It's standard configuration and can be modified at your will to show more information on log file.</strong> </p>

<p><strong>Models:</strong></p>
<ul>
	<li><strong>server.js:</strong> responsible for setup the schema for the server creation and associate it with user creation.</li>
	<li><strong>user.js:</strong> responsible for setup the schema for the user creation and associate it with server creation.</li>
</ul>

<p><strong>Public/stylesheets: You will find a file called app.css responsible for the style for all the pages and it's linked in the header file</strong> </p>

<p><strong>Routes:</strong></p>
<ul>
	<li><strong>server.js:</strong> Contain all the CRUD (Create, Remove, Delete, Edit and Update) routes and logic.</li>
	<li><strong>index.js:</strong> Contain all the Authorization routes (Login, Logout, Register) routes and logic</li>
</ul>

<p><strong>Views:</strong> </p>
<ul>
	<li><strong>Partials:</strong> Inside partials are the header and footer ejs files, responsible for the html+js to header and footer in all pages. In the header you will find buttons to go to the root (Home), to add new Server (New Server), Login, Register and Logout, depending on what you are going to do first.</li>
	<li><strong>edit.ejs:     </strong> Responsible for the edit page layout and logic.</li>
	<li><strong>index.ejs:    </strong> Responsible for the index page (first page/main page) layout and logic.</li>
	<li><strong>login.ejs:    </strong> Responsible for the login form layout and logic.</li>
	<li><strong>new.ejs:      </strong> Responsible for the new form (new server creation) layout and logic.</li>
	<li><strong>register.ejs: </strong> Responsible for the register page layout and logic.</li>
	<li><strong>show.ejs:     </strong> Responsible for the show page (show particular server) layout and logic.</li>
</ul>

<p><strong>app.js:</strong> Main js file, responsible for run the app and require all the pakcages (npm) that we use and link all the other js(s) files.</p>

<p><strong>mylogfile:</strong> Standard log file. Can be modified to add new information.</p>

<p><strong>package.json: Contains information about the project.</strong> </p>


