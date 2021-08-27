const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}

// login user
route.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/home');
        //res.end("Login Successful...!");
    }else{
        res.end("Invalid Username")
    }
});

/**
 *  @description Root Route
 *  @method GET /
 */
 route.get('/index', services.homeRoutes);
// home route
route.get('/', (req, res) =>{
    res.render('login');
})
route.get('/home', (req, res) =>{
    res.render('main_page');
})
route.get('/analysis', (req, res) =>{
    res.render('analysis');
})




/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// route for logout
route.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('login', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = route