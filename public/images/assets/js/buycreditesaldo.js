app.controller('buycreditesaldoCtrl', function($scope, $http) {
    //variable for storing which content is clicked by content
    var title;
    //variable for get json file once
    var isLoad = false;
    //variable for checking if user is inputting one character or not
    var isInput = false;
    //for checking if input text is ada isinya or not in e-saldo
    var adadata = 0;
    //for checking if user is checking the check button
    var ischecked = 0;
    //pattern for checking input text if six or more
    var patt = /\d{6}/;
    //variable for storing json e-saldo
    var hasil;
    //variable for storing code from user checked item
    var kodeItem;

    $scope.changeContent = function(data){
        title = data;

        document.getElementById('logo-esaldo').src = "/images/assets/images/esaldo_" + title + ".png";

        $scope.title = title;
        $scope.GantiIsiEsaldo = 'changed';
        toBottom();

        //get data json for e-saldo
        $.post("../buycreditesaldo/getjsonesaldo", { title: title }, function(data){
            hasil = data;
            $scope.prefixes = hasil;
        });
        isLoad = true;
    };

    //for checking user input for e-saldo
    $scope.inputDataESaldo = function(){
        var no_pelanggan = document.getElementById("esaldo-no").value;

        if(isInput == false){
            document.getElementById('labelJudulNominal').style.visibility = "visible";
            $scope.prefixes = hasil;
            isInput = true;
            toBottom();
        }

        if(patt.test(no_pelanggan)){
            adadata = 1;
            cekInput();
        } else {
            adadata = 0;
            cekInput();
        }
    };

    //check only 1 checkbox
    $scope.updateSelection = function(position, entities) {
        angular.forEach(entities, function(subscription, index) {
            if (position != index)
                subscription.checked = false;
            if (position == index){
                if ($scope.prefixes[position].checked == true){
                    document.getElementById("label-harga").style.visibility = "hidden";
                    document.getElementById("harga").style.visibility = "hidden";
                    document.getElementById("nominal").style.visibility = "hidden";
                    ischecked = 0;
                    $scope.harga = "";
                    $scope.nominal = "";
                    cekInput();
                } else {
                    kodeItem = $scope.prefixes[position].code;
                    document.getElementById("label-harga").style.visibility = "visible";
                    document.getElementById("harga").style.visibility = "visible";
                    document.getElementById("nominal").style.visibility = "visible";
                    ischecked = 1;
                    var price = $scope.prefixes[position].price;
                    var slice = price.slice(0, -3);
                    $scope.harga = slice.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."); 
                    $scope.nominal = $scope.prefixes[position].name;
                    toBottom();
                    cekInput();
                }
            }
        });
    };

    function cekInput(){
        if((adadata == 1) && (ischecked == 1)){
            $scope.btnBeliEsaldo = true;
        }
        else{
            $scope.btnBeliEsaldo = false;
        }
    }

    // for showing modal alert and buying product
    $scope.tampilModalAlert = function(){
        $.post("../buycreditesaldo/buyesaldo", { kodeitem: kodeItem, nomerpelanggan: $scope.no_esaldo} ,function(data){
            document.getElementById('responhasilbeli').innerHTML = data;
            setTimeout(function(){
                $("#modalAlert").modal({backdrop: 'static', keyboard: false});
                $("#modalAlert").modal('show');
            }, 500);
        });
    };
});