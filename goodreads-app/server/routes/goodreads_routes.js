var Request = require("request-promise");
var { parseString } = require("xml2js");
let API_URL = "https://www.goodreads.com/search/index.xml?key=";

module.exports = function(app, db) {
  app.get("/goodreadsapicall", (req, res) => {
    var key = req.query.key;
    var q = req.query.q;
    var page = req.query.page;
    Request.get(API_URL + key + "&q=" + q + "&page=" + page).then(result =>
      parseString(result, (err, goodreadsResult) =>
        res.json({
          booksResult: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
            work => ({
              goodreadsId: work.best_book[0].id[0],
              title: work.best_book[0].title[0],
              authors: work.best_book[0].author[0].name[0],
              covers: [work.best_book[0].image_url[0]]
            })
          )
          
        })
      )
    );
  });
};
