import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [parent, setParent] = useState('');
	const [data, setData] = useState({
		path: '',
		files: [],
		result: false,
	});

	useEffect(() => {
		fetch('http://localhost:5000')
			.then(res => res.json())
			.then(
				result => {
					setParent('');
					setData(result);
					console.log('initial render');
				},
				error => {
					console.log(error);
				}
			);
	}, []);

	const clickFolder = event => {
		event.preventDefault();
		fetch('http://localhost:5000/?path=' + event.target.attributes.href.value)
			.then(res => res.json())
			.then(
				result => {
					let linkArr = result.path.split('/');
					linkArr.pop();
					setParent(linkArr.join('/'));
					setData(result);
				},
				error => {
					console.log(error);
				}
			);
	};

	const clickDownload = () => {
		console.log('Start Downloading');
	};

	const clickDelete = () => {
		console.log('Start Deleting');
	};

	return (
		<div className='file-manager'>
			<div className='level-up'>
				<a href={parent} onClick={clickFolder}>
					<span className='material-icons-two-tone'>&#xe89d;</span>
					LEVEL UP
				</a>
			</div>
			<div className='current-level'>
				current dir: {data.path === '' ? '/' : data.path}
			</div>
			{data.files.length === 0 && (
				<div className='folder-empty'>This folder is empty!</div>
			)}
			<ul className='folder-list'>
				{data.files.map(item => {
					if (item.dir) {
						return (
							<li key={item.name} className='folder'>
								<a href={data.path + '/' + item.name} onClick={clickFolder}>
									<span className='material-icons-two-tone'>folder</span>
									{item.name.toUpperCase()}
								</a>
							</li>
						);
					} else {
						return (
							<li key={item.name} className='file'>
								<span className='material-icons-two-tone'>description</span>
								{item.name}
								<div className='btn-block'>
									<button className='btn btn-download' onClick={clickDownload}>
										Download
									</button>
									<button className='btn btn-delete' onClick={clickDelete}>
										Delete
									</button>
								</div>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
}

export default App;
