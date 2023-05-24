function loadProductJS () {
    var dataTable = null
    
    var dataTableAccount = null

    var productId = null
    var arrProductId = []

    var arrAccounts = []

    var flagDeleteMultiProduct = false
    
    var flagCreateNewProduct = false

    var currentRowIndex = 0

    var PAGE_NUMBER = 1
    var PAGE_SIZE = 10
    var ORDER_BY = 'id,desc'

    function showErrorAuthentication(msg) {
        $('#error_message_authentication').html(msg)
    }

    function getListProducts(pageNumberInput,pageSizeInput) {
        $.ajax({
            url: 'http://localhost:8888/api/product/list',
            method: 'GET',
            contentType: "application/json",
            dataType: 'json',
            data: {
                pageNumber: pageNumberInput,
                size: pageSizeInput,
            },
            success: function(response) {
                console.log(response)
                createTableProduct(response)//Create datatable Product
            },
            error: function(error) {
                console.log(error)
            }
        })
    }

    getListProducts(PAGE_NUMBER,PAGE_SIZE)

    function createTableProduct(listProducts) {
        let Products = []
        for (let i = 0; i < listProducts.length; i ++) {
            let temp = []
            temp[0] = i + 1
            temp[1] = listProducts[i].pro_name
            temp[2] = listProducts[i].quantity
            temp[3] = listProducts[i].pro_describe
            temp[4] = listProducts[i].price
            temp[5] = listProducts[i].pro_id
            temp[6] = listProducts[i].size
            temp[7] = listProducts[i].category.cg_id
            temp[8] = ''
            temp[9] = '',
            temp[10] = listProducts[i].pro_detail
            temp[11] = listProducts[i].image_url

            Products.push(temp)
        }
        
        dataTable = $('#datatables_products').DataTable({
            'processing': true,
            data: Products,
            columns: [
                { title: 'Order'},
                { title: "Tên sản phẩm"},
                { title: "Số lượng"},
                { title: "Mô tả"},
                { title: "Giá"},
                { title: ""},
                { title: "Size"},
                { title: "Category ID"},
                { title: "Actions"},
                { title: ""},
            ],
            "columnDefs": [
                {
                    "targets": 5,
                    "visible": false
                },
                {
                    "targets": 8,
                    "width": 110,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).css({
                            'text-align': 'left',
                            'display': 'flex'
                        });
                    },
                    "render": function(data, type, row, meta) {
                        return '<td>' +
                            '<button data-toggle="modal" data-target="#defaultModalWarning2" class="edit btn-modal"><i class="material-icons">&#xE254;</i></button>' +
                            '<button data-toggle="modal" data-target="#defaultModalDanger2" class="delete btn-modal"><i class="material-icons">&#xE872;</i></button>' +
                        '</td>'
                    }
                },
                {
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 9,
                    width: 45
                },
                {
                    "targets": 10,
                    "visible": false
                },
                {
                    "targets": 11,
                    "visible": false
                },
            ],
            'select': {
                'style': 'multi'
            },
            //'order': [[5, 'asc']]
        })

        //Select multil Product for deleting

        $('#datatables_products tbody').on( 'click', 'tr', function () {
            let id = parseInt(dataTable.row(this).data()[5])
            arrProductId.push(id)
        });
    }

    //Search icon: filter form Product
    $('#icon_serach_Product').click(function() {
        let minDate = $('#datetimepicker-date input').val()

        console.log(minDate)

        let maxDate = $('#datetimepicker-date2 input').val()

        console.log(maxDate)

        let type = $('#select_type_depatment').val()

        let inputSearch = $('#search_input_Product').val()
        
        if (inputSearch === '') inputSearch = null;

        dataTable.destroy()

        getListProducts(minDate, maxDate, type, inputSearch, 1, PAGE_SIZE, ORDER_BY);
    })


    $('#btn_close_form_product').click(function() {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_dismiss_form_product').click(function() {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_no_product').click(function() {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_close_delete_product').click(function() {
        dataTable.$('tr.selected').removeClass('selected');
    })

    $('#btn_add_product').click(function(e) {
        flagCreateNewProduct = true

        $('#pro_name').val('')
        $('#Product_type').val('')

        $('#div_add_accounts').hide()
    })
    $('#btn_refresh_product').click(function(){
        dataTable.destroy()
        getListProducts("", "", "", "", 1, PAGE_SIZE, ORDER_BY)
        // console.log("refresh success")
    })
    $('#btn_save_product').click(function(e) {
        e.preventDefault()
        let data = {
            pro_name: $('#pro_name').val(),
            quantity: $('#quantity').val(),
            pro_describe: $('#pro_describe').val(),
            price: $('#price').val(),
            size: $('#size').val(),
            pro_detail: $('#pro_detail').val(),
            image_url: $('#image_url').val(),
            category:{
                cg_id: $('#cg_id').val()
            }
        }
        let urlAPI = ''
        let methodRequest = ''
        if (flagCreateNewProduct == true) {
            methodRequest = 'POST'
            urlAPI = 'http://localhost:8888/api/product/add'
        }else {
            urlAPI = 'http://localhost:8888/api/product/' + ProductId
            methodRequest = 'PUT'
        }
        $.ajax({
            url: urlAPI,
            method: methodRequest,
            contentType: 'application/json',
            dataType: 'json',


            data: JSON.stringify(data),

            success: function(data) {
                console.log(data)
                if (data.status == 200) {
                    if (flagCreateNewProduct == true) {
                        console.log('insert successfully')

                         //Reset flag update
                        flagCreateNewProduct = false;
                    }else {
                        console.log('update successfully')
                    }

                    clearArrAccounts()

                    dataTable.destroy()
                    getListProducts(PAGE_NUMBER, PAGE_SIZE)
                }

                $('#btn_dismiss_form_Product').click()
            },
            error: function(request, status, error) {
                console.log(error)

                clearArrAccounts()
            }

        })

    })


    //Clear arrAccounts after delete multiple
    const clearArrAccounts = () => {
        while(arrAccounts.length > 0) {
            arrAccounts.pop()
        }
    }

    const clearArrProductId = () => {
        while(arrProductId.length > 0) {
            arrProductId.pop()
        }
    }



    $('#btn_delete_multi_product').click(function() {
        if (arrProductId.length == 0) alert('Mời bạn chọn Product cần xóa')
        else {
            $('#defaultModalDanger2').modal()

            flagDeleteMultiProduct = true
        }

        productId = rowData[5];

        console.log(productId)
    })

    $('#datatables_products').on('click', 'td .edit', function (e) {
        e.preventDefault()
        flagCreateNewProduct = false

        console.log('edit on table Product...')

        $('#title_form_product').html('Edit Product')

        $('#div_add_accounts').hide()

        $('#btn_add_account_product').hide()

        currentRowIndex = parseInt( $(this).closest('tr').find('td').eq(0).html() ) - 1

        let rowData = dataTable.row(currentRowIndex).data()
        
        productId = rowData[5]

        $('#pro_name').val(rowData[1])
        $('#quantity').val(rowData[2])
        $('#pro_describe').val(rowData[3])
        $('#price').val(rowData[4])
        $('#size').val(rowData[6])
        $('#pro_detail').val(rowData[10])
        $('#image_url').val(rowData[11])
        $('#cg_id').val(rowData[7])

        //Tương tự phần account
    })

    $('#btn_add_product').click(function(e) {
        e.preventDefault()
        $('#title_form_product').html('Create New Product')
        $('#btn_add_account_product').show()

        $('#pro_name').val('')
        $('#quantity').val('')
        $('#pro_describe').val('')
        $('#price').val('')
        $('#size').val('')
        $('#pro_detail').val('')
        $('#image_url').val('')
        $('#cg_id').val('')
    })

    // $('#btn_save_product').click(function (e) {
    //     e.preventDefault()
    
    //     let data = {
    //         pro_name: $('#pro_name').val(),
    //         quantity: $('#quantity').val(),
    //         pro_describe: $('#pro_describe').val(),
    //         price: $('#price').val(),
    //         size: $('#size').val(),
    //         pro_detail: $('#pro_detail').val(),
    //         image_url: $('#image_url').val(),
    //         category:{
    //             cg_id: $('#cg_id').val()
    //         }
    //     }
    
    //     let url = ''
    //     let methodRequest = ''
    //     if (flagUpdateProduct == true) {
    //         url = 'http://localhost:8888/api/product/update/' + productId
    //         methodRequest = 'PUT'
    //     } else {
    //         url = 'http://localhost:8888/api/product/add'
    //         methodRequest = 'POST'
    
    //         //Add email, password properties to category
    
    //         console.log(data)
    //     }
    
    //     $.ajax({
    //         url: url,
    //         method: methodRequest,
    //         contentType: 'application/json',
    //         dataType: 'json',
    //         data: JSON.stringify(data),
    
    //         success: function (response) {
    //             //Close modal
    //             $('#btn_dismiss_form_product').click()
    
    //             //update row data
    //             if (flagUpdateproduct == true) {
    //                 let temp = []
    //                 temp[0] = currentRowIndex + 1
    //                 temp[1] = data.cg_name
    //                 temp[2] = data.cg_id
    
    //                 dataTable.row(currentRowIndex).data(temp).draw(false)
    //             } else {
    //                 //Refresh table category after insert new item
    //                 dataTable.destroy()
    
    //                 getListProduct(PAGE_NUMBER, PAGE_SIZE);
    //             }
    //         },
    //         error: function (error) {
    //             console.log(error)
    //             if (error.status == 401) {
    //                 showErrorAuthentication(error.responseJSON.message)
    //             } else if (error.status == 403) {
    //                 showErrorAuthentication("Forbidden!")
    //             } else {
    //                 showErrorAuthentication("Unkown error")
    //             }
    //         }
    //     })
    
    // })

    $('#datatables_products').on('click', 'td .delete', function(e) {
        e.preventDefault()
        flagDeleteMultiProduct = false

        //$('#defaultModalDanger2').modal()

        currentRowIndex = parseInt( $(this).closest('tr').find('td').eq(0).html() ) - 1

        let rowData = dataTable.row(currentRowIndex).data()

        productId = rowData[5]
    })

    $('#btn_confirm_delete_product').click(function(e) {
        e.preventDefault()
        if (flagDeleteMultiProduct == true) {

            $.ajax({
                url: "http://localhost:8888/api/product/delete-multiple",
                method: 'DELETE',
                contentType: 'application/json',
                dataType: 'json',
                
                data: JSON.stringify(arrProductId),
                success: function(response) {
                    $('#btn_no_product').click()//close modal

                    //Refresh table
                    dataTable.destroy()
                    getListProducts('', '', '', '', PAGE_NUMBER, PAGE_SIZE, ORDER_BY)

                    //Reset arr accounts after delete
                    clearArrProductId()
                },
                error: function(error) {
                    console.log(error)
                    //Reset arr accounts after delete
                    clearArrProductId()

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
                url: 'http://localhost:8888/api/product/delete/' + productId,
                method: 'DELETE',
                
                success: function(response) {
                    $('#btn_no_product').click()
                    dataTable.row(currentRowIndex).remove().draw()
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
        }
    })


}