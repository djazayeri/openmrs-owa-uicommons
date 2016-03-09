angular.module("omrs-page-decoration", ["ngResource"])
        .directive("omrsHeader", [ function() {
            return {
                restrict: "E",
                scope: { },
                controller: ["$scope", "$resource", function ($scope, $resource) {
                    var sessionContext = $resource("../../ws/rest/v1/sessioncontext");
                    $scope.sessionContext = sessionContext.get({v:"default"});
                }],
                templateUrl: "partials/angular/header.html"
            };
        }]);