import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import Navbar from '../Home/Navbar';
import './visitedCountries.css';

function VisitedCountries() {
	const [userData, setUserData] = useState([]);
	console.log('userData', userData);
	useEffect(() => {
		function checkUserData() {
			const item = JSON.parse(localStorage.getItem('mapMarker'));
			console.log('item', item);
			if (item) {
				setUserData(item);
			} else {
				setUserData('Default Value');
			}
		}
		checkUserData();
	}, []);
	console.log(userData);
	const item = JSON.parse(localStorage.getItem('mapMarker'));
	Geocode.setApiKey(process.env.REACT_APP_API_MAP);
	const [address, setAddress] = useState([]);
	async function getAddresses() {
		const results = [];
		for (let i = 0; i < item.length; i++) {
			const response = await Geocode.fromLatLng(
				item[i].pos.lat,
				item[i].pos.lng
			);
			results.push(response.results[0].formatted_address);
		}
		setAddress(results);
		console.log(results);
	}

	useEffect(() => {
		getAddresses();
	}, []);

	return address[0] ? (
		<section className='container'>
			<div>
				<Navbar />
				<br></br>
			</div>
			<h1 className='title'>Visited Countries</h1>
			<div className='countries-list'>
				{address.map((address) => (
					<div className='address'>{address}</div>
				))}
			</div>
		</section>
	) : null;
}

export default VisitedCountries;
