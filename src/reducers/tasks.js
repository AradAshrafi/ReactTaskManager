const defaultState = [];
export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.task];
        case 'REMOVE_TASK':
            return state.filter(x => x._id !== action._id); //_id is task's id
        case 'EDIT_EXPENSE':
            return state.map(x => {
                if (x._id === action._id) {
                    return {
                        ...x,
                        ...action.update
                    };
                } else {
                    return x;
                }
            });
        case 'SET_TASKS':
            return [...action.tasks];
        default:
            return state;
    }
};
