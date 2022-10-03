import users from '../database/database.js';

class UserService {
    getAll(req,res) {
        res.writeHead(200, {"Content-Type": "Application/json"});
        res.write(JSON.stringify(users));
        return res.end();
    }

    createOne(req,res) {
        const name = req.body.name; //ES6
        const id = users[users.length-1].id + 1;
        const user = {
            id,
            name
        };
        users.push(user);
        res.writeHead(201, {"Content-Type": "Application/json"});
        res.write(JSON.stringify({
            success: user
        }))
        return res.end();
    }
}

export default new UserService();