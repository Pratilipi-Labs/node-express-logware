# node-express-logware
## Request Logger  
Request logging middleware for python web services. Use this library to log the requests hitting the web service. It is advised to use **Request-Id** in request headers to trace the spread of requests in microservice environment.  

**Package library:** [logware]()  
**Stable Version:** 0.1.1  

## How to install?
run `npm install logware`

## How to use?
```
const express = require('express')
const RequestLogger = require('logware')
const app = express()
const port = 3000

const logger = new RequestLogger('ERROR','Test')
app.use(logger.log)

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/400', (req, res) => res.status(400).send('Bad request'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

### Log example:
The log prints in json string format.  
```{"level":"error","service":"test","uri":"/bad?a=1","responseCode":400,"requestId":"23545"}```
