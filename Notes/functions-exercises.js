// ========== Function Basics ==========

// 1) Write a function sayHello that logs "Hello, world!" to the console. Call it.
sayHello();
function sayHello(){
    console.log("Hello, world!")
};



// 2) Write a function greet(name) that takes one parameter and logs "Hello, <name>!".

function greet(name){
    return `Hello, ${name}`
};
// let randomVar = greet("Martin");
// console.log(randomVar);
// 3) Write a function add(a, b) that returns the sum of two numbers. 
//    Call it with arguments 5 and 7, and log the result.

// function add(a,b){
//     return a + b
// };
// console.log(add(5,7));

// 4) Write a function square(num) that returns the square of a number.
//    Test it with 4 and log the result.
// function square(num){
//     return num * num
// };

// console.log(square(4));


// 5) Write a function getLength(arr) that takes an array and returns its length.
// let otherNums = [1,2,3,4,5,6];
// let arrNums = [1,2,3]

// function getLength(arr){
//     return arr.length
// };

// console.log(getLength(otherNums));// arr === otherNums
// console.log(getLength(arrNums))// arr === arrNums

// ========== Parameters & Arguments ==========

// 6) Write a function getFullName(firstName, lastName) that returns a full name string.
//    Example: getFullName("Alice", "Smith") → "Alice Smith"

// function getFullName(firstName, lastName){
//         return `${firstName} ${lastName}`
// };
// console.log(getFullName("Martin", "Maldonado"));

// 7) Write a function multiply(x, y, z) that multiplies three numbers and returns the product.
// function multiply(x,y,z){
//     return x * y * z
// };

// console.log(multiply(1,1,1));

// 8) Fix the code: 
   function showMessage(msg) {
       console.log(msg);
   }
//    showMessage("Hi there");

// ========== Return & Scope ==========

// 9) Write a function isEven(n) that returns true if the number is even, false otherwise.

function isEven(n){
    return n % 2 === 0;
};

// console.log(isEven(3));
// console.log(isEven(2));

// 10) Write a function getDiscount(cartValue) that returns cartValue * 0.9 
//     if cartValue is greater than 100. Otherwise return cartValue.

// 11) Inside a function, declare a local variable secret = "hidden". 
//     Try logging secret outside the function. What happens?

// ========== Loops + Functions ==========

// 12) Write a function sumArray(arr) that loops through an array and returns the total sum.

// 13) Write a function findMax(arr) that loops through an array and returns the largest number.

// 14) Write a function printOdds(limit) that logs all odd numbers up to that limit.

// ========== Debugging (Find & Fix Errors) ==========

// 15) What’s wrong here?
//     function addTwo(a, b) {
//         return a + b;
//     }
//     console.log(addTwo(5));

// 16) What happens here and why?
//     function test() {
//         return;
//         console.log("After return");
//     }
//     test();

// 17) Fix the bug: 
//     function greetUser(name) {
//         console.log("Hello " + username);
//     }
//     greetUser("Martin");

// ========== Mini Project ==========
// Write a function getAverageScore(scores) that:
//   - Accepts an array of numbers
//   - Loops through the array to find the total
//   - Returns the average
//   - If the array has a 0, return "Error: invalid score"
// Call it with [80, 90, 100] and log the result.
let avgArray = [878, 90, 67]
function getAverageScore(scores){
    let total = 0;
    for(let score of scores){
        if(score === 0){
            return "Error: invalid score"
        }
        total += score;
    }
    return total / scores.length;
};

//score = 80   ---> total = 80
//score = 90  ----> total + 90 = 170
//score = 100 ----> total + 100 = 270
//total = 270
// return 270 / 3 = 90

console.log(getAverageScore([80, 90, 100, 75, 35]));
console.log(getAverageScore(avgArray));