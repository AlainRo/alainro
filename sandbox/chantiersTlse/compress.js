//---------------------------------------------
function readChantiers(data){

	data.forEach(function (e) {
		e.LatLng= {"lat" : e.Y_WGS84, "lng" : e.X_WGS84};
		e.datedebut= e.datedebut.substring(0,4) + "-" + e.datedebut.substring(4,6) + "-" + e.datedebut.substring(6,8);
		e.datefin= e.datefin.substring(0,4) + "-" + e.datefin.substring(4,6) + "-" + e.datefin.substring(6,8);
		delete e.Y_WGS84;
		delete e.X_WGS84;
		delete e.duree;
		delete e.id;
	});

	console.log('Lignes Totales: ' + data.length);
	var gvoie = groupBy(data,"voie");
	console.log('Lignes par voies: ' + gvoie.size());
	var gdate = groupBy(gvoie.values(),"date");
	console.log('Lignes par dates: ' + gdate.size());

	byKey =gdate.values();
	var i =0;
	byKey.forEach(function (e) {
		e.category = Categories(e.nature);
		scoreGene(e);
		e.date = d3.extent(e.groupBydate);
//		e.date= e.groupBydate;
		e.voie= e.groupByvoie;
		delete e.groupBydate;
		delete e.groupByvoie;
		e.id = i++;
	});

	console.log(JSON.stringify(byKey));

}