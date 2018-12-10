const fs = require('fs');
var path = require('path');
const featureDirectory = "./frontend/features"
const featureDirectoryNames = fs.readdirSync(featureDirectory)
const testTemplate = fs.readFileSync("./frontend/Feature/webpackUtils/autoTest/testTemplate.js");


function helpRegister() {
    const decorators = {}
    const properlyMadeFeatures = [];
    featureDirectoryNames.forEach(name => {
        const featureHasPackage = fs.existsSync(`${featureDirectory}/${name}/featurePackage.js`);
        if (!featureHasPackage) {
            process.emitWarning(`feature:${name} - `+"Feature must have featurePackage.js to be loaded but '" + `${featureDirectory}/${name}/featurePackage.js` + "' does not exist ");
        }else{
            properlyMadeFeatures.push(name);
            const featureHasDecorators = fs.existsSync(`${featureDirectory}/${name}/decorators.json`);
            if (featureHasDecorators) {
                try {
                    const string = fs.readFileSync(`${featureDirectory}/${name}/decorators.json`)
                    const parsedDecorators = JSON.parse(string);
                    decorators[name] = parsedDecorators;
                } catch (e) {
                    process.emitWarning(`feature:${name} - decorators.json detected but error reading it\n\n` + e)
                }
            }

            ensureDirectoryExistence(`${featureDirectory}/${name}/__tests__/autoGenSanityTest.js`);
            fs.writeFileSync(`${featureDirectory}/${name}/__tests__/${name}__autoGenSanityTest.js`,testTemplate) 
        }
    })

    const manifest = {_featureNames:{}};
    properlyMadeFeatures.forEach(name=>{
        manifest._featureNames[name]=name
        manifest[name]=decorators[name];
    });
    fs.writeFileSync("./frontend/Feature/features.autogen.json",JSON.stringify(manifest,null,2))

}

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    fs.mkdirSync(dirname);
    ensureDirectoryExistence(dirname);
}
module.exports = helpRegister;