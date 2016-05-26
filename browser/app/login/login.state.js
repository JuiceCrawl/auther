'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/browser/app/login/login.html',
      controller: function($scope, AuthFactory, $state){
        // $scope.currentUsers [{user1},{user2},{}]
        $scope.logIn = function(){
          // want to push the user into the currentUsers
          AuthFactory.signUpOrLogIn("/login",{email : $scope.email, password: $scope.password })
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
