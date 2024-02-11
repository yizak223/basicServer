const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())

const books = [
    { title: 'harry potter', author: 'J.K.R', pages: '300', id: 1 },
    { title: 'harry potter', author: 'J.K.R', pages: '300', id: 2 },
    { title: 'harry potter', author: 'J.K.R', pages: '300', id: 3 }
]
let tasks = [
    { id: 1, title: 'do home work', completed: true },
    { id: 2, title: 'do home work', completed: true },
    { id: 3, title: 'do home work', completed: true }
]
//* if something goes to this http this is handle in him in this part
//!books
app.get("/api/v1/books", (req, res) => { //
    res.send(books)
})

app.post('api/v1/books', (req, res) => {
    const body = req.body
    books.push(body)
    res.send({ message: 'success', data: body })
})
app.delete("/api/v1/books/:id", (req, res) => {
    const id = req.params.id.toString();
    const bookToDelete = books.find(book => book.id == id);
    console.log(bookToDelete);
    if (!bookToDelete) {
        return res.status(404).send({ message: 'Book not found' });
    }
    const index = books.indexOf(bookToDelete);
    books.splice(index, 1);
    res.send({ message: 'delete' });
})
app.patch("/api/v1/books/:id", (req, res) => {
    const id = req.params.id.toString();
    const updateFields = req.body;
    const bookToUpdate = books.find(book => book.id == id);
    if (!bookToUpdate) {
        return res.status(404).send({ message: 'Book not found' });
    }
    Object.assign(bookToUpdate, updateFields);
    res.send({ message: 'update', data: bookToUpdate });
});


//!tasks
//*get
app.get("/api/v1/tasks", (req, res) => { //
    res.send(tasks)
})
//*add
app.post("/api/v1/tasks", (req, res) => {
    const body = req.body
    tasks.push(body)
    res.send({ message: 'success', data: body })
})

//*delete
app.delete("/api/v1/tasks/:id", (req, res) => {
    const id = req.params.id
    const taskToDelete = tasks.find(task => task.id == id);
    console.log(taskToDelete);
    if (!taskToDelete) {
        return res.status(404).send({ message: 'Task not found' });
    }
    const index = tasks.indexOf(taskToDelete);
    tasks.splice(index, 1);
    res.send({ message: 'delete' });
});

//*update- edit 
// app.patch("/api/v1/tasks/:id", (req, res) => {
//     const id = req.params.id
//     const updateFields = req.body
//     const taskToUpdate = tasks.find(task => task.id == id);
//     if (!taskToUpdate) {
//         return res.status(404).send({ message: 'Task not found' });
//     }
//     Object.assign(taskToUpdate, updateFields);
//     res.send({ message: 'update', data: taskToUpdate });
// });
//?option 2
app.patch("/api/v1/tasks/:id", (req, res) => {
    const id = req.params.id
    const updateFields = req.body
    const taskToUpdate = tasks.find(task => task.id == id);
    if (!taskToUpdate) {
        return res.status(404).send({ message: 'Task not found' });
    }
    tasks = tasks.map(task => {
        if (task.id == id) {
            return { ...task, ...updateFields }
        }
        return task;
    })
    res.send({ message: 'update', data: taskToUpdate });
    console.log(err);

});

app.put("/api/v1/tasks/:id", (req, res) => {
    const id = req.params.id
    console.log(id);
    const body = req.body
    console.log(body);
    let taskToUpdate = tasks.find(task => task.id == id);
    console.log(taskToUpdate);
    if (taskToUpdate) {
        tasks = tasks.map(task => {
            if (task.id == id) return { ...task, ...body }
            res.send({ message: 'update', data: taskToUpdate })
            return task
        })
    }
    else tasks.push(body)

    res.send({ message: 'create', data: taskToUpdate })

})
// app.put('/api/v1/tasks/:id', (req, res) => {
//     const id = req.params.id;
//     const body = req.body;
//     let taskToUpdate = tasks.find(task => task.id == id);

//     if (taskToUpdate) {
//         // Update the properties of the found task
//         Object.assign(taskToUpdate, body);
//         res.send({ message: 'update', data: taskToUpdate });
//     } else {
//         // If the task with the provided ID doesn't exist, create a new one
//         tasks.push(body);
//         res.send({ message: 'create', data: body });
//     }
// });
//*make it listen
const PORT = process.env.PORT || 2000
app.listen(PORT, () => { // listen open port
    console.log(`Server is running on port ${PORT}`) // 
})

// http://localhost:2000/api/v1/tasks

//?request - include the data of the request
//?response - how you handle with the request