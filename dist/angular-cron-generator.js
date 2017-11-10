(function () {
'use strict';

CronGeneratorDirective.$inject = ["cronGeneratorService"];
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var DAY_LOOKUPS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var MONTH_LOOKUPS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

var CronGeneratorService = function () {
  function CronGeneratorService() {
    'ngInject';

    classCallCheck(this, CronGeneratorService);
  }

  createClass(CronGeneratorService, [{
    key: 'getCronString',
    value: function getCronString(o, allowMultiple) {
      var cron = ["*", "*", "*", "*", "?"],
          count = parseInt(o.base);
      if (count <= 1) {
        cron[0] = o.minutes ? "*/" + o.minutes : "*";
      } else if (count >= 1) {
        cron[0] = o.minutes ? o.minutes : "*";
      }
      if (count <= 2) {
        cron[1] = typeof o.hours !== "undefined" ? "*/" + o.hours : "*";
      } else if (count >= 2) {
        cron[1] = typeof o.hours !== "undefined" ? o.hours : "*";
      }
      if (count >= 3) {
        cron[2] = typeof o.daysOfMonth !== "undefined" ? o.daysOfMonth : "*";
      }
      if (count >= 4) {
        if (o.days) {
          cron[2] = "?";
        }
        if (o.days) {
          if (allowMultiple) {
            var str = [];
            angular.forEach(o.days, function (idx) {
              str.push(DAY_LOOKUPS[idx - 1]);
            });
            cron[4] = str.join();
          } else {
            cron[4] = DAY_LOOKUPS[o.days - 1];
          }
        } else {
          cron[4] = "?";
        }
      }
      if (count >= 5) {
        if (o.months) {
          if (allowMultiple) {
            var _str = [];
            angular.forEach(o.months, function (idx) {
              _str.push(MONTH_LOOKUPS[idx - 1]);
            });
            cron[3] = _str.join();
          } else {
            cron[3] = MONTH_LOOKUPS[o.months - 1];
          }
        } else {
          cron[3] = "*";
        }
      }
      return cron.join(" ");
    }
  }]);
  return CronGeneratorService;
}();

function CronGeneratorDirective(cronGeneratorService) {
  'ngInject';

  function linkFn($scope, $el, $attr, $ngModel) {
    $scope.myFrequency = {
      base: 0
    };

    $scope.frequency = [{
      value: 0,
      label: "Select"
    }, {
      value: 1,
      label: "Minute"
    }, {
      value: 2,
      label: "Hourly"
    }, {
      value: 3,
      label: "Daily"
    }, {
      value: 4,
      label: "Weekly"
    }, {
      value: 5,
      label: "Monthly"
    }];

    if (_typeof($scope.config) === "object" && !$scope.config.length) {
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

    $scope.minutes = Array.apply(null, Array(60)).map(function (_, i) {
      return i;
    });
    $scope.hours = Array.apply(null, Array(24)).map(function (_, i) {
      return i;
    });
    $scope.daysOfMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    $scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    $scope.days = [1, 2, 3, 4, 5, 6, 7];

    $scope.$watch("myFrequency", function (n, o) {
      if (angular.isUndefined(n)) {
        $scope.myFrequency = {
          base: 0
        };
      }
      if (n && o) {
        if (n.base) {
          var str = cronGeneratorService.getCronString(n, $scope.allowMultiple);
          $ngModel.$setViewValue(str);
        }
      }
    }, true);

    $scope.initKeys = function () {

      resetInitialValues();

      //due to angular issue
      if ($scope.allowMultiple) {
        //http://stackoverflow.com/questions/18751129/angularjs-selecting-multiple-options
        return;
      }
      var o = parseInt($scope.myFrequency.base);
      if (o >= 1) {
        $scope.myFrequency.minutes = $scope.minutes[0];
      }
      if (o >= 2) {
        $scope.myFrequency.hours = $scope.hours[0];
      }
      if (o >= 3) {
        $scope.myFrequency.daysOfMonth = $scope.daysOfMonth[0];
      }
      if (o >= 4) {
        delete $scope.myFrequency['daysOfMonth'];
        $scope.myFrequency.days = $scope.days[0];
      }
      if (o >= 5) {
        $scope.myFrequency.months = $scope.months[0];
        $scope.myFrequency.daysOfMonth = $scope.daysOfMonth[0];
      }
    };
    function resetInitialValues() {
      var key = $scope.myFrequency.base;
      $scope.myFrequency = {};
      $scope.myFrequency.base = key;
    }
  }

  var directive = {
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
  };
  return directive;
}

function CronNumeral() {
    "ngInject";

    return function (input) {
        switch (input) {
            case 1:
                return "1st";
            case 2:
                return "2nd";
            case 3:
                return "3rd";
            case 21:
                return "21st";
            case 22:
                return "22nd";
            case 23:
                return "23rd";
            case 31:
                return "31st";
            case null:
                return null;
            default:
                return input + "th";
        }
    };
}

function CronMonthName() {
    'ngInject';

    return function (input) {
        var months = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        };
        if (input !== null && angular.isDefined(months[input])) {
            return months[input];
        } else {
            return null;
        }
    };
}

function CronDayName() {
    "ngInject";

    return function (input) {
        var days = {
            1: "Sunday",
            2: "Monday",
            3: "Tuesday",
            4: "Wednesday",
            5: "Thursday",
            6: "Friday",
            7: "Saturday"
        };
        if (input !== null && angular.isDefined(days[input])) {
            return days[input];
        } else {
            return null;
        }
    };
}

angular.module('angular-cron-generator', []).service('cronGeneratorService', CronGeneratorService).directive('cronGenerator', CronGeneratorDirective).filter('cronNumeral', CronNumeral).filter('cronMonthName', CronMonthName).filter('cronDayName', CronDayName);

}());
