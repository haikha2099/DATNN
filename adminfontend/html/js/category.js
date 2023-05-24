
function loadCategoryJs() {
    console.log('category page js...')
    var dataTable = null

    var flagUpdatecategory = false
    var flagDeleteMultiplecategorys = false

    var PAGE_NUMBER = 1
    var PAGE_SIZE = 20
    var ORDER_BY = 'id,desc'//sort paging

    var currentRowIndex = 0;

    var categoryId = 0;
    var arrcategoryId = []//Mảng lưu các id category khi xóa cùng lúc nhiều bản ghi

    var listcategories = [] //luu mang category

    function showErrorAuthentication(msg) {
        $('#error_message_authentication').html(msg)
    }

    // getListDepartments()

    function getListcategories() {
        let url = "http://localhost:8888/api/category/list"

        //console.log(localStorage.getItem('token'))

        $.ajax({
            url: url,
            method: 'GET',

            success: function (response) {
                console.log(response)
                listcategories = [];
                listcategories = response;
                createTablecategory(listcategories)
            },
            error: function (error) {
                if (error.status == 401) {
                    showErrorAuthentication(error.responseJSON.message)
                } else if (error.status == 403) {
                    showErrorAuthentication("Forbidden!")
                } else {
                    showErrorAuthentication("Unkown error")
                }
            }
        })
    }

    function createTablecategory(listcategories) {
        let categories = []

        for (let i = 0; i < listcategories.length; i++) {
            let temp = []
            temp[0] = i + 1
            temp[1] = listcategories[i].cg_name
            temp[2] = listcategories[i].cg_id
            temp[3] = ''
            categories.push(temp)
        }

        dataTable = $('#datatables_categories').DataTable({
            data: categories,
            columns: [
                { title: "STT" },
                { title: "Tên danh mục" },
                { title: "" },
                { title: "Action" }
            ],
            "columnDefs": [
                {
                    "targets": 2,
                    "visible": false
                },
                {
                    "targets": 3,
                    "width": 100,
                    "render": function (data, type, row, meta) {
                        return '<td>' +
                            '<button class="btn-actions edit" data-toggle="modal" data-target="#defaultModalWarning"><i class="material-icons">&#xE3C9;</i></button>' +
                            '<button class="btn-actions delete-category" data-toggle="modal" data-target="#defaultModalDanger_category"><i class="material-icons">&#xe872;</i></button>' +
                            '</td>'

                    }
                }
            ],
            "select": {
                'style': 'multi'
            },

        })

    }

    //Load categorys & Create table category

    getListcategories();

    //Handle actions
    $(document).on('click', '.icon-close', function () {
        $(this).parent().find('select').val('none')
        $(this).parent().find('input').val('')
        $(this).removeClass('icon-close-show')
    })

    $(document).on('change', '.select', function () {
        if ($(this).val() != null) {
            $(this).parent().find('.icon-close').addClass('icon-close-show')
        }
    })

    $(document).on('input', '.search-input input', function () {
        if ($(this).val() !== '') {
            $(this).parent().find('.icon-close').addClass('icon-close-show')
        } else {
            $(this).parent().find('.icon-close').removeClass('icon-close-show')
        }
    })

    $('#category_department').on('change', function () {
        console.log($(this).val())
    })

    //Remove selected row
    $('#btn_close_form_category').click(function () {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_dismiss_form_category').click(function () {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_no_category').click(function () {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_close_delete_category').click(function () {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_refresh_category').click(function () {
        dataTable.destroy()
        getListcategorys('', 0, '', PAGE_NUMBER, PAGE_SIZE, ORDER_BY)
        // console.log("refresh success")
    })

    //Filter form
    $('#icon_search_category').on('click', function () {
        let role = $('#select_role_category').val()
        let departmentId = $('#select_department_category').val()
        let search = $('#search_input_category').val()

        console.log('departmentId: ' + departmentId)
        console.log(role)

        //Note
        if (departmentId === 'none') departmentId = 0
        else departmentId = parseInt(departmentId)

        if (search === '') search = null
        else {
            search = search.trim().replace(' ', '%')
        }
        if (role === 'none') role = ''


        dataTable.destroy()

        getListcategorys(role, departmentId, search, 1, PAGE_SIZE, ORDER_BY);
    })

    //btn delete only one category
    $(document).on('click', 'td .delete-category', function () {

        flagDeleteMulticategory = false;

        currentRowIndex = parseInt($(this).closest('tr').find('td').eq(0).html()) - 1

        let rowData = dataTable.row(currentRowIndex).data()

        categoryId = rowData[2]
    })


    //Clear arrcategoryId after delete multiple
    const clearArrcategoryId = () => {
        while (arrcategoryId.length > 0) {
            arrcategoryId.pop()
        }
    }

    //btn delete mutiple categorys
    $('#btn_delete_multiple_category').click(function () {
        flagDeleteMultiplecategorys = true

        //Check rows selected
        if (dataTable.rows('.selected').data().length == 0) {
            alert('Mời bạn chọn category muốn xóa')
        } else {
            flagDeleteMulticategory = true
            $('#defaultModalDanger_category').modal()
        }
    })

    $('#btn_confirm_delete_category').click(function () {
        if (flagDeleteMultiplecategorys == true) {
            //Select multil account for deleting
            let accountsSelected = dataTable.rows('.selected').data();

            if (accountsSelected.length > 0) {
                for (let i = 0; i < accountsSelected.length; i++) {
                    arrAccountId.push(accountsSelected[i][6])
                }
            }

            $.ajax({
                url: "http://localhost:8888/api/accounts/delete-multiple",
                method: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                data: JSON.stringify(arrAccountId),
                success: function (response) {
                    $('#btn_no_account').click()//close modal

                    //Refresh table
                    dataTable.destroy()
                    getListAccounts('', 0, '', 1, PAGE_SIZE, ORDER_BY)

                    //Reset arr accounts after delete
                    clearArrAccountId()
                },
                error: function (error) {
                    console.log(error)
                    //Reset arr accounts after delete
                    clearArrAccountId()

                    //Deselect all on the data table
                    dataTable.$('tr.selected').removeClass('selected');

                    if (error.status == 401) {
                        showErrorAuthentication(error.responseJSON.message)
                    } else if (error.status == 403) {
                        showErrorAuthentication("Forbidden!")
                    } else {
                        showErrorAuthentication("Unkown error")
                    }
                }
            })
        }
        else {
            $.ajax({
                url: 'http://localhost:8888/api/category/delete/' + categoryId,
                method: 'DELETE',

                success: function (response) {
                    $('#btn_no_category').click()
                    dataTable.row(currentRowIndex).remove().draw()
                },
                error: function (request, status, error) {
                    console.log(error)
                    if (error.status == 401) {
                        showErrorAuthentication(error.responseJSON.message)
                    } else if (error.status == 403) {
                        showErrorAuthentication("Forbidden!")
                    } else {
                        showErrorAuthentication("Unkown error")
                    }
                }
            })
        }
    }
    )

//edit category
$('#datatables_categories').on('click', 'td .edit', function (e) {

    e.preventDefault()

    $('#form_group_email').hide()
    $('#form_group_passowrd').hide()
    $('#account_form_content').hide()

    $('#title_form_category').html('Edit category')

    flagUpdatecategory = true

    currentRowIndex = parseInt($(this).closest('tr').find('td').eq(0).html()) - 1

    //console.log('current row index: ' + currentRowIndex)

    let rowData = dataTable.row(currentRowIndex).data()
    //console.log(rowData)

    //Get categoryId(varibale global)
    categoryId = rowData[2]

    let cg_name = rowData[1]

    $('#cg_name').val(cg_name)
})

$('#btn_save_category').click(function (e) {
    e.preventDefault()

    let data = {
        cg_name: $("#cg_name").val()
    }

    let url = ''
    let methodRequest = ''
    if (flagUpdatecategory == true) {
        url = 'http://localhost:8888/api/category/update/' + categoryId
        methodRequest = 'PUT'
    } else {
        url = 'http://localhost:8888/api/category/add'
        methodRequest = 'POST'

        //Add email, password properties to category

        console.log(data)
    }

    $.ajax({
        url: url,
        method: methodRequest,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data),

        success: function (response) {
            //Close modal
            $('#btn_dismiss_form_category').click()

            //update row data
            if (flagUpdatecategory == true) {
                let temp = []
                temp[0] = currentRowIndex + 1
                temp[1] = data.cg_name
                temp[2] = data.cg_id

                dataTable.row(currentRowIndex).data(temp).draw(false)
            } else {
                //Refresh table category after insert new item
                dataTable.destroy()

                getListcategories('', 0, '', PAGE_NUMBER, PAGE_SIZE, ORDER_BY);
            }
        },
        error: function (error) {
            console.log(error)
            if (error.status == 401) {
                showErrorAuthentication(error.responseJSON.message)
            } else if (error.status == 403) {
                showErrorAuthentication("Forbidden!")
            } else {
                showErrorAuthentication("Unkown error")
            }
        }
    })

})

//Create category
$('#btn_add_category').click(function (e) {

    e.preventDefault()

    console.log('123abc')

    flagUpdatecategory = false

    //Show input emial && password
    $('#account_form_content').hide()

    $('#title_form_category').html('Add New category')

    $('#cg_name').val('')
})




}


