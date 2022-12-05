const init = function() {
    let headingTitle = document.getElementById('titleHeading');
    headingTitle.innerHTML = "Elf Cleanup";
};

const isContained = function(sectionRangeA, sectionRangeB){
    let section1 = sectionRangeA.split('-');
    let section2 = sectionRangeB.split('-');

    let A,B,C,D;

    A = parseInt(section1[0]);
    B = parseInt(section1[1]);
    C = parseInt(section2[0]);
    D = parseInt(section2[1]);

    let rangeA = createRange(A,B);
    let rangeB = createRange(C,D);

    let matchFound = false;
    
    rangeA.forEach(numberA => {
        rangeB.forEach(numberB => {
            if(numberA === numberB) { 
                matchFound = true;
            }
        });
    });

    let result = matchFound == true ? 1: 0;
    return result;

}

const createRange = function(start, end) {
    const range = [...Array(end - start + 1).keys()].map(x => x+start);
    return range;
}

const GetDataFromFile = function() {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
            
            let sectionAssignments = reader.result.split("\n");
            console.log(sectionAssignments);
            let sectionCount = 0;

            sectionAssignments.forEach(section => {
                console.log(section)
                if(section != ""){
                    let sections = section.trim().split(',');

                    let elfOne = sections[0];
                    let elfTwo = sections[1];
                    
                    sectionCount += isContained(elfOne,elfTwo);
                }
            });            

            document.getElementById('thedata').innerHTML = "Amount of overlapped sections: " + sectionCount;

        }, false); 
      
        if (file) {
          reader.readAsText(file);
        }
      };

(function () {
    init();
})();

// 432 wrong
// 567 wrong
// 530 is too high
// 359 wrong
// 268 wrong
// 527 wrong


/* Visual section assignments

2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8

and this visually below

Range    Section Range
           C D
.234.....  2-4

           A B 
.....678.  6-8

.23......  2-3
...45....  4-5

....567..  5-7
......789  7-9

.2345678.  2-8 // pair 2
..34567..  3-7 // pair 2

.....6...  6-6 // pair 1
...456...  4-6 // pair 1

.23456...  2-6 
...45678.  4-8
*/