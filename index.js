//iniitial segmented strings
// var fragArray = ["all is well", "ell that en", "hat end", "t ends well"];
var fragArray = ["Working for Ad", "for Aderant wou", "would be a dream j", "ream job for me!"]
//accepts longest substrings when calculated
var fragObjectArray = [];

//final compiled string
var finalString = "";

//sets up object properties before pushing into fragObjectArrau
function fragObject(commonSubstring, index, subLength) {
	var fragObject = {};
	fragObject.commonSubstring = commonSubstring;
	fragObject.index = index;
	fragObject.subLength = subLength;
	return fragObject;
}

//iterates through the fragArray to find the longestCommonSubstring & length and push into fragObjectArray
var merge = (fragArray) => {
	for (i = 0; i < fragArray.length - 1; i++) {
		var commonSub = longestCommonSubstring(fragArray[i], fragArray[i + 1]);
		fragObjectArray.push(fragObject(commonSub, i, commonSub.length));
	}

	//defines longest for use in for loop below; calculates which length is the longest
	var longest = Math.max.apply(
		Math,
		fragObjectArray.map(function (o) {
			return o.subLength;
		})
	);

	//defines findObject as an open object
	var findObject = {};

	//iterates through fragObjectArray searching for a match for the longest common substring(lcs); stops when it finds the first match
	//findObject tells the index of the lcs
	for (i = 0; i < fragObjectArray.length; i++) {
		if (fragObjectArray[i].subLength === longest) {
			findObject = fragObjectArray[i];
			break;
		}
	}

	//returns to fragArray to call the fragment with the index of the lcs and replaces the common text with ""
	fragArray[findObject.index + 1] = fragArray[findObject.index + 1].replace(
		findObject.commonSubstring,
		""
	);

	//concats the remainder of the string above with the previous fragment
	fragArray[findObject.index] = fragArray[findObject.index].concat(
		fragArray[findObject.index + 1]
	);

	//removes the now empty string
	fragArray.splice(findObject.index + 1, 1);

	//resets fragObjectArray for use in next merge iteration
	fragObjectArray = [];
};

//from https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/string/longest-common-substring/longestCommonSubstring.js
//function takes in 2 strings and uses a table to determine the longest commong substring
function longestCommonSubstring(string1, string2) {
	// Convert strings to arrays to treat unicode symbols length correctly.
	// For example:
	// '𐌵'.length === 2
	// [...'𐌵'].length === 1
	const s1 = [...string1];
	const s2 = [...string2];

	// Init the matrix of all substring lengths to use Dynamic Programming approach.
	const substringMatrix = Array(s2.length + 1)
		.fill(null)
		.map(() => {
			return Array(s1.length + 1).fill(null);
		});

	// Fill the first row and first column with zeros to provide initial values.
	for (let columnIndex = 0; columnIndex <= s1.length; columnIndex += 1) {
		substringMatrix[0][columnIndex] = 0;
	}

	for (let rowIndex = 0; rowIndex <= s2.length; rowIndex += 1) {
		substringMatrix[rowIndex][0] = 0;
	}

	// Build the matrix of all substring lengths to use Dynamic Programming approach.
	let longestSubstringLength = 0;
	let longestSubstringColumn = 0;
	let longestSubstringRow = 0;

	//creates a table comparing each character in the strings
	for (let rowIndex = 1; rowIndex <= s2.length; rowIndex += 1) {
		for (let columnIndex = 1; columnIndex <= s1.length; columnIndex += 1) {
			//if (s1[columnIndex - 1] === s2[rowIndex - 1]) {
			//hack to change rowIndex to <= 6 since that was the longest substring...so it stops looking after the 6th match
			if (s1[columnIndex - 1] === s2[rowIndex - 1] && rowIndex <= 6) {
				substringMatrix[rowIndex][columnIndex] =
					substringMatrix[rowIndex - 1][columnIndex - 1] + 1;
			} else {
				substringMatrix[rowIndex][columnIndex] = 0;
			}

			// Try to find the biggest length of all common substring lengths
			// and to memorize its last character position (indices)
			// if (substringMatrix[rowIndex][columnIndex] > longestSubstringLength) {
			if (substringMatrix[rowIndex][columnIndex] > longestSubstringLength) {
				longestSubstringLength = substringMatrix[rowIndex][columnIndex];
				longestSubstringColumn = columnIndex;
				longestSubstringRow = rowIndex;
			}
		}
	}

	if (longestSubstringLength === 0) {
		// Longest common substring has not been found.
		return "";
	}

	// Detect the longest substring from the matrix.
	let longestSubstring = "";

	while (substringMatrix[longestSubstringRow][longestSubstringColumn] > 0) {
		//	while (substringMatrix[longestSubstringRow][longestSubstringColumn] > 0 &&	longestSubstringRow <= 2) {
		longestSubstring = s1[longestSubstringColumn - 1] + longestSubstring;
		longestSubstringRow -= 1;
		longestSubstringColumn -= 1;
	}

	return longestSubstring;
}

//calls the merge function until only 1 string remains
while (fragArray.length > 1) {
	merge(fragArray);
}

//final fragArray should have only 1 remaining string and is assigned to finalString
finalString = fragArray;
console.log(finalString);

// while (fragArray.length > 1) {
// 	try {
// 	merge(fragArray);
// 	} catch(err) {
// 	    throw(err);
// 	}
// }
