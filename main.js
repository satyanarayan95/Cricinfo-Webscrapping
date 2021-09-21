let request=require("request");
let cheerio=require("cheerio");
let allMatchObj=require("./allMatch");
let fs = require("fs");
let path=require("path");
let folderPath = path.join(__dirname, "ipl");
dirCreater(folderPath);
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(url,cb);

function cb(err,response,html){
   if(err){
       console.log(err);
   }
   else{
       extractAllMatchPageLink(html);
   }
}
console.log("Inside main");
function extractAllMatchPageLink(html){
    let selTool=cheerio.load(html);
    let nextPageAnchor=selTool(".widget-items.cta-link a");
    let link=nextPageAnchor.attr("href");
    let fullLink="https://www.espncricinfo.com"+link;
    allMatchObj.pam(fullLink);
}

function dirCreater(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath);
    }
}