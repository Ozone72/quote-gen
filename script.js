const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// * GET quote from API * //
async function getQuote() {
  // ! This is using a proxyUrl in order to avoid the CORS error
  const proxyUrl = "https://damp-cove-31141.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  try {
    // ! Because we're using an async function, the response variable will not be set until it gets the apiUrl
    const response = await fetch(proxyUrl + apiUrl);
    // ! The data variable won't be set until the response variable is set.
    const data = await response.json();

    // This is to fix blank author field
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // This statement checks to see if the quote is longer than 120 chars and if so, adds our long quote class.  And if not, removes (in case it's there already)
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    // ! this api will sometimes produce errors that are resolved by moving getQuote up into the error catch.  If it doesn't catch an error, it calls normally below
    getQuote();
  }
}

// * Use Twitter button to post a quote to my account
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
  window.open(twitterUrl, "_blank");
};

// * Event Listeners *
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuote();
