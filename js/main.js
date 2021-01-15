"use strict";
$(document).ready(() =>{

	class Query{

		_address

		constructor(addr){
			this._address = addr
			console.log("Query object setup")
		}

		post(obj, callback){

			const url = `${this._address}movies/`;
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(obj),
			};
			fetch( url, options).then(
				(res)=>{
					callback(res)
				}
			)
		}

		put(obj, id, callback){

			const url = `${this._address}movies/${id}`;
			const options = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(obj),
			};
			fetch( url, options).then(
				(res)=>{
					callback(res)
				}
			)
		}

		delete(id, callback){
			const url = `${this._address}movies/${id}`;
			const options = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(obj),
			};
			fetch( url, options).then(
				(res)=>{
					callback(res)
				}
			)
		}

		get(callback){

			const url = `${this._address}movies/`;
			const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			};
			fetch( url, options).then(
				(res)=>{
					callback(res)
				}
			)

		}

		getId(id, callback){
			const url = `${this._address}movies/${id}`;
			const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			};
			fetch( url, options).then(
				(res)=>{
					callback(res)
				}
			)
		}

	}

	var query = new Query("https://comfortable-lace-snowboard.glitch.me/")

	const addMovie = () => {
		let title = $('#title').val()
		let genre = $('#genre').val()
		let year = $('#year').val()
		let rating = $('#rating').val()
		let director = $('#director').val()
		let plot = $('#plot').val()
		let actors = $('#actors').val()

		let newMovie = {
			title,
			rating,
			poster,
			year,
			genre,
			director,
			plot,
			actors
		}

		query.post(newMovie, (res)=>{
			//confirm to user movie has been added
		})

	}

	const editMovie = (id) =>{
		let title = $('#title').val()
		let genre = $('#genre').val()
		let year = $('#year').val()
		let rating = $('#rating').val()
		let director = $('#director').val()
		let plot = $('#plot').val()
		let actors = $('#actors').val()

		let editMovie = {
			title,
			rating,
			poster,
			year,
			genre,
			director,
			plot,
			actors
		}

		query.put(editMovie, id,(res)=>{
			//confirm to user movie has been added
		})
	}

	const getMovie = (id = 1, callback = ()=>{
		return //returns empty if there is no callback assigned
	}) =>{
		query.getId(id, (res)=>{ //queries the database
			res.json().then(data=>{ //then grabs that data
				callback(data) //and passes it to the callback function
			})
		})

	}
	const deleteMovie = (id , callback = ()=>{
		return //returns empty if there is no callback assigned
	}) =>{
		query.delete(id, (res)=>{ //queries the database
			res.json().then(data=>{ //then grabs that data
				callback(data) //and passes it to the callback function
			})
		})

	}

	const populateMovieForm = (id = 1) =>{

		getMovie(id,(data)=>{ //we get the data and assign it to form

			$('#title').val(data.title)
			$('#genre').val(data.genre)
			$('#year').val(data.year)
			$('#rating').val(data.rating)
			$('#director').val(data.director)
			$('#plot').val(data.plot)
			$('#actors').val(data.actors)

		})

	}

	// populateMovieForm()




	let qType

	$('#modeSwitch').click( e =>{
		e.preventDefault()

	})

	const typeSwitch = mode =>{
		mode = qType
		if(mode === 0){ // 0 = edit
			populateMovieForm()
			$('#modeTitle').html('Edit Movie')
		} else if (mode === 1){ // 1 = add
			$('#modeTitle').html('Add Movie')
		} else {
			console.log('How on earth did you get this message to display??')
		}
	};

	typeSwitch(1)

	$('#submit').click( (e) =>{
		e.preventDefault();
		if (qType === 1) {
			addMovie();
		} else if (qType === 0) {
			editMovie();
		}
	});






});




