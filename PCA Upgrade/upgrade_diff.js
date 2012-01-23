$(function(){

var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
var year = currentTime.getFullYear();
var date = day+"/"+month+"/"+year;

style_controls = "'  position:absolute; top:0px; right:0px;'";
style_output = "  ' '  ";
style_report = "  'position:fixed; height:100%; width:100%; background-color:white; z-index:999; display:none;'  ";
controls = "<div id='controls' style="+style_controls+">Comparing:<span id='label'></span><input id='date' type='text' value='"+date+"' /><button id='start'>start</button><button id='compare'>compare</button><button id='report'>report </button></div>";
output = "<table class='output'><tr><td>Not Back Online</td><td>New Online</td></tr></table>";
report = "<div id='report_table' style="+style_report+"><h3 id='close_report'>close</h3><table id='report_data'></table></div>";
$("#DataTableNoBorder").addClass("output");
$('#manageSequencers-content').css("position","relative").append(controls);
$("body").prepend(report);

	var online = [];
	var offline = [];
	var online2 = [];
	var offline2 = [];
	
	$("#start").click(function(){
		
		$("[id^=seqRow]").each(function(){
			if ($(this).attr("data-seqstatus")=="Connection Established"){
				online.push($(this).attr("data-seqname"));
			}else{
				offline.push($(this).attr("data-seqname"));
			}
		});
		localStorage.setItem($("#date").val(), online);
		localStorage.setItem($("#date").val()+"date", new Date());
	});
	
	$("#compare").click(function(){
		online2 = [];
		offline2 = [];
		
		$("[id^=seqRow]").each(function(){
			if ($(this).attr("data-seqstatus")=="Connection Established"){
				online2.push($(this).attr("data-seqname"));
			}else{
				offline2.push($(this).attr("data-seqname"));
			}
		});
		var diff = new Array();
		var fresh = new Array();
		var online = localStorage.getItem($("#date").val()).split(",");
		
		
		diff = $.grep(online,function (diff) {
			return $.inArray(diff, online2) < 0;
		});
		
		fresh = $.grep(online2,function (fresh) {
			return $.inArray(fresh, online) < 0;
		});
		
		var rows = 0;
		table_rows = "";
		
		if (diff.length > fresh.length){
			rows = diff.length;
		}else{
			rows = fresh.length;
		}

		for (x=0;x<=rows; x++){
			diff_item = "";
			fresh_item = "";
			if(x<diff.length){
				diff_item = diff[x];
			}
			if(x<fresh.length){
				fresh_item = fresh[x];
			}
			table_rows += "<tr><td>"+diff_item+"</td><td>"+fresh_item+"</td></tr>";
		}
		
	
		$(".output").html("<tr><td>Not Back Online</td><td>New Online</td></tr>"+table_rows);
		
	});
	
	$("#report").click(function(){
		started = localStorage.getItem($("#date").val()+"date").split(",");
		$("#report_table").css("display","");
		$("#report_data").html("<tr><td>Upgrade Initiated @ "+started+"</td></tr>");
	});
	
	$("#close_report").click(function(){
		$("#report_table").css("display","none");
	});
	 

});