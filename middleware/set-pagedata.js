/**
 * A middleware to setup pagedata
 */

var baseUrl = "../data/info/";


module.exports = function(req, res, next){
	res.locals.PageData = res.locals.PageData || {};

	var Company = require(baseUrl + "company.json");
	var Navs = require(baseUrl + "nav_en.json")

	res.locals.PageData.company = Company;
	res.locals.PageData.navs = Navs;

	next();
}