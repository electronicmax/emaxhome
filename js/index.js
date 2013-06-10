

angular
	.module('emax', ['ui'])
	.controller('TopLevel', function($scope, googleSheet, utils) {
		var $sa = function(fn) { return utils.safe_apply($scope, fn); };
		$scope.getTypes = function() {
			var data = $scope.works || [];
			return data.map(function(x) { return (x.type || '').split(','); });
		};
		$.getJSON('data/all.js').then(function(objs) {
		 	$sa(function() {
				window._data = objs;
				_($scope).extend(objs);
				console.log('contac t>> ', objs.contact);
			});
		}).fail(function(err) { console.error(err);});
		
	})
	.directive('author', function() {
		return {
			restrict:'E',
			replace:true,
			scope:{val:'=data'},
			template:"<div class='author'><span ng-bind='val'></div>"
		};
	})
	.directive('contact', function() {
		return {
			restrict:'E',
			scope:{val:'=data'},
			template:"<a href='{{val.url}}' target='_new' ng-bind-unsafe='val.name'> {{ val.name }}</a>"
		};
	})
	.directive('hoverable', function() {
		return {
			restrict:'E',	scope:{ val:'=data' }, replace:true,
			template:"<div data-id='{{ val }}' class='hoverable {{ semcls }}'>{{ val }}</div>",
			controller:function($scope, $attrs) {
				window._sc = $scope;
				$scope.semcls = $attrs.semcls;
			}
		};
	})
	.directive('pub', function($compile) {
		return {
			restrict:'E',
			scope:{val:'=data'},
			template:"<div class='pub'><div class='title' ng-bind='val.title'></div><div class='authors'><div class='author' ng-repeat='a in val.authors'><author data='a'></author></div></div></div>"
		};
	});


			// link: function (scope, element, attrs) {
			// 	var template = 
			// 	var newElement = angular.element(template);
			// 	$compile(newElement)(scope);
			// 	element.replaceWith(newElement);
			// 	console.log('authors :: ', scope.val.authors);
			// }
