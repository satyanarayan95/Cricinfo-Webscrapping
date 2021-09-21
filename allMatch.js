let request=require("request");
let cheerio=require("cheerio");
let scorecardObj = require("./scorecard");
console.log("Inside All Match");
function processAllMatch(url){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }
        else{
            extractAllScorecardLink(html);
        }
     }
}

function extractAllScorecardLink(html){
    let selTool=cheerio.load(html);
    let scorecardLinkArr=selTool("a[data-hover='Scorecard']");
    for(let i=0;i<scorecardLinkArr.length;i++){
        let link=selTool(scorecardLinkArr[i]).attr("href");
        let fullLink="https://www.espncricinfo.com"+link;
        scorecardObj.processSingleMatch(fullLink);
        
    }
}

module.exports={
    pam:processAllMatch,
}