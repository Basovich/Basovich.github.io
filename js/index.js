(function ($) {
    var todoList = $('.todo__list'),
        controlPanel = $('.todo__control'),
        controlAdd = $('.todo__add'),
        lsid = 1,
        lsMask = 'ls_'; // маска для нумерации localStorage, что бы делать уникальные ключи


    //Вывод таксков после перезагрузки страницы
    showTask();
    function showTask() {
        var lsLength = localStorage.length;
        if (lsLength) {
            for (var i = 0; i < lsLength; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(lsMask) === 0) {
                    var returnObj = localStorage.getItem(key);//вытащили ключ и значения из стореджа - строка
                    var ob = JSON.parse(returnObj); //парсим в обьект из строки

                    //грузим портянку в html, надо бы оптимизировать при возможности
                    $('<div></div>').addClass('todo__task').addClass('task').attr("data-priority", ob.item1).attr("data-order", "0").attr("data-project", ob.item2).attr("data-lsItem", key).prependTo(todoList);
                    $('<h2></h2>').addClass('task__title').text(ob.item4).appendTo($('.task:eq(0)'));
                    $('<div></div>').addClass('task__info').appendTo($('.task:eq(0)'));
                    $('<div></div>').addClass('task__project').text('Проект: ').appendTo($('.task:eq(0) .task__info'));
                    $('<span></span>').addClass('task__project-name').text(ob.item2).appendTo($('.task:eq(0) .task__project'));
                    $('<div></div>').addClass('task__priority').text('priority: ').appendTo($('.task:eq(0) .task__info'));
                    $('<span></span>').addClass('task__priority-num').text(ob.item1).appendTo($('.task:eq(0) .task__priority'));
                    $('<p></p>').addClass('task__description').text(ob.item5).appendTo($('.task:eq(0)'));
                    $('<div></div>').addClass('task__btn-group').appendTo($('.task:eq(0)'));
                    $('<button></button>').addClass('btn').addClass('btn-primary').addClass('change-task').text('Изменить').attr('type','button').appendTo($('.task:eq(0) .task__btn-group'));
                    $('<button></button>').addClass('btn').addClass('btn-primary').addClass('remove-task').attr('type','button').text('Закрыть').appendTo($('.task:eq(0) .task__btn-group'));
                    $('<button></button>').addClass('btn').addClass('btn-primary').addClass('show-text-switch').attr('type','button').text('Свернуть').appendTo($('.task:eq(0) .task__btn-group'));
                }
            }
        }
    }


    //контролируем счет тасков, новая таска будет с номером последней + 1
    if ($('.task').length > 0) {
        lsid = $('.task:eq(0)').attr('data-lsitem').slice(3);

        setOrder();
    }

    /*show and hide text in Task card*/
    $(document).on('click', '.show-text-switch', function() {
        var btnSwitch = $(this).text();

        $(this).parents(".task").find(".task__description").slideToggle(200);

        if( btnSwitch === "Свернуть" ) {
            btnSwitch = "Развернуть";
        } else {
            btnSwitch = "Свернуть";
        }
        $(this).text(btnSwitch);
    });


    /*remove Task card*/
    $(document).on('click','.remove-task', function() {
        var inDex1 = $(this).closest(".task").attr('data-order'),
            inDex2 = $('.todo__add').attr('data-change'),
            lsKey = $(this).closest(".task").attr('data-lsitem');

        if (inDex1 === inDex2) {
            showHide(controlPanel, controlAdd);
            setEmptyInput();
        }
        $(this).closest(".task").remove();
        var allTasks = $('.task');

        changeSelect();

        if ($("#projectCheck").val() === 'Все') {
            allTasks.show();
        }

        localStorage.removeItem(lsKey);
        setOrder();
    });


    /*sort priority*/
    $(document).on('change','#priorityCheck', function() {
        var el = $('.task');

        if(this.checked) {
            el.sort(function(a, b) {
                return a.getAttribute('data-priority') > b.getAttribute('data-priority')
            }).appendTo(el.parent());
        } else {
            el.sort(function(a, b) {
                return a.getAttribute('data-order') > b.getAttribute('data-order')
            }).appendTo(el.parent());
        }
    });


    /*sort project*/
    $(document).on('change','#projectCheck', function() {
        var val = $(this).val(),
            valAll = 'Все',
            el = $('.task');

        $( el ).each(function( index ) {
            if ( valAll === val ) {
                $(this).show();
            } else if ( $(this).attr('data-project') === val ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });


    /*open panel add task*/
    $('#addTask').on('click',function() {
       showHide(controlAdd, controlPanel);
       showHide($('#saveNewTask'), $('#changeThisTask'));
    });


    /*hide-cencel panel add task*/
    $('#cancelAddTask').on('click',function() {
        showHide(controlPanel, controlAdd);
        setEmptyInput();
        $(".input-group").removeClass('error');
    });


    /*save New Task*/
    $('#saveNewTask').on('click',function () {
        createNewTask();
    });

    function createNewTask() {
        var taskName = $('#taskName').val(),//записываем что бы обнулить добавление новых тасков
            projectName = $('#projectName').val(),
            priorityAdd = $('#priorityAdd').val(),
            description = $('#description').val(),
            taskNameInput = $('#taskName'),
            projectNameInput = $('#projectName'),
            priorityAddInput = $('#priorityAdd'),
            descriptionInput = $('#description'),
            value = '',
            nid = 0,
            validate = true;


        switch (value) {
            case taskName:
                taskNameInput.parents(".input-group").addClass('error');
                validate = false;
            case projectName:
                projectNameInput.parents(".input-group").addClass('error');
                validate = false;
            case priorityAdd:
                priorityAddInput.parents(".input-group").addClass('error');
                validate = false;
            case description:
                descriptionInput.parents(".input-group").addClass('error');
                validate = false;
                break;
            default:
                validate = true;
                taskNameInput.parents(".input-group").removeClass('error');
                projectNameInput.parents(".input-group").removeClass('error');
                priorityAddInput.parents(".input-group").removeClass('error');
                descriptionInput.parents(".input-group").removeClass('error');
        }

        if ( taskName ) {
            taskNameInput.parents(".input-group").removeClass('error');
        }
        if ( projectName ) {
            projectNameInput.parents(".input-group").removeClass('error');
        }
        if ( priorityAdd ) {
            priorityAddInput.parents(".input-group").removeClass('error');
        }
        if ( description ) {
            descriptionInput.parents(".input-group").removeClass('error');
        }

        if ( validate === false ) {
            return;
        }

        setEmptyInput();

        //Создаем новую карточку таски
        $('<div></div>').addClass('todo__task').addClass('task').attr("data-priority", priorityAdd).attr("data-order", "0").attr("data-project", projectName).attr("data-lsItem", lsMask+(+lsid+1)).prependTo(todoList);
        $('<h2></h2>').addClass('task__title').text(taskName).appendTo($('.task:eq(0)'));
        $('<div></div>').addClass('task__info').appendTo($('.task:eq(0)'));
        $('<div></div>').addClass('task__project').text('Проект: ').appendTo($('.task:eq(0) .task__info'));
        $('<span></span>').addClass('task__project-name').text(projectName).appendTo($('.task:eq(0) .task__project'));
        $('<div></div>').addClass('task__priority').text('priority: ').appendTo($('.task:eq(0) .task__info'));
        $('<span></span>').addClass('task__priority-num').text(priorityAdd).appendTo($('.task:eq(0) .task__priority'));
        $('<p></p>').addClass('task__description').text(description).appendTo($('.task:eq(0)'));
        $('<div></div>').addClass('task__btn-group').appendTo($('.task:eq(0)'));
        $('<button></button>').addClass('btn').addClass('btn-primary').addClass('change-task').text('Изменить').attr('type','button').appendTo($('.task:eq(0) .task__btn-group'));
        $('<button></button>').addClass('btn').addClass('btn-primary').addClass('remove-task').attr('type','button').text('Закрыть').appendTo($('.task:eq(0) .task__btn-group'));
        $('<button></button>').addClass('btn').addClass('btn-primary').addClass('show-text-switch').attr('type','button').text('Свернуть').appendTo($('.task:eq(0) .task__btn-group'));

        //добавляем в выборку по имени имя новой таски
        changeSelect();

        // Перезапишем остальным таскам очередность в дата атрибут, что бы возвращать их в прежнню очередность после выборки по приоритетности
        setOrder();

        showHide(controlPanel, controlAdd);

        //Записываем данные в localStorage
        todoList.find('task').each(function (index, elem) {
            var nid = $(this).attr("data-lsItem").slice(3);
            if (nid > lsid) {
                lsid = nid;
            }
        });
        lsid++;

        //создадим объект, что бы хранить все данные таски
        var obj = {
            item1: priorityAdd,
            item2: projectName,
            item3: lsMask+lsid,
            item4: taskName,
            item5: description
        };

        var serialObj = JSON.stringify(obj); //сериализуем его
        localStorage.setItem(lsMask+lsid, serialObj); //запишем его в хранилище по ключу
    }


    /*change Task - open inputs*/
    $(document).on('click', '.change-task', function() {
        showHide(controlAdd, controlPanel);

        var taskTitle = $(this).closest(".task").find('.task__title').text(),
            projectName = $(this).closest(".task").find('.task__project-name').text(),
            priority = $(this).closest(".task").find('.task__priority-num').text(),
            description = $(this).closest(".task").find('.task__description').text(),
            numKey = $(this).closest(".task").attr("data-lsitem"),
            numBlock = $(this).closest(".task").attr("data-order");

        $('.todo__add').attr('data-change', numKey);
        $('.todo__add').attr('data-count', numBlock);
        $('#taskName').val(taskTitle);
        $('#projectName').val(projectName);
        $('#priorityAdd').val(priority);
        $('#description').val(description);

        showHide($('#changeThisTask'), $('#saveNewTask'));
    });

    $('#changeThisTask').on('click', function() {
        var inDex = $('.todo__add').attr('data-change'),
            numBlock = $('.todo__add').attr('data-count');

        var taskName = $('#taskName').val(),//записываем что бы обнулить добавление новых тасков
            projectName = $('#projectName').val(),
            priorityAdd = $('#priorityAdd').val(),
            description = $('#description').val(),
            taskNameInput = $('#taskName'),
            projectNameInput = $('#projectName'),
            priorityAddInput = $('#priorityAdd'),
            descriptionInput = $('#description'),
            value = '',
            validate = true;

        switch (value) {
            case taskName:
                taskNameInput.parents(".input-group").addClass('error');
                validate = false;
            case projectName:
                projectNameInput.parents(".input-group").addClass('error');
                validate = false;
            case priorityAdd:
                priorityAddInput.parents(".input-group").addClass('error');
                validate = false;
            case description:
                descriptionInput.parents(".input-group").addClass('error');
                validate = false;
                break;
            default:
                validate = true;
                taskNameInput.parents(".input-group").removeClass('error');
                projectNameInput.parents(".input-group").removeClass('error');
                priorityAddInput.parents(".input-group").removeClass('error');
                descriptionInput.parents(".input-group").removeClass('error');
        }

        if ( taskName ) {
            taskNameInput.parents(".input-group").removeClass('error');
        }
        if ( projectName ) {
            projectNameInput.parents(".input-group").removeClass('error');
        }
        if ( priorityAdd ) {
            priorityAddInput.parents(".input-group").removeClass('error');
        }
        if ( description ) {
            descriptionInput.parents(".input-group").removeClass('error');
        }

        if ( validate === false ) {
            return;
        }

        $(".task:eq(" + numBlock + ")").attr("data-priority", $('#priorityAdd').val());
        $(".task:eq(" + numBlock + ")").attr("data-project", $('#projectName').val());
        $(".task:eq(" + numBlock + ") .task__title").text($('#taskName').val());
        $(".task:eq(" + numBlock + ") .task__project-name").text($('#projectName').val());
        $(".task:eq(" + numBlock + ") .task__priority-num").text($('#priorityAdd').val());
        $(".task:eq(" + numBlock + ") .task__description").text($('#description').val());

        changeSelect();
        setEmptyInput();
        showHide(controlPanel, controlAdd);

       //создадим объект, что бы хранить все данные таски
        var obj = {
            item1: priorityAdd,
            item2: projectName,
            item3: inDex,
            item4: taskName,
            item5: description
        };

        var serialObj = JSON.stringify(obj); //сериализуем его
        localStorage.setItem(inDex, serialObj); //запишем его в хранилище по ключу

    });


    changeSelect();
    function changeSelect() {
        var selectObj = {},
        	html = '<option>Все</option>';

        $('.task__project-name').each(function( index, val ) {
        	selectObj[$(val).text()]=1;
        });

        for (var key in selectObj) {
        	if(selectObj.hasOwnProperty(key)){
        		 html += '<option>' + key + '</option>';
        	}
        }

        $("#projectCheck").html(html);
    }


    // Обнуляем значения, что бы не путаться при добавлении и изменении таски
    function setEmptyInput() {
        $('#taskName').val('');
        $('#projectName').val('');
        $('#priorityAdd').val('1');
        $('#description').val('');
    }

    function showHide(show, hide) {
        show.show();
        hide.hide();
    }

    // Перезапишем остальным таскам очередность в дата атрибут, что бы возвращать их в прежнню очередность после выборки по приоритетности
    function setOrder() {
        $('.task').each(function( index ) {
            $(this).attr("data-order", index);
        });
    }
})(jQuery);