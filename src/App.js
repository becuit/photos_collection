import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
	{ "name": "Все" },
	{ "name": "Море" },
	{ "name": "Горы" },
	{ "name": "Архитектура" },
	{ "name": "Города" }
];

function App() {
	const [categoryId, setCategoryId] = React.useState(0);
	const [searchValue, setSearchValue] = React.useState('');
	const [collections, setCollections] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [page, setPage] = React.useState(1);

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId ? `category=${categoryId}` : '';

		fetch(`https://63918995ac688bbe4c4afe08.mockapi.io/photos?page=${page}&limit=3&${category}`)
			.then((res) => res.json())
			.then(json => {
				setCollections(json);
			})
			.catch(err => {
				console.log(err);
				alert("Downloading photos failed");
			}).finally(() => setIsLoading(false));
	}, [categoryId, page]);

	return (
		<div className="App">
			<h1>Моя коллекция фотографий</h1>
			<div className="top">
				<ul className="tags">
					{
						cats.map((obj, i) =>
							<li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>
						)
					}
				</ul>
				<input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
			</div>
			<div className="content">
				{isLoading ? <h2>Loading . . .</h2> :
					collections
						.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
						.map((obj, index) => (
							<Collection key={index} images={obj.photos} name={obj.name} />
						))
				}

			</div>
			<ul className="pagination">
				{
					[...Array(5)].map((_, i) => <li onClick={() => setPage(i + 1)} className={page === (i + 1) ? 'active' : ''}>{i + 1}</li>)
				}
			</ul>
		</div>
	);
}

export default App;
