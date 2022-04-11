// https://narr.github.io/blog/2016/08/04/smallest-substring-of-all-characters/

// a naive solution(Narr)
function smallestSubString(arr, str) {
    // avoid creating variables in loop for performance
  
    const arrLen = arr.length;
    // The minimum length of substring should be given array's length.
    let lenOfSubStr = arrLen;
    const strLen = str.length;
  
    let startIdx = 0;
    let subStr;
    let match; // check if the substring have all characters of the given array
    let i;
    let val;
  
    // The maximum length of substring should not be bigger than the given str's length.
    // loop while increasing the length of substring
    // because it is to find the smallest one
    while (lenOfSubStr <= strLen) {
      subStr = str.substr(startIdx, lenOfSubStr);
      // if substring's length isn't the same with lenOfSubStr,
      // it means it can't get the length of the substring from startIdx for lenOfSubStr
      // so to check the next length of substring, set startIdx = 0 and increase lenOfSubStr
      if (subStr.length === lenOfSubStr) {
        match = true;
        // check if subStr have all characters of the given array
        for (i = 0; i < arrLen; i++) {
          val = arr[i];
          if (subStr.indexOf(val) === -1) {
            match = false;
            break;
          }
        }
        if (match) {
          return subStr;
        }
        startIdx++;
      } else {
        startIdx = 0;
        lenOfSubStr++;
      }
    }
    return null; // no matched substring
  }
  
  const test1 = `['x', 'y', 'z'], 'xyyzyzyx' => ${smallestSubString(['x', 'y', 'z'], 'xyyzyzyx')}`;
  const test2 = `['x', 'y', 'z'], 'xxyyzz' => ${smallestSubString(['x', 'y', 'z'], 'xxyyzz')}`;
  const test3 = `['x', 'y', 'z'], 'xyz' => ${smallestSubString(['x', 'y', 'z'], 'xyz')}`;
  const test4 = `['x', 'y', 'z'], 'xxyyxx' => ${smallestSubString(['x', 'y', 'z'], 'xxyyxx')}`;
  
  console.log(test1);
  console.log(test2);
  console.log(test3);
  console.log(test4);
  
  
  
  
  // from the solution
  function getShortestUniqueSubstring(arr, str) {
    let i;
    let arrLen = arr.length;
    // to check how many chars from the given array are in the substring, respectively
    let countMap = {};
    for (i = 0; i < arrLen; i++) {
      countMap[arr[i]] = 0;
    }
  
    let h; // index of head
    let strLen = str.length;
    let head; // a char of the head index
    let headCount;
    let uniqueCounter = 0;
  
    let t = 0; // index of tail
    let tempLength;
    let result = null;
    let tail;
    let tailCount;
  
    for (h = 0; h < strLen; h++) {
      head = str.charAt(h);
      headCount = countMap[head];
      // if head is not a char in the given array, ignore it
      if (headCount === undefined) {
        continue;
      }
      if (headCount === 0) {
        uniqueCounter++;
      }
      countMap[head] = headCount + 1;
  
      // if the substring have all characters from the given array
      // move the tail to find the smallest substring
      while (uniqueCounter === arrLen) {
        tempLength = h - t + 1;
        if (tempLength == arrLen) { // the minimum length, no need to continue
          return str.substring(t, h + 1);
        }
        if (!result || tempLength < result.length) {
          result = str.substring(t, h + 1);
        }
  
        tail = str.charAt(t);
        tailCount = countMap[tail];
        // if tail is not a char in the given array, ignore it
        if (tailCount !== undefined) {
          tailCount--;
          if (tailCount === 0) {
            uniqueCounter--;
          }
          countMap[tail] = tailCount;
        }
        t = t + 1;
      }
    }
    return result;
  }
  
  /*
   * Runtime Complexity: we're doing a linear iteration of both str and arr of lengths n and m
   * respectively, so the runtime complexity is a linear O(n + m)
   * Big O is O(n)
   *
   * Space Complexity: O(m) - we're using countMap with m keys (the length of arr)
   * plus few constant size counters
   */
  
  let result = `
    ['x', 'y', 'z'], 'xxyyzz' =>
    ${getShortestUniqueSubstring(['x', 'y', 'z'], 'xxyyzz')}
  
    ['x', 'y', 'z'], 'xyyzyzyx' =>
    ${getShortestUniqueSubstring(['x', 'y', 'z'], 'xyyzyzyx')}
  
    ['x', 'y', 'z'], 'xyz' =>
    ${getShortestUniqueSubstring(['x', 'y', 'z'], 'xyz')}
  
    ['x', 'y', 'z'], 'xxyyxx' =>
    ${getShortestUniqueSubstring(['x', 'y', 'z'], 'xxyyxx')}
  `;
  
  document.getElementById('result').innerText = result;
  
  