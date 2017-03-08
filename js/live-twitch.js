$(document).ready(function() {
	var streamers = [
		"freecodecamp", 
		"storbeck", 
		"terakilobyte", 
		"habathcx",
		"RobotCaleb",
		"thomasballinger",
		"noobs2ninjas",
		"beohoff",
		"trumpsc",
		"reynad27",
		"nl_kripp", 
		"brunofin"];

	for (var i in streamers) {
		checkUserExists(streamers[i]);
	}
});

var CLIENT_ID = /* API Key goes here */;

function checkUserExists(streamer) {
	var twitchUsersUrl = "https://api.twitch.tv/kraken/users/";
	twitchApiCallUrl = twitchUsersUrl + streamer;
	$.ajax({
		type: 'GET',
		url: twitchApiCallUrl,
		headers: {
			'Client-ID': CLIENT_ID
		},
		error: function() {
			$(".deleted-streamers").append("<div class='deleted'><img src='http://www.clker.com/cliparts/e/0/f/4/12428125621652493290X_mark_18x18_02.svg.hi.png'><h3>"+streamer+"</h3> <p>" + "Account deleted</p></div>");
		},
		success: function(data) {
			console.log(data);
			checkStreamStatus(data.name, data.logo);
		}
	});
}

function checkStreamStatus(streamer, logo) {
	var twitchStreamsUrl = "https://api.twitch.tv/kraken/streams/";
	twitchApiCallUrl = twitchStreamsUrl + streamer;
	$.ajax({
		type: 'GET',
		url: twitchApiCallUrl,
		headers: {
			'Client-ID': CLIENT_ID
		},		
    error: function() {
			alert('error');
    },
    success: function(data) {
			var streamerName = data._links.self.replace("https://api.twitch.tv/kraken/streams/",'');
			if (data.stream) {
				$(".online-streamers").append("<a href='https://www.twitch.tv/" + streamerName + "' target=_blank>" + "<div class='online'><img src='" + logo +"'><h3>" + streamerName + "</h3> <p>" + data.stream.game + "</p></div></a>");			
			} else {
				if (logo) {
					$(".offline-streamers").append("<a href='https://www.twitch.tv/" + streamerName + "' target=_blank>" + "<div class='offline'><img src='" + logo +"'><h3>" + streamerName + "</h3> <p>Offline</p></div></a>");
				} else {
					$(".offline-streamers").append("<a href='https://www.twitch.tv/" + streamerName + "' target=_blank>" + "<div class='offline'><img src='https://4.bp.blogspot.com/-I_ZACOQgBKE/VThVHAIcMZI/AAAAAAAACSQ/25v8sn38I08/s1600/twitch%2Bnot%2Bloading%2Blogo.png'><h3>" + streamerName + "</h3> <p>Offline</p></div></a>");
				}
			}
    }       
	});
}
