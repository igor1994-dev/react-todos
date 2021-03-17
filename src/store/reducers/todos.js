const initialState = JSON.parse(localStorage.getItem('todos')) || [];

function todos(state = initialState, action) {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, { id: action.id, text: action.text, completed: action.completed }];
        case "DELETE_ITEM":
            return state.filter(todo => todo.id !== action.id);
        case "CHANGE_TEXT":
            return state.map(todo => {
                if (action.id === todo.id) todo.text = action.text;
                return todo;
            });
        case "CHANGE_COMPLETED":
            return state.map(todo => {
                if (action.id === todo.id) todo.completed = action.completed;
                return todo;
            })

        default:
            return state;
    }

}

export default todos