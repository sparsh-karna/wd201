const todoList = () => {
  let all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  var dateToday = new Date();
  const today = formattedDate(dateToday);
  const overdue = () => {
    // Write the date check condition here and return the array
    // of todo items that are overdue accordingly.
    let overdue = [];
    all.forEach((todo) => {
      if (new Date(todo.dueDate) < new Date(today) && !todo.completed) {
        overdue.push(todo);
      }
    });
    return overdue;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    let dueToday = [];
    all.forEach((todo) => {
      if (
        new Date(todo.dueDate).toISOString() === new Date(today).toISOString()
      ) {
        dueToday.push(todo);
      }
    });
    return dueToday;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    let dueLater = [];
    all.forEach((todo) => {
      if (new Date(todo.dueDate) > new Date(today)) {
        dueLater.push(todo);
      }
    });
    return dueLater;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    let displayableList = "";
    list.forEach((todo) => {
      if (
        new Date(todo.dueDate).toISOString() !== new Date(today).toISOString()
      ) {
        if (!todo.completed) {
          displayableList += `[ ] ${todo.title} ${todo.dueDate}\n`;
        } else {
          displayableList += `[x] ${todo.title} ${todo.dueDate}\n`;
        }
      } else {
        if (!todo.completed) {
          displayableList += `[ ] ${todo.title}\n`;
        } else {
          displayableList += `[x] ${todo.title}\n`;
        }
      }
    });
    displayableList = displayableList.trim();
    return displayableList;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
