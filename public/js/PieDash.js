var colors = ['rgba(239,6,0,.5)','rgba(239,199,0,.5)','rgba(42,1,164,.5)','rgba(0,188,12,.5)','rgba(169,227,0,.5)','rgba(1,67,157,.5)','rgba(239,149,0,.5)','rgba(178,0,129,.5)'];

/* set up data - copied from Excel*/
var keys = [
	{key: 'name', caption: 'Name', grouping: false},
	{key: 'gender', caption: 'Gender', grouping: true},
	{key: 'association', caption: 'Association', grouping: true},
	{key: 'relationship', caption: 'In a relationship', grouping: true},
	{key: 'attending', caption: 'Attending', grouping: true},
	{key: 'rsvp', caption: 'Sent RSVP', grouping: true},
	{key: 'oot', caption: 'Out of towner', grouping: true},
	{key: 'hasp1', caption: 'Has a plus-1', grouping: true},
	{key: 'isp1', caption: 'Is a plus-1', grouping: true},
	{key: 'meal', caption: 'Meal choice', grouping: true}
];

var data= [
	{name: 'Jane Doe', gender: 'F', association: 'Bride', relationship: 'Yes', attending: 'Yes', rsvp: 'Yes', oot: 'No', hasp1: 'Yes', isp1: 'No', meal: 'Chicken'},
	{name: 'Jane Doe', gender: 'F', association: 'Bride', relationship: 'No', attending: 'Yes', rsvp: 'Yes', oot: 'No', hasp1: 'Yes', isp1: 'No', meal: 'Beef'},
	{name: 'Jane Doe', gender: 'F', association: 'Groom', relationship: 'Yes', attending: 'Yes', rsvp: 'Yes', oot: 'Yes', hasp1: 'No', isp1: 'No', meal: 'Beef'},
	{name: 'John Doe', gender: 'M', association: 'Groom', relationship: 'Yes', attending: 'Yes', rsvp: 'Yes', oot: 'Yes', hasp1: 'No', isp1: 'No', meal: 'Chicken'},
	{name: 'John Doe', gender: 'M', association: 'Groom', relationship: 'Yes', attending: 'Yes', rsvp: 'Yes', oot: 'Yes', hasp1: 'Yes', isp1: 'No', meal: 'Vegetarian'},
	{name: 'John Doe', gender: 'M', association: 'Friend', relationship: 'Yes', attending: 'Unknown', rsvp: 'No', oot: 'Yes', hasp1: 'Yes', isp1: 'No', meal: 'Chicken'},
	{name: 'Jane Doe', gender: 'F', association: 'Friend', relationship: 'Yes', attending: 'Unknown', rsvp: 'No', oot: 'Yes', hasp1: 'No', isp1: 'Yes', meal: 'Chicken'},
	{name: 'John Doe', gender: 'M', association: 'Friend', relationship: 'Yes', attending: 'Unknown', rsvp: 'No', oot: 'No', hasp1: 'Yes', isp1: 'No', meal: 'Beef'},
	{name: 'Jane Doe', gender: 'F', association: 'Friend', relationship: 'No', attending: 'Yes', rsvp: 'Yes', oot: 'No', hasp1: 'Yes', isp1: 'No', meal: 'Chicken'}
];

init('charts',4);

function init(container_id, num_charts) {
	var size = $('#' + container_id).width()/num_charts;
	var grouping_key_id = 0;
	for (var i = 0; i < num_charts; i++) {
	
		grouping_key_id = get_next_grouping_key_index(grouping_key_id%keys.length);
	
		$('#' + container_id).append('<div id="chart' + i + '" style="float:left"><canvas id="chart' + i + '_canvas" height="' + size + '" width="' + size + '"></canvas></div>');
	
		$('#chart' + i).prepend('<div class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span id="chart' + i + '_label">' + keys[grouping_key_id].caption + '</span><b class="caret"></b></a><ul id="chart' + i + '_dropdown" class="dropdown-menu"></ul></div>');
		for (var j = 0; j < keys.length; j++) {
			if (keys[j].grouping)
				$('#chart' + i + '_dropdown').append('<li><a href="#" onclick="create_chart(' + i + ', ' + j + ')">' + keys[j].caption + '</a></li>');
		}

		create_chart(i, grouping_key_id);			
		
		grouping_key_id++;
	}
}

function create_chart(chart_id, grouping_key_id) {
	new Chart($('#chart' + chart_id + '_canvas')[0].getContext('2d')).Pie(get_chart_data(keys[grouping_key_id].key),{labelFontColor: '#000', labelFontSize: "16"});
	$('#chart' + chart_id + '_label').text(keys[grouping_key_id].caption);
}

function get_chart_data(grouping) {
	var chart_data = [];
	var counts = {};
	for (var i = 0; i < data.length; i++) {
		if (!counts[data[i][grouping]])
			counts[data[i][grouping]] = 1;
		else
			counts[data[i][grouping]]++;
	}
	for (var i = 0; i < Object.keys(counts).length; i++) {
		Object.keys(counts)[i];
		counts[Object.keys(counts)[i]];
		chart_data.push({value: counts[Object.keys(counts)[i]], color: colors[i%colors.length], label: Object.keys(counts)[i]});
	}
	return chart_data;
}

function get_next_grouping_key_index(index) {
	if (keys[index].grouping) {
		return index;
	} else {
		return get_next_grouping_key_index((index+1)%keys.length);
	}
}

$('#guests_table').append('<tr>' + $.map(keys, function(n) { return '<th>' + n.caption + '</th>'; }).join('') + '</tr>');
$('#guests_table').append($.map(data, function(data) { return '<tr>' + $.map(keys, function(key) { return '<td>' + data[key.key] + '</td>'; }).join('') + '</tr>'; }).join(''));