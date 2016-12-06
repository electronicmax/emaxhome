/* jshint strict: false */
/* globals angular, _, $, console, d3 */

angular
	.module('emax', [])
	.controller('TopLevel', function($scope, $sce, utils) {
		var $sa = function(fn) { return utils.safe_apply($scope, fn); };
		$scope.getTypes = function() {
			var data = $scope.works || [];
			return data.map(function(x) { return (x.type || '').split(','); });
		};
		$.getJSON('data/all.js').then(function(objs) {
		 	$sa(function() {
				window._data = objs;
				objs.publications.map(function(p) {
					if (p.embed_video_url) { 
						console.log('video url ', p.embed_video_url);
						p.embed_video_url = p.embed_video_url && $sce.trustAsResourceUrl(p.embed_video_url) || undefined;
						console.log('result of $sce ', p.embed_video_url);						
					}
				});
				_.extend($scope,objs);
				$scope.pub_by_year = d3.nest().key(function(d) { return d.year; }).entries($scope.publications);

				console.log('contac t>> ', objs.contact, $scope.pub_by_year);
			});
		}).fail(function(err) { console.error(err);});
		
		var header = document.querySelector('.interests');
		var origOffsetY = $('.interests').offset().top;
		var setw = function() {
			$('.interests').css('width', $('.main').width() - 20);
			var v = (Math.max(10,$('.interests').height() || 0) + 8) + 'px' + ' 14px 20px 14px';
			// $('.restblock').css('padding', v);			
		};
		document.addEventListener('scroll', function(e) {
			window.scrollY >= origOffsetY ? header.classList.add('sticky') : header.classList.remove('sticky');
			setw();
		});
		$(window).resize(setw);
		$scope.$watch(setw);
		window._s = $scope;
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
			template:"<a href='{{val.url}}' target='_new' ng-bind-unsafe='val.name' rel='me'> {{ val.name }}</a>"
		};
	})
	.directive('teaching', function() {
		return {
			restrict:'E',
			scope:{val:'=data'},
			templateUrl:"partials/teaching.html",
		};
	})
	.directive('squishif', function() {
		return {
			restrict:'A',	
			link:function($scope, $element, $attrs) {
				var expr = $attrs.squishif;
				var update = function() {
					var result = $scope.$eval(expr);
					if (result) {
						$($element).addClass('squish');
					}
					else {
						$($element).removeClass('squish');
					}
				};				
				$scope.$watch(expr, update);
				update();
			}
		};		
	})
	.directive('interest', function() {
		return {
			restrict:'E',	scope:{ name:'=data' }, replace:true,
			template:"<div data-id='{{ name }}' class='interest'>{{ name }}</div>",
			controller:function($scope, $attrs) {
				$scope.semcls = $attrs.semcls;
			},
			link:function($scope, element, attrs) {
				$(element).mouseenter(function() {
					var h_el = this;
					$('.interest').not(h_el).addClass('interest-out')
						.removeClass('interest-sel');
					$(h_el).addClass('interest-sel');
					// find the hits

					var sel = $('.pub:not([data\-categories*="'+$scope.name+'"])');
					console.log(' sel ', sel);
					$('.pub:not([data\-categories*="'+$scope.name+'"])').addClass('interest-out');
				}).mouseleave(function() {
					var h_el = this;
					$('.interest').removeClass('interest-out').removeClass('interest-sel');
					$('.interest-out').removeClass('interest-out');
				});
			}			
		};
	})
	.directive('pub', function($compile) {
		return {
			restrict:'E',
			scope:{val:'=data'},
			templateUrl:"partials/pub.html",
			controller:function($scope) {
				$scope.show = {};
				$scope.catsjoined = ($scope.val.categories || []).join(";");
			}
		};
	});


			// link: function (scope, element, attrs) {
			// 	var template = 
			// 	var newElement = angular.element(template);
			// 	$compile(newElement)(scope);
			// 	element.replaceWith(newElement);
			// 	console.log('authors :: ', scope.val.authors);
			// }
