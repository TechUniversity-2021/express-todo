const todoService = require('../services/todo.service')

const getTodos = async(req, res) => {
    const content =  await todoService.getTodo()
    //console.log(content)
    res.status(200).send(content)
};

const getTodoById = async(req,res) => {
    const content =  await todoService.getTodoWithId(req.params.id)
    console.log(content)
    res.status(200).send(content)
}

const createTodo = async(req,res) => {
    await todoService.postTodo(req.body)
    res.send(`todo ${JSON.stringify(req.body.todo)} added`)

    // The 204 status code is usually sent out in response to a PUT, POST, or DELETE request when the 
    // REST API declines to send back any status message or representation in the response message’s body.
}

const updateTodo = async(req,res) => {
    await todoService.updateTodo(req.params.id,req.body)
    //console.log(req)
    // console.log(req.body.status)
    // console.log(req.params.id)
    res.send()
}

module.exports = { getTodos,createTodo, updateTodo, getTodoById };
