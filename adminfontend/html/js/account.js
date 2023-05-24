
function loadAccountJs() {
    console.log('Account page js...')
    var dataTable = null

    var flagUpdateAccount = false
    var flagDeleteMultipleAccounts = false

    var PAGE_NUMBER = 1
    var PAGE_SIZE = 20
    var ORDER_BY = 'id,desc'//sort paging

    var currentRowIndex = 0;

    var accountId = 0;
    var arrAccountId = []//Mảng lưu các id account khi xóa cùng lúc nhiều bản ghi

    var listAccounts = [] //luu mang account

    // function getListDepartments() {
    //     $.ajax({
    //         url: 'http://localhost:8888/api/departments',
    //         method: 'GET',
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem('token')
    //         },

    //         success: function(response) {
    //             $.each(response, function(index, option) {   
    //                 $('#select_department_account')
    //                     .append($("<option></option>")
    //                             .attr("value", option.id)
    //                             .text(option.name));
                    
    //                 $('#account_department')
    //                     .append($("<option></option>")
    //                     .attr("value", option.id)
    //                     .text(option.name));
    //             })
    //         },
    //         error: function(error) {
    //             console.log(error)
    //             if (error.status == 401) {
    //                 showErrorAuthentication(error.responseJSON.message)
    //             }else if (error.status == 403) {
    //                 showErrorAuthentication("Forbidden!")
    //             }else {
    //                 showErrorAuthentication("Unkown error")
    //             }
    //         }
    //     })
    //}

    function showErrorAuthentication(msg) {
        $('#error_message_authentication').html(msg)
    }

    // getListDepartments()
    
    function getListAccounts() {
        let url = "http://localhost:8888/api/accounts/list"

        //console.log(localStorage.getItem('token'))

        $.ajax({
            url: url,
            method: 'GET',
            
            success: function(response){
                console.log(response)
                listAccounts = [];
                listAccounts = response;
                createTableAccount(listAccounts)
            },
            error: function(error) {
                if (error.status == 401) {
                    showErrorAuthentication(error.responseJSON.message)
                }else if (error.status == 403) {
                    showErrorAuthentication("Forbidden!")
                }
            }
        })
    }

    function createTableAccount(listAccounts) {
        let accounts = []

        for (let i = 0; i < listAccounts.length; i++) {
            let temp = []
            temp[0] = i + 1
            temp[1] = listAccounts[i].fullname
            temp[2] = listAccounts[i].username
            if(listAccounts[i].role == null){
                temp[3] = "Customer";
            }
            else{
                temp[3] = listAccounts[i].role
            }
            temp[4] = listAccounts[i].email
            temp[5] = listAccounts[i].address
            temp[6] = listAccounts[i].id;
            temp[7] = listAccounts[i].phone;
            temp[8] = ''; 
            temp[9] = ''; 
            accounts.push(temp)
        }

        dataTable = $('#datatables_accounts').DataTable({
            data: accounts,
            columns: [
                { title: "STT" },
                { title: "Họ tên" },
                { title: "Tên tài khoản" },
                { title: "Role" },
                { title: "Email" },
                { title: "Địa chỉ"},
                { title: "ID"},
                { title: "Số điện thoại" },
                { title: ""},
                { title: "Action"}
            ],
            "columnDefs": [
                {
                    "targets": 6,
                    "visible": false
                },
                {
                    "targets":8,
                    "width": 100,
                    "render": function (data, type, row, meta) {
                            return '<td>' +
                            '<button class="btn-actions edit" data-toggle="modal" data-target="#defaultModalWarning"><i class="material-icons">&#xE3C9;</i></button>' +
                            '<button class="btn-actions delete-account" data-toggle="modal" data-target="#defaultModalDanger"><i class="material-icons">&#xe872;</i></button>' +
                            '</td>'
                        
                    }
                },
                {
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 9,
                    with: 45
                }
            ],
            "select": {
                'style': 'multi'
            },

        })

    }

    //Load accounts & Create table Account

    getListAccounts();

    //Handle actions
    $(document).on('click', '.icon-close', function() {
        $(this).parent().find('select').val('none')
        $(this).parent().find('input').val('')
        $(this).removeClass('icon-close-show')
    })

    $(document).on('change', '.select', function() {
        if ($(this).val() != null) {
            $(this).parent().find('.icon-close').addClass('icon-close-show')
        }
    })

    $(document).on('input', '.search-input input', function() {
        if ($(this).val() !== '') {
            $(this).parent().find('.icon-close').addClass('icon-close-show')
        }else {
            $(this).parent().find('.icon-close').removeClass('icon-close-show')
        }
    })

    $('#account_department').on('change', function() {
        console.log($(this).val())
    })

    //Remove selected row
    $('#btn_close_form_account').click(function() {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_dismiss_form_account').click(function() {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_no_account').click(function() {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_close_delete_account').click(function() {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_refresh_account').click(function(){
        dataTable.destroy()
        getListAccounts('', 0, '', PAGE_NUMBER, PAGE_SIZE, ORDER_BY)
        // console.log("refresh success")
    })

    //Filter form
    // $('#icon_search_account').on('click', function() {
    //     let role = $('#select_role_account').val()
    //     let departmentId = $('#select_department_account').val()
    //     let search = $('#search_input_account').val()
        
    //     console.log('departmentId: ' + departmentId)
    //     console.log(role)

    //     //Note
    //     if (departmentId === 'none') departmentId = 0
    //     else departmentId = parseInt(departmentId)

    //     if (search === '') search = null
    //     else {
    //         search = search.trim().replace(' ', '%')
    //     }
    //     if (role === 'none') role = ''

    
    //     dataTable.destroy()
    
    //     getListAccounts(role, departmentId, search, 1, PAGE_SIZE, ORDER_BY);
    // })

    //btn delete only one account
    $(document).on('click', 'td .delete-account', function() {

        flagDeleteMultiAccount = false;

        currentRowIndex = parseInt( $(this).closest('tr').find('td').eq(0).html() ) - 1

        let rowData = dataTable.row(currentRowIndex).data()

        accountId = rowData[6]
    })


    //Clear arrAccountId after delete multiple
    const clearArrAccountId = () => {
        while(arrAccountId.length > 0) {
            arrAccountId.pop()
        }
    } 

    //btn delete mutiple accounts
    $('#btn_delete_multiple_account').click(function() {
        flagDeleteMultipleAccounts = true

        //Check rows selected
        if (dataTable.rows('.selected').data().length == 0) {
            alert('Mời bạn chọn account muốn xóa')
        }else {
            flagDeleteMultiAccount = true
            $('#defaultModalDanger').modal()
        }
    })

    $('#btn_confirm_delete_account').click(function() {
        if (flagDeleteMultiAccount == true) {
            //Select multil account for deleting
            let accountsSelected = dataTable.rows('.selected').data();

            if (accountsSelected.length > 0) {
                for (let i = 0; i < accountsSelected.length; i ++) {
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
                success: function(response) {
                    $('#btn_no_account').click()//close modal

                    //Refresh table
                    dataTable.destroy()
                    getListAccounts('', 0, '', 1, PAGE_SIZE, ORDER_BY)

                    //Reset arr accounts after delete
                    clearArrAccountId()
                },
                error: function(error) {
                    console.log(error)
                    //Reset arr accounts after delete
                    clearArrAccountId()

                    //Deselect all on the data table
                    dataTable.$('tr.selected').removeClass('selected');

                    if (error.status == 401) {
                        showErrorAuthentication(error.responseJSON.message)
                    }else if (error.status == 403) {
                        showErrorAuthentication("Forbidden!")
                    }else {
                        showErrorAuthentication("Unkown error")
                    }
                }
            })
        }else {
            $.ajax({
                url: 'http://localhost:8888/api/accounts/delete/' + accountId,
                method: 'DELETE',
                
                success: function(response) {
                    $('#btn_no_account').click()
                    dataTable.row(currentRowIndex).remove().draw()
                },
                error: function(request, status, error) {
                    console.log(error)
                    if (error.status == 401) {
                        showErrorAuthentication(error.responseJSON.message)
                    }else if (error.status == 403) {
                        showErrorAuthentication("Forbidden!")
                    }else {
                        showErrorAuthentication("Unkown error")
                    }
                }
            })
        }
    })

    //edit account
    $('#datatables_accounts').on('click', 'td .edit', function(e) {
        
        e.preventDefault()

        $('#form_group_email').hide()
        $('#form_group_passowrd').hide()

        $('#title_form_account').html('Edit Account')

        flagUpdateAccount = true

        currentRowIndex = parseInt( $(this).closest('tr').find('td').eq(0).html() ) - 1

        //console.log('current row index: ' + currentRowIndex)
        
        let rowData = dataTable.row(currentRowIndex).data()
        //console.log(rowData)

        //Get accountId(varibale global)
        accountId = rowData[6]

        let username = rowData[2]
        let fullName = rowData[1]
        let role = rowData[3]
        let address = rowData[5]
        let phone = rowData[7]

        $('#user_name').val(username)
        $('#fullname').val(fullName)
        $('#address').val(address)
        $('#phone').val(phone)
        $('#role').val(role)
    })

    $('#btn_save_account').click(function(e) {
        e.preventDefault()

        let data = {
            username: $('#user_name').val(),
            password: $('#password').val(),
            fullname: $('#fullname').val(),
            role: $('#role').val(),
            address: $('#address').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
        }

        let url = ''
        let methodRequest = ''
        if (flagUpdateAccount == true) {
            url = 'http://localhost:8888/api/accounts/update/' + accountId
            methodRequest = 'PUT'
        }else {
            url = 'http://localhost:8888/api/auth/signup'
            methodRequest = 'POST'

            //Add email, password properties to account
            data.email = $('#email').val()
            data.password = $('#password').val()

            console.log(data)
        }

        $.ajax({
            url: url,
            method: methodRequest,
            contentType: 'application/json',
            dataType: 'json',
        
            data: JSON.stringify(data),
            success: function(response) {
                //Close modal
                $('#btn_dismiss_form_account').click()
                
                //update row data
                if (flagUpdateAccount == true) {
                    let temp = []
                    temp[0] = currentRowIndex + 1
                    temp[1] = data.firstName + " " + data.lastName
                    temp[2] = data.username
                    temp[3] = data.role
                    temp[4] = dataTable.row(currentRowIndex).data()[4]
                    temp[5] = $('#account_department option:selected').text()
                    temp[6] = dataTable.row(currentRowIndex).data()[6];
                    temp[7] = ''
                    temp[8] = ''
                    temp[9] = data.departmentId
                    
                    dataTable.row(currentRowIndex).data(temp).draw(false)
                }else {
                    //Refresh table account after insert new item
                    dataTable.destroy()

                    getListAccounts();
    
                }
            },
            error: function(error) {
                console.log(error)
                if (error.status == 401) {
                    showErrorAuthentication(error.responseJSON.message)
                }else if (error.status == 403) {
                    showErrorAuthentication("Forbidden!")
                }else {
                    showErrorAuthentication("Unkown error")
                }
            }
        })

    })

    //Create account
    $('#btn_add_account').click(function(e) {
        
        e.preventDefault()

        console.log('123abc')

        flagUpdateAccount = false

        //Show input emial && password
        $('#form_group_email').show()
        $('#form_group_passowrd').show()

        $('#title_form_account').html('Add New Account')

        $('#user_name').val('')
        $('#fullname').val('')
        $('#address').val('')
        $('#email').val('')
        $('#phone').val('')
        $('#password').val('')
        $('#role').val('Admin')
    })




}


