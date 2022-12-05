const init = function() {
    let headingTitle = document.getElementById('titleHeading');
    headingTitle.innerHTML = "Elf Cleanup";
};

const isContained = function(sectionRangeA, sectionRangeB){
    let section1 = sectionRangeA.split('-');
    let section2 = sectionRangeB.split('-');

    let A = parseInt(section1[0]);
    let B = parseInt(section1[1]);
    let C = parseInt(section2[0]);
    let D = parseInt(section2[1]);

    if (A >= C && D >= B) {
            return true;
    } else if (C >= A && B >= D) {
            return true;
    } else if (A == B && C <= B && D >= B) {
            return true;
    } else if (C == D && A <= C && B >= D) {
            return true;
    } else {
            return false;
    }

/*   CD
.....6...  6-6 // pair 1
   A B
...456...  4-6 // pair 1
*/
    // section1[0] = A
    // section1[1] = B
    // section2[0] = C
    // section2[1] = D

    // if A <= C && B >= D -- contained
    // if C <= A && D >= B -- contained
    // if A == B && C <= B -- contained
    // if C == D && A <= C -- contained

    // if C is >= A && B is >= D
}

const GetDataFromFile = function() {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
            
            let sectionAssignments = reader.result.split("\n");
            console.log(sectionAssignments);
            let sectionCount = 0;
            let othercount = 0;
            let totalsections = sectionAssignments.length;

            sectionAssignments.forEach(section => {
                if(section != ""){
                    let sections = section.trim().split(',');
                    // uuid finder
                    // console.log("This UUID is: " + sectionAssignments.indexOf(section));
                    let elfOne = sections[0];
                    let elfTwo = sections[1];
                    if(isContained(elfOne,elfTwo)) { 
                        console.log("match #" + sectionCount + ": " + elfOne + " and " + elfTwo);
                        sectionCount++;
                    } else {
                        //console.log(elfOne + " and " + elfTwo);
                        othercount++;
                    }
                }
            });            

            console.log("Total Sections: " + totalsections + "\nTotal Matches: " + sectionCount + "\nTotal Fails: " + othercount);
            if (sectionCount + othercount == totalsections) { console.log("matched"); }
            document.getElementById('thedata').innerHTML = "Amount of sections to revise: " + sectionCount;

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