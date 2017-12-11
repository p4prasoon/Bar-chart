var app = angular.module('barchart', ['chart.js']);
app.controller('MainCtrl', function($scope, UserServices, $http, $timeout, $interval) {

    var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
        proxyUrl = 'https://cors-anywhere.herokuapp.com/' + url; // add to avoid cors 
    var init = function() {
        $scope.labels = [];
        $scope.data = [];
        UserServices.httpGetAllListItems(proxyUrl, 'GET', {}).then(function mySucces(response) {
            debugger;
            //$scope.price_btc = response.data.price_btc;
            for (var i = 0, len = response.data.length; i < len; i++) {
                $scope.labels.push(response.data[i].name);
                $scope.data.push(response.data[i].price_usd);
            }
        }, function myError(response) {
            alert('Not able to fetch the data');
        });

    }
    init();
    $interval(function() {
        init();
    }, 300000);
});
app.service('UserServices', function($http, $location) {
    var header = {
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': '*'
    };
    this.httpGetAllListItems = function(api, method, inputObj) {

        var request = $http({
            method: method,
            url: api,
            data: inputObj,
            headers: header
        });

        return request;
    }

});