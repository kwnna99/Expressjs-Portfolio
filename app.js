const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const projectRoutes = require('./routes/projects');

app.use(mainRoutes);
app.use('/projects', projectRoutes);
app.use('/project',projectRoutes);

//404 error handler
app.use((req, res, next) => {
  const err = new Error('Oops! Looks like this page does not exist!');
  err.status = 404;
  next(err);
});

//general error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  if(err.status!=404){
    err.message= 'Oops! Looks like something went wrong.';
    err.status=(err.status||500);
    res.status(err.status);
    res.render('error',err);
  }else{
    res.status(err.status);
    res.render('page-not-found',err);
  }
  
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});