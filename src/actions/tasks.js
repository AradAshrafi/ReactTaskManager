export const addTask = task => ({
    type: 'ADD_TASK',
    task
});

export const removeTask= _id =>({//_id is task's id
    type : 'REMOVE_TASK',
    _id
})
export const editTask = (_id,update) =>({
    type : 'EDIT_TASK',
    _id,
    update
})
export const setTasks = tasks => ({
    type: 'SET_TASKS',
    tasks
});
