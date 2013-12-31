require([
	'dojo/parser',
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
	'dojo/_base/array',
	'dijit/Toolbar',
	'dijit/form/Button',
	'dijit/form/ToggleButton',
	"dijit/form/DropDownButton",
	"dijit/Menu",
	"dijit/MenuItem",
	'dojo/domReady!'
], function(parser, Grid, Cache, dataSource, storeFactory, modules,
	Summary, LinkPager, LinkSizer, DropDownPager, DropDownSizer, GotoPageButton, QuickFilter, array,
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
		modules.Filter,
		modules.Bar
	];

	store = storeFactory({
		dataSource: dataSource,
		size: 100
	});

	layout = dataSource.layouts[1];

	var grid1Toolbar = new Toolbar({});
	grid1Toolbar.addChild(new Button({
		label: 'Table Refresh',
		showLabel: true,
		onClick: function(){
			grid1.body.refresh().then(function(){
				alert('body refreshed');
			})
		}
	}));

	grid1Top = [
		grid1Toolbar,
		{pluginClass: QuickFilter, 'className': 'quickFilter'}
	];

	parser.parse().then(function(){
		dojo.connect(grid1.body, 'onAfterRow', function(row){
			if(!window.doSearch){return;}
			console.log('in on after row');
			console.log(row.node());
			var cells  =dojo.query('td.gridxCell', row.node());
			array.forEach(cells, function(cell){
				var html = cell.innerHTML;
				html = html.replace(new RegExp(window.keyword, 'g'), '<span class="highlight">' + window.keyword + '</span>');
				cell.innerHTML = html;
			})
		})
		
		
	});
});
