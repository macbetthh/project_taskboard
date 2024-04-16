// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;


// Todo: create a function to generate a unique task id
function generateTaskId() {
    localStorage.setItem("nextId", JSON.stringify(nextId + 1));
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task, progress) {
    const deadlineDate = dayjs(task.deadline);
    let colorClass = '';

    // Determine color class based on deadline and progress
    if (deadlineDate.isBefore(dayjs(), 'day')) {
        colorClass = 'bg-danger text-light'; // Past deadline - Red color
    } else if (deadlineDate.isSame(dayjs(), 'day')) {
        colorClass = 'bg-warning'; // Due today - Yellow color
    } else {
        colorClass = ''; // Deadline in the future - No additional color
    }

    // For tasks in the "done" column, remove background color classes
    if (progress === 'done') {
        colorClass = 'text-dark'; // Set text color to dark
    }
    //     colorClass = ''; // Deadline in the future - No additional color
    //     textColorClass = 'text-dark'; // Set text color to dark
    // }

    
    return `
    <div class="card mb-3 task-card " data-task-id="${task.id}" >
    <div class="card-header ${colorClass}">
        <h5 class="card-title">Task: ${task.title}</h5>
    </div>
    <div class="card-body">
        <p class="card-text">Description: ${task.description}</p>
        <p class="card-text">Deadline: ${task.deadline}</p>
    </div>
    <div class="card-footer text-body-secondary bg-light">
        <a href="#" class="btn btn-danger delete-task-btn">Delete</a>
    </div>
</div>`;




}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const todoContainer = document.getElementById('todo-cards');
    const inProgressContainer = document.getElementById('in-progress-cards');
    const doneContainer = document.getElementById('done-cards');
    todoContainer.innerHTML = '';
    inProgressContainer.innerHTML = '';
    doneContainer.innerHTML = '';

    storedTasks.forEach(task => {
        const progress = task.progress || 'todo';
        const taskCardHTML = createTaskCard(task, progress);

        switch (progress) {
            case 'to-do':
                todoContainer.insertAdjacentHTML('beforeend', taskCardHTML);
                break;
            case 'in-progress':
                inProgressContainer.insertAdjacentHTML('beforeend', taskCardHTML);
                break;
            case 'done':
                doneContainer.insertAdjacentHTML('beforeend', taskCardHTML);
                break;
            default:
                console.error(`Invalid task progress state: ${progress}`);
        }
    });

    // Make task cards draggable
    $('.task-card').draggable({
        cursor: 'grab',
        opacity: 0.7,
        zIndex: 100,
        helper: function (event) {
            const original = $(event.target).hasClass('ui-draggable') ? $(event.target) : $(event.target).closest('.ui-draggable');
            return original.clone().css({
                maxWidth: original.outerWidth()
            });
        }
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    /*form input goes on each new card when adding task*/
    const taskNameInput = document.querySelector('#task-name').value;
    const taskDescriptionInput = document.querySelector('.task-description').value;
    const taskDeadlineInput = document.querySelector('#datepicker').value;

    
    /*Create a new task array item*/
    const newTask = {
        id: generateTaskId(),
        title: taskNameInput,
        description: taskDescriptionInput,
        deadline: taskDeadlineInput,
        progress: 'to-do' 
    };

    /*push to array*/
    taskList.push(newTask);


    localStorage.setItem("tasks", JSON.stringify(taskList));

    /*call create card function*/
    const newTaskCard = createTaskCard(newTask);

    document.getElementById('todo-cards').insertAdjacentHTML('beforeend', newTaskCard);

    /*clear modal form to be able to add new task info*/
    $('#task-name').val('');
    $('#floatingTextarea2').val('');
    $('#datepicker').val('');

    /*close modal when finishing the task form*/
    $('#staticBackdrop').modal('hide');

    renderTaskList();
}




// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();
    
    const taskId = $(this).parents('.task-card')[0].dataset.taskId; 
    console.log('Deleting task with ID:', taskId);
    const taskIndex = taskList.findIndex(task => task.id.toString() === taskId);
    console.log('Current task list:', taskList);

    /* if loop to delete the targeted task the delete button is being clicked on */
    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);

        localStorage.setItem("tasks", JSON.stringify(taskList));

        localStorage.removeItem(`task_${taskId}`);

        /* updates list as tasks are deleted*/
        renderTaskList();
    } else {
        console.error('Task not found.');
    }
}



// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    console.log(ui.draggable[0]);

    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;

    for(let task of taskList){
        console.log(task.id);
        console.log(ui.draggable[0]);
        if (task.id === parseInt(taskId)){
            task.progress = newStatus;
        }
    }
    console.log(taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    
    renderTaskList();

}


/* Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker */
$(document).ready(function () {
    renderTaskList();

    /*datepicker from jquery*/
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true
    });

    /* event listener for "delete" button*/
    $(document).on('click', '.delete-task-btn', handleDeleteTask);

      /* event listener for "Add Task" button */
    document.getElementById('add-task-btn').addEventListener('click', handleAddTask);


    /*columns allow cards to be dropped on them */
    $('.lane').droppable({
        accept: ".task-card",
        drop: handleDrop

    });

});

