const supertest = require('supertest');

const get = (url, uri, querypParams, headers) => {
    if((typeof (url) == undefined )|| (url == null)){
        throw new Error('URL cannot be null');  
    }
    if((typeof (uri) == undefined )|| (uri == null)){
        throw new Error('uri cannot be null');  
    }
    if((typeof (querypParams) == undefined )|| (querypParams == null)){
        throw new Error('querypParams cannot be null');  
    }
    if((typeof (headers) == undefined )|| (headers == null)){
        throw new Error('headers cannot be null');  
    }
    const api = supertest(url);
    return api.get(uri).query(querypParams).set(headers);
}
const post = (url, uri, body, headers) => {
    if((typeof (url) == undefined )|| (url == null)){
        throw new Error('URL cannot be null');  
    }
    if((typeof (uri) == undefined )|| (uri == null)){
        throw new Error('uri cannot be null');  
    }
    if((typeof (body) == undefined )|| (body == null)){
        throw new Error('querypParams cannot be null');  
    }
    if((typeof (headers) == undefined )|| (headers == null)){
        throw new Error('headers cannot be null');  
    }
    const api = supertest(url);
    return api.post(uri).send(body).set(headers);
}

exports.get = get;
exports.post = post;