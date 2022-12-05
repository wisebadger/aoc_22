const init = function() {
    let headingTitle = document.getElementById('titleHeading');
    headingTitle.innerHTML = "Rucksack Reorganization";
};

const compareMe = function(arrOne, arrTwo) {
    for (let index = 0; index < arrOne.length; index++) {
        for (let i = 0; i < arrTwo.length; i++) {
            if (arrOne[index] === arrTwo[i]) {
                return arrTwo[i];
            }
        }
    }
}

const letterValueDictionary = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10, 'k': 11, 
    'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20, 'u': 21,
    'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26,

    'A': 27, 'B': 28, 'C': 29, 'D': 30, 'E': 31, 'F': 32, 'G': 33, 'H': 34, 'I': 35, 'J': 36, 'K': 37, 
    'L': 38, 'M': 39, 'N': 40, 'O': 41, 'P': 42, 'Q': 43, 'R': 44, 'S': 45, 'T': 46, 'U': 47,
    'V': 48, 'W': 49, 'X': 50, 'Y': 51, 'Z': 52
};

const GetDataFromFile = function() {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
            
            let arrAllRucks = reader.result.split("\n");
            let runningTotal = 0;

            arrAllRucks.forEach(ruck => {
                if(ruck != ""){
                    let compartOne = ruck.substring(0, ruck.length / 2).split("");
                    let compartTwo = ruck.substring(ruck.length / 2, ruck.length).split("");
                    runningTotal += letterValueDictionary[compareMe(compartOne,compartTwo)];
                }
            });
        document.getElementById('thedata').innerHTML = runningTotal;

        }, false); 
      
        if (file) {
          reader.readAsText(file);
        }
      };

(function () {
    init();
})();
