const loader = document.getElementById('loader');
const author = document.getElementById('author');
const quote = document.getElementById('quote');
const tweetBtn = document.getElementById('twitter');
const refreshBtn = document.getElementById('new-quote');
const container = document.getElementById('main-container');

function loading() {
  loader.hidden = false;
  container.hidden = true;
}

function showContainer() {
  loader.hidden = true;
  container.hidden = false;
}

async function getQuote() {
  loading();
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  const CORSurl = 'https://kinng-cors-proxy.herokuapp.com/';

  try {
    await fetch(CORSurl + apiUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.quoteAuthor === '') {
        author.innerHTML = 'UNKNOWN'
      } else {
        author.innerHTML = data.quoteAuthor.toUpperCase();
      }

      if (data.quoteText.length > 120) {
        quote.classList.add('quote-long');
      } else {
        quote.classList.remove('quote-long');
      }
      quote.innerHTML = data.quoteText;
    })

    showContainer();
  } catch (err){
    console.log(err)
    getQuote();
  }
}

function tweeting() {
  const quote2 = quote.innerText;
  const author2 = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote2} - ${author2}`

  window.open(twitterUrl, '_blank');
}

refreshBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweeting);

getQuote();