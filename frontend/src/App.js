import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ADDRESS, TODO_LIST_ABI } from './config';
import { useEffect, useState } from 'react';
function App() {
  
  const [account, setAccount] = useState('0x0');
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [todo, setTodo] = useState(null);
  const [hasData , setHasData] = useState(false)

  let web3 = new Web3(window.web3.currentProvider);
  window.ethereum.enable();
  let todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
  let taskCount = 0;
  useEffect(async () => {
    let accounts = await web3.eth.getAccounts();
    setAccount(accounts[0])
    console.log(accounts[0])
    taskCount = await todoList.methods.taskCount().call();
    (taskCount > 0 && setHasData(true))
    let todosArr = [];
   
    for (let i = 1  ; i <= taskCount; i++) {
      console.log(taskCount)
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
      <div className="container">
      <form>
        <input type="text" placeholder="Add Todo ..." onChange={(e) => {
          setTodo(e.target.value)
        }} />
        <button onClick={(e) => {
          e.preventDefault();
          todoList.methods.createTask(todo).send({ from: account }).once('receipt', (receipt) => {
            setHasData(true)
            setTodos([...todos, { content: todo, id: taskCount + 1 }])
           
          })
        }}>Add</button>
      </form>
      {hasData ? isLoading ? <p>Loading ...</p> : <ul>
        {todos.map((todo,index) => {
          return (
            <div key={todo.id}>
              <li>{todo?.content}
              <button onClick={()=>{
                todoList.methods.deleteTask(todo.id).send({ from: account }).once('receipt', async(receipt) => {
                  taskCount = await todoList.methods.taskCount().call();
                  console.log(taskCount)
                   let newTodos =  todos.splice(index,1)
                   setTodo(newTodos);
                })
              }}>✔</button>
              </li>
             
            </div>);
        })}
      </ul> :<p>No Data Found</p>}
      <span>Current Account : {account}</span>
    </div>
    </div>
  );
}

export default App;
