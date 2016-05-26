'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory) {
  $scope.story = story;
  $scope.users = users;
  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);
  AuthFactory.currentUser()
    .then(function(userObj){
      $scope.isAuthor =  userObj.id === $scope.story.author_id;
      $scope.isAdmin = userObj.isAdmin;
    });
});
