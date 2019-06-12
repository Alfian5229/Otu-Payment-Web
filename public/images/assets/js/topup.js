app.controller('topupCtrl', function($scope, $http, $interval) {
    
    //data info bank
    var databank;

    $.post("../topup/getbankinfo",function(data) {
        databank = data;
        for(var i = 0; i < data.length; i++){
            if(data[i].bank == "PERMATA"){
                $('#bankpermata').html("No. Rekening " + data[i].norec);
                $("#logopermata").attr("src", data[i].logo);
            }
            if(data[i].bank == "CIMB"){
                $('#bankcimb').html("No. Rekening " + data[i].norec);
                $("#logocimb").attr("src", data[i].logo);
            }
            if(data[i].bank == "BCA"){
                $('#bankbca').html("No. Rekening " + data[i].norec);
                $("#logobca").attr("src", data[i].logo);
            }
            if(data[i].bank == "BRI"){
                $('#bankbri').html("No. Rekening " + data[i].norec);
                $("#logobri").attr("src", data[i].logo);
            }
            if(data[i].bank == "BNI"){
                $('#bankbni').html("No. Rekening " + data[i].norec);
                $("#logobni").attr("src", data[i].logo);
            }
            if(data[i].bank == "MANDIRI"){
                $('#bankmandiri').html("No. Rekening " + data[i].norec);
                $("#logomandiri").attr("src", data[i].logo);
            }
            // if(data[i].bank == "KARTU KREDIT"){
            //     $('#bankkartukredit').html("No. Rekening " + data[i].norec);
            //     $("#logokartukredit").attr("src", data[i].logo);
            // }
        }
    });

    $scope.functiontopup = function(){
        var reg = /^\d+$/;
        var a = $('#valuetopup').val();
        if(reg.test(a)){
            if(a < 10000){
                $scope.showcontent = false;
            }
            else{
                $scope.showcontent = true;
            }
        } else {
            $scope.showcontent = false;
        }
    };

    var nominaltopup;
    var namabank;
    $scope.topupkonfirmasi = function(data){
        setTimeout(function(){
            $("#modalTopupKonfirmasi").modal({backdrop: 'static', keyboard: false});
            $("#modalTopupKonfirmasi").modal('show');
        }, 500);
        nominaltopup = $scope.valuetopup; 
        namabank = data;
        $('#nominaltopup').html("Rp " + nominaltopup.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
        $('#namabank').html("BANK " + data );
        // $('#gambarbank').attr("src", "images/icon_produk/topup_" + data.toLowerCase() + ".png");
        var gambarbank;
        for(var i = 0; i < databank.length; i++){
            if(databank[i].bank == data){
                gambarbank = databank[i].logo;
            }
        }
        $('#gambarbank').attr("src", gambarbank);
    };

    $scope.topupFix = function(){
        $.post("../topup/topupFix", { bank: namabank, nominal: nominaltopup }, function(data) {
            setTimeout(function(){
                $("#modalAlert").modal({backdrop: 'static', keyboard: false});
                $("#modalAlert").modal('show');
            }, 500);
            $('#responAlert').html( data.respMessage );

            $scope.topupChangeContent = "contentKonfirmasi";
            
            // COUNTDOWN TIMER AND DATE
            //set time between pay
            var timePay = 14399;
            //settimer
            var intervalId;
            $scope.initialCountdown = timePay;
            $scope.countdown = $scope.initialCountdown;
            $scope.timer = function(){
                var startTime = new Date();
                intervalId = $interval(function(){
                    var actualTime = new Date();
                    $scope.counter = Math.floor((actualTime - startTime) / 1000);
                    $scope.countdown = $scope.initialCountdown - $scope.counter;
                }, 1000);
            };
            $scope.$watch('countdown', function(countdown){
                if (countdown === 0){
                    $interval.cancel(intervalId);
                alert('Waktu Habis. Silahkan membuat pembayaran baru.');
                }
            });
            $scope.timer();
            var date = new Date();
            date.setSeconds(timePay);
            var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var tanggal = date.toLocaleString('id-ID', options);
            var time = date.toLocaleTimeString().slice(0, -3);
            $scope.enddate = tanggal + " " + time;

            //SHOW THE REST OF THE CONTENT
            $scope.konfbank = "Kode Bank " + data.bank;
            $scope.konfkode_bank = data.kode_bank;
            $scope.konflogo = data.logo;
            $scope.konfnomer_rekening = data.nomer_rekening;
            $scope.konfnama_pemilik = data.nama_pemilik;
            var nominalTransfer = "Rp " + data.nominal.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
            $scope.konfnominal = nominalTransfer;
            $scope.konfnominal2 = nominalTransfer;

        });
    };
});