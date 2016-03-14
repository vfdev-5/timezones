(function () {
    'use strict';

    angular.module('App')
        .directive('horizontalScroll', [
            function(){
                function scrollSlave(master, slave){
                    if(!slave) return;
                    slave[0].scrollLeft = master[0].scrollLeft;
                };
                return {
                    restrict: 'A',
                    replace: false,
                    compile: function(element, attrs){
                        var master = element.find('.horizontal-scroll-master');
                        var slave = element.find('.horizontal-scroll-slave');
                        master.on('scroll', function(){
                            scrollSlave(master, slave);
                        });
                   }
                };
            }
        ]);

    angular.module('App')
        .controller('Controller', Controller);

    Controller.$inject = ['$scope', 'TimeZoneService']

    function Controller($scope, TimeZoneService) {
        'use strict';
        console.log("Initialize controller");

        var vm = this;

        vm.timezones = TimeZoneService.getTimeZones();
        var twObject = TimeZoneService.getTimeWidgetInitObject();

        time_is_widget.init(twObject);
        setInterval(updateTimeGrid, 1000);
        var timeGridInitialized=false;
        vm.hoursCount=148;

        angular.element(document).ready(function () {
            setupScrollSync();
            timeGridInitialized=initTimeGrid();
            $scope.$apply();
        });

        // -------- local function
        var update_counter = 0;
        function updateTimeGrid() {
            // Use JQuery to get value from <span id=''>
            console.log("update_counter=" + update_counter);
            if (!timeGridInitialized) {
                timeGridInitialized=initTimeGrid();
            } else {
                setupTimeGrid();
            }
            $scope.$apply();
            update_counter++;
        }

        function initTimeGrid() {
            console.log("Initialize time grid");
            // Use JQuery to get value from <span id=''>
            for (var tz in vm.timezones) {
//                var text = $('#' + vm.timezones[tz].code).text();
                // text = "09:26:18 | Monday 14/03/2016"
                var text = angular.element(document).find('#' + vm.timezones[tz].code).text();
                console.log('span \'' + '#' + vm.timezones[tz].code + '\' value=' + text);

                if (text.length == 0) {
                    return false;
                };

                var start_hour = parseInt(text.substring(0,2));
                var res = text.match(/(\d+)\/(\d+)\/(\d+)/); // res[0] = 11/03/2016, res[1]=11, res[2]=03, res[3]=2016
                var day = new Date(res[3], res[2]-1, res[1], start_hour, 0, 0, 0);
                // getDay() Returns the day of the week (from 0-6)
                vm.timezones[tz]['timespan'] = [{'hours': day.getHours(), 'day': day.getDate(), 'month': day.getMonth()+1, 'is_weekend': day.getDay() < 1 || day.getDay() > 5}];
                for (var h=1; h<vm.hoursCount; h++) {
                    day.setHours(day.getHours()+1);
                    vm.timezones[tz]['timespan'].push({
                        'hours': day.getHours(),
                        'day': day.getDate(),
                        'month': day.getMonth()+1,
                        'is_weekend': day.getDay() < 1 || day.getDay() > 5,
                    });
                }
            }
            return true;
        }

        function setupTimeGrid() {

            for (var tz in vm.timezones) {
                var text = angular.element(document).find('#' + vm.timezones[tz].code).text();
                if (text.length == 0) {
                    console.err("data time info in the span is empty");
                    return;
                };
                var start_hour = parseInt(text.substring(0,2));
                if (start_hour != vm.timezones[tz]['timespan'][0]['hours']) {
                    vm.timezones[tz]['timespan'].shift();
                    var res = text.match(/(\d+)\/(\d+)\/(\d+)/); // res[0] = 11/03/2016, res[1]=11, res[2]=03, res[3]=2016
                    var day = new Date(res[3], res[2]-1, res[1], start_hour, 0, 0, 0);
                    day.setHours(day.getHours() + vm.hoursCount - 1);
                    vm.timezones[tz]['timespan'].push({
                        'hours': day.getHours(),
                        'day': day.getDate(),
                        'month': day.getMonth()+1,
                        'is_weekend': day.getDay() < 1 || day.getDay() > 5,
                    });
                }
            }
        }

        function setupScrollSync() {
            console.log("setupScrollSync");
            var master = angular.element(document).find('.horizontal-scroll-master');
            var slaves = angular.element(document).find('.horizontal-scroll-slave');
            master.on('scroll', function(){
                for (var p in slaves) {
                    scrollSlave(master, slaves[p]);
                }
            });
        }

        function scrollSlave(master, slave){
            if(!slave) return;
            slave.scrollLeft = master[0].scrollLeft;
        };




        //console.log("Controller : twObject=" + twObject);

//        var twObject = {
//                UTC_za00: { template:"TIME | DATE", date_format:"dayname daynum/monthnum/yy"},
//                United_Kingdom_z716: {template:"TIME | DATE", date_format:"dayname daynum/monthnum/yy"},
//                Paris_z71f: {template:"TIME | DATE", date_format:"dayname daynum/monthnum/yy"},
//            };
//        var twObject = TimeZoneService.getTimeWidgetInitObject();
//        console.log("Init Time.is widget");
//        time_is_widget.init(twObject);

    }

})();