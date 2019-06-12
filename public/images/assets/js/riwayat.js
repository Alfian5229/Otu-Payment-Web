app.controller('riwayatCtrl', function($scope, $http) {
    //variable for storing requestID
    var reqID;
    //variable for checking if user is changing date
    var issdatechanged, isedatechanged;
    //variable for storing startdate and enddate
    var startdate, enddate;

    $(document).ready(function(){
        $scope.cekriwayat('saldo');
    });

    $scope.cekriwayat = function (item){
        if(item == 'saldo'){
            resetactive();
            $('#rsaldo').addClass('active');
            reqID = "3";
            cekriwayat();
        }
        if(item == 'transaksi'){
            resetactive();
            $('#rtransaksi').addClass('active');
            reqID = "1";
            cekriwayat();
        }
        if(item == 'deposit'){
            resetactive();
            $('#rdeposit').addClass('active');
            reqID = "2";
            cekriwayat();
        }
        if(item == 'penarikan'){
            resetactive();
            $('#rpenarikan').addClass('active');
            reqID = "4";
            cekriwayat();
        }
        if(item == 'bonus'){
            resetactive();
            $('#rbonus').addClass('active');
            reqID = "5";
            cekriwayat();
        }
        if(item == 'transfer'){
            resetactive();
            $('#rtransfer').addClass('active');
            reqID = "6";
            cekriwayat();
        }
    };

    function resetactive(){
        $('#rsaldo').removeClass('active');
        $('#rtransaksi').removeClass('active');
        $('#rdeposit').removeClass('active');
        $('#rpenarikan').removeClass('active');
        $('#rbonus').removeClass('active');
        $('#rtransfer').removeClass('active');
        $('#emptydata').hide();
        $('#datatable').hide();
        $('#datatable').parents('div.dataTables_wrapper').first().hide();
    }

    $scope.startdatechanged = function(){
        if(Date.parse($scope.startdate)){
            var date = $scope.startdate.getDate();
            if(date < 10){
                date = '0' + date;
            }
            var month = $scope.startdate.getMonth()+1;
            if(month < 10){
                month = '0' + month;
            }
            var year = $scope.startdate.getFullYear();
            startdate = year + "-" + month + "-" + date;

            issdatechanged = 1;
            cekriwayat();
        } else {
            issdatechanged = 0;
        }
    };

    $scope.enddatechanged = function(){
        if(Date.parse($scope.enddate)){
            var date = $scope.enddate.getDate();
            if(date < 10){
                date = '0' + date;
            }
            var month = $scope.enddate.getMonth()+1;
            if(month < 10){
                month = '0' + month;
            }
            var year = $scope.enddate.getFullYear();
            enddate = year + "-" + month + "-" + date;

            isedatechanged = 1;
            cekriwayat();
        } else {
            isedatechanged = 0;
        }
    };

    var table = 0;
    function cekriwayat(){
        if(issdatechanged == 1 && isedatechanged == 1){
            $.post("../riwayat/cekriwayatsaldo", { requestID: reqID, sdate: startdate, edate: enddate} ,function(data) {
                $scope.items = data;

                //delete specific data
                if(reqID == 1){
                    for(var i = 0; i < data.length; i ++){
                        delete data[i].resp_payment;
                    }
                }

                //show or hide datatable based data
                if(data.length == 0){
                    $('#emptydata').show();
                    $('#datatable').hide();
                    $('#datatable').parents('div.dataTables_wrapper').first().hide();
                } else {
                    $('#emptydata').hide();
                    $('#datatable').show();
                    $('#datatable').parents('div.dataTables_wrapper').first().show();

                    //generate column name from respon
                    var my_columns = [];
                    $.each( data[0], function( key, value ) {
                        var my_item = {};
                        my_item.data = key;
                        my_item.title = key;
                        my_columns.push(my_item);
                    });

                    //destroy datatable if exist
                    if (table != 0 ) {   
                        $('#datatable').DataTable().destroy();
                        table = null;
                        // empty in case the columns change
                        $('#datatable').empty();
                    }

                    //init data table
                    table = $('#datatable').DataTable( {
                        "data": data,
                        "columns": my_columns
                    });

                    //remove underscore from column name
                    for (var j=0;j<table.columns().nodes().length;j++) {
                        var key = table.columns(j).header().to$().text();
                        if(key.indexOf("_") !== -1){
                            key = key.replace("_", " ");
                        }
                        table.columns(j).header().to$().text(key);
                    }
                    table.columns.adjust().draw();
                }

                // for(var i = 0; i < data.length; i++){
                //     if(i == 0){
                //         $("#dtbriwayat").append("<tr id='dtr" + i + "'></tr>");
                //         $("#dtr" + i).append("<td>" + data[i].mutasi_id + "</td><td>" + data[i].sisa_saldo + "</td><td>" + data[i].uang_masuk + "</td><td>" + data[i].uang_keluar + "</td><td>" + data[i].keterangan + "</td><td>" + data[i].tgl_mutasi + "</td>");
                //     }
                //     else{
                //         $("<tr id='dtr" + i + "'></tr>").insertAfter("#dtr" + (i-1));
                //         $("#dtr" + i).append("<td>" + data[i].mutasi_id + "</td><td>" + data[i].sisa_saldo + "</td><td>" + data[i].uang_masuk + "</td><td>" + data[i].uang_keluar + "</td><td>" + data[i].keterangan + "</td><td>" + data[i].tgl_mutasi + "</td>");
                //     }
                // }
            });
        }
    }
});