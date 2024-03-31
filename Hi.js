export default function hello(app){ 
function sayHello(req, res){
    res.send("Hello World");
}

function lifeIsGood(req, res){
    res.send("Life is Good!!!")
}
function rootResponse(req, res){
    res.send("Welcome to Node.js HTTP Restart");
}

app.get('/hello', sayHello); //if the server received a request, /hello, we will send "Hello World"
// when try to run it, type "node App.js", then try http://localhost:4000/hello
app.get("/", rootResponse); // ctrl + c to stop the server and type "node App.js" again

app.get("/good", lifeIsGood) // use "nodemon App.js" don't need restart it
}