app.controller('tagihantvkabelCtrl', function($scope, $http) {
    //for checking if input text is ada isinya or not in tagihan tvkabel
    var adadata = 0;
    //for checking if user is checking the check button
    var patt = /\d{6}/;
    //variable for storing code from user checked item
    var kodeItem;
    //variabel for storing hasilcek
    var hasilcek;

    var reffid;
    var customerid;
    var payment;
    var adminBank;
    var billing;

    //get email user
    $.post("../newdesigns/getemail", function(data){
        $scope.noHp = data;
    });

    //get operator list
    $.post("../tagihantvkabel/getoperator", function(data){
        for(var i = 0; i < data.length; i++){
            if(i == 0){
                $('#listoperator').append('<option id="operator' + (i+1) + '" value="' + data[i].code + '" selected="selected">' + data[i].name + '</option>');
            }else {
                $('#listoperator').append('<option id="operator' + (i+1) + '" value="' + data[i].code + '">' + data[i].name + '</option>');
            }
        }
    });

    //for checking user input for tagihan tvkabel
    $scope.inputDataTvkabel = function(){
        var no_pelanggan_tvkabel = document.getElementById("pelanggan-no-tvkabel").value;
        var no_hp_tvkabel = document.getElementById("telephone-no-tvkabel").value;

        if(patt.test(no_pelanggan_tvkabel) && patt.test(no_hp_tvkabel)){
            adadata = 1;
            cekInput();
        } else {
            adadata = 0;
            cekInput();
        }
    };

    function cekInput(){
        if((adadata == 1)){
            $scope.btnBeliTvkabel = true;
        }
        else{
            $scope.btnBeliTvkabel = false;
        }
    }

    // for showing modal alert and buying product
    $scope.cektagihantvkabel = function(){
        var e = document.getElementById("listoperator");
        kodeItem = e.options[e.selectedIndex].value;
        $("#modalLoading").modal({backdrop: 'static', keyboard: false});
        $("#modalLoading").modal('show');
        $("#modalLoading").on('shown.bs.modal', function () {
            $.post("../tagihantvkabel/cektagihantvkabel", { kodeitem: kodeItem, nomerhp: $scope.noHp, nomerpelanggan: $scope.noPelangganTvkabel} ,function(data){
                hasilcek = data;
                if(hasilcek.status == "FAILED"){
                    document.getElementById('responAlert').innerHTML = hasilcek.respMessage;
                    setTimeout(function(){
                        $("#modalAlert").modal({backdrop: 'static', keyboard: false});
                        $("#modalalert").modal('show');
                    }, 500);
                } else {
                    setTimeout(function(){
                        $("#modalCek").modal({backdrop: 'static', keyboard: false});
                        $("#modalCek").modal('show');
                    }, 500);
                    hasilCek();
                }
            }).done(function() {
                $("#modalLoading").modal('hide');
            });
        });
    };

    function hasilCek(){
        var temp;
        reffid = hasilcek.billingReferenceID;
        document.getElementById('billingReferenceID').innerHTML = reffid;
        customerid = hasilcek.customerID;
        document.getElementById('customerID').innerHTML = customerid;
        document.getElementById('customerName').innerHTML = hasilcek.customerName;
        document.getElementById('customerMSISDN').innerHTML = hasilcek.customerMSISDN;
        document.getElementById('respTime').innerHTML= hasilcek.respTime;
        temp = hasilcek.payment;
        payment = temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        document.getElementById('payment').innerHTML = "Rp " + payment;
        temp = hasilcek.adminBank;
        adminBank = temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        document.getElementById('adminBank').innerHTML = "Rp " + adminBank;
        temp = hasilcek.billing;
        billing = temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        document.getElementById('billing').innerHTML = "Rp " + billing;
        document.getElementById('period').innerHTML = hasilcek.period + " bulan";
        document.getElementById('respMessage').innerHTML = "PENGECEKAN BERHASIL";
        document.getElementById('ep').innerHTML = hasilcek.ep;
    }

    $scope.tampilModalKonfirmasi = function(){
        setTimeout(function(){
            $("#modalKonfirmasi").modal({backdrop: 'static', keyboard: false});
            $("#modalKonfirmasi").modal('show');
        }, 500);
        document.getElementById('customerIDmodal').innerHTML = customerid;
        document.getElementById('paymentmodal').innerHTML = "Rp " + payment;
        document.getElementById('adminBankmodal').innerHTML = "Rp " + adminBank;
        document.getElementById('billingmodal').innerHTML = "Rp " + billing;
    };

    // for showing modal alert and buying product
    $scope.tampilModalAlert = function(){
        $.post("../tagihantvkabel/buytagihantvkabel", { referenceid: reffid } ,function(data){
            document.getElementById('responAlert').innerHTML = data;
            setTimeout(function(){
                $("#modalAlert").modal({backdrop: 'static', keyboard: false});
                $("#modalAlert").modal('show');
            }, 500);
        });
    };
});