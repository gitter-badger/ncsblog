/* Controllers */

// var blogApp = angular.module('blogApp', ['blogControllers']);

angular.module('blogControllers', ['blogApp'])
    .controller('blogCtrls',
      function blogCtrls( $scope , blogFactory ) {
        'use strict';

        $scope.nav = {
            navbrand : 'NCS BLOG'
        };

        $scope.postsLoaded = false ;
        
        blogFactory.getPosts().success(
            function(jsonData, statusCode){
              console.log('The request was successful!', statusCode);
              $scope.posts = jsonData.posts;
              $scope.postsLoaded = true ;
          });
        // $scope.$on('ngRepeatFinished',function(){
        //   console.log('Hi');
        // });
        // ----------------------------------------
        // For footer ---

        $scope.footer = {
            title : 'Nibble Computer Society' ,
            categories :  blogFactory.getCategories()
        }

        $scope.breads = blogFactory.getBreads();

        var loc = window.location.pathname;
        var sloc = loc.substring(loc.lastIndexOf('/'),(loc.lastIndexOf('.')-4));
        var path = "blogs"+sloc+".json";

        blogFactory.getBlogData(path)
          .success(function(jsonData, statusCode){
              console.log('The request was successful!', statusCode);
              $scope.pagename = jsonData.pagename ;
              $scope.topics = jsonData.topics ;
              $scope.author = jsonData.author ;

              var parent = document.getElementsByClassName('main')[0];
              parent.insertAdjacentHTML('beforeend',jsonData.content);
          });
          
        angular.element(document).ready(function () {
            blogFactory.runJs();
        });
    });

    // .controller('blogControllers',
    //   function( $scope , blogFactory) {
    //     $scope.nav = {
    //         navbrand : 'NCS BLOG'
    //     };
    //     $scope.posts = blogFactory.getPosts();
    //     // $scope.$on('ngRepeatFinished',function(){
    //     //   console.log('Hi');
    //     // });
    //     // ----------------------------------------
    //     // For footer ---

    //     $scope.footer = {
    //         title : 'Nibble Computer Society' ,
    //         categories :  blogFactory.getCategories()
    //     }
    //     // -----------------
    // })