var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://123biswash:Twister11.@ds145574.mlab.com:45574/tasklist', ['tasks']);

//Get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
    // res.send('TASK API');
});

//Get single task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)}, function(err, doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    });
});

router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else {
        db.tasks.save(task, function(err, task){
                if(err){
                    res.send(err);
                }
                res.json(task);
        });
    }
});

//Delete task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectID(req.params.id)}, function(err, doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    });
});

//Update task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if (task.isDone){
        updTask.isDone = task.isDone;
    }
    if (task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.tasks.update({_id: mongojs.ObjectID(req.params.id)}, updTask, {}, function(err, doc){
            if(err){
                res.send(err);
            }
            res.json(doc);
        });
    }
});

module.exports = router;