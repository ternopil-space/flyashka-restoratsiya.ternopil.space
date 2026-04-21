const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src').concat(['package.json', 'angular.json']);

files.forEach(file => {
    if (!file.match(/\.(html|ts|scss|css|json)$/)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content
        .replace(/Horeca/g, 'Flyashka-Restoratsiya')
        .replace(/horeca/g, 'flyashka-restoratsiya')
        .replace(/HoReCa/g, 'Flyashka-Restoratsiya');
        
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
