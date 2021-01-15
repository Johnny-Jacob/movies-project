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

	let genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]


	const getPosterImage = (name, callback) =>{

        var input = ""
        var args = String(name).split(" ")
        args.forEach( (arg,i) =>{
            if(i == args.length-1){
                input += arg;
            }else{
                input += arg;
                input += "%20"
            } 
        })

		const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEKEY}&language=en-US&query=${input}`;
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

	const autoFillInfo = () =>{
		var input = ""
        var args = String($('#title').val()).split(" ")
        args.forEach( (arg,i) =>{
            if(i == args.length-1){
                input += arg;
            }else{
                input += arg;
                input += "%20"
            } 
        })

		const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEKEY}&language=en-US&query=${input}`;
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		};
		fetch( url, options).then(
			(res)=>{
				res.json().then(data=>{

					let movie = data.results[0]

					let title = $('#title').val(movie.original_title)
					let genreString = ""
					movie.genre_ids.forEach( (id,i) =>{ //filters though known genre id's and creates a string 
						let filter = genres.filter((g)=>{
							return g.id == id
						});
						if(i == movie.genre_ids.length-1){
							genreString += `${filter[0].name}`
						}else{
							genreString += `${filter[0].name}, `
						}
						
					})
				
					let genre = $('#genre').val(genreString)
					let year = $('#year').val(movie.release_date)
					let rating = $('#rating').val(Math.floor(movie.vote_average/2))
					let director = $('#director').val()
					let plot = $('#plot').val(movie.overview)
					let actors = $('#actors').val()
				})
			}
		)
	}

	

	const addMovie = () => {
		let title = $('#title').val()
		let genre = $('#genre').val()
		let year = $('#year').val()
		let rating = $('#rating').val()
		let director = $('#director').val()
		let plot = $('#plot').val()
		let actors = $('#actors').val()


		getPosterImage(title, (res)=>{
			res.json().then( data=>{
				
				let newMovie = {
					title,
					rating,
					year,
					poster: `https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}`,
					genre,
					director,
					plot,
					actors
				}
		
				query.post(newMovie, (res)=>{
					//confirm to user movie has been added
					generateMoviePosters()
				})
			})
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

		
		getPosterImage(title, (res)=>{
			res.json().then( data=>{
				
				let newMovie = {
					title,
					rating,
					year,
					poster: `img/placeholder.png`,
					genre,
					director,
					plot,
					actors
				}
		
				query.put(editMovie, id,(res)=>{
					//confirm to user movie has been added
					generateMoviePosters()
				})
			})
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

	const modalMovieInfo = (id = 1) =>{

		getMovie(id,(data)=>{ //we get the data and assign it to form
			
			console.log("test")
			console.log(data)

			$('#movieTitle').html(data.title)
			$('#modalPoster').attr("src",data.poster);
			$('#modalGenre').html(`<strong>Genre:</strong> ${data.genre}`)
			$('#modalYear').html(`<strong>Year:</strong> ${data.year}`)
			$('#modalRating').html(`<strong>Rating:</strong> ${data.rating}`)
			$('#modalDirector').html(`<strong>Director:</strong> ${data.director}`)
			$('#modalActors').html(`<strong>Actors:</strong> ${data.actors}`)
			$('#modalPlot').html(`<strong>Plot:</strong> ${data.plot}`)

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
	let currentId = 1

	const typeSwitch = mode =>{
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
				infoButton.setAttribute("data-toggle","modal")
				infoButton.setAttribute("data-target","#movieInfo")
				infoButton.style.left = "-1.5em"
				infoButton.style.top = "15em"
				infoButton.innerHTML = "Info"
				infoButton.onclick = (e)=>{
					e.preventDefault();
					modalMovieInfo(movie.id)
				}
				

				let editButton = document.createElement("button")
				editButton.setAttribute("class","btn btn-danger position-relative")
				editButton.style.right = "-2.5em"
				editButton.style.top = "15em"
				editButton.innerHTML = "Edit"
				editButton.onclick = (e)=>{
					e.preventDefault();
					typeSwitch(0)
					currentId = movie.id
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
			editMovie(currentId);
		}
	});

	$('#autoFillButton').click( (e) =>{
		e.preventDefault();
		autoFillInfo()
	});






});




