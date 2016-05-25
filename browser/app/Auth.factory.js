app.factory('AuthFactory', function($http){
    return {
      signUpOrLogIn: function(path, obj){
        console.log("signup in here", obj);
        this
        return $http.post(path, obj)
       //  .then(function(user){
       //    $state.go('user',{id:user.data.id});
       //  })
       //  .then(null, function(){
       //    console.log('NO USER!');
       // });
      }
    };
});