const ToDo = require('../models/ToDo');

exports.getAllTodos = async (req, res, next) => {
    try {
        // Деструктуризация ответа (обрезается buf, чтобы был только массив постов)
        const [todos, _] = await ToDo.findAll();

        res.status(200).json({count: todos.length, todos});
    } catch(error) {
        console.log(error);
        next(error)
    }
}

exports.getTodoById = async (req, res, next) => {
    try {
        let todoId = req.params.id;
        let [todo, _] = await ToDo.findById(todoId);

        res.status(200).json({todo: todo[0]});
    } catch(error) {
        console.log(error);
        next(error)
    }
}

exports.createNewTodo = async (req, res, next) => {
    try {
        let { title, body, is_done } = req.body;
        let todo = new ToDo(title, body, is_done);

        todo = await todo.save();
        
        res.status(201).json({ status: 201, message: "Пост успешно создан" });
    } catch(error) {
        console.log(error);
        next(error)
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        let todoId = req.params.id;
        let result = await ToDo.delete(todoId);
        console.log(result)
        res.send("Запись успешно удалена")
    } catch(error) {
        console.log(error);
        next(error)
    }
}