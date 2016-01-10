$(document).ready(function (){

  var wow = new WOW(
    {
      boxClass:     'wow',
      animateClass: 'animated',
      offset:       0,
      mobile:       true,
      live:         true,
      callback:     function(box) {
      },
      scrollContainer: ".mdl-layout__content" // optional scroll container selector, otherwise use window
    }
  );
  wow.init();
  var scrollable = $('main,.bigdata');
  scrollable.on('scroll.wow', function(){
      scrollable.find('.wow:not(.animated):in-viewport').removeAttr('style').addClass('animated');
  });

   $('.loading').slideUp('fast');
});


/*  $('#demo-menu-lower-left').click(function () {
    $('.bigdata-bg').fadeIn('slow');
    $('.bigdata').fadeIn('slow');
  });
  $('.bigdata-bg,#close').click(function () {
    $('.bigdata').fadeOut('slow');
    $('.bigdata-bg').fadeOut('slow');
  });
  $("#godown").click(function (event) {
      $('main').animate({ scrollTop: '800px' }, "slow");
  });
  $('main').scroll(function() {
      var height = $('main').scrollTop();

      if(height  > 700) {
          $('.mdl-layout__header-row').css({
            "background" : "black"
          });
      }else{
        $('.mdl-layout__header-row').css({
          "background" : "rgba(0, 0, 0, 0.30)"
        });
      }
  }); */

  var app = angular.module('mia', [
      'ngRoute',
      'ngCookies',
      'ngSanitize'
  ]);
  app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/',{
      templateUrl:'/pages/home.html',
      controller: 'homepage'
    })
    .when('/about',{
      templateUrl:'/pages/about.html'
    })
    .when('/contact',{
      templateUrl:'/pages/contact.html'
    })
    .when('/news',{
      templateUrl:'/pages/news.html'
    })
    .when('/post/:slug',{
      templateUrl:'/pages/post.html'
    })
    .when('/companies',{
      templateUrl:'/pages/companies.html',
      controller:'companies'
    })
    .when('/company/:slug',{
      templateUrl:'/pages/company.html',
      controller:'company'
    })
    .otherwise({
      redirectTo:'/'
    });
  });
app.controller('homepage',['$scope', '$http',
  function ($scope, $http) {
      $http.get('http://ws.made-in-aswan.org/latest_componeis/').success(function (data) {
        if( parseInt(data.rsp) === 1){
          $scope.companies = data.componeis;
        }
      });
  }]);
app.controller('companies',['$scope', '$http',
  function ($scope, $http) {
      $http.get('http://ws.made-in-aswan.org/componeis/').success(function (data) {
        if( parseInt(data.rsp) === 1){
          $scope.companies = data.componeis;
        }
      });
  }]);
app.controller('company',['$scope', '$http',  '$routeParams', '$sce',
  function ($scope, $http, $routeParams,$sce ) {
    $http.get('http://ws.made-in-aswan.org/componey/' + $routeParams.slug).success(function(data) {
      if( parseInt(data.rsp) === 1){
      $scope.company = data;
      $scope.trustme = function() {
               return $sce.trustAsHtml($scope.company.about);
             };
      }
    });
  }]);
app.controller('news');
app.controller('post');
