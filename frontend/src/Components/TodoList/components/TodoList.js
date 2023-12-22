const TodoList = (props) => {
  const onDelTodo = (id) => {
    props.onDel(id);
  };
  // const onEditTodo = (id) => {
  //   props.onEdit(id);
  // };
  return (
    <div className="todoList">
      {props.passTodo.map((todo) => {
        return (
          <div className="row" key={todo._id}>
            <div className="col-10">
              <p className="form-control mb-2">{todo.task}</p>
            </div>
            <div className="col-2">
              {/* <i
                className="fa-solid fa-pen-to-square mx-1"
                onClick={() => onEditTodo(todo._id)}
              ></i> */}
              <i
                className="fa-solid fa-trash mx-1"
                onClick={() => onDelTodo(todo._id)}
              ></i>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
