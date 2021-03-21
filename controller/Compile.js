const { c, cpp, node, python, java } = require('compile-run');
const fs = require('fs').promises;
let compile = []
compile.run = async (language, code, inputFolder, outputFolder) => {
    let inputFiles = await fs.readdir("./" + inputFolder)
    let outputFiles = await fs.readdir("./" + outputFolder)
    for (i in inputFiles) {
        let input = await fs.readFile("./" + inputFolder + "/" + inputFiles[i], { encoding: 'utf8' })
        let output = await fs.readFile("./" + outputFolder + "/" + outputFiles[i], { encoding: 'utf8' })
        let result;
        switch (language) {
            case 'c_cpp':
                result = await cpp.runSource(code, { stdin: input });
                break;
            case 'javascript':
                result = await node.runSource(code, { stdin: input });
                break;
            case 'python':
                result = await python.runSource(code, { stdin: input });
                break;
            default:
                result = await java.runSource(code, { stdin: input });
                break;
        }
        if (result.stderr) {
            return { Correct: false, Haveerr: true, err: result.stderr, TotalTest: inputFiles.length, LastTest: i + 1 };
        } else {
            if (result.stdout.trim() !== output.trim()) {
                return { Correct: false, Haveerr: false, input: input, err: 'notMatch', expectOutput: output, realoutput: result.stdout };
            }
        }
    }
    return { Correct: true, Haveerr: false, TotalTest: inputFiles.length, LastTest: inputFiles.length }
}


module.exports = compile;