import React, { useState, useEffect } from 'react';

function Todos() {

    const [todos, setTodos] = useState([]);



    const tasks = async () => {
        const id = await JSON.parse(localStorage.getItem("currentUser") as any).id;
        const allTodos = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
        const userTodos = await allTodos.json();
        setTodos(userTodos);
    }

    const order = (event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.value) {
            case "alphabetical":
                setTodos(todos.sort((a:any, b:any) => a.title > b.title ? 1 : -1))
                break;
            case "serial":
                setTodos(todos.sort((a:any, b:any) => a.id > b.id ? 1 : -1))
                break;
            case "execution":
                setTodos(todos.sort((a:any, b:any) => a.completed < b.completed ? 1 : -1))
                break;
            case "random":
                setTodos(todos.sort(() => Math.random() - 0.5))
                break;
            default:
                break;
        }
    }

    return (
        <div className="center">
            <select className="form-select" aria-label="Default select example" onChange={(event) => {
                order(event);
            }}>
                <option value="serial">serial</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="execution">Execution </option>
                <option value="random">random</option>
            </select>
            <br></br>
            <ul className="list-group">
                {todos.map((todo:any) => <li className="list-group-item">
                    <input type="checkbox" className="form-check-input me-1" checked={todo.completed} />
                   
                    {todo.title}<br></br></li>)}
            </ul>
        </div>
    )
}

export default Todos;