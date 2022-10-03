import UserService from '../services/UserService.js';

const routes = [
    {
        endpoint: "/users",
        method: "GET",
        handler: UserService.getAll
    }, {
        endpoint: "/users",
        method: "POST",
        handler: UserService.createOne
    },
    {
        endpoint: "/users/:id",
        method: "GET",
        handler: UserService.getOne
    }
]

export default routes;