# GM FRONTEND
This Frontend is built with Create-React-App

## Start in Local
Please run these commands in order!
`npm install` to install dependencies.
`rails s` to start backend server on localhost:3000 if not already done.
`npm start` to start frontend on localhost:3001.

## Process
React is my go-to for frontend purely because it is one I've had most experience with. And once there is a reliable backend, a lot of the stresses of frontend are pivoted to properly structuring the React application.

I figured a `<table>` would be the easiest way to display the project data, so I put one together to spec, then looked for ways to make it interactive.

I wasn't sure if I was supposed to display the timesheets, but when I first saw the data and read the technical assessment description, I had a vision of clicking a project row, and having the relevant timesheets expand below.

That's why I serialized the Projects route to include all the relevant Timesheets.

## Structure
Structure of React App is always the main concern whenever I'm building. Most things need to be in a proper place, and things related have to be properly interconnected for states and props. For this small project, redux definitely wouldn't be necessary, so proper structuring was important.

I divided App into two sections - the header and project section. Then, project is divided into two sections - the totals numbers section and the table. The table is put together by a table row component, which includes the timesheets.

## Features
Every project column can be sorted from the header row. By default, every column sorts by descending first, then ascending, then no sort. Since the data is not expected to change, and the number of projects is few, I decided to keep the sorting logic on the frontend, reducing unnecessary calls to the backend.

Clicking a project row will open expand a section including all the timesheets available to that project.

## Design
I understand the assessment requested to try to match the styling, but I thought I would add some flair to it? Otherwise, the entire frontend seemed rather barebones. 

So to make things more visually appealing, I tried to match Giant Machines color palette, added a simple animation utilizing transform: translateX for timesheets, and also mimicked Giant Machines website loader animation.