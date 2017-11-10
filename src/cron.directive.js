export function CronGeneratorDirective (cronGeneratorService) {
	'ngInject';

	function linkFn($scope, $el, $attr, $ngModel) {
		$scope.myFrequency= {
      base: 0
    };

    $scope.frequency = [{
      value: 0,
      label: "Select"
    },
    {
      value: 1,
      label: "Minute"
    },
    {
      value: 2,
      label: "Hourly"
    },
    {
      value: 3,
      label: "Daily"
    },
    {
      value: 4,
      label: "Weekly"
    },
    {
      value: 5,
      label: "Monthly"
    }];

    if (typeof $scope.config === "object" && !$scope.config.length) {
      if ($scope.config.excludedFrequencies) {
        // As JS badly supports Sets and amount of values is relatively small so use 2 for loops
        for (var i = $scope.frequency.length - 1; i >= 0; i--) {
          for (var j = $scope.config.excludedFrequencies.length; j >= 0; j--) {
            if ($scope.frequency[i].label === $scope.config.excludedFrequencies[j]) {
              $scope.frequency.splice(i, 1);
            }
          }
        }
      }
      if (angular.isDefined($scope.config.allowMultiple)) {
        $scope.allowMultiple = $scope.config.allowMultiple;
      } else {
        $scope.allowMultiple = false;
      }
    }

    $scope.minutes = Array.apply(null, Array(60)).map(function (_, i) {return i;});
    $scope.hours = Array.apply(null, Array(24)).map(function (_, i) {return i;});
    $scope.daysOfMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    $scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    $scope.days = [1, 2, 3, 4, 5, 6, 7];

    $scope.$watch("myFrequency", function (n, o) {
	    if(angular.isUndefined(n)){
        $scope.myFrequency= {
          base: 0
        }
	    }
	    if (n && o) {
        if (n.base) {
          var str = cronGeneratorService.getCronString(n, $scope.allowMultiple);
          $ngModel.$setViewValue(str);
        }
	    }
    }, true);

    $scope.initKeys = function(){
      
      resetInitialValues();

      //due to angular issue
      if($scope.allowMultiple){
          //http://stackoverflow.com/questions/18751129/angularjs-selecting-multiple-options
          return;
      }
      var o =  parseInt($scope.myFrequency.base);
      if(o >= 1){
          $scope.myFrequency.minutes = $scope.minutes[0];
      }
      if(o >= 2){
          $scope.myFrequency.hours = $scope.hours[0];
      }
      if(o >= 3){
          $scope.myFrequency.daysOfMonth = $scope.daysOfMonth[0];
      }
      if(o >= 4){
          delete $scope.myFrequency['daysOfMonth']; 
          $scope.myFrequency.days = $scope.days[0];
      }
      if(o >= 5){
          $scope.myFrequency.months = $scope.months[0];
          $scope.myFrequency.daysOfMonth = $scope.daysOfMonth[0];
      }
    };
    function resetInitialValues(){
      let key = $scope.myFrequency.base;
      $scope.myFrequency = {};
      $scope.myFrequency.base = key;
    }
	}

	let directive = {
		restrict: "EA",
    replace: true,
    transclude: true,
    require: "ngModel",
    scope: {
      ngModel: "=",
      config: "="
    },
    templateUrl: "cron.generator.html",
    link: linkFn
	}
	return directive;
}