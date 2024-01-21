import type { Problem } from "../types/Problem";

const starterCodeTwoSum = `function twoSum(nums,target){
  // Write your code here
};`;

// checks if the user has the correct code
// const handlerTwoSum = (fn: any) => {
//   // fn is the callback that user's code is passed into
//   try {
//     const nums = [
//       [2, 7, 11, 15],
//       [3, 2, 4],
//       [3, 3],
//       [1, 3, 2, 7, 4, 5],
//       [-10, -1, -18, -19],
//     ];

//     const targets = [9, 6, 6, 12, -19];
//     const answers = [
//       [0, 1],
//       [1, 2],
//       [0, 1],
//       [3, 5],
//       [1, 2],
//     ];

//     // loop all tests to check if the user's code is correct
//     for (let i = 0; i < nums.length; i++) {
//       // result is the output of the user's function and answer is the expected output
//       const result = fn(nums[i], targets[i]);
//     }
//     return true;
//   } catch (error: any) {
//     console.log("twoSum handler function error");
//     throw new Error(error);
//   }
// };

export const twoSum: Problem = {
  id: "two-sum",
  title: "1. Two Sum",
  difficulty: "Easy",
  problemStatement: `<p class='mt-3'>
  Given an array of integers <code>nums</code> and an integer <code>target</code>, return
  <em>indices of the two numbers such that they add up to</em> <code>target</code>.
</p>
<p class='mt-3'>
  You may assume that each input would have <strong>exactly one solution</strong>, and you
  may not use thesame element twice.
</p>
<p class='mt-3'>You can return the answer in any order.</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [2,7,11,15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      inputText: "nums = [3,2,4], target = 6",
      outputText: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      id: 3,
      inputText: "nums = [3,3], target = 6",
      outputText: "[0,1]",
      explanation:
        "Indices 0 and 1 correspond to elements whose sum equals the target (6).",
    },
    {
      id: 4,
      inputText: "nums = [1, 3, 2, 7, 4, 5], target = 12",
      outputText: "[3, 5]",
    },
    {
      id: 5,
      inputText: "nums = [-10, -1, -18, -19], target = -19",
      outputText: "[1, 2]",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>2 ≤ nums.length ≤ 10</code>
</li> <li class='mt-2'>
<code>-10 ≤ nums[i] ≤ 10</code>
</li> <li class='mt-2'>
<code>-10 ≤ target ≤ 10</code>
</li>
<li class='mt-2 text-sm'>
<strong>Only one valid answer exists.</strong>
</li>`,
  // handlerFunction: handlerTwoSum,
  // starterCode: starterCodeTwoSum,
  javascriptStarterCode: `/**
  * @param {number[]} nums
  * @param {number} target
  * @return {number[]}
  */
 var twoSum = function(nums, target) {
     
 };`,
  cppStarterCode: `class Solution {
  public:
      vector<int> twoSum(vector<int>& nums, int target) {
          
      }
  };`,
  javaStarterCode: `class Solution {
  public int[] twoSum(int[] nums, int target) {
      
  }
}`,
  order: 1,
  starterFunctionName: "function twoSum(",
};
