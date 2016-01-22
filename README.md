###Javascript Skeleton Project

This is a placeholder readme.
This project shows the basic structure of a javascript project.
Node.js is being used to run the server, manage packages, and handle any backend logic in custom modules.
Modules are being tested with mocha/chai.
Bower is being used to manage front-end dependencies (currently jquery and bootstrap).
Gulp is being used to run the following tasks:

* concatenate and minify server side and clientside JS separately
* browserify clientside JS files that need access to module functions.
* preprocess and minify css using LESS

TODO

* add jslint with gulp task.
* add gulp task so that I don't have to refresh the browser.
* add gulp task to clean out the build folder.
* use a server package and router instead of writing one from scratch in nodejs
* apis and todolist
