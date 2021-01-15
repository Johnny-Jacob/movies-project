"use strict";
$(document).ready(() =>{
	console.log('JS & jQuery Connections Successful');
	const getMovie = movie=> {
		fetch('https://comfortable-lace-snowboard.glitch.me/movies/' + movie)
			.then(response => response.json())
			.then(data => console.log(data))

	}
	const addMovie = () => {
		let title = $('#title').val()
		let genre = $('#genre').val()
		let year = $('#year').val()
		let rating = $('#rating').val()
		let poster = 'This is a placeholder for a poster'
		let director = $('#director').val()
		let plot = $('#plot').val()
		let actors = $('#actors').val()
		let id = 'This is a placeholder for an id'// This should be determined based the biggest id in the database + 1 \\

		let newMovie = {
			title,
			rating,
			poster,
			year,
			genre,
			director,
			plot,
			actors,
			id
		}
		console.log(newMovie);

	}
	$('#submit').click( (e) =>{
		e.preventDefault();
		addMovie();
	});

});