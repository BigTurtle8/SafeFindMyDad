var milkPrices;
let map;
let service;
let geocoder

function initMap() {
	if (document.getElementById("location").value === "") {
		document.getElementById("location").style.background = "red";
		window.alert("Please fill in all fields");
		console.log("bad");
		return;
	}
	
	document.getElementById("location").style.background = "white";
	geocoder = new google.maps.Geocoder();
	
	let geoRequest = {address: document.getElementById("location").value};
	let geoResponse = geocoder
		.geocode(geoRequest)
		.then((response) => {
			if (response.results[0]) {
				//console.log("found");
				//console.log(response.results[0]);
				//console.log(response.results[0].geometry.location);
				let latlng = response.results[0].geometry.location;
				map = new google.maps.Map(document.getElementById("map"), {
					zoom: 13,
					center: latlng
				});
				
				let marker = new google.maps.Marker({
					position: latlng,
					map: map
				});
				
				let infowindow = new google.maps.InfoWindow();
				infowindow.setContent("Dad Last Seen Here");
				infowindow.open(map, marker);
				
				service = new google.maps.places.PlacesService(map);
				
				let nearRequest = {
					location: latlng,
					radius: '10000',
					type: ['supermarket'],
				}
				
				findFunFact(geocoder, latlng);
				//console.log("right before");
				service.nearbySearch(nearRequest, callback);
			} else {
				window.alert("No results found");
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));
	
//	let bestResponse = geoResponse[0];
//	coords = bestResponse.geometry.location;
//	map = new google.maps.Map(document.getElementById("map"), {
//		center: coords,
//		zoom: 8,
//	});
//	
//	new google.maps.Marker({
//		position: coords,
//		map,
//		title: "Marking!",
//	});
  
	document.getElementById("map").style.height = 200;
	console.log("map initialized");
}

function callback(results, status) {
	//console.log("right after");
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (let i = 0; i < results.length; i++) {
			let tMarker = new google.maps.Marker({
				position: results[i].geometry.location,
				animation: google.maps.Animation.DROP,
				map: map
			});
			
			let tInfowindow = new google.maps.InfoWindow();
			tInfowindow.setContent(results[i].name);
			tInfowindow.open(map, tMarker);
		}
	} else {
		console.log(status);
	}
}

function onPageLoad() {
//	milkjson.forEach((item) => {
//		console.log(item["State"]);
//	});
}

function resetFunFact() {
	document.getElementById("ffact").textContent = "Did you know? Milk tastes okay.";
}

function findFunFact(geo, latlng) {
	geo
		.geocode({location: latlng})
		.then((response) => {
			if (response.results[0]) {
				let i = 0;
				let res = response.results[0];
				
				
				outer: while (i < res.address_components.length) {
					for (let j = 0; j < res.address_components[i].types.length; j++) {
						if (res.address_components[i].types[j] === "country") {
							break outer;
						}
					}
					i++;
				}
				
				if (i === res.address_components.length) {
					// something went wrong
					return;
				}
				
				let country = res.address_components[i].long_name;
				if (country === "United States") {
					let state = res.address_components[i - 1].long_name;
					let p = mStatejson.find((x) => x.State === state).Price;
					if (p == null) {
						resetFunFact();
						return;
					} else {
						document.getElementById("ffact").textContent = "The cost of milk in " + state + ": " + p;
					}
					
				} else {
					// console.log(mCountryjson.find((x) => x["Country"] === country)["MilkPrice"])
					let p = mCountryjson.find((x) => x["Country"] === country)["MilkPrice"];
					if (p == null) {
						resetFunFact();
						return;
					} else {
						document.getElementById("ffact").textContent = "The cost of milk in " + country + ": $" + p;
					}
					
				}
			} else {
				resetFunFact()
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));
}

window.initMap = initMap;
window.onPageLoad = onPageLoad;

var mStatejson = [
  {
    "State": "Alabama",
    "Price": "$3.75"
  },
  {
    "State": "Alaska",
    "Price": "$3.78"
  },
  {
    "State": "Arizona",
    "Price": "$1.98"
  },
  {
    "State": "Arkansas",
    "Price": "$2.99"
  },
  {
    "State": "California",
    "Price": "$2.69"
  },
  {
    "State": "Colorado",
    "Price": "$2.29"
  },
  {
    "State": "Connecticut",
    "Price": "$1.35"
  },
  {
    "State": "Delaware",
    "Price": "$3.19"
  },
  {
    "State": "District of Columbia",
    "Price": "$2.61"
  },
  {
    "State": "Florida",
    "Price": "$3.07"
  },
  {
    "State": "Georgia",
    "Price": "$2.69"
  },
  {
    "State": "Hawaii",
    "Price": "$4.69"
  },
  {
    "State": "Idaho",
    "Price": "$1.69"
  },
  {
    "State": "Illinois",
    "Price": "$0.93"
  },
  {
    "State": "Indiana",
    "Price": "$1.49"
  },
  {
    "State": "Iowa",
    "Price": "$1.92"
  },
  {
    "State": "Kansas",
    "Price": "$1.99"
  },
  {
    "State": "Kentucky",
    "Price": "$2.19"
  },
  {
    "State": "Louisiana",
    "Price": "$3.65"
  },
  {
    "State": "Maine",
    "Price": "$3.48"
  },
  {
    "State": "Maryland",
    "Price": "$2.25"
  },
  {
    "State": "Massachusetts",
    "Price": "$2.19"
  },
  {
    "State": "Michigan",
    "Price": "$1.89"
  },
  {
    "State": "Minnesota",
    "Price": "$2.79"
  },
  {
    "State": "Mississippi",
    "Price": "$3.59"
  },
  {
    "State": "Missouri",
    "Price": "$2.27"
  },
  {
    "State": "Montana",
    "Price": "$2.98"
  },
  {
    "State": "Nebraska",
    "Price": "$3.13"
  },
  {
    "State": "Nevada",
    "Price": "$2.99"
  },
  {
    "State": "New Hampshire",
    "Price": "$2.69"
  },
  {
    "State": "New Jersey",
    "Price": "$2.83"
  },
  {
    "State": "New Mexico",
    "Price": "$2.09"
  },
  {
    "State": "New York",
    "Price": "$1.97"
  },
  {
    "State": "North Carolina",
    "Price": "$2.60"
  },
  {
    "State": "North Dakota",
    "Price": "$2.93"
  },
  {
    "State": "Ohio",
    "Price": "$1.48"
  },
  {
    "State": "Oklahoma",
    "Price": "$2.59"
  },
  {
    "State": "Oregon",
    "Price": "$2.47"
  },
  {
    "State": "Pennsylvania",
    "Price": "$3.40"
  },
  {
    "State": "Rhode Island",
    "Price": "$2.69"
  },
  {
    "State": "South Carolina",
    "Price": "$2.39"
  },
  {
    "State": "South Dakota",
    "Price": "$2.99"
  },
  {
    "State": "Tennessee",
    "Price": "$2.59"
  },
  {
    "State": "Texas",
    "Price": "$3.48"
  },
  {
    "State": "Utah",
    "Price": "$2.18"
  },
  {
    "State": "Vermont",
    "Price": "$3.28"
  },
  {
    "State": "Virginia",
    "Price": "$2.07"
  },
  {
    "State": "Washington",
    "Price": "$1.97"
  },
  {
    "State": "West Virginia",
    "Price": "$1.99"
  },
  {
    "State": "Wisconsin",
    "Price": "$1.89"
  },
  {
    "State": "Wyoming",
    "Price": "$1.99"
  }
];

var mCountryjson = [
  {
    "Country": "Kazakhstan",
    "MilkPrice": 0.88
  },
  {
    "Country": "Portugal",
    "MilkPrice": 0.72
  },
  {
    "Country": "Greece",
    "MilkPrice": 1.38
  },
  {
    "Country": "Latvia",
    "MilkPrice": 1.22
  },
  {
    "Country": "Iran",
    "MilkPrice": 0.92
  },
  {
    "Country": "Morocco",
    "MilkPrice": 0.66
  },
  {
    "Country": "Panama",
    "MilkPrice": 1.58
  },
  {
    "Country": "Guatemala",
    "MilkPrice": 1.66
  },
  {
    "Country": "Iraq",
    "MilkPrice": 1.09
  },
  {
    "Country": "Chile",
    "MilkPrice": 1.01
  },
  {
    "Country": "Nepal",
    "MilkPrice": 0.71
  },
  {
    "Country": "Argentina",
    "MilkPrice": 0.78
  },
  {
    "Country": "Ukraine",
    "MilkPrice": 0.85
  },
  {
    "Country": "Ghana",
    "MilkPrice": 1.06
  },
  {
    "Country": "Bahrain",
    "MilkPrice": 1.51
  },
  {
    "Country": "India",
    "MilkPrice": 0.68
  },
  {
    "Country": "Canada",
    "MilkPrice": 1.98
  },
  {
    "Country": "Turkey",
    "MilkPrice": 0.78
  },
  {
    "Country": "Belgium",
    "MilkPrice": 0.98
  },
  {
    "Country": "Finland",
    "MilkPrice": 1
  },
  {
    "Country": "Taiwan",
    "MilkPrice": 3.02
  },
  {
    "Country": "North Macedonia",
    "MilkPrice": 1.01
  },
  {
    "Country": "South Africa",
    "MilkPrice": 0.99
  },
  {
    "Country": "Jamaica",
    "MilkPrice": 2.94
  },
  {
    "Country": "Peru",
    "MilkPrice": 1.15
  },
  {
    "Country": "Germany",
    "MilkPrice": 1.02
  },
  {
    "Country": "Puerto Rico",
    "MilkPrice": 1.74
  },
  {
    "Country": "Hong Kong",
    "MilkPrice": 3.08
  },
  {
    "Country": "United States",
    "MilkPrice": 1.01
  },
  {
    "Country": "Thailand",
    "MilkPrice": 1.55
  },
  {
    "Country": "Libya",
    "MilkPrice": 0.89
  },
  {
    "Country": "Costa Rica",
    "MilkPrice": 1.41
  },
  {
    "Country": "Sweden",
    "MilkPrice": 1.21
  },
  {
    "Country": "Vietnam",
    "MilkPrice": 1.39
  },
  {
    "Country": "Poland",
    "MilkPrice": 0.69
  },
  {
    "Country": "Bulgaria",
    "MilkPrice": 1.32
  },
  {
    "Country": "Jordan",
    "MilkPrice": 1.48
  },
  {
    "Country": "Kuwait",
    "MilkPrice": 1.44
  },
  {
    "Country": "Nigeria",
    "MilkPrice": 2.95
  },
  {
    "Country": "Tunisia",
    "MilkPrice": 0.41
  },
  {
    "Country": "Croatia",
    "MilkPrice": 1.02
  },
  {
    "Country": "Sri Lanka",
    "MilkPrice": 1.11
  },
  {
    "Country": "Uruguay",
    "MilkPrice": 1.03
  },
  {
    "Country": "United Kingdom",
    "MilkPrice": 1.15
  },
  {
    "Country": "United Arab Emirates",
    "MilkPrice": 1.87
  },
  {
    "Country": "Kenya",
    "MilkPrice": 0.82
  },
  {
    "Country": "Switzerland",
    "MilkPrice": 1.73
  },
  {
    "Country": "Palestine",
    "MilkPrice": 1.84
  },
  {
    "Country": "Spain",
    "MilkPrice": 0.86
  },
  {
    "Country": "Lebanon",
    "MilkPrice": 5.07
  },
  {
    "Country": "Azerbaijan",
    "MilkPrice": 1.14
  },
  {
    "Country": "Venezuela",
    "MilkPrice": 1.76
  },
  {
    "Country": "Czech Republic",
    "MilkPrice": 0.91
  },
  {
    "Country": "Israel",
    "MilkPrice": 1.78
  },
  {
    "Country": "Australia",
    "MilkPrice": 1.27
  },
  {
    "Country": "Estonia",
    "MilkPrice": 0.91
  },
  {
    "Country": "Cyprus",
    "MilkPrice": 1.54
  },
  {
    "Country": "Malaysia",
    "MilkPrice": 1.5
  },
  {
    "Country": "Iceland",
    "MilkPrice": 1.36
  },
  {
    "Country": "Bosnia And Herzegovina",
    "MilkPrice": 0.81
  },
  {
    "Country": "Armenia",
    "MilkPrice": 1.35
  },
  {
    "Country": "Austria",
    "MilkPrice": 1.27
  },
  {
    "Country": "South Korea",
    "MilkPrice": 2
  },
  {
    "Country": "El Salvador",
    "MilkPrice": 1.76
  },
  {
    "Country": "Brazil",
    "MilkPrice": 0.98
  },
  {
    "Country": "Algeria",
    "MilkPrice": 0.75
  },
  {
    "Country": "Slovenia",
    "MilkPrice": 1.06
  },
  {
    "Country": "Colombia",
    "MilkPrice": 0.76
  },
  {
    "Country": "Ecuador",
    "MilkPrice": 1.01
  },
  {
    "Country": "Kosovo (Disputed Territory)",
    "MilkPrice": 1.05
  },
  {
    "Country": "Hungary",
    "MilkPrice": 0.79
  },
  {
    "Country": "Japan",
    "MilkPrice": 1.39
  },
  {
    "Country": "Moldova",
    "MilkPrice": 0.86
  },
  {
    "Country": "Belarus",
    "MilkPrice": 0.79
  },
  {
    "Country": "Mauritius",
    "MilkPrice": 1.15
  },
  {
    "Country": "Albania",
    "MilkPrice": 1.24
  },
  {
    "Country": "Trinidad And Tobago",
    "MilkPrice": 2
  },
  {
    "Country": "New Zealand",
    "MilkPrice": 1.79
  },
  {
    "Country": "Honduras",
    "MilkPrice": 1.09
  },
  {
    "Country": "Italy",
    "MilkPrice": 1.24
  },
  {
    "Country": "Singapore",
    "MilkPrice": 2.51
  },
  {
    "Country": "Egypt",
    "MilkPrice": 0.74
  },
  {
    "Country": "Bolivia",
    "MilkPrice": 0.96
  },
  {
    "Country": "Malta",
    "MilkPrice": 1.05
  },
  {
    "Country": "Russia",
    "MilkPrice": 1.27
  },
  {
    "Country": "Saudi Arabia",
    "MilkPrice": 1.6
  },
  {
    "Country": "Netherlands",
    "MilkPrice": 1.05
  },
  {
    "Country": "Pakistan",
    "MilkPrice": 0.64
  },
  {
    "Country": "China",
    "MilkPrice": 1.98
  },
  {
    "Country": "Ireland",
    "MilkPrice": 1.19
  },
  {
    "Country": "Qatar",
    "MilkPrice": 1.96
  },
  {
    "Country": "Slovakia",
    "MilkPrice": 0.81
  },
  {
    "Country": "France",
    "MilkPrice": 1.06
  },
  {
    "Country": "Lithuania",
    "MilkPrice": 1.24
  },
  {
    "Country": "Serbia",
    "MilkPrice": 1
  },
  {
    "Country": "Romania",
    "MilkPrice": 1.26
  },
  {
    "Country": "Philippines",
    "MilkPrice": 1.59
  },
  {
    "Country": "Uzbekistan",
    "MilkPrice": 0.9
  },
  {
    "Country": "Bangladesh",
    "MilkPrice": 0.77
  },
  {
    "Country": "Norway",
    "MilkPrice": 1.97
  },
  {
    "Country": "Denmark",
    "MilkPrice": 1.58
  },
  {
    "Country": "Dominican Republic",
    "MilkPrice": 1.22
  },
  {
    "Country": "Mexico",
    "MilkPrice": 1.18
  },
  {
    "Country": "Montenegro",
    "MilkPrice": 1.05
  },
  {
    "Country": "Indonesia",
    "MilkPrice": 1.22
  }
]



