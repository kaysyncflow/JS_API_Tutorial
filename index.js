let express = require('express');
let app = express();

let router = express.Router();
let cors = require('cors');

app.use(express.json());
app.use(cors());

let citiesRepo = require('./repos/citiesRepo');



router.get('/', (req,res,next) => {
    citiesRepo.get((data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All cities Retrived",
            "data": data
        });
    }, (err) => {
        next(err);
    })

    
})


router.get('/search', (req, res, next) => {

    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    }
    
    citiesRepo.search(searchObject, (data) => {

        res.status(200).json({
            "status":200,
            "statusText": "OK",
            "message": "You have found what you are searching for",
            "data": data 
        })
    }, (err) => {
        next(err)
    })
})

router.get('/:id', (req, res, next) => {
    citiesRepo.getById((req.params.id), (data) => {
        if(data) {
            res.status(200). json({
                "status": 200, 
                "statusText": "OK",
                "message": "City Retrived",
                "data": data
            })
        } else {
            res.status(404).send({
                "status": 404,
                "statusText": "ERROR",
                "message": "City with id "+ req.params.id + " not found",
                "error": {
                    "code": 404,
                    "errorMessage": "city with id of " +req.params.id +" could not be found"
                } 
            })
        }
    })
} )

router.post('/', (req, res, next) => {
    citiesRepo.change(req.body, (data) => {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Record Added",
            "data": data
        });

    }, function(err) {
        next(err);
    })
})

router.put("/:id", (req, res, next) => {
    citiesRepo.getById(req.param.id, (data) => {
        if(data) {
            citiesRepo.update(req.body, req.params.id, (data) => {
                res.status(200).json({
                    "status":200,
                    "statusText": "Data Updated!",
                    "message": "city with id:"+req.params.id+" has been updated",
                    "data": data
                });
            });
        } else {
            res.status(404).send({
                "status": 404,
                "statusText": "CITY NOT FOUND!",
                "message": "city with id:"+req.params.id+" does not exist, please try again",
                "error": {
                    "code":404,
                    "errorMessage": "city with id:"+req.params.id+" cannot be found"
                }
            });
        }
    } , (err)=> {
        next(err)
    });
})

router.delete('/:id', (req, res, next) => {
    citiesRepo.getById(req.params.id, (data) => {
        if(data) {
            citiesRepo.delete(req.params.id, (data) => {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK Deleted Successfully",
                    "message": "city with id '"+req.params.id+ "' has been deleted successfully",
                    "data": data
                })
            })
        } else {
            res.status(404).send({
                "status": 404,
                "statusText": "NOT FOUND",
                "message": "city with id '"+req.params.id + "' has not been found",
                "error": {
                    "code": 404,
                    "message": "NOT FOUND!"
                }
            })
        }
    }, (err) => {
        next(err);
    });
})

app.use('/api', router);

var server = app.listen(5000, function() {
    console.log('Node Server is running on http://localhost:5000...')
})