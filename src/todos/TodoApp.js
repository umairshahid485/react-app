import './todo.css';
import Todo from './Todo';
import Form from './Form';
import Filters from './Filters';
import { useTodo } from '../helpers/todoHelper';

function TodoApp(props) {
        const {
          headingText,
          todos,
          FILTER_NAMES,
          FILTER_MAP,
          filter,
          listHeadingRef,
          handleTodoForm,
          handleEdit,
          handleDelete,
          toggleTaskCompleted,
          setFilter
      } = useTodo(); 

      const taskList = todos.filter(FILTER_MAP[filter]).map((task,i) => ( 
        <Todo name = {task.name} completed= {task.completed} tid={task.id} key={task.id} id = {i} editTask = {handleEdit} deleteTask = {handleDelete} toggleTaskCompleted = {toggleTaskCompleted}/>
      ));

      const totaltasksNoun = todos.length > 1 ? 'tasks' : 'task';
      const totalheadingText = `Total: ${ taskList.length } ${totaltasksNoun}`;

      const filterList = FILTER_NAMES.map(name => (
        <Filters key={name} name={name} isPressed={name === filter} setFilter={setFilter}/>
      ));


    return (
      <div className="todoapp stack-large">
        <h1>Todo App</h1>
        <Form submitAt = {handleTodoForm} />
        <div className="filters btn-group stack-exception">
            {
              filterList
            }
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
        <h5>{totalheadingText}</h5>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
            {
              taskList
            }
          
        </ul>
      </div>
    );
  }
  

  export default TodoApp;