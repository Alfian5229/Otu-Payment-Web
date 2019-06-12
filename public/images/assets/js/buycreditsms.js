app.controller('buycreditsmsCtrl', function($scope, $http) {

    //variable for get json file once
    var isAllLoad = false;
    //variabel for storing provider from prefix
    var provider;
    //variabel for checking if user input is 4;
    var isEmpat = false;
    //check if prefix is valid
    var isPrefixValid = false;
    //variable for storing code from user checked item
    var kodeItem;

    // variabel for storing json prefix file
    var prefix;
    // variabel for storing json data file
    var hasildata;

    if(isAllLoad == false){
        //get data json for prefix
        $.post("../buycreditsms/getjsonprefixsms", function(data){
            prefix = data;
        });
        //get data json for sms
        $.post("../buycreditsms/getjsonSms", function(data){
            hasildata = data;
        });
        isAllLoad = true;
    }

    //prefix input no-hp
    $scope.myFuncCredit2 = function() {

        //pattern for checking 4 for cekprefix
        var patt = /\d{4}/;

        //use patt 4
        if(patt.test($scope.myValue)){
            //checking if input user is 4 or not
            if(isEmpat == false){
                isEmpat = true;
                //checking prefix is same or not with user input
                isPrefixValid = false;
                for(var i=0 ; i < prefix.data.length ; i++){
                    if (prefix.data[i].prefix == $scope.myValue) {
                        provider = prefix.data[i].provider;
                        isPrefixValid = true;
                    }   
                }
                if(isPrefixValid == false) {
                    $scope.prefixes = "";
                    $scope.datakosong = true;
                } else{
                    //filter data pulsa with matching prefix
                    var hasilsearching = [];
                    for (var j=0 ; j < hasildata.data.length ; j++){
                        if (hasildata.data[j].provider == provider) {
                            hasilsearching.push(hasildata.data[j]);
                        }   
                    }
                    for(var k = 0; k<hasilsearching.length; k++){
                        hasilsearching[k].checked = "false";
                    }
                    //show the content
                    document.getElementById("hideData").style.visibility = "visible";
                    $scope.prefixes = hasilsearching;
                    toBottom();
                    document.getElementById("logoProvider").src = "/images/assets/images/" + providerConvert(provider) + ".png";
                }
            }
        } else {
            isEmpat = false;
            $scope.datakosong = false;
            document.getElementById("label-harga").style.visibility = "hidden";
            document.getElementById("harga").style.visibility = "hidden";
            document.getElementById("nominal").style.visibility = "hidden";
            document.getElementById("hideData").style.visibility = "hidden";
        }
    };
    
    //function to convert to image name
    function providerConvert(provider){
        var slice = provider.slice(0, -4);
        if(slice == "TSEL"){
            return "Telkomsel";
        }
        if(slice == "XL"){
            return "XL";
        }
        if(slice == "ISAT"){
            return "Indosat";
        }
        if(slice == "TRI"){
            return "Three";
        }
        if(slice == "SMARTFREN"){
            return "Smart";
        }
        if(slice == "AXIS"){
            return "Axis";
        }
    }

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
                    $scope.btnBeli = false;
                    $scope.harga = "";
                    $scope.nominal = "";
                } else {
                    kodeItem = $scope.prefixes[position].code;
                    document.getElementById("label-harga").style.visibility = "visible";
                    document.getElementById("harga").style.visibility = "visible";
                    document.getElementById("nominal").style.visibility = "visible";
                    $scope.btnBeli = true;
                    var price = $scope.prefixes[position].price;
                    var slice = price.slice(0, -3);
                    $scope.harga = slice.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."); 
                    $scope.nominal = $scope.prefixes[position].name;
                    toBottom();
                }
                subscription.checked = true;
            }
        });
    };

    // for showing modal alert and buying product
    $scope.tampilModalAlert = function(){
        $.post("../buycreditsms/buysms", { kodeitem: kodeItem, nomerhp: $scope.myValue} ,function(data){
            document.getElementById('responhasilbeli').innerHTML = data;
            setTimeout(function(){
                $("#modalAlert").modal({backdrop: 'static', keyboard: false});
                $("#modalAlert").modal('show');
            }, 500);
        });
    };

    // function for check data sms with api
    function getDataSms(providersms){
        $.post("../buycreditsms/getdatasms", { providersms: providersms} ,function(data){
            hasilSearch = data;
        });
    }
});