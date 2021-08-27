var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    var past_history_str="";
    for(var i=0;i<req.body.past_history.length;i++){
        if(i==0)
        
            past_history_str+= req.body.past_history[i];
        else
        past_history_str+=","+req.body.past_history[i];
    }
    // validate request
    if(!req.body.name || !req.body.main_complaint || !past_history_str || !req.body.bp || !req.body.pulse_rate || !req.body.lmp || !req.body.investigation || !req.body.treatment_given){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        main_complaint : req.body.main_complaint,
        past_history : past_history_str,
        bp: req.body.bp,
        pulse_rate : req.body.pulse_rate,
        lmp: req.body.lmp,
        investigation : req.body.investigation,
        treatment_given : req.body.treatment_given
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/index');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else if(req.query.name){
        Userdb.find({ name : {$regex : req.query.name}})
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
    else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })

    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    var past_history_str ="";
    for(var i=0;i<req.body.past_history.length;i++){
        if(i==0)
            past_history_str+= req.body.past_history[i];
        else
        past_history_str+=","+req.body.past_history[i];
    }
    req.body.past_history= past_history_str;
    Userdb.findByIdAndUpdate(id, req.body,function(err,result){})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data);
            }
        })
        .catch(err =>{
            res.status(500).send({ message : err})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
               
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}