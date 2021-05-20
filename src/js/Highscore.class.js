class Highscore {

	static add(score, date) {
		if (score < 0 || !score)
			return;

		if (!date) {
			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth()+'';
			if (month.length < 2)
				month = '0'+month;
			var day = d.getDay()+'';
			if (day.length < 2)
				day = '0'+day;
			date = year+'-'+month+'-'+day;
		}

		var list = [];
		if (localStorage.asteroidsHighscore)
			list = JSON.parse(localStorage.asteroidsHighscore);

		list.push([score, date]);

		list.sort(function(a, b) {
			return b[0] - a[0];
		})

		if (list.length > 5)
			list.splice(5);

		localStorage.asteroidsHighscore = JSON.stringify(list);
	}

	static getList() {
		var list = [];
		if (localStorage.asteroidsHighscore)
			list = JSON.parse(localStorage.asteroidsHighscore);

		return list;
	}

}