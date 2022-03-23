$(document).ready(function () {
    edit = false;
    result = false;
    console.log("JQuery is working");
    $('#task-result').hide();
    getasks();



    /**FETCH RECORDED TASKS */

    async function fechtTasks() {
        try {
            let res = await fetch('assets/tasks.json', { cache: "reload" });
            return await res.json();
        }
        catch (error) {
            console.log(error)
        }
    };

    async function getasks() {
        let tasks = await fechtTasks();
        tasks = tasks.data;
        $counter = 0;
        let template = '';
        tasks.forEach(task => {
            $counter += 1;
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

    /**DELETE TASKS */
    $(document).on('click', '.task-delete', function () {
        if (confirm('Estas seguro que desea Eliminar?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');

            getasksID(id)
                .then(function () {
                    if (!$('#description').val()== '' || !$('#name').val()== ''  ) {
                        $('#task-form').trigger('reset');
                    }
                    if ($('#search').val()) {
                        getasks();
                        result = false;
                        lookForThis();
                        
                    }
                    else getasks();
                    

                })
        }

    });

    /**GET POSITON AND DELETE RECORD*/
    async function getasksID(id) {
        let tasks = await fechtTasks();
        tasks = tasks.data;
        $counterid = 0;

        tasks.forEach(task => {
            $counterid += 1;
            if (task.id == id) {
                $position = $counterid - 1;
            }
        })
        let delData = {
            position: $position
        }

        $.post('delete.php', delData, function (response) {
            console.log(response)


        });
    }



    /*SAVE NEW TASK OR EDIT */

    $('#task-form').submit(function (e) {
        e.preventDefault();
        const postData = {
            id: $counter + 1,
            name: $('#name').val(),
            description: $('#description').val(),
            position: $counter
        }


        if (edit === false) {
            $.post('add.php', postData, function () {
                $resetForm();
            });

        }
        if (edit === true) {
            console.log($updateData);
            $updateData.name = $('#name').val();
            $updateData.description = $('#description').val();
            $.post('edit.php', $updateData, function () {
                $resetForm();
                edit = false;

            });
        }


        getasks()
            .then(function () {
                if ($('#search').val()) {
                    lookForThis();
                    result = false;
                }
            })
    });

    $('.reset').on("click", function () {
        edit = false;

    });
    function $resetForm() {
        $('#task-form').trigger('reset');
        getasks();
    }


    /**FETCH POSITION AND ID FOR EDIT */

    $(document).on('click', '.task-item2', function () {
        let element = $(this)[0].parentElement.parentElement.parentElement;
        let id = $(element).attr('taskId');
        sendId(id);


    })

    $(document).on('click', '.task-item', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        sendId(id);

    })

    function sendId(id) {
        edit = true;
        getasksEdit(id).then(function () {
            $updateData = {
                id: id,
                position: $positionEdit
            }
        });
    }

    /**GET POSITION AND VALUES TO UPDATE RECORD */

    async function getasksEdit(id) {
        let tasks = await fechtTasks();
        tasks = tasks.data;
        $counterEdit = 0;

        tasks.forEach(task => {
            $counterEdit += 1;
            if (task.id == id) {
                $positionEdit = $counterEdit - 1;

                $('#name').val(task.name);
                $('#description').val(task.description);
                $('#taskId').val(task.id);
            }
        })
    }

    /**TASKS SEEKER  */

    $('input').on("input", function () {
        if ($('input').val() == "") {
            $('#task-result').hide();
            result = false;
        }
    });


    /**SEEKER FILTER FUNCTION */


    $('#search').keyup(function () {
        if ($('#search').val()) {
            lookForThis();
        }
        if ($('#search').val() == '') {
            $('#task-result').hide();
            result = false;
        }
    });

    function lookForThis() {
        let str = $('#search').val();
        async function seekTask() {
            let tasks = await fechtTasks();
            $tasks = tasks.data;
            searchTask(str, $tasks);
        }
        seekTask();

    }



    function searchTask(str, $tasks) {
        let template = '';
        $('#task-result').show();
        $tasks.forEach(task => {
            if (task.name.match(str)) {
                result = true;
                template +=
                    `<div taskId=${task.id}>
            <li ><a href=# class="task-item result">${task.name}</a> ->  ${task.description} 
            <a href="#" class="task-delete "><i class="bi bi-trash"></i></a>
            </li></div>`
                $('#container').html(template);


            }
        })
        if (!result) {
            template += `<em>No hay resultados que coincidan con tu busqueda</em>`
            $('#container').html(template);
        }
    }

});
