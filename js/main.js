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
				method: 'DELETE'
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
			year,
			genre,
			director,
			plot,
			actors
		}

		query.post(newMovie, (res)=>{
			//confirm to user movie has been added
			generateMoviePosters()
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
			year,
			genre,
			director,
			plot,
			actors
		}

		query.put(editMovie, id,(res)=>{
			//confirm to user movie has been added
			generateMoviePosters()
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

	const getMovies = ( callback = ()=>{
		return //returns empty if there is no callback assigned
	}) =>{
		query.get((res)=>{ //queries the database
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
			$('#rating').children().first().attr("selected")
			$('#director').val(data.director)
			$('#plot').val(data.plot)
			$('#actors').val(data.actors)

		})

	}

	//Adds click function for menu
	Array.from(document.getElementById("menu").children).forEach( (child, i)=>{
		
		child.onclick = (e)=>{
			e.preventDefault()
			switch(i){
				case 0: typeSwitch(1) // Add movie
					break;
				case 1: typeSwitch(0) // Edit movie
					break;
				default:
					break;
			}
		}
		
	})

	let qType = 1

	const typeSwitch = mode =>{
		console.log(mode)
		qType = mode;
		if(mode === 0){ // 0 = Edit
			$('#modeTitle').html('Edit Movie')
		} else if (mode === 1){ // 1 = Add
			$('#modeTitle').html('Add Movie')
			clearForms()
		} else {
			console.log('How on earth did you get this message to display??')
		}
	};

	const clearForms = ()=>{
		$('#title').val("")
		$('#genre').val("")
		$('#year').val("")
		$('#rating').val("5")
		$('#director').val("")
		$('#plot').val("")
		$('#actors').val("")
	}

	const generateMoviePosters = ()=>{
		let posters = document.getElementById("moviePosters")
		posters.innerHTML = ""
		posters.setAttribute('class', 'd-flex flex-wrap justify-content-center justify-content-sm-center')
		// let posters = $('moviePosters').html('')
		let loading = document.createElement("img")
		loading.src = "img/371.gif"
		// loading.setAttribute('class', 'text-center justify-content-center')
		loading.style.width = '20em';
		posters.appendChild(loading)
		getMovies((data)=>{ //we get the data and assign it to form
			posters.innerHTML = ""
			console.log(data)
			data.forEach( movie =>{
				
				//sets up the container
				let container = document.createElement("div");
				container.setAttribute("class","rounded m-2");
				container.style.width = "12rem";
				container.style.height = "18rem";
				
				
				if(typeof movie.poster != 'string'){
					container.style.background = `url('img/placeholder.png')`;
				}else{
					container.style.background = `url(${movie.poster})`;
					
				}
				container.style.backgroundSize = `100%`;
				let innerButtons = document.createElement("div");
				
				//Buttons
				let closeButton = document.createElement("button")
				closeButton.setAttribute("class","btn btn-danger position-relative")
				closeButton.style.left = "9.5em"
				closeButton.style.top = "0.5em"
				closeButton.innerHTML = "X"
				closeButton.onclick = (e)=>{
					e.preventDefault();
					deleteMovie(movie.id, ()=>{
						generateMoviePosters()
					})	
				}

				let infoButton = document.createElement("button")
				infoButton.setAttribute("class","btn btn-primary position-relative")
				infoButton.style.left = "-1.5em"
				infoButton.style.top = "15em"
				infoButton.innerHTML = "Info"
				

				let editButton = document.createElement("button")
				editButton.setAttribute("class","btn btn-danger position-relative")
				editButton.style.right = "-2.5em"
				editButton.style.top = "15em"
				editButton.innerHTML = "Edit"
				editButton.onclick = (e)=>{
					e.preventDefault();
					typeSwitch(0)
					populateMovieForm(movie.id)
				}

				innerButtons.appendChild(closeButton)
				innerButtons.appendChild(infoButton)
				innerButtons.appendChild(editButton)

				container.appendChild(innerButtons)

				document.getElementById("moviePosters").appendChild(container)

			})
			posters.setAttribute('class', 'd-flex flex-wrap justify-content-center justify-content-sm-start')

		})
	}

	generateMoviePosters()
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




