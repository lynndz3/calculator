import express from 'express';
import path from 'path';
const app = express()
const port = 3000

const __dirname = path.dirname('Users/lynnzukerman/repos/calculator/index.html');
console.log(path.join(__dirname, '/index.html'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/index.html')));

app.get('/', (req, res) => {
    res.sendFile('/Users/lynnzukerman/repos/calculator/index.html');
});

app.get('/styles.css', function(req, res) {
    res.sendFile('/Users/lynnzukerman/repos/calculator/styles.css');
  });

app.get('/index.js', function(req, res) {
    res.sendFile('/Users/lynnzukerman/repos/calculator/index.js');
  });

  app.get('/equations.js', function(req, res) {
    res.sendFile('/Users/lynnzukerman/repos/calculator/equations.js');
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})