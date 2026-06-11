import './App.css'
import EditToDoForm from './Components/EditToDoForm';
import ToDoForm from './Components/ToDoForm';
import {useState} from 'react';
function App() {
  const [todoTasks, setTodoTasks] = useState([
    {
      id: 1,
      task: 'Go to the gym',
      isEditing: true,
    },
    {
      id: 2,
      task: 'Buy groceries',
      isEditing: true,
    },
    {
      id: 3,
      task: 'Finish the project',
      isEditing: false,
    },
    {
      id: 4,
      task: 'Call mom',
      isEditing: false,
    },
    {
      id: 5,
      task: 'Read a book',
      isEditing: false,
    }
  
  ]); //useState is a React hook that allows us to add state to functional components. In this case, we are using it to manage the list of tasks in our ToDo app. The initial state is an array of sample tasks. The setTodoTasks function is used to update the state whenever a new task is added.

function handleAddTask(newTask) {
  console.log("New task added:", newTask);
  setTodoTasks([{
    id: todoTasks.length + 1, // Generate a new ID based on the current length of the tasks array. This is a simple way to ensure unique IDs for each task.
    task: newTask,
    isEditing: false,},
    ...todoTasks
  ])
  //setTodoTasks([newTask, ...todoTasks]); // Add the new task to the beginning of the list. Also, it determines the postion of the new task in the list. If we want to add the new task at the end of the list, we can use setTodoTasks([...todoTasks, newTask]);  
} //we use StateVariable to update the list of tasks. Whenever a new task is added, the state variable is updated, and the component re-renders to reflect the changes in the UI.

function handleUpdateTask(taskToUpdate) {
  console.log("Task updated:", taskToUpdate);
  const updatedTasks = todoTasks.map(task => {
    if(task.id === taskToUpdate.id) {
     return taskToUpdate;
    }
    return task;
  });
  setTodoTasks(updatedTasks);
}

function currentTask(task) {
  const updatedTasks = todoTasks.map(t => {
    if(t.id === task.id) {
      return {...t, isEditing: true,}
    }
    return t;
  });
  setTodoTasks(updatedTasks);
}
  return (
    <>
      <h2>ToDo App</h2>
      <ToDoForm handleAddTask={handleAddTask} /> {/* Pass the handler function as a prop  meaning the function has to be passed as a prop to call outside the component.*/}
      <ul>
        {
          todoTasks.map((task, index) => (<li key = {index}>
            {
           task.isEditing ? (<EditToDoForm handleUpdateTask={handleUpdateTask} task={task} />): <span onClick={() => currentTask(task)}>{task.task}</span>
            }
          </li>))
        }  
      </ul>
    </>
  )
}
export default App
