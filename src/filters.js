angular.module('taters.filters', [])
    .filter('author',function(){
        return function(word){ return word.match(/\((.*)\)/).pop();};
    })
    .filter('authorUrl', function(){
        return function(description){ return description.match(/href="(.*?)(?=")/).pop();};
    });