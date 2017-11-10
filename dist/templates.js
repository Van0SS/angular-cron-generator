angular.module('angular-cron-generator').run(['$templateCache', function($templateCache) {$templateCache.put('cron.generator.html','<div class="cron-wrap">\n\n    <script type="text/ng-template" id="minutes-template.html">\n        <select \n            class="form-control"\n            ng-model="myFrequency.minutes"\n            ng-if="allowMultiple" multiple\n            ng-options="value as value for value in minutes">\n        </select>\n        <!-- If Multiple is not Enabled -->\n        <select \n            class="form-control"\n            ng-model="myFrequency.minutes"\n            ng-if="!allowMultiple"\n            ng-options="value as value for value in minutes">\n        </select>\n    </script>\n\n    <script type="text/ng-template" id="hours-template.html">\n        <select \n            class="form-control"\n            ng-model="myFrequency.hours"\n            ng-if="allowMultiple" multiple\n            ng-options="value as value for value in hours">\n        </select>\n        <!-- If Multiple is not Enabled -->\n        <select \n            class="form-control"\n            ng-model="myFrequency.hours"\n            ng-if="!allowMultiple"\n            ng-options="value as value for value in hours">\n        </select>\n    </script>\n\n    <script type="text/ng-template" id="dates-template.html">\n        <!-- If Multiple is Enabled -->\n        <select \n            class="form-control"\n            ng-model="myFrequency.daysOfMonth"\n            ng-if="allowMultiple" multiple\n            ng-options="value as (value | cronNumeral) for value in daysOfMonth">\n        </select>\n        <!-- If Multiple is not Enabled -->\n        <select \n            class="form-control"\n            ng-model="myFrequency.daysOfMonth"\n            ng-if="!allowMultiple"\n            ng-options="value as (value | cronNumeral) for value in daysOfMonth">\n        </select>\n    </script>\n\n    <script type="text/ng-template" id="days-template.html">\n        <!-- If Multiple is Enabled -->\n        <select \n            class="form-control"\n            ng-model="myFrequency.days"\n            ng-if="allowMultiple" multiple\n            ng-options="value as (value | cronDayName: cronStyle) for value in days">\n        </select>\n        <!-- If Multiple is not Enabled -->\n        <select \n            class="form-control"\n            ng-model="myFrequency.days"\n            ng-if="!allowMultiple"\n            ng-options="value as (value | cronDayName: cronStyle) for value in days">\n        </select>\n    </script>\n\n    <script type="text/ng-template" id="month-template.html">\n        <select \n            class="form-control"\n            ng-model="myFrequency.months"\n            ng-if="allowMultiple" multiple\n            ng-options="value as (value | cronMonthName) for value in months">\n        </select>\n        <!-- If Multiple is not Enabled -->\n        <select \n            class="form-control"\n            ng-model="myFrequency.months"\n            ng-if="!allowMultiple"\n            ng-options="value as (value | cronMonthName) for value in months">\n        </select>\n    </script>\n    \n    <div class="clearfix" style="margin-bottom: 20px;">\n        <select ng-change="initKeys()" class="form-control" ng-model="myFrequency.base" ng-options="item.value as item.label for item in frequency"></select>\n    </div>\n\n    <div class="clearfix form-inline well well-small" ng-if="myFrequency.base !== 0">\n\n        <!-- only for minutes -->\n        <div class="form-group" ng-show="myFrequency.base === 1">\n            <label>Every: </label>\n            <div class="select-options" ng-include="\'minutes-template.html\'"></div>\n            <label>minute(s)</label>\n        </div>\n        <!-- only for minutes end-->\n\n        <!-- hourly -->\n        <div class="form-group" ng-show="myFrequency.base === 2">\n            <label>Every: </label>\n            <div class="select-options" ng-include="\'hours-template.html\'"></div>\n            <label>hour(s) on minute</label>\n            <div class="select-options" ng-include="\'minutes-template.html\'"></div>\n        </div>\n        <!-- hourly end -->\n\n\n        <!-- daily -->\n        <div class="form-group" ng-show="myFrequency.base === 3">\n            <label>Every: </label>\n            <div class="select-options" ng-include="\'dates-template.html\'"></div>\n            <label>day(s) at</label>\n            <div class="select-options" ng-include="\'hours-template.html\'"></div>\n            <label>hours(s) and</label>\n            <div class="select-options" ng-include="\'minutes-template.html\'"></div>\n            <label>minute(s).</label>\n        </div>\n        <!-- daily end -->\n\n\n        <!-- weekly -->\n        <div class="form-group" ng-show="myFrequency.base === 4">\n            <label>Every: </label>\n            <div class="select-options" ng-include="\'days-template.html\'"></div>\n            <label>at</label>\n            <div class="select-options" ng-include="\'hours-template.html\'"></div>\n            <label>hours(s) and</label>\n            <div class="select-options" ng-include="\'minutes-template.html\'"></div>\n            <label>minute(s).</label>\n        </div>\n        <!-- weekly end -->\n\n        <!-- monthly -->\n        <div class="form-group" ng-show="myFrequency.base === 5">\n            <label>On the: </label>\n            <div class="select-options" ng-include="\'dates-template.html\'"></div>\n            <label>of every</label>\n            <div class="select-options" ng-include="\'month-template.html\'"></div>\n            <label>month(s) at</label>\n            <div class="select-options" ng-include="\'hours-template.html\'"></div>\n            <label>hours(s) and</label>\n            <div class="select-options" ng-include="\'minutes-template.html\'"></div>\n            <label>minute(s).</label>\n        </div>\n        <!-- monthly end -->\n    </div>\n</div>');}]);