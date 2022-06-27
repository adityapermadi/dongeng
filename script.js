const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
// show loading
function loading() {
    loader.hidden = false;
    quote.quoteContainer.hidden =true;
}

// hide loading
function complete() {
quoteContainer.hidden = false;
loader.hidden = true;
}


// show new Quotes
function newQuote() {
    
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknow';    
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote'); 
    } else {
        quoteText.classList.remove('long-quote');
    }
     complete();   
    quoteText.textContent = quote.text;
    
}
   //    console.log(quote); 
// get quotes from API
async function getQuotes() {
    
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const respone = await fetch(apiUrl);
        apiQuotes = await respone.json();
        newQuote();
    } catch (error) {
        // catch error here
    }
}
// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
    // event listners
    newQuoteBtn.addEventListener('click', newQuote);
    twitterBtn.addEventListener('click', tweetQuote);
// on load
getQuotes();
newQuote();
