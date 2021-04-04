## GM-Assessment

Hello GM!  
Welcome to my GM technical assessment repo. I've included a README in both frontend & backend folders with instructions on how to run each locally, and also explain my technical decisions, processes, and steps to completing the assignment.  

Best,  
Eric

### Application
This full stack application is built with React + SCSS && Ruby on Rails/PostgreSQL.

My build environment is Linux, node v15.7.0, and rvm ruby 3.0.

### Run Locally
Start up backend first. This will require Ruby on Rails, Ruby v3.0.0
`bundle install` to install dependencies.
`rails db:create` to create local postgres database.
`rails db:migrate` to create tables.
`rails db:seed` to ingest CSV spreadsheet.
`rails s` to start local server on localhost:3000

Once backend is ready, start up frontend React App.
`npm install` to install dependencies.
`npm start` to start frontend on localhost:3001, which fetches from localhost:3000.