/**
 * LeetCode Problem 13: Roman to Integer
 * 
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let total = 0;
    
    for (let i = 0; i < s.length; i++) {
        const current = romanMap[s[i]];
        const next = romanMap[s[i + 1]];
        
        // If the current value is less than the next value, subtract current value
        if (next && current < next) {
            total -= current;
        } else {
            // Otherwise, add current value
            total += current;
        }
    }
    
    return total;
};

// Example Test Cases:
console.log("III ->", romanToInt("III"));       // Output: 3
console.log("LVIII ->", romanToInt("LVIII"));   // Output: 58
console.log("MCMXCIV ->", romanToInt("MCMXCIV")); // Output: 1994

export default romanToInt;
