app.factory('AuthFactory', function($http){
    return {
      signUpOrLogIn: function(path, obj){
        return $http.post(path, obj);
      },
      isAdmin: function(){

        // console.log("getting user admin status");
        // return $http.get("/users/" + userId)
        // .then(function(foundUser){
        //   console.log(foundUser.data.isAdmin);
        //   return foundUser.data.isAdmin;
        // })
        // .then(null, function(err){
        //   console.log(err);
        // })
      },
      currentUser: function(){
        return $http.get("/auth/me")
        .then(function(user){
          return user.data;
        })
      }
    };
});