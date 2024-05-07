const App = () => {
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);
	const [quote, setQuote] = React.useState({
		quote: "",
		author: "",
		index: null
	});
	const [backgroundColor, setBackgroundColor] = React.useState("");

	const src = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
	
	// Function that chooses random quote from FCC quote list
	const randomQuote = () => {
		
		let randomizer = Math.floor(Math.random() * data.quotes.length);
		const quoteObj = data["quotes"][randomizer];
		setQuote({
			quote: quoteObj.quote,
			author: quoteObj.author,
			index: randomizer
		});
			
	}
	
	// Function that chooses random color from array declared inside function
	const randomColor = () => {
		
		// Array of colors
		const backgroundColors = [
			"#ac3b61",
			"#5783c9",
			"#b06d25",
			"#93b88f",
			"#b29bc2",
			"#750204"
		];
		
		const index = Math.floor(Math.random() * backgroundColors.length);
		setBackgroundColor(backgroundColors[index]);
		
	}
	
	// Click handler wrapper for above two functions
	const handleClick = () => {
		randomQuote();
		randomColor();
	}
	
	// Based on guide at https://www.freecodecamp.org/news/fetch-data-react/	
	React.useEffect(() => {
	
		// Fetch https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json within useEffect and don't re-fetch unless src changes
		
		fetch(src)
		.then (response => {
			if (response.ok) {
				return response.json();
			}
			else {
				throw response;
			}
		})
		.then(data => {
			setData(data);
			setQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)]);
			randomColor();
		})
		.catch(error => {
			console.log("Error: ", error);
			setError(error);
		})
		.finally(() => {
			setLoading(false);	
		});
	}, [src]);
	
	if (loading) {
		return (
			<p className="devMessage">Loading</p>
		);
	}
	
	if (error) {
		return (
			<p className="devMessage">Error</p>
		);
	}
	
	return (
			<div id="quote-box">
				<style> {`
					:root {
						--primary-color: ${backgroundColor};
					`}
				</style>
				<div id="text">
					<h1>{quote.quote}</h1>
				</div>
				<div id="author">
					<p className="text-black">{quote.author}</p>
				</div>
				<div id="button-wrapper">
					<a id="tweet-quote" target="_blank" href={`https://www.twitter.com/intent/tweet/?text=${quote.quote}`}>
						<i className="fa-brands fa-square-twitter"></i>
					</a>
					<button className="button" onClick={handleClick}>New Quote</button>
				</div>
			</div>
	);
}


ReactDOM.render(<App />, document.getElementById("root"));