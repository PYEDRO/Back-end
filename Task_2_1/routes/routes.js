import UserService from "../server/UserService.js";

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
    },
    {
        endpoint : "/users",
        method: "PUT",
        handler: UserService.acc
    },
    {
        endpoint: "/user/:id",
        method: "DELETE",
        handler: UserService.delete
    }
]

export default routes;