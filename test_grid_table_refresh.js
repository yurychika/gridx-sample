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
	'dijit/Toolbar',
	'dijit/form/Button',
	'dijit/form/ToggleButton',
	"dijit/form/DropDownButton",
	"dijit/Menu",
	"dijit/MenuItem",
	'dojo/domReady!'
], function(parser, Grid, Cache, dataSource, storeFactory, modules,
	Summary, LinkPager, LinkSizer, DropDownPager, DropDownSizer, GotoPageButton, QuickFilter,
	Toolbar, Button, ToggleButton, DropDownButton, Menu, MenuItem){

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

	parser.parse();
});
