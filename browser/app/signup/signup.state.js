'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: '/browser/app/signup/signup.html',
    controller: function($scope, AuthFactory, $state){
      $scope.signUp = function(){
        AuthFactory.signUpOrLogIn("/signup",{email : $scope.email, password: $scope.password })
        .then(function(user){
          $state.go('user',{id:user.data.id});
        })
        .then(null, function(){
          console.log('NO USER!');
        });
      };
  }
 })
});
