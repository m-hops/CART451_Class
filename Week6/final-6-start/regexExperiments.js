/*INTRO::
   regualar expressions are patterns that are used to match character combinations in strings:
    These patterns are used with the exec() and test() methods of the regEx object
    and these patterns can ALSO be used with :
    match(), matchAll(),replace(),replaceAll(), search(), split() -> string methods*/


    /* construction of a regular expression:: */
    
     // 1st way: Using a regular expression literal,
     // which consists of a pattern enclosed between slashes, as follows:
     let regularExpressionOne = /ab+c/;

    //2nd way : calling the constructor function of the RegExp object, as follows:
    let regularExpressionTwo = new RegExp('ab+c');

    /* HOW TO WRITE THE PATTERN ?
   A regular expression pattern is composed:
    of simple characters, such as /abc/, 
   or a combination of simple and special characters,
   such as /ab*c/ or /Chapter (\d+)\.\
   */


    /* SIMPLE PATTERNS :: DIRECT MATCH
   Simple patterns are constructed of characters for which you want to find a direct match.
   For example, the pattern /abc/ matches character combinations in strings only when the
   exact sequence "abc" occurs (all characters together and in that order).

   Such a match would succeed in the strings "Hi, do you know your abc's?"
   and "The latest airplane designs evolved from slabcraft."
   In both cases the match is with the substring "abc".

   There is no match in the string "Grab crab" because while it contains the substring "ab c",
   it does not contain the exact substring "abc". */

//IMPLEMENTATION A:
//does abc as a sequence occur anywhere in a string?
console.log("Implementation A");
let simpleRegA = /abc/;
console.log(simpleRegA.test("Hi, do you know your abbc's?" ));//false
console.log(simpleRegA.test("The latest airplane designs evolved from slabcraft." ));//true
console.log(simpleRegA.test("Grab crab" )); //false
//  //NOTE: -> finding out whether a string has abc in it could have been achieved with the indexOf() method ->'
 console.log("The latest airplane designs evolved from slabcraft.".indexOf("abc"))

  //REGULAR EXPRESSIONS CAN DO MUCH MORE :)

 /*2: Say we want to match any number.
 In a regular expression, putting a set of characters between square brackets 
 makes that part of the expression match *any* (not all) of the characters between the brackets.*/
  // IMPLEMENTATION B:
 // match all strings that contain a digit 9:
 console.log("Implementation B")
 let digitMatchNine = /9/;
 console.log(digitMatchNine.test("in 1992" ));//true
 console.log(digitMatchNine.test("in 1887" ));//false

  // IMPLEMENTATION C:
 // match all strings that contain any digit:
 console.log("Implementation C")
let anyDigitMatch = /[0123456789]/;
let anyDigitMAtchHyphen = /[0-9]/; // hyhen can be used to indicate a RANGE of chars
console.log(anyDigitMatch.test("in 1992" ));//true
console.log(anyDigitMatch.test("in in 1887" ));//true
console.log(anyDigitMatch.test("in in no digit" ));//false

     // IMPLEMENTATION D:
 // match all strings that contain any digit (using range notation):
 console.log("Implementation D")
 let anyDigitMatchHyphen = /[0-9]/; // hyphen can be used to indicate a RANGE of chars
 console.log(anyDigitMatchHyphen.test("in 1992" ));//true
 console.log(anyDigitMatchHyphen.test("in in 1887" ));//true
 console.log(anyDigitMatchHyphen.test("in in no digit" ));//true

   let notSame = /0123456789/; //
  console.log(notSame.test("in 1992" ));//false
  console.log(notSame.test("in 0123456789ccc" )) //true

      // IMPLEMENTATION E:
 // match all strings that contain any letter (using range notation):
console.log("Implementation E")
 let anyLetterMatchHyphen = /[a-z]/; // hyphen can be used to indicate a RANGE of chars
 console.log(anyLetterMatchHyphen.test("in 1992" ));//true
 console.log(anyLetterMatchHyphen.test("in in 1887" ));//true
 console.log(anyLetterMatchHyphen.test("1887" ));//false
 console.log(anyLetterMatchHyphen.test("B1887A" ));//false

  let anyLetterMatchHyphencase = /[a-z]/i; // case insensitive
  console.log(anyLetterMatchHyphencase.test("B1887A" ));//true
  console.log(anyLetterMatchHyphencase.test("123" ));//false

   /*IMPLEMENTATION F*/

console.log("Implementation F")
console.log((/\d/).test("abcd")); //false
console.log((/\w/).test("abcd")); //true
console.log((/\w/).test("12")); //true
console.log((/\w/).test("?*")); //false
console.log((/\W/).test("1?*")); //true

/* IMPLEMENTATION G :
To invert a set of characters—that is, 
to express that you want to match any character except 
the ones in the set—you can write a caret (^) character after the opening bracket. */
// console.log("Implementation G")
// console.log((/[^0-9]/).test("abcd")); //true**
// console.log((/[^\w/]/).test("abcd")); //false
// console.log((/[^0-9]/).test("abcd1")); //true** -> there are sequences that match :
// //let result_A = "abcd1".match(/[^0-9]/);
// //console.log(result_A);
// console.log((/[^\w/]/).test("124445**")); //true
// console.log((/[^\d/]/).test("absbsbs**")); //true

/* REPEATING PARTS OF A PATTERN :: i.e. what if instead of checking for a single char
we want to check for a sequence of chars?*/

/* Implementation H:--> IF you put the "+" sign after something in the expression 
it indicates that the pattern may be repeated one or more times*/
// console.log((/[0-9]+/).test("123")); //true

/* Implementation I:--> IF you put the "*" sign after something in the expression it indicates that the 
pattern may be repeated zero or more times*/
//  console.log((/[0-9]*/).test("abd")); //true

 /* Implementation J: --> A question mark makes a part of a pattern <optional>, 
meaning it may occur zero times or one time.*/
//IE make the 'u 'optional

// console.log((/neighbou?r/).test("neighbour")); //true
// console.log((/eighbou?r/).test("neighbor")); //true
// console.log((/neighbou?r/).test("eighbor")); //false
// console.log((/neighbou?r/).test("neighbo")); //false

/*Implementation K
if you want a pattern to occur a precise number of times - use BRACES ::
i.e. {4} - occur 4 times ... {2,4}  == occur at least 2 and at most 4
//opene ended ranges == {5, } //5 to infinite.
*/
// //1 -2 digits followed by '- ' followed by 1-2 digits   ... 
// let date_time_pattern = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
//  console.log(date_time_pattern.test("29-09-2022 8:45")); //true
// console.log(date_time_pattern.test("29-09-202 8:45")); //false
// console.log(date_time_pattern.test("aa-09-2022 8:45")); //false
// console.log(date_time_pattern.test("29-0-2022 8:45")); //true
// console.log(date_time_pattern.test("29-0-2022 8:vb")); //false


/* Implementation L Grouping Subexpressions
To use an operator like * or + on more than one element at a time, 
you have to use parentheses. 
A part of a regular expression that is enclosed in parentheses
 counts as a single element as far as the operators following it are concerned.
 i.e.::
*/
// i  == case insensitive
 let phraseTest  = /boo+(hoo+)+/i;
 //1st + only applies to second o in first boo
//2nd + only applies to second o in hoo 
//3rd + applies to entire (hoo) 

// console.log(phraseTest.test("boohoo")); //true
// console.log(phraseTest.test("boohoohoo")); //true
// console.log(phraseTest.test("booooooboohoo")); //true

// console.log(phraseTest.test("booooooboo")); //false
// console.log(phraseTest.test("boooosmndmsndmsnooboohoo")); //true

/**** MATCH */
/*The exec method Implementation M
Regular expressions also have an exec (execute) method 
that will return null if no match was found and return an object 
with information about the match otherwise.

*/

//  let match = /\d+/.exec("one two 100");
//  console.log(match);
//   //exec() has an index property  - tells us where the match was found (position in string)
// console.log(match.index);

// //? is optional ->its position in the output array will hold undefined
// let matchMark= /sad(ly)?/.exec("sad");
// console.log(matchMark);

//when a group is matched multiple times, only the last match ends up in the array

// let matchNone= /(\d)+/.exec("sad is sad"); //--> gives null
// console.log(matchNone);

// let matchMultiples= /(\d)+/.exec("123");
// console.log(matchMultiples);
// console.log(matchMultiples.index);

// // LAST :: CHOICE PATTERNS (USING OR)

/*digit followed by 
want either apple OR pear OR melon (use the pipe)*/
// let fruitCount = /\d+ (apple|pear|melon)/;
// console.log(fruitCount.test("15 melons")); //true
// console.log(fruitCount.test("15 melonsapple")); //true
// console.log(fruitCount.test("melonsapple 15")); //false
// console.log(fruitCount.test("melon")); //false


// // \\b -> boundary : so the pattern either at begin or end (depending on where the \b is placed)
// let fruitCountBoundaries = /\b\d+ (apple|pear|melon)\b/;

//orig
// console.log(fruitCount.test("15 melons xmsndsj")); //true
// //new
// console.log(fruitCountBoundaries.test("15 melons xmsndsj")); //false

// console.log(fruitCountBoundaries.test("mzx,mxz,m15 melon")); //false
// console.log(fruitCountBoundaries.test("15 melon")); //true
// console.log(fruitCountBoundaries.test("melon 15")); //false
/** */
// console.log(fruitCountBoundaries.test("15 melons")); //false

// /// include s(plural)
// let fruitCountBoundariesPl = /\b\d+ (apple|pear|melon)s?\b/;
// console.log(fruitCountBoundariesPl.test("15 melons")); //true
// console.log(fruitCountBoundariesPl.test("15 melonsapple")); //false
// console.log(fruitCountBoundariesPl.test("15 Apples")); //false

// //case insensitive
// let fruitCountBoundariesPlIn = /\b\d+ (apple|pear|melon)s?\b/i;
// console.log(fruitCountBoundariesPlIn.test("15 Apples")); //true..

/*LAST LAST
strings -> have a replace() - replace string a with b
*/
console.log("today is wednesday".replace(" ","$")); //->today$is wednesday
// //will ONLY do first instance?



//When a g option (for global) is added to the regular expression,
//ALL matches in the string will be replaced, not just the first.
console.log("today is wednesday".replace(/ /g,"$")); //->today$is$wednesday

//POWER: when using regular expressions WITH replace() -> we can refer to the matched groups
//in the replacemnet string ...
console.log("Listov, Barbara".replace(/(\w+), (\w+)/,"$2 $1")) //reverse the 2 words
console.log("Listov, Barbara Bullock, Sandra".replace(/(\w+), (\w+)/g,"$2 $1")) //reverse the pairs

/*The $1 and $2 in the replacement string refer to the parenthesized groups in the pattern.
$1 is replaced by the text that matched against the first group,
$2 by the second, and so on, up to $9.
The whole match can be referred to with $&.*/

//double the vowels::
let regexVowels = /([aeiou])/gi; //case insensitive and all matches


console.log(doubleM("sabine is very tired"));
console.log(tripleM("sabine is very tired"));

function doubleM(test){
    return test.replace(regexVowels, '$1$1')
}
function tripleM(test){
    return test.replace(regexVowels, '$1$1$1')
}

/*USING SPLIT AND REGEX 
// you can split on a char . .. returns an array::

i.e.
*/
 let stringT = "let us split on an s";
 let splitS = stringT.split("s"); //-> s's remove
 console.log(splitS);
 //use a regex!
 let sSPlitReg = /s/
 let splitSR = stringT.split(sSPlitReg); //-> s's remove
 console.log(splitSR);

 //  //** USEFUL:: TOKENIZE */
 // more clever let use say we want to  split on any of the following == tokenize ;)
 let rePun = /[.:;?! !@#$%^&*()+,]/; // there is a space in the regex

 let splitSR2 = stringT.split(rePun); //-> space's remove
 console.log(splitSR2);
 //or
 let splitSR3 = ("this has puncuation").split(rePun); //-> spaces's remove
 console.log(splitSR3);

 //** USEFUL:: SENTENCE SPLIT */
 let reSentence = /[.:;?!]/g;
 let splitSR4 = ("this is one sentence. This is a second sentence").split(reSentence); //-> s's remove
 console.log(splitSR4);

















        




