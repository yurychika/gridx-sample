require([
	'dojo/parser',
	'gridx/Grid',
	'gridx/core/model/cache/Sync',
	'gridx/tests/support/data/MusicData',
	'gridx/tests/support/stores/Memory',
	'gridx/modules/HeaderRegions',
	'gridx/allModules',
	'gridx/support/Summary',
	'gridx/support/LinkPager',
	'gridx/support/LinkSizer',
	'gridx/support/DropDownPager',
	'gridx/support/DropDownSizer',
	'gridx/support/GotoPageButton',
	'gridx/support/QuickFilter',
	'dojo/_base/array',
	'dojo/dom-construct',
	'dijit/Toolbar',
	'dijit/form/Button',
	'dijit/form/ToggleButton',
	"dijit/form/DropDownButton",
	"dijit/Menu",
	"dijit/MenuItem",
	'dojo/domReady!'
], function(parser, Grid, Cache, dataSource, storeFactory, HeaderRegions, modules,
	Summary, LinkPager, LinkSizer, DropDownPager, DropDownSizer, GotoPageButton, QuickFilter, array, domConstruct,
	Toolbar, Button, ToggleButton, DropDownButton, Menu, MenuItem){
	
	window.doSearch = false;
	
	window.tableSearch = function(){
		window.keyword = document.getElementById('keyword').value;
		window.doSearch = true;
		
		grid1.body.refresh();
	}
	
	window.clearSearch = function(){
		window.doSearch = false;
		grid1.body.refresh();
	}
	
	mods = [
		modules.ExtendedSelectRow,
		modules.Pagination,
		// modules.HeaderRegions,
		HeaderRegions,
		modules.Filter,
		modules.FilterBar,
		modules.Bar
	];

	store = storeFactory({
		dataSource: dataSource,
		size: 100
	});

	layout = dataSource.layouts[1];

	parser.parse().then(function(){
		var callback = function(){
			grid1.headerRegions.refresh(1);
			grid1.header.refresh();

			var cols = getFilteredColumns(grid1),
				found = false;
			for(var i = 0; i < cols.length; i++){
				if(cols[i]){
					var headerNode = dojo.query('[colid=' + cols[i] + '][role=columnheader]')[0];

					if(headerNode){
						var a = document.createElement('a');
						a.innerHTML = 'filter';
						a.href = '#';
						a.onclick = function(){
							grid1.filterBar.showFilterDialog();
						}
						headerNode.appendChild(a);
					}
				}
			}
		};
		dojo.connect(grid1.filter, 'setFilter', callback);
		dojo.connect(grid1.filter, 'clearFilter', callback);
		// var hr = grid1.headerRegions;
		// hr.add(function(col){
		// 	if(!found) return null;
		// 	return domConstruct.create('div', {
		// 		innerHTML: 'filter',
		// 		style: 'height: 13px; background-color: red;'
		// 	});
		// }, 0, 0);
	});

	function getFilteredColumns(grid){
		if(!grid) return;

		if(!grid.filterBar.filterData) return [];

		return array.map(grid.filterBar.filterData.conditions, function(cond){
			return cond.colId;
		})
	}
});
