var http = require('http')
  , fs = require('fs')
  , srv = http.createServer(handler)
  , call = 0;

  srv.configure(function(){

    srv.use(express.cookieParser())
    srv.use(express.bodyParser())
    srv.use(express.session({secret:'mi secreto',sid:'otro id'}))
    srv.use(express.static(__dirname + '/app'))
    srv.set('port', process.env.PORT || 8080)
    
  })

function handler(req, res){
  if (req.url === '/') return fs.createReadStream('./app/index.html').pipe(res)
  if (req.url === '/api/data.json') return sendJSON(req, res)
  if (req.url === '/api/reset') return resetCounter(req, res)
  if (req.url === '/app.js') {
    res.setHeader('Content-Type', 'text/javascript')
    return fs.createReadStream('./app/app.js').pipe(res)
  }
  res.end()
}

function sendJSON(req, res){
  if(!req.session.call)req.session.call = 0;
  
  var json = {
    id: req.session.call++,
    user: 'Alejandro Morales'
  }
  write(json, res)
}

function resetCounter(req, res){
  if(req.session.call)req.session.call = 0;
  var json = {
    status: 'El contador ha sido reiniciado'
  }
  write(json, res)
}

function write(json, res){
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(json))
}

srv.listen(process.env.PORT || srv.get('port'), function(){
  console.log('Ajax Server listo en %d', this.address().port)
})