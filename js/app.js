data = data || {};
var videoList, map, listElement, video;

$(function() {
	listElement = $('#video-list .list');
	video = $('#video');
	
	initList();
	initMap();
});

function initMap() {
	map = AmCharts.makeChart("map", {
		type: "map",
		dataProvider: {
			map: "worldIndiaHigh",
			getAreasFromMap: true
		},
		areasSettings: {
			autoZoom: true,
			selectedColor: "#CC0000",
			color: "#D1D96A"
		},
		smallMap: {}
	});
	
	map.addListener("clickMapObject", function (event) {
		udateVideo(event.mapObject.id);
	});
}

function initList() {
	// populate list
	listElement.html('');
	for(country in data) {
		listElement.append('<li onClick="countryClick(\''+ country +'\')"><span class="country">' + data[country].name + '</span></li>');
	}
	
	// list filter
	videoList = new List('video-list', {valueNames: ['country']});
}


function countryClick(countryCode) {
	// Select area in map
	if ( '' == countryCode ) {
        map.clickMapObject(map.dataProvider);
    }
    else {
        map.clickMapObject(map.getObjectById(countryCode));
    }
	udateVideo(countryCode);
}

function udateVideo(countryCode) {
	if(data.hasOwnProperty(countryCode)) {
		video.removeClass('no');
		video.html('<iframe src="' + data[countryCode].youtube + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
	} else {
		video.addClass('no');
		video.html('');
	}
}
