/*! Checkboxes 1.0.1
 *  Copyright (c) Gyrocode (www.gyrocode.com)
 *  License: MIT License
 */
(function(window,document,undefined){var factory=function($,DataTable){var Checkboxes=function(settings){if(!DataTable.versionCheck||!DataTable.versionCheck("1.10.0")){throw"DataTables Checkboxes requires DataTables 1.10.0 or newer";}this.s={dt:new DataTable.Api(settings),columns:[],data:{},ignoreSelect:false};if(this.s.dt.settings()[0].checkboxes){return;}settings.checkboxes=this;this._constructor();};Checkboxes.prototype={_constructor:function(){var self=this;var dt=self.s.dt;var ctx=dt.settings()[0];for(var i=0;i<ctx.aoColumns.length;i++){if(ctx.aoColumns[i].checkboxes){if(!$.isPlainObject(ctx.aoColumns[i].checkboxes)){ctx.aoColumns[i].checkboxes={};}ctx.aoColumns[i].checkboxes=$.extend({},Checkboxes.defaults,ctx.aoColumns[i].checkboxes);DataTable.ext.internal._fnApplyColumnDefs(ctx,[{"targets":i,"searchable":false,"orderable":false,"width":"1%","className":"dt-body-center","render":function(data,type,full,meta){if(type==="display"){data='<input type="checkbox">';}return data;}}],{},function(iCol,oDef){DataTable.ext.internal._fnColumnOptions(ctx,iCol,oDef);});$(dt.column(i).header()).removeClass("sorting");$(dt.column(i).header()).off(".dt");var cells=dt.cells("tr",i);cells.invalidate("data");$(cells.nodes()).addClass("dt-body-center");self.s.data[i]=[];self.s.columns.push(i);if(ctx.aoColumns[i].checkboxes.selectRow){$(dt.table().node()).addClass("checkboxes-select");}if(ctx.aoColumns[i].checkboxes.selectAll){$(dt.column(i).header()).html('<input type="checkbox">').addClass("checkboxes-select-all");}var $table=$(dt.table().node());$("tbody",$table).on("click",'input[type="checkbox"]',function(e){self.onClick(e,this);});if(ctx.aoColumns[i].checkboxes.selectRow){if(DataTable.select){$table.on("select.dt deselect.dt",function(e,api,type,indexes){self.onSelect(e,type,indexes);});}else{$("tbody",$table).on("click","td",function(){var $row=$(this).closest("tr");var e={type:($row.hasClass("selected")?"deselect":"select")};self.onSelect(e,"rows",[dt.row($row).index()]);$row.toggleClass("selected");});}}$table.on("draw.dt",function(e,ctx){self.onDraw(e,ctx);});$("thead",$table).on("click",'th.checkboxes-select-all input[type="checkbox"]',function(e){self.onClickSelectAll(e,this);});$("thead",$table).on("click","th.checkboxes-select-all",function(e){$('input[type="checkbox"]',this).trigger("click");});}}dt.columns.adjust().draw(false);},updateData:function(type,selector,isSelected){var self=this;var dt=self.s.dt;var ctx=dt.settings()[0];var nodes=[];if(type==="row"){dt.rows(selector).every(function(rowIdx){for(var colIdx=0;colIdx<ctx.aoColumns.length;colIdx++){if(ctx.aoColumns[colIdx].checkboxes&&ctx.aoColumns[colIdx].checkboxes.selectRow){nodes.push(dt.cell(rowIdx,colIdx).node());}}});}else{if(type==="cell"){nodes=dt.cells(selector).nodes();dt.cells(nodes).every(function(){var colIdx=this.index().column;var rowIdx=this.index().row;if(ctx.aoColumns[colIdx].checkboxes&&ctx.aoColumns[colIdx].checkboxes.selectRow){var columns=$.grep(self.s.columns,function(value){return value!=colIdx;});$.merge(nodes,dt.cells(rowIdx,columns).nodes());}});}}if(nodes.length){dt.cells(nodes).every(function(){var cellCol=this.index().column;if(ctx.aoColumns[cellCol].checkboxes){var cellData=this.data();var index=$.inArray(cellData,ctx.checkboxes.s.data[cellCol]);if(isSelected&&index===-1){ctx.checkboxes.s.data[cellCol].push(cellData);}else{if(!isSelected&&index!==-1){ctx.checkboxes.s.data[cellCol].splice(index,1);}}}});}},updateSelect:function(type,selector,isSelected){var self=this;var dt=self.s.dt;var ctx=dt.settings()[0];var nodes=[];if(type==="row"){nodes=dt.rows(selector).nodes();}else{if(type==="cell"){dt.cells(selector).every(function(){var colIdx=this.index().column;var rowIdx=this.index().row;if(ctx.aoColumns[colIdx].checkboxes&&ctx.aoColumns[colIdx].checkboxes.selectRow){nodes.push(dt.$(this.node()).closest("tr"));}});}}if(nodes.length){if(DataTable.select){self.s.ignoreSelect=true;if(isSelected){dt.rows(nodes).select();}else{dt.rows(nodes).deselect();}self.s.ignoreSelect=false;}else{if(isSelected){dt.$(nodes).addClass("selected");}else{dt.$(nodes).removeClass("selected");}}}},updateCheckbox:function(type,selector,isSelected){var self=this;var dt=self.s.dt;var ctx=dt.settings()[0];var nodes=[];if(type==="row"){dt.rows(selector).every(function(rowIdx){for(var colIdx=0;colIdx<ctx.aoColumns.length;colIdx++){if(ctx.aoColumns[colIdx].checkboxes&&ctx.aoColumns[colIdx].checkboxes.selectRow){nodes.push(dt.cell(rowIdx,colIdx).node());}}});}else{if(type==="cell"){nodes=dt.cells(selector).nodes();dt.cells(nodes).every(function(){var colIdx=this.index().column;var rowIdx=this.index().row;if(ctx.aoColumns[colIdx].checkboxes&&ctx.aoColumns[colIdx].checkboxes.selectRow){var columns=$.grep(self.s.columns,function(value){return value!=colIdx;});$.merge(nodes,dt.cells(rowIdx,columns).nodes());}});}}if(nodes.length){dt.$(nodes).find('input[type="checkbox"]').prop("checked",isSelected);}},onClick:function(e,ctrl){var self=this;var dt=self.s.dt;var ctx=dt.settings()[0];var $cell=$(ctrl).closest("td");var cell=dt.cell($cell);var cellCol=cell.index().column;var cellData=cell.data();if(ctx.aoColumns[cellCol].checkboxes){self.updateCheckbox("cell",$cell,ctrl.checked);self.updateData("cell",$cell,ctrl.checked);self.updateSelect("cell",$cell,ctrl.checked);self.updateSelectAll();e.stopPropagation();}},onSelect:function(e,type,indexes){var self=this;var dt=self.s.dt;var ctx=dt.settings()[0];if(self.s.ignoreSelect){return;}if(type==="row"){self.updateCheckbox("row",indexes,(e.type==="select")?true:false);self.updateData("row",indexes,(e.type==="select")?true:false);self.updateSelectAll();}},onClickSelectAll:function(e,ctrl){var self=this;var dt=self.s.dt;var ctx=dt.settings()[0];var col=dt.column($(ctrl).closest("th")).index();var cells=dt.cells("tr",col,{page:((ctx.aoColumns[col].checkboxes&&ctx.aoColumns[col].checkboxes.selectAllPages)?"all":"current"),search:"applied"});self.updateData("cell",cells.nodes(),ctrl.checked);self.updateCheckbox("cell",cells.nodes(),ctrl.checked);if(ctx.aoColumns[col].checkboxes.selectRow){var rows=dt.rows({page:((ctx.aoColumns[col].checkboxes&&ctx.aoColumns[col].checkboxes.selectAllPages)?"all":"current"),search:"applied"});self.updateSelect("row",rows.nodes(),ctrl.checked);}self.updateSelectAll();e.stopPropagation();},onDraw:function(e,ctx){var self=this;var dt=self.s.dt;ctx=dt.settings()[0];var rows_seen={};dt.cells("tr",self.s.columns,{page:"current",search:"applied"}).every(function(){var cellColIdx=this.index().column;var cellRowIdx=this.index().row;var cellData=this.data();var index=$.inArray(cellData,ctx.checkboxes.s.data[cellColIdx]);if(index!==-1){if(!rows_seen.hasOwnProperty(cellRowIdx)){self.updateCheckbox("cell",this.node(),true);self.updateSelect("cell",this.node(),true);if(ctx.aoColumns[cellColIdx].checkboxes&&ctx.aoColumns[cellColIdx].checkboxes.selectRow){rows_seen[cellRowIdx]=true;}}}});self.updateSelectAll();},updateSelectAll:function(){var self=this;var dt=self.s.dt;var ctx=dt.settings()[0];for(var colIdx=0;colIdx<ctx.aoColumns.length;colIdx++){if(ctx.aoColumns[colIdx].checkboxes&&ctx.aoColumns[colIdx].checkboxes.selectAll){var cells=dt.cells("tr",colIdx,{page:((ctx.aoColumns[colIdx].checkboxes.selectAllPages)?"all":"current"),search:"applied"});var $table=dt.table().container();var $chkbox_all=dt.$(cells.nodes()).find('input[type="checkbox"]');var $chkbox_checked=dt.$(cells.nodes()).find('input[type="checkbox"]:checked');var chkbox_select_all=$('input[type="checkbox"]',dt.column(colIdx).header()).get(0);if($chkbox_checked.length===0){chkbox_select_all.checked=false;if("indeterminate" in chkbox_select_all){chkbox_select_all.indeterminate=false;}}else{if($chkbox_checked.length===$chkbox_all.length){chkbox_select_all.checked=true;if("indeterminate" in chkbox_select_all){chkbox_select_all.indeterminate=false;}}else{chkbox_select_all.checked=true;if("indeterminate" in chkbox_select_all){chkbox_select_all.indeterminate=true;}}}}}}};Checkboxes.defaults={selectRow:false,selectAll:true,selectAllPages:true};var Api=$.fn.dataTable.Api;Api.register("checkboxes()",function(){return this;});Api.registerPlural("columns().checkboxes.select()","column().checkboxes.select()",function(select){if(typeof select==="undefined"){select=true;}return this.iterator("column",function(ctx,colIdx){if(ctx.checkboxes){var selector=this.cells("tr",colIdx).nodes();ctx.checkboxes.updateCheckbox("cell",selector,(select)?true:false);ctx.checkboxes.updateData("cell",selector,(select)?true:false);ctx.checkboxes.updateSelect("cell",selector,(select)?true:false);ctx.checkboxes.updateSelectAll();}},1);});Api.registerPlural("cells().checkboxes.select()","cell().checkboxes.select()",function(select){if(typeof select==="undefined"){select=true;}return this.iterator("cell",function(ctx,rowIdx,colIdx){if(ctx.checkboxes){var selector={row:rowIdx,column:colIdx};ctx.checkboxes.updateCheckbox("cell",selector,(select)?true:false);ctx.checkboxes.updateData("cell",selector,(select)?true:false);ctx.checkboxes.updateSelect("cell",selector,(select)?true:false);ctx.checkboxes.updateSelectAll();}},1);});Api.registerPlural("columns().checkboxes.deselect()","column().checkboxes.deselect()",function(){return this.checkboxes.select(false);});Api.registerPlural("cells().checkboxes.deselect()","cell().checkboxes.deselect()",function(){return this.checkboxes.select(false);});Api.registerPlural("columns().checkboxes.selected()","column().checkboxes.selected()",function(){return this.iterator("column",function(ctx,colIdx){if(ctx.aoColumns[colIdx].checkboxes){return ctx.checkboxes.s.data[colIdx];}},1);});Checkboxes.version="1.0.0";$.fn.DataTable.Checkboxes=Checkboxes;$.fn.dataTable.Checkboxes=Checkboxes;$(document).on("preInit.dt.dtr",function(e,settings,json){if(e.namespace!=="dt"){return;}new Checkboxes(settings);});return Checkboxes;};if(typeof define==="function"&&define.amd){define(["jquery","datatables"],factory);}else{if(typeof exports==="object"){factory(require("jquery"),require("datatables"));}else{if(jQuery&&!jQuery.fn.dataTable.Checkboxes){factory(jQuery,jQuery.fn.dataTable);}}}})(window,document);