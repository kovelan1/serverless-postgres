'use strict';

const db = require('./db_connect');

module.exports.getAllUsers = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    db.query('select user_id, name from submission')
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res)
        })
      })
      .catch(e => {
        console.log(e);
        callback(null, {
          statusCode: e.statusCode || 500,
          body: 'Error: Could not find Submition users: ' + e
        })
      })
  };

module.exports.getSubmitionByuser= (event, context, callback) =>{
    context.callbackWaitsForEmptyEventLoop=false;

    db.query('select * from submission where user_id='+event.pathParameters.id)
    .then(res=>{
        callback(null,{
            statusCode: 200,
            body: JSON.stringify(res)
        })
    })
    .catch(e=>{
        console.log(e);
        callback(null,{
            statusCode: e.statusCode || 500,
            body: 'Error: Could not find Submition' + e
        })
    })
}

module.exports.getOCRbySubmission = (event, context, callback)=>{
    context.callbackWaitsForEmptyEventLoop=false;

    db.query("select * from ktp where submission='"+event.pathParameters.id+"'")
    .then(res=>{
        callback(null,{
            statusCode: 200,
            body: JSON.stringify(res)
        })
    })
    .catch(e=>{
        console.log(e);
        callback(null,{
            statusCode: e.statusCode || 500,
            body: 'Error: Could not find OCR data' + e
        })
    })
}

module.exports.getCheckBySubmission = (event, context, callback)=>{
    context.callbackWaitsForEmptyEventLoop=false;

    db.query("select * from checks where submission='"+event.pathParameters.id+"'")
    .then(res=>{
        callback(null,{
            statusCode: 200,
            body: JSON.stringify(res)
        })
    })
    .catch(e=>{
        console.log(e);
        callback(null,{
            statusCode: e.statusCode || 500,
            body: 'Error: Could not find OCR data' + e
        })
    })
}

