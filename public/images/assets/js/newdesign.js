//session check
var ceksession = false;
var check = false;
//variabel for checking if sisa_uang is load once
var isLoaded = false;
//variabel for storing route;
var route;
//variabel for checking if user is loggin or not. for changing login and logout button label
var isInOrOut = "out";
//checking is riwayat is opened or not
var isriwayat = false;
//checking is topup is opened or not
var istopup = false;

//event listener for click enter on form login submit
$(document).ready(function() {
    var input = document.getElementById("password");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("btKonfirmasi").click();
        }
    });
});

// if session is there, logout first, then show content
$.get("../newdesigns/ceksession", function(data) {
    if(data == "loggedin"){
        $.post("../newdesigns/logout", function(data) {
            ceksession = false;
            if(data === "sukses"){
                // alert('Logout Berhasil');
            }
            sessionCheck();
            check = false;
            $('#pilihProduk').show();
            $('#isiPayment').hide();
            isInOrOut = "out";
        });
    }
    $('#btHome').hide();
    $('#btTopup').hide();
    $('#btTransfersaldo').hide();
    $('#btRiwayat').hide();
    $('#btLoginLogout').html("LOGIN");
    isInOrOut = "out";
});

//cek session
function sessionCheck(){
    $.get("../newdesigns/ceksession", function(data) {
        if (data === "loggedin") {
            ceksession = true;
            $('#btHome').show();
            $('#btTopup').show();
            $('#btTransfersaldo').show();
            $('#btRiwayat').show();
            $('#btLoginLogout').html("LOGOUT");
            isInOrOut = "in";
            if(isLoaded == false){
                $.post("../newdesigns/getSaldo", function(data) {
                    var saldo = data[0].sisa_uang;
                    saldo = saldo.slice(0, -3);
                    saldo = saldo.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    $('#usersaldo').html(' Saldo : Rp ' + saldo);
                    var bonus = data[0].bonus_member;
                    bonus = bonus.slice(0, -3);
                    bonus = bonus.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    $('#userbonus').html(' Bonus : Rp ' + bonus);
                    isLoaded = true;
                });
            }
        }
        if(data === "loggedout") {
            ceksession = false;
            isLoaded = false;
            $('#usersaldo').html('');
            $('#userbonus').html('');
            $('#btHome').hide();
            $('#btTopup').hide();
            $('#btTransfersaldo').hide();
            $('#btRiwayat').hide();
            $('#btLoginLogout').html("LOGIN");
            isInOrOut = "out";
        }
    });
}

//angularjs routing
var app = angular.module("myApp", ["ui.router", "ngSanitize", "ui.select", "ngMaterial", "ngMessages"]);
app.config(function($stateProvider){
    //state for forbidden page
    $stateProvider.state("forbiddenpage", {
        views: {
            "forbiddenpage": {
                templateUrl: "../newdesigns/forbiddenpage"
            }
        }
    })
    .state("underconstruction", {
        views: {
            "forbiddenpage": {
                templateUrl: "../newdesigns/underconstruction"
            }
        }
    })
    .state("riwayat", {
        views: {
            "isi": {
                templateUrl: "../newdesigns/riwayat",
                controller : "riwayatCtrl"
            }
        }    
    })
    .state("topup", {
        views: {
            "isi": {
                templateUrl: "../newdesigns/topup",
                controller : "topupCtrl"
            }
        }    
    });
    //state for any else
    $stateProvider
    .state("buycreditpulsa", {
        templateUrl: "../newdesigns/buycreditpulsa",
        controller : "buycreditpulsaCtrl"
    })
    .state("buycreditpaketdata", {
        templateUrl: "../newdesigns/buycreditpaketdata",
        controller : "buycreditpaketdataCtrl"
    })
    .state("buycredittokenlistrik", {
        templateUrl: "../newdesigns/buycredittokenlistrik",
        controller : "buycredittokenlistrikCtrl"
    })
    .state("buycreditetoll", {
        templateUrl: "../newdesigns/buycreditetoll",
        controller : "buycreditetollCtrl"
    })
    .state("buycreditgame", {
        templateUrl: "../newdesigns/buycreditgame",
        controller: "buycreditgameCtrl"
    })
    .state("buycreditsms", {
        templateUrl: "../newdesigns/buycreditsms",
        controller : "buycreditsmsCtrl"
    })
    .state("buycredittelepon", {
        templateUrl: "../newdesigns/buycredittelepon",
        controller : "buycreditteleponCtrl"
    })
    .state("buycreditesaldo", {
        templateUrl: "../newdesigns/buycreditesaldo",
        controller : "buycreditesaldoCtrl"
    })
    .state("buycreditwifiid", {
        templateUrl: "../newdesigns/buycreditwifiid",
        controller : "buycreditwifiidCtrl"
    })
    .state("tagihanlistrik", {
        templateUrl: "../newdesigns/tagihanlistrik",
        controller : "tagihanlistrikCtrl"
    })
    .state("tagihanbpjs", {
        templateUrl: "../newdesigns/tagihanbpjs",
        controller : "tagihanbpjsCtrl"
    })
    .state("tagihantelkom", {
        templateUrl: "../newdesigns/tagihantelkom",
        controller : "tagihantelkomCtrl"
    })
    .state("tagihanpgn", {
        templateUrl: "../newdesigns/tagihanpgn",
        controller : "tagihanpgnCtrl"
    })
    .state("tagihanpascabayar", {
        templateUrl: "../newdesigns/tagihanpascabayar",
        controller : "tagihanpascabayarCtrl"
    })
    .state("tagihantvkabel", {
        templateUrl: "../newdesigns/tagihantvkabel",
        controller : "tagihantvkabelCtrl"
    })
    .state("tagihanpdam", {
        templateUrl: "../newdesigns/tagihanpdam",
        controller : "tagihanpdamCtrl"
    })
    .state("tagihanfinance", {
        templateUrl: "../newdesigns/tagihanfinance",
        controller : "tagihanfinanceCtrl"
    })
    .state("tagihankartukredit", {
        templateUrl: "../newdesigns/tagihankartukredit",
        controller : "tagihankartukreditCtrl"
    });
});

//for timer topup
app.filter('secondsToDateTime', function() {
    return function(seconds) {
        var d = new Date(0,0,0,0,0,0,0);
        d.setSeconds(seconds);
        return d;
    };
});

//hide pilihProduk
app.controller('myCtrl', function($scope, $state) {
    //referrer check
    // var oldURL = document.referrer;
    var oldURL = "https://otuchat.com";
    var url = location.href;
    var murl = url.indexOf("=");
    var nomor_hp = url.substring(murl+1, url.length);
    nomor_hp = "085707025293";
    // nomor_hp = "085785750816";
    $scope.nomor_hp  = nomor_hp;
    var isForbidden = false;
    if(!oldURL.includes("otuchat.com")){
        $state.go("forbiddenpage");
        isForbidden = true;
    } //else if($scope.nomor_hp != "6282245355930"){
        // $state.go("underconstruction");
        // isForbidden = true;
     //}

    //get banner with api
    $.get("../newdesigns/getBanner", function(data) {
        for(var i = 0; i < data.length ; i++){
            if(i == 0 && isForbidden == false){
                document.getElementById("banner0").src = data[i].baner_promo;
            }
            else{
                $("<div class='carousel-item' id='banner-carousel" + i + "'><img id='banner" + i + "' class='img-fluid' src='" + data[i].baner_promo + "'></img></div>")
                    .insertAfter("#banner-carousel" + (i-1));
                $("<li id='indicators" + i + "' data-target='#demo', data-slide-to='" + i + "'></li>")
                    .insertAfter("#indicators" + (i-1));
            }
        }
    });

    //change menu isi ulang & tagihan
    $scope.myFunc = function(routes){
        route = routes;
        if(ceksession == true){
            $state.go(route, null, {reload: true}).then(function(){
                $('#pilihProduk').hide();
                $('#isiPayment').show();
                toBottom();
            });
        } else {
            check = true;
            $('#modalLogin').modal(
                {
                    show: true,
                    backdrop: "static",
                    keyboard: false
                }  
            );
        }
    };

    //login function
    $scope.cekLogin = function (){
        email = $("#email").val();
        email = $scope.nomor_hp;
        pass = $("#password").val();
        $.post("../newdesigns/login", { email: email, pass: pass }, function(data) {
            if (data === "done") {
                alert("Login Berhasil");
                $('#modalLogin').modal('hide');
                ceksession = true;
                if(check == true){
                    $state.go(route, null, {reload: true});
                    $('#pilihProduk').hide();
                    $('#isiPayment').show();
                }
                sessionCheck();
            }
            if (data === "gagal"){
                alert("Username Atau Password Salah");
            }
        });
    };

    //back to menu utama
    $scope.menuutama = function(){
        $scope.main = false;
        $scope.hideisi = true;
        isriwayat = false;
    };

    //cek riwayat
    $scope.cekriwayat = function(){
        if(isriwayat == false){
            $scope.main = true;
            $scope.hideisi = false;
            $state.go("riwayat", null, {reload: true}).then(() => {
                // $(document).ready(function() {
                //     $('#datatable').DataTable();
                // });
            }); 
            isriwayat = true;
        } else{
            $scope.main = false;
            $scope.hideisi = true;
            isriwayat = false;
        }
    };

    //open topup
    $scope.topup = function(){
        if(istopup == false){
            $scope.main = true;
            $scope.hideisi = false;
            $state.go("topup", null, {reload: true}).then(() => {
                // $(document).ready(function() {
                //     $('#datatable').DataTable();
                // });
            }); 
            istopup = true;
        } else{
            $scope.main = false;
            $scope.hideisi = true;
            istopup = false;
        }
    };

    //loginlogout function
    $scope.loginlogout = function(){
        if(isInOrOut == "out"){
            $('#modalLogin').modal(
                {
                    show: true,
                    backdrop: "static",
                    keyboard: false
                }
            );
        }
        if(isInOrOut == "in"){
            $.post("../newdesigns/logout", function(data) {
                ceksession = false;
                if(data === "sukses"){
                    // alert('Logout Berhasil');
                }
                sessionCheck();
                check = false;
                $('#pilihProduk').show();
                $('#isiPayment').hide();
                isInOrOut = "out";

                window.location.reload();
            });
        }
    };

//TRANSFER SALDO
    var nominal;
    //for showing transfer saldo
    $scope.transfersaldo = function(){
        $('#modalTransferSaldo').modal(
            {
                show: true,
                backdrop: "static",
                keyboard: false
            }
        );
    };
    //checking tujuan transfer
    $scope.cektujuantransfer = function(){
        var saldotujuan = $('#saldotujuan').val();
        $.post("../newdesigns/cektujuantransfer", { destination: saldotujuan }, function(data) {
            $("#modalTransferSaldo").modal('hide');
            if(data.status == 'FAILED'){
                $('#responAlert').html(data.respMessage);
                setTimeout(function(){
                    $("#modalAlert").modal({backdrop: 'static', keyboard: false});
                    $("#modalalert").modal('show');
                }, 500);
            } else {
                setTimeout(function(){
                    $("#modalTransferKonfirmasi").modal({backdrop: 'static', keyboard: false});
                    $("#modalTransferKonfirmasi").modal('show');
                }, 500);
                $('#konfnama').html(data.datarespon[0].nama_member);
                $('#konfid').html(data.datarespon[0].id_member);
                $('#konftelp').html(data.datarespon[0].telp_member);
                nominal = $('#saldonominal').val(); 
                $('#konfnominal').html("Rp " + nominal.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
            }
        });
    };
    //transfer saldo because is FIX :P
    $scope.transferSaldoFix = function(){
        var saldotujuan = $('#saldotujuan').val();
        var nominaltujuan = nominal;
        var saldopin = $('#saldopin').val();
        $.post("../newdesigns/transfersaldofix", { tujuan: saldotujuan, nominal: nominaltujuan, pin: saldopin }, function(data) {
            $('#responAlert').html(data.respMessage);
            setTimeout(function(){
                $("#modalAlert").modal({backdrop: 'static', keyboard: false});
                $("#modalalert").modal('show');
            }, 500);
        });
    };
});

//scrolling to the bottom of the page with animation
function toBottom(){
    $('html, body').animate({scrollTop:$(document).height()}, 'fast');
}
