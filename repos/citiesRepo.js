const { json } = require('express');
let fs = require('fs');
let File_Name = './assets/cities.json';

let citiesRepo = {
    get: (resolve, reject) => {
        fs.readFile(File_Name, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(JSON.parse(data))

            }

        })

        
    },

    getById: (id, resolve, reject) => {
        fs.readFile(File_Name, (err,data) =>{
            if(err) {
                reject(err)
            } else {
                
                let city = JSON.parse(data).FIND(p => p.id == id)
                resolve(city)
            
            }
        })
    },

    search: (searchObject, resolve, reject) => {
        fs.readFile(File_Name, (err, data) => {
            if(err) {
                reject(err)
            } else {
                let cities = JSON.parse(data);

                if(searchObject) {
                    cities = cities.filter(
                        c => (searchObject.id? c.id == searchObject.id :true) &&
                        (searchObject.name? c.name.toLowerCase()==searchObject.name :true) 
                    )
                } 
                resolve(cities);
            }

        })
    },
    change: (newData, resolve, reject) => {
        fs.readFile(File_Name, (err,data) => {
            if(err) {
                reject(err)
            } else {
                let cities = JSON.parse(data);
                cities.push(newData);
                fs.writeFile(File_Name, JSON.stringify(cities), (err) => {
                    if(err) {
                        reject(err);
                    } else{
                        resolve(newData);
                    }
                    
                
            })


    
        }            

        }) 
    },

    update: (newData, id, resolve, reject) => {
        fs.readFile(File_Name, (err, data) => {
            if(err) {
                reject(err);
            } else {
                let cities= JSON.parse(data);
                let city = cities.find(c=> c.id ==id )
                if(city) {
                    Object.assign(city, newData)
                    fs.writeFile(File_Name, JSON.stringify(cities), (err)=> {
                        if(err) {
                            reject(err)
                        } else {
                            resolve(newData)
                        }
                    })
                } 

            }
        })
    }, 

    delete: (id,resolve, reject) => {
        fs.readFile(File_Name, (err,data) => {
            if(err) {
                reject(err)
            } else {
                let cities = JSON.parse(data);
                let city = cities.findIndex(c=> c.id == id);
                if(city < 0) {
                    cities.splice(city,1);
                    fs.writeFile(File_Name, JSON.stringify(cities), (err)=> {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(city);
                        }
                    })
                }
            }
        });
    }

    
};

module.exports = citiesRepo;