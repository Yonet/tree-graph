# Angular D3 Tree Graph

A customizable angular d3.js tree graph directive, based on Mike Bostock's [Cluster Dendrogram](http://bl.ocks.org/mbostock/4063570) example.

## Usage

* Include d3-tree.js.
* Add 'yon.tree-directive' as a dependency to your app.
* Make <yon-tree>s.

## Bower

Installable via bower:

```bash
bower install Yonet/tree-graph
```

## Example
See the [tree-graph-example repo](https://github.com/Yonet/tree-graph-example) for an usage example.

```html
<div ng-app="app">
  <div ng-controller="MainController">
	   <yon-tree
			  data="exampleData"
				width="900"
				height="2000"
			>
			</yon-tree>
	</div>
</div>
```

## Credits
yon-tree is based on Mike Bostock's [Cluster Dendrogram](http://bl.ocks.org/mbostock/4063570) example. 

## License
MIT

