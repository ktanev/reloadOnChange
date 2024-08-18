# reloadOnChange
* ``` npm install ```
* Edit watch.js to setup the directory, ports, etc.
*  Generate the needed SSL files OR copy them from auto-generated SSL files from MAMP
``` openssl req -nodes -new -x509 -keyout watch-server.key -out watch-server.cert ```
*  npm start
* Visit ``` https://local-domain.com:8080 ``` and accept the warning message for Invalid certificate
* Transfer the cert file to the iOS device, open it and install it. Tested on iOS 17.5 and works perfect. I'm using MAMP Pro with local-domain.com to serve the project.
### Add client with reload functionality to the index.php file 
``` 
	<script>
		// Connect to the WebSocket server
		const ws = new WebSocket('https://local-domain.com:8080');

		// Event listener for when the connection is opened
		ws.addEventListener('open', () => {
			console.log('Connected to the WebSocket server');
		});

		// Event listener for when a message is received from the server
		ws.addEventListener('message', (event) => {
			console.log(`Received message: ${event.data}`);
			window.location.reload();
		});

		// Event listener for when the connection is closed
		ws.addEventListener('close', () => {
			console.log('Disconnected from the WebSocket server');
		});

		// Event listener for errors
		ws.addEventListener('error', (error) => {
			console.error(`WebSocket error: ${error}`);
		});

	</script>


``` 
