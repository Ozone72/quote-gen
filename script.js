// * GET quote from API * //
async function getQuote() {
  // ! This is using a proxyUrl in order to avoid the CORS error
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  try {
    // ! Because we're using an async function, the response variable will not be set until it gets the apiUrl
    const response = await fetch(proxyUrl + apiUrl);
    // ! The data variable won't be set until the response variable is set.
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // ! this api will sometimes produce errors that are resolved by moving getQuote up into the error catch.  If it doesn't catch an error, it calls normally below
    getQuote();
    console.log("Whoops!  No quote: ", error);
  }
}

// On load
getQuote();
