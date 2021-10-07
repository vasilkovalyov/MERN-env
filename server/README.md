# Node Js Express default application

This is basic environment with Node js config, for develop application with such technology as Express js, MongoDB, Mongoose. The app already has authentication functional to develop your own development of a personal account.

## To work with the project, following the basic rules

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

## Best practices. How to work with branches Git

### Commits

1. [FEATURE] - The current branch got some new functional
2. [FIX] - You made some fixes to the existing functional
3. [REFACTORING] - Nothing new, but you changed the way to process data

## Base rules for work with the project

1.  app.js               - base file
2.  Static folder        - This folder need to upload files
3.  Dtos folder          - Need to describe models
4.  Middlewares folder   - Must contain only functions for middleware functional
5.  Models folder        - Use for mongoose describe models
6.  Routes folder        - Must contain functional for create route without describing
7.  Controllers folder   - Must contain functional for processing of results routes
8.  Service folder       - Must contain functional which the work with data from frontend and work with database
9.  Exeptions folder     - Must contain only exeptions functional
10. Validation folder    - Must containt only functional for validation data from frontend
11. Database.js          - Only include database to the project
12. Config.js            - file the base settings for including database, jwt auth, client url etc.
13. .env                 - the file for base global variables in the project, such as Port app, or Database ult, or jwt auth this file must have privacy settings, and doesn`t load to git 