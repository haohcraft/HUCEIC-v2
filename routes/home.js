
/*
 * GET home page.
 */

module.exports = function(req, res, next){
  res.render('home', {
  	app: "home"
  });
};