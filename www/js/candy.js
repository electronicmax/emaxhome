
angular
	.module('emax')
    .directive('candy', function() {
		return {
			restrict:'E',
			replace:true,
			scope:{val:'=data'},
			template:"<svg class='candy'></svg>'"
			link:function() {
			}
		};
	});
