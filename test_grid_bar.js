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

  	var menu = new Menu({ id: "mainMenu" });
 	
 	for(var i = 1; i < 10; i++){
		menu.addChild( new MenuItem({
			label: "Menu" + i
		}) );
 	}
	 
	// menu.addChild( new MenuItem({
			// label: "View"
	// }) );
// 	 
	// menu.addChild( new MenuItem({
			// label: "Task"
	// }) );
	
	var dropDownButton = new DropDownButton({
		label: "Do Something",
		dropDown: menu
	});
	
	// menu.startup();
	// comboBtn.startup();
	
	var grid1Toolbar = new Toolbar({});
	grid1Toolbar.addChild(dropDownButton);
	
	grid1Toolbar.addChild(new Button({
		label: 'cut',
		showLabel:false,
		iconClass:"dijitEditorIcon dijitEditorIconCut",
		onClick: function(){
			alert('cut');
		}
	}));
	grid1Toolbar.addChild(new Button({
		label: 'copy',
		iconClass:"dijitEditorIcon dijitEditorIconCopy",
		showLabel: false,
		onClick: function(){
			alert('copy');
		}
	}));
	grid1Toolbar.addChild(new Button({
		label: 'paste',
		iconClass:"dijitEditorIcon dijitEditorIconPaste",
		showLabel: false,
		onClick: function(){
			alert('paste');
		}
	}));
	grid1Toolbar.addChild(new ToggleButton({
		label: 'Bold',
		iconClass:"dijitEditorIcon dijitEditorIconBold",
		showLabel: false,
		onClick: function(){
			alert('bold');
		}
	}));

	grid1Top = [
		grid1Toolbar,
		{pluginClass: QuickFilter, 'className': 'quickFilter'}
	];

	// grid2Bottom = [
		// [
			// {pluginClass: Summary, rowSpan: 2},
			// {pluginClass: LinkSizer, style: 'text-align: center;', colSpan: 2}
		// ],
		// [
			// {pluginClass: DropDownPager, style: 'text-align: center;'},
			// 'gridx/support/DropDownSizer',
			// GotoPageButton
		// ]
	// ];
// 
	// grid3Top = [
		// [
			// {plugin: 'grid3Toolbar', colSpan: 2},
			// {pluginClass: QuickFilter, 'className': 'quickFilter'}
		// ],
		// [
			// {pluginClass: LinkPager, 'className': 'linkPager'},
			// {content: 'Grid Bar Test', style: 'text-align: center; font-size: 15px; font-weight: bolder; text-shadow: 1px 1px 1px #fff;'},
			// null
		// ]
	// ];
// 
	// grid3Bottom = [
		// [
			// {pluginClass: Summary, rowSpan: 2},
			// {pluginClass: LinkSizer, style: 'text-align: center;', colSpan: 2}
		// ],
		// [
			// {pluginClass: DropDownPager, style: 'text-align: center;'},
			// 'gridx/support/DropDownSizer',
			// GotoPageButton
		// ]
	// ];

	parser.parse();
});
