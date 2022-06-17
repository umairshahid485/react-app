import { useState, useRef, useEffect } from 'react';

export function useTodo(){
    const listHeadingRef = useRef(null);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }


    const List = [
        { id: 0, name: "Eat",  completed: true },
        { id: 2, name: "Sleep", completed: false },
        { id: 3, name: "Repeat", completed: false }
      ];

    const [todos,setTodo] = useState(List);
    const remainingTasks = todos.filter(task =>  false === task.completed);
    const tasksNoun = remainingTasks.length > 1 ? 'tasks' : 'task';
    const headingText = `${ remainingTasks.length } ${tasksNoun} remaining`;
    const FILTER_MAP = {
        All: () => true,
        Active: task => !task.completed,
        Completed: task => task.completed
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const [filter, setFilter] = useState('All');

    const prevTaskLength = usePrevious(todos.length);

    useEffect(() => {
        if (todos.length - prevTaskLength === -1) {
          listHeadingRef.current.focus();
        }
    }, [todos.length, prevTaskLength]);

    const handleTodoForm = (e) => {
        e.preventDefault();
        var newTodo = e.target.newtodo.value;
        
        var newdoArray = {id:todos.length+1,name:newTodo,completed:false};
        var updatedToDo = [...todos,newdoArray];
        setTodo(updatedToDo);

        e.target.newtodo.value = "";
    };

    function handleEdit(id, newName) {
        const editedTaskList = todos.map(task => {
          if (id === task.id) {
            return {...task, name: newName}
          }
          return task;
        });
        setTodo(editedTaskList);
    }

    function handleDelete (id){
        const remainingTasks = todos.filter(task => id !== task.id);
        setTodo(remainingTasks);
    }
    
    function toggleTaskCompleted(id) {
        const updatedTasks = todos.map(task => {
            if (id === task.id) {
              return {...task, completed: !task.completed}
            }
            return task;
        });
        setTodo(updatedTasks);
    }

    return {
        todos,
        headingText,
        FILTER_NAMES,
        FILTER_MAP,
        filter,
        listHeadingRef,
        prevTaskLength,
        handleTodoForm,
        handleEdit,
        handleDelete,
        toggleTaskCompleted,
        setFilter
    }
}