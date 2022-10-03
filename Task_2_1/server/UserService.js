import users from '../database/database.js';

class UserService {
    getAll(req, res) {
        res.writeHead(200, { "Content-Type": "Application/json" });
        res.write(JSON.stringify(users));
        return res.end();
    }

    getOne(req, res) {
        res.writeHead(200, {"Content-Type": "Application/json"}) ;
        res.write(JSON.stringify(users[{name}]))
    }

    createOne(req, res) {
        const name = req.body.name; //ES6
        const id = users[users.length - 1].id + 1;
        const user = {
            id,
            name
        };
        users.push(user);
        res.writeHead(201, { "Content-Type": "Application/json" });
        res.write(JSON.stringify({
            success: user
        }))
        return res.end();
    }
    acc(req, res ){
        const name = req.body.name;
        const id = users[users.length - 1].name;
        const user = {
            id, 
            name
        };
        users.put(user)
        res.writeHead(201, { "Content-Type": "Application/json" });
        res.write(JSON.parse( user))
        return res.end();
    }
    delete(res, req){
        const artigo = users.deleteOne({ _id: req.params.id }, (err) => {s
            if (err) return res.status(400).json({
                error: true,
                message: "Error: Artigo não foi apagado com sucesso!"
            });s
            return res.json({
                error: false,
                message: "Artigo apagado com sucesso!"
            });
        });
    }
}

export default new UserService();