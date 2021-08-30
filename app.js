const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'))

app.get("/", (req, res) => {
  const posts = postBank.list();


  const html = `<html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`;


res.send(html);

});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  console.log (req.params.id);

  if (!post.id) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <h1>Accio Page! 🧙‍♀️ ... Page Not Found</h1>
        <div class="tenor-gif-embed" 
              data-postid="3482214"
              data-share-method="host" 
              data-aspect-ratio="1.435" 
              data-width="100%">
              <a href="https://tenor.com/view/dumbledore-frustrated-harry-potter-i-give-up-gif-3482214">I Give Up. GIF</a>
              from <a href="https://tenor.com/search/dumbledore-gifs">Dumbledore GIFs</a>
              </div> 
        <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
      </div>
    </body>
    </html>`
    res.send(html)
  }else{
    
  const html = `<html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.content}  | ${post.date}
          </small>
        </div>
    </div>
  </body>
</html>`;

res.send(html);
 }
});


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
