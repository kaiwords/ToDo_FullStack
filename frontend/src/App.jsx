import './App.css'

function App() {
  const todoTasks = [
    'Go to the gym',
    'Buy groceries',
    'Finish the project',
    'Call mom',
    'Read a book',
    'Plan the weekend trip'
  ];
  return (
    <>
      <h2>ToDo App</h2>
      <ul>
        {
          todoTasks.map((task, index) => (<li key = {index}>{task}</li>))
        }
      </ul>
    </>
  )
}
export default App
