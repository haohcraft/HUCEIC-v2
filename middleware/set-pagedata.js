/**
 * A middleware to setup pagedata
 */

var baseUrl = "../data/basic/";


module.exports = function(req, res, next){
	res.locals.PageData = res.locals.PageData || {};

	var Company = require(baseUrl + "company.json");
	var Navs = require(baseUrl + "nav_en.json")
	

	// store the company's basic info
	res.locals.PageData.company = Company;
	// store the navigators' name
	res.locals.PageData.navs = Navs;
	// store the name of the site
	res.locals.PageData.siteName = "Express";


	next();
}