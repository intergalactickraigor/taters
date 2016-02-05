angular.module('taters.services', [])
    .service('api', ['$http',function($http){
        return{
            get:function(){
                return $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?per_page=3&page=1&tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK');
            }
        };
    }])
    .service('chosenPotato', [function(){
        var potato = null;
        var getPotato = function(){
            return potato;
        };
        var setPotato = function(newPotato){
            potato = newPotato;
        };
        return{
            get: getPotato,
            set: setPotato
        };
    }]);