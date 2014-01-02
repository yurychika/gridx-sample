require([
	'dojo/parser',
	'dojo/_base/array',
	'dojo/string',
	'gridx/Grid',
	'gridx/core/model/cache/Sync',
	'gridx/tests/support/data/MusicData',
	'gridx/tests/support/stores/Memory',
	'gridx/allModules',
	'gridx/support/Summary',
	'gridx/support/LinkPager',
	'gridx/support/LinkSizer',
	'gridx/support/DropDownPager',
	'gridx/support/DropDownSizer',
	'gridx/support/GotoPageButton',
	'gridx/support/QuickFilter',
	'dijit/Toolbar',
	'dijit/form/Button',
	'dijit/form/ToggleButton',
	"dijit/form/DropDownButton",
	"dijit/Menu",
	"dijit/MenuItem",
	'dojo/domReady!'
], function(parser, array, string, Grid, Cache, dataSource, storeFactory, modules,
	Summary, LinkPager, LinkSizer, DropDownPager, DropDownSizer, GotoPageButton, QuickFilter,
	Toolbar, Button, ToggleButton, DropDownButton, Menu, MenuItem){

	mods = [
		modules.ExtendedSelectRow,
		modules.IndirectSelect,
		modules.RowHeader,
		modules.Pagination,
		modules.Filter,
		modules.FilterBar,
		modules.Bar,
		modules.SummaryBar
	];

	store = storeFactory({
		dataSource: dataSource,
		size: 100
	});

	layout = dataSource.layouts[1];

	grid = new Grid({
		cache: Cache,
		store: store,
		structure: layout,
		modules: mods
	});

	// grid.getSummaryMessage = function(){
		// var tpls = [
			// grid.nls.summaryRange,
			// grid.nls.summaryTotal,
			// grid.nls.summarySelected,
			// grid.nls.filterBarMsgHasFilterTemplate
		// ].join(' ');
		// var count = tpls.match(/\${\d+}/g).length;
// 		
		// tpls = tpls.replace(/\${\d+}/g, '${dd}');
		// for(var i = 0; i < count; i++){
			// tpls = tpls.replace('${dd}', '${' + i + '}');
		// }
		// return '';
	// }

	
	var summaryClass = null;
	var summary = null;
	array.forEach(grid.bar.defs, function(item){
		if(item.hookName === "summary"){
			summaryClass = item.pluginClass;
		}
	});
	
	grid.bar._forEachPlugin(function(plugin){
		if(plugin.constructor === summaryClass){
			summary = plugin;
		}
	})

	console.log('refresh plugin is');
	console.log(summary);	
	dojo.connect(summary, 'refresh', summary, function(){
		// console.log('in summary refresh');
		var _currentSize = grid.model.size();
		var _totalSize = grid.model._cache.totalSize >= 0 ? grid.model._cache.totalSize : grid.model._cache.size();
		// this.domNode.innerHTML += string.substitute(grid.nls.filterBarMsgHasFilterTemplate, [_currentSize, _totalSize, grid.nls.defaultItemsName])
		
		this.domNode.innerHTML += " Filter: " + string.substitute(grid.nls.filterBarMsgHasFilterTemplate, [_currentSize, _totalSize, grid.nls.defaultItemsName]);

		console.log(_currentSize, _totalSize, grid.nls.filterBarMsgHasFilterTemplate);
	});
	
	summary.refresh();
	grid.startup();
	grid.placeAt('gridContainer');
	
});
