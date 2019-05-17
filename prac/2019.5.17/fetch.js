const url = 'https://api.github.com/users'
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then((response) => {
  if(response.ok === true) {
    if ((response.status >= 200 && response.status < 300) || response.status === 304) {
      response.json().then((data) => console.log(data));
    }
  }
})