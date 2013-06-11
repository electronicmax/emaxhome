

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
		
		var header = document.querySelector('.interests');
		var origOffsetY = $('.interests').offset().top;
		var setw = function() {
			$('.sticky').css('max-width', $('.restblock').width());
			var v = Math.max(12,$('.interests').height() || 0) + 'px' + ' 14px 100px 14px';
			$('.restblock').css('padding', v);			
		};
		document.addEventListener('scroll', function(e) {
			window.scrollY >= origOffsetY ? header.classList.add('sticky') : header.classList.remove('sticky');
			setw();
		});
		$(window).resize(setw);
		$scope.$watch(setw);
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
	.directive('interest', function() {
		return {
			restrict:'E',	scope:{ name:'=data' }, replace:true,
			template:"<div data-id='{{ name }}' class='interest'>{{ name }}</div>",
			controller:function($scope, $attrs) {
				$scope.semcls = $attrs.semcls;
			},
			link:function(scope, element, attrs) {
				$(element).mouseenter(function() {
					var h_el = this;
					console.log('enter ', h_el);					
					$('.interest').not(h_el).addClass('interest-out')
						.removeClass('interest-sel');
					$(h_el).addClass('interest-sel');
				}).mouseleave(function() {
					var h_el = this;
					console.log('exit ', h_el);										
					$('.interest').removeClass('interest-out').removeClass('interest-sel');
				});
			}			
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
