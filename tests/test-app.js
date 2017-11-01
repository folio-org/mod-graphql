import app from '../app';
import yakbak from 'yakbak';

const recorder = yakbak('http://api.flickr.com', {
  dirname: __dirname + '/tapes'
});

export default app.use(function (req, res, next) {
  recorder(req, res);
});
