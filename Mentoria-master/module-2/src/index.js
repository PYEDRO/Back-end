// Socket aberto em que vai haver um while(true) -> Esperando GET em uma url conhecida
import {createServer} from 'node:http';
import { URL } from "node:url";
import bodyParser from './helpers/bodyParser.js';
import routes from './routes/routes.js';

function error404(req,res) {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.write("<h1> Not Found </h1>");
    res.end();
}

// 201, 200, 400, 404, 500

// {
//     "id": "1",
//     "name": "Gabriel"
// }

const server = createServer((req,res) => {
    const host = req.headers.host;
    const protocol = "http";
    const url = new URL(`${protocol}://${host}${req.url}`);
    const pathname = url.pathname;
    const method = req.method; // GET POST DELETE PUT
    const route = routes.find((item) => item.endpoint === pathname && item.method === method);
    if(route) {
        if(["POST","PUT","PATCH"].includes(route.method)) {
            return bodyParser(req, () => route.handler(req,res));
        } else {
            return route.handler(req,res);
        }
    } else {
        return error404(req,res);
    }
    return error404(req,res);
    res.writeHead(200, {"Content-Type": "Application/json"})
    res.write(JSON.stringify({success: "Hello"}));
    res.end();
});

server.listen(3000, () => console.log("Escutando na porta 3000"));