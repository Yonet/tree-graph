'use strict';

/*global d3*/

/**
 * @ngdoc directive
 * @name app.directive:circularTree
 * @description
 * # circularTree
 */
angular.module('yon.tree-directive', [])
	.directive('yonTree', [function () {

		

		// var tree = d3.layout.tree()
		// 	.size([360, diameter / 2 -120])
		// 	.separation(function(a,b) { console.log('a.parent',a.parent, a.depth);return (a.parent === b.parent ? 1 : 2) / a.depth; });

		// var diagonal = d3.svg.diagonal.radial()
		// 	.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
		

		var diagonal = d3.svg.diagonal()
    		.projection(function(d) { return [d.y, d.x]; });

		var postLink = function (scope, element, attrs) {

			var el = element[0];
			var parentWidth = el.parentElement.clientWidth;
			var parentHeight = el.parentElement.clientHeight;
			var width = +attrs.width || parentWidth || 960,
				height = +attrs.height || parentHeight || 2200;

			var cluster = d3.layout.cluster()
		    	.size([height, width - 160]);
			
			var data = scope.data;

			var svg = d3.select(el).append('svg')
				.attr({
					'width': width, 
					'height': height
				})
				.append('g')
				.attr('transform', 'translate(40, 0)');
				
			
			var update = function() {
				console.log('updating');
				if(!scope.data) { return; }
				var data = scope.data;
				console.log('updating data', data);
				var nodes = cluster.nodes(data);
				var links = cluster.links(nodes);

				var link = svg.selectAll('.link')
					.data(links)
					.enter().append('path')
					.attr({
						'class': 'link',
						'd': diagonal
					});

				var node = svg.selectAll('.node')
					.data(nodes)
					.enter().append('g')
					.attr({
						'class': 'node',
						'transform': function(d) { return "translate(" + d.y + "," + d.x + ")"; }
					});

				node.append('cicle')
					.attr({
						'r': 4.5
					});

				node.append('text')
					.attr({
						'dx': function(d) { return d.children ? -8 : 8; },
						'dy': 3,	
						'tex-anchor': function(d) { return d.children ? "end" : "start"; }
					})
					.text(function(d) { return d.name; });

			};

			if(data) { update(); }
			scope.$watch('data', update);


		};
		return {
			restrict: 'E',
			scope: {
				data: '=',
				width: '@',
				height:  '@'
			},
			link: postLink
		};
	}]);
