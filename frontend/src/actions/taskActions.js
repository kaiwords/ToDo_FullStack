//actions folder contains all the actions that can be performed on the tasks. These actions are dispatched to the reducers to update the state of the application.

const API_URL = "http://localhost:3000";
export async function getTasks () {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();
    return tasks;
}

export async function addTask (task) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
        }
    );
    const newTask = await response.json();
    return newTask;
};