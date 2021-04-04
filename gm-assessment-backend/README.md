# GM BACKEND
This Backend is built with Ruby on Rails + PostgreSQL

## Start in Local
Please run these commands in order!
`bundle install` to install dependencies.
`rails db:create` to create local postgres database.
`rails db:migrate` to create tables.
`rails db:seed` to ingest CSV spreadsheet.
`rails s` to start local server on localhost:3000

## GET Routes
/projects
/timesheets?page=#

Timesheets route includes pagination.

## Process
I chose Ruby on Rails as my backend because I've had experience using Rails to ingest CSV data into tables. The process was straightforward, so I aimed to follow the same steps.

In most spreadsheets, there are a number of relations hidden between the lines, and in this dataset, I immediately noticed that Clients have many Projects, and Projects have many Timesheets. So understandably, I created those 3 tables with those relations in mind.

Another potential table would've been the employees, but since only their first name and last names were available, I thought this table would be unnecessary for this exercise.

## CSV Ingestion
One of the most expensive processes with backend are database actions. So in my seeds.rb file, much of the logic is based on making as few database calls as possible, while importing all data idempotently.

One of the ways I've found to be effective is using upsert_all, which is a new method for Ruby on Rails to create or update a batch of possible entries. If you have an array of hashes matching a table's fields, it can be upserted. 

## gm-assessment-backend/db/seeds.rb
Much of the logic in my seed code is about placing appropriate data into their respective arrays, and organizing that data to be ready to be batch inserted or updated into the table, in a proper order. Tables that do not require relations are inserted first, so they are available for tables that DO require them, which are inserted after.

The downside to this method is a slight loss of validation, unless of course you put restrictions in your database. Adding specific indexes can help prevent these errors from happening, but this dataset was particularly small so none of that was necessary.

## Technologies
I added a serializer for the Project's route, so upon hitting the Projects GET route, the response would return a list of Timesheets and the Client related to the project. I also included calculations of the total hours and billable hours of the project, in hopes to lessen the processing load on the frontend.

A cool gem I came across from previous projects is Administrate, which generates an admin dashboard that organizes and creates views for all the tables in the DB. The dashboard is customizable and honestly, this assessment could've been completed from that alone. Anyways, very cool gem and I thought I'd include it even though I built a frontend with React as well.