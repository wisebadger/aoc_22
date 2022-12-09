const init = function() {
    let headingTitle = document.getElementById('titleHeading');
    headingTitle.innerHTML = "Tuning Trouble";
};

const Log = function(input){ console.log(input); }

const FixTuning = function(currentLetters,checkLetter) { 
        for (var i = 0; i < currentLetters.length; i++) {
            if (currentLetters[i] !== checkLetter) {
                for (let j = i + 1; j < currentLetters.length; j++) {
                    if(currentLetters[i] === currentLetters[j]
                    || currentLetters[j] === currentLetters[j + 1]
                    || currentLetters[j] === checkLetter){    
                        return false;
                    }
                }
            } else { 
                return false; 
            }
        }
        return true;
}

        // zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
        // nppdvjthqldpwncqszvftbrmjlhg

const GetDataFromFile = function() {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();

        
        reader.addEventListener("load", () => {
            
            // get data from file
            let rawData = reader.result;
            let result;
            let arrLetters = [];
            const uniqueAmount = 14; // how many unique letters until the message
            // commcodes_test && 4, expected result is 10
            // commcodes_test && 14, expected result is 29

            for (let i = 0; i < rawData.length; i++) {
                if (arrLetters.length >= 2) {
                    if(FixTuning(arrLetters, rawData[i], uniqueAmount)){
                        arrLetters.push(rawData[i]); // no dupes, add the letter
                        if(arrLetters.length === uniqueAmount) {
                            Log(arrLetters);
                            result = i + 1; // add 1 for the next index, start of message
                            break;
                        }
                    } else {
                        arrLetters.push(rawData[i]); // lets keep looking for our match
                        arrLetters = arrLetters.slice(1); // removes 1st element of our arrLetters
                    }
                } else {
                    arrLetters.push(rawData[i]); // populate the MT array
                }
            }

            document.getElementById('thedata').innerHTML = "start-of-packet marker: " + result;
        }, false); 
      
        if (file) {
          reader.readAsText(file);
        }
      };

(function () {
    init();
})();

// 1987 wrong