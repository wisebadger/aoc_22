const init = function() {
    let headingTitle = document.getElementById('titleHeading');
    headingTitle.innerHTML = "Krane Operations - Part 1";
};

const Log = function(input){ console.log(input); }

const MoveCrates = function(instruction, currentModel) {
    let instructionExp = instruction.split(' '); // instructions exploded to isolate below
    let moveAmount = parseInt((instructionExp[1])); // adjust for 0 based array
    let startStack = parseInt(instructionExp[3]) - 1; // adjust for 0 based array
    let targetStack = parseInt(instructionExp[5]) - 1; // adjust for 0 based array
    let movingCrates = ""; // init an empty string to horde crates

    // get each crate ** 1 BY 1 ** and store it
    for (let i = 0; i < moveAmount; i++) {

        let stackLength = currentModel[startStack].length;

        // get top crate and store it
        let crate = currentModel[startStack].substring(stackLength - 1);
        
        // remove crate from original stack
        currentModel[startStack] = currentModel[startStack].substring(0, stackLength - 1);
        
        // add crate to target stack queue
        movingCrates = movingCrates.concat(crate);
    }
    //Log(movingCrates);

    //move crates to their new home
    currentModel[targetStack] = currentModel[targetStack].concat(movingCrates);

    // send our finished product back to the requester
    return currentModel;
}

const GetDataFromFile = function() {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
        
        
        reader.addEventListener("load", () => {
            
            // get data from file
            let rawData = reader.result.split("\n");
            
            // working variables
            let columnCountRowIdx = 0;
            let columnCount = 0;
            let instructionIdx = 0;
            let stacks = [];
            let finalStacks = [];
            let result = "";

            // identify the row with column counts
            for (let i = 0; i < rawData.length; i++) {
                if (rawData[i] === "") {
                    columnCountRowIdx = i - 1;
                    break;
                }
            }

            // store row data with column counts
            let columnCountRowRaw = rawData[columnCountRowIdx].trim();

            // create array from raw column data / delimeter is 3 spaces
            let arrColumnCount = columnCountRowRaw.split("   ");
            columnCount = arrColumnCount.length;

            // isolate the data model
            let arrDataRows = rawData.splice(0, columnCountRowIdx);

            //Log(arrDataRows);

            // identify the instruction start index
            for (let i = 0; i < rawData.length; i++) {
                if (rawData[i] === "") {
                    instructionIdx = i + 1;
                    break;
                }
            }

            // isolate the instructions
            let instructions = rawData.splice(instructionIdx, rawData.length);
            
            // isolate the crate ID's into a working array
            arrDataRows.forEach(function callback(row, idx) {
                let rowArray = row.split("");
                    for (let i = 1; i < rowArray.length; i++) {
                            if (stacks[idx] === undefined) { stacks[idx] = "";}
                            stacks[idx] += rowArray[i];
                            i += 3;
                    }
            });

            // create rows from column stacks to manipulate
            for (let j = 0; j <= stacks.length; j++) {
                for (let k = 0; k < columnCount; k++) {
                    if(finalStacks[j] === undefined) { finalStacks[j] = "";}

                    if(stacks[k] !== undefined) {
                        let stackArray = stacks[k].split("");
                        if(stackArray[j] === undefined) { stackArray[j] = " "; }
                        
                        finalStacks[j] += stackArray[j];
                    }
                }
            }

            // reverse and trim rows to prepare for instuction execution
            finalStacks.forEach(function callback(row, idx) {
               let rowExp = row.split('').reverse().join('');
               let newrow = rowExp.trim();
               finalStacks[idx] = newrow;
            });

            // iterate through all instructions on the model
            instructions.forEach(ins => {
                finalStacks = MoveCrates(ins, finalStacks);
                //Log(ins);
                //Log(finalStacks);
            });

            finalStacks.forEach(stack => {
                result = result.concat(stack.substring(stack.length - 1));
            }); 


            document.getElementById('thedata').innerHTML = "Cube ID On Top From Left to Right: " + result;
        }, false); 
      
        if (file) {
          reader.readAsText(file);
        }
      };

(function () {
    init();
})();


/*
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

   Crates   stack# to stack#
move 1 from     2  to    1
move 3 from     1  to    3
move 2 from     2  to    1
move 1 from     1  to    2

*/