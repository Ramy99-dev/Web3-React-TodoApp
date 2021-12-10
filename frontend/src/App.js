import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ADDRESS, TODO_LIST_ABI } from './config';
import { useEffect, useState } from 'react';
function App() {

  const [account, setAccount] = useState('0x0');
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [todo, setTodo] = useState(null);
  let web3 = new Web3("HTTP://127.0.0.1:8545");
  let todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
  let taskCount = 0;
  useEffect(async () => {
    let accounts = await web3.eth.getAccounts();
    setAccount(accounts[0])
    console.log(accounts[0])
    taskCount = await todoList.methods.taskCount().call();
    let todosArr = [];
    for (let i = 0; i <= taskCount; i++) {
      let task = await todoList.methods.tasks(i).call();
      console.log(task)
      todosArr.push(task)
    }
    setTodos(todosArr)
    setLoading(false);
    console.log(todos);
  }, [])


  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Add Todo ..." onChange={(e) => {
          setTodo(e.target.value)
        }} />
        <button onClick={(e) => {
          e.preventDefault();
          todoList.methods.createTask(todo).send({ from: account }).once('receipt', (receipt) => {

            setTodos([...todos, { content: todo, id: taskCount + 1 }])
          })
        }}>Add</button>
      </form>
      {isLoading ? <p>Loading ...</p> : <ul>
        {todos.map((todo,index) => {
          return (
            <div key={todo.id}>
              <li>{todo?.content}
              <button onClick={()=>{
                todoList.methods.deleteTask(todo.id).send({ from: account }).once('receipt', (receipt) => {
                   let newTodos =  todos.splice(index,1)
                   setTodo(newTodos);
                })
              }}>Delete</button>
              </li>
             
            </div>);
        })}
      </ul>}
      <span>Current Account : {account}</span>
    </div>
  );
}

export default App;
