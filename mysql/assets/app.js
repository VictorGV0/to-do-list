$(document).ready(function(){

    let edit = false;
    console.log("JQuery is working");
    $('#task-result').hide();
    fechtTasks();

/*BUSQUEDA DE TASKs*/


    $('#search').keyup(function (e) {
        // if ($('#search').val()) {
            lookForTask();     
        // }
        // else {
        //     $('#task-result').hide();
 });
        // }
    $('input').on("input", function () {
        if ($('input').val()=="") {
            $('#task-result').hide();
        }
    });
        
   




/**FUNCION BUSCAR TASKS */

function lookForTask(){
    if ($('#search').val()) {

    let search = $('#search').val();
    $.ajax({
        url: 'task-search.php',
        type: 'POST',
        data: { search },
         success: function (response) {
             let tasks = JSON.parse(response);
             let template = '';

             if (!tasks=="") {
                tasks.forEach(task => {
                    template += `<div taskId=${task.id}>
                    <li ><a href=# class="task-item ">${task.name}</a> ->  ${task.description} 
                    
                    <a href="#" class="task-delete "><i class="bi bi-trash"></i></a>
                </li></div>`
                });
                $('#container').html(template);
                $('#task-result').show();
             }
            if ((tasks=="")) {
                template += `<em>No hay resultados que coincidan con tu busqueda</em>`
                $('#container').html(template);
            } 
     }



    });
}
    else {
    $('#task-result').hide();

}

}

/*GUARDAR NUEVA TAREA O NUEVA MODIFICACION TASKS*/


    $('#task-form').submit(function(e){
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val()

        }
        let url = edit === false ? 'task-add.php' : 'task-edit.php';
        $.post(url, postData, function (response){
            // $('#task-form').trigger('reset');
            e.preventDefault();
            fechtTasks();
            edit = false;
            lookForTask();   
            console.log(response);
        });
        
    });
$('.reset').on("click", function(){
        edit=false;
    
    });

/**CONSULTAR LAS TAREAS EXISTENTES */

    function fechtTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            data: 'json',
            success: function(response){
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task =>{
                    template += `
                    
                    <tr taskId=${task.id}>
                        
                        <td >
                            <div class="relative">
                            <a href=# class="task-item2 ">${task.name}</a>
                            <i class="icon bi bi-pencil"></i></div>
                                
                        </td>

                        <td>${task.description}</td>
                        <td>
                            <button class="task-delete btn btn-danger">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                    `
                });
                $('#task').html(template);
            }
        });
    }

/**ELIMINAR TAREAS  */


    $(document).on('click', '.task-delete', function(){
       if (confirm('Estas seguro que desea Eliminar?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('task-delete.php', {id}, function (response){
         fechtTasks();
         lookForTask();
         $('#task-form').trigger('reset')
        

     });
       }
    
    });


/**RETRIEVE A TASK ON RESULTS*/
    $(document).on('click', '.task-item', function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $fetchtask (id)
    })


/**RETRIEVE A TASK ON LIST */
$(document).on('click', '.task-item2', function(){
    let element = $(this)[0].parentElement.parentElement.parentElement;
    let id = $(element).attr('taskId');
    $fetchtask (id)
    
})

function $fetchtask (id){
    $.post('task-single.php', {id}, function (response){
        const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            edit = true;
            
    });
}


});
