# React (Redux) default application

This is basic environment with webpack config, for develop application with such technology as React with Ui framework AndDesign. The application divide by a few layouts is made to work with different types of pages. Also the app already has authentication functional to develop your own development of a personal account.

## To work with the project, following the basic rules

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

## Best practices. How to work with branches Git

### Commits

1. [FEATURE] - The current branch got some new functional
2. [FIX] - You made some fixes to the existing functional
3. [REFACTORING] - Nothing new, but you changed the way to process data

## Base rules for work with the project

1.  App.js - base file
2.  Views folder    - Must contains only the pages for web application
3.  Services folder - Must containts only functional for the ajax requests
4.  Redux folder    - Global storage the application
5.  Models folder   - Describing the model of component incoming properties
6.  Assets folder   - Must contain the images, styles, fonts, icons and nothing more
7.  Shared folder   - Must contain only common useful functional such as reusable functions
8.  Constant folder - Must contain only constants
9.  Common folder   - Must contain only base settings functional
10. Public folder  - Only for static html
11. Config file for global config variables witch use for the whole application