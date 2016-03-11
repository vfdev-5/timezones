(function () {
    'use strict';


    angular.module('App')
        .factory('TimeZoneService', TimeZoneService);


    function TimeZoneService() {

        console.log("Initialize service");

        var _timezones = [
            {
                label: "UTC",
                code: 'UTC_za00',
                country: "UTC",
                info: "",
            },
            {
                label: "PARIS",
                code: 'Paris_z71f',
                country: "FR",
                info: "UTC+1",
            },
            {
                label: "CAYENNE",
                code: 'Cayenne_z121',
                country: "Guyane FR",
                info: "UTC-3",
            },
            {
                label: "FORT de France",
                code: '_z153',
                country: "Martinique",
                info: "UTC-4",
            },
            {
                label: "PAPEETE",
                code: 'Papeete_z921',
                country: "Polynésie",
                info: "UTC-10",
            },
            {
                label: "NOUMEA",
                code: 'Noumea_z919',
                country: "Nouvelle Calédonie",
                info: "UTC+11",
            },
            {
                label: "ABOU DHABI",
                code: 'Abu_Dhabi_z414',
                country: "EAU",
                info: "UTC+4",
            },
            {
                label: "SAINT DENIS",
                code: '_z80a',
                country: "Réunion",
                info: "UTC+4",
            },
        ];

        //*******************************

        var factory = {
            getTimeZones: _getTimeZones,
            getTimeWidgetInitObject: _getTimeWidgetInitObject,
        };

        return factory;

        //*******************************

        function _getTimeZones() {
            console.log('Get Time Zones : ' + _timezones);
            return _timezones;
        }

        function _getTimeWidgetInitObject() {
            var object = {};
            for (var tz in _timezones) {
                object[_timezones[tz].code] = { template:"TIME | DATE", date_format:"dayname daynum/monthnum/year"};
            }
            return object;
        }


    }


})();