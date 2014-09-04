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
	var showStatus = true;
	
	window.tableSearch = function(){
		window.keyword = document.getElementById('keyword').value;
		window.doSearch = true;
		
		grid.body.refresh();
	}
	
	window.clearSearch = function(){
		window.doSearch = false;
		grid.body.refresh();
	}

	window.filterLinkClickHandler = function(){
		grid.filterBar.showFilterDialog();
	};

	window.toggleFilterLink = function(){
		if(showStatus){
			dojo.query('.filterLink').addClass('hidden');
		}else{
			dojo.query('.filterLink').removeClass('hidden');
		}
		showStatus = !showStatus;
	};
	
	mods = [
		modules.ExtendedSelectRow,
		modules.Pagination,
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
		for(var k in grid._columnsById){
				grid._columnsById[k].headerFormatter = function(col){
				var filteredColumns = getFilteredColumns(grid);
				if(filteredColumns.indexOf(col.id) >= 0){
					var condition = getConditionById(col.id)
					return col.name + '<br>' + 
						'<a href="#" class="filterLink" onclick="filterLinkClickHandler()">' + 
						grid.filterBar._getRuleString(condition.condition, condition.value, condition.type);
						+ '</a>';
				}
				return col.name + '<br>' + '<a href="#" class="filterLink" onclick="filterLinkClickHandler()">filter</a>';
			}
		}
		grid.header.refresh();

		var callback = function(){
		// 	grid.headerRegions.refresh(1);
			grid.header.refresh();

		// 	var cols = getFilteredColumns(grid),
		// 		found = false;
		// 	for(var i = 0; i < cols.length; i++){
		// 		if(cols[i]){
		// 			var headerNode = dojo.query('[colid=' + cols[i] + '][role=columnheader]')[0];

		// 			if(headerNode){
		// 				var a = document.createElement('a');
		// 				a.innerHTML = 'filter';
		// 				a.href = '#';
		// 				a.onclick = function(){
		// 					grid.filterBar.showFilterDialog();
		// 				}
		// 				headerNode.appendChild(a);
		// 			}
		// 		}
		// 	}
		};
		dojo.connect(grid.filter, 'setFilter', callback);
		dojo.connect(grid.filter, 'clearFilter', callback);
	});

	function getConditionById(colId){
		var filterData = grid.filterBar.filterData;
			conditions = filterData && filterData.conditions;
		if(!conditions) return;

		var temp;
		for(var i = 0; i < conditions.length; i++){
			temp = conditions[i];

			if(temp.colId == colId)
				return temp;
		}

		return null;
	}

	function getFilteredColumns(grid){
		if(!grid) return;

		if(!grid.filterBar.filterData) return [];

		return array.map(grid.filterBar.filterData.conditions, function(cond){
			return cond.colId;
		})
	}
});
