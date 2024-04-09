// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

//<div id="draggable" class="ui-widget-content">
//<p>Drag me around</p>
//</div>


$( function() {
    $( "#draggable" ).draggable();
  } );


// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}





$( function() {

    $( ".swim-lanes" ).sortable({
        connectWith: ".swim-lanes",
        handle: ".task-card-header",
        cancel: ".task-card-toggle",
        placeholder: "task-card-placeholder ui-corner-all"
      });

 
    $( ".task-card" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".task-card-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick task-card-toggle' style='margin-right: 15px'></span>");
 
    $( ".task-card-toggle" ).on( "click", function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".task-card" ).find( ".task-card-content" ).toggle();
    });
  } );





// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});





$( function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  } );



  