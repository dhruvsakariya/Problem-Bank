import type { Problem } from "../types/Problem";

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
      expectedText: `0 1`,
      stdin: `1
4 2 7 11 15 9
`,

      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      inputText: "nums = [3,2,4], target = 6",
      outputText: "[1,2]",
      expectedText: `1 2`,
      stdin: `1
3 3 2 4 6
`,
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      id: 3,
      inputText: "nums = [3,3], target = 6",
      outputText: "[0,1]",
      expectedText: `0 1`,
      stdin: `1
2 3 3 6
`,
      explanation:
        "Indices 0 and 1 correspond to elements whose sum equals the target (6).",
    },
    {
      id: 4,
      inputText: "nums = [1, 3, 2, 7, 4, 5], target = 12",
      outputText: "[3, 5]",
      expectedText: `3 5`,
      stdin: `1
6 1 3 2 7 4 5 12
`,
    },
    {
      id: 5,
      inputText: "nums = [-10, -1, -18, -19], target = -19",
      outputText: "[1, 2]",
      expectedText: `1 2`,
      stdin: `1
4 -10 -1 -18 -19 -19
`,
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
  python3StarterCode: `from typing import List

class Solution:
  def twoSum(self, nums: List[int], target: int) -> List[int]:
        

def main():
    t = int(input().strip())
    output = []

    for _ in range(t):
        # Read the entire line and split it into parts
        parts = list(map(int, input().strip().split()))

        # The first part is the size of the array (not used in this implementation)
        n = parts[0]

        # Extract the array elements and the target
        nums = parts[1:-1]
        target = parts[-1]

        obj = Solution()
        result = obj.twoSum(nums, target)

        if result:
            output.append(f"{result[0]} {result[1]}")
        else:
            output.append("No valid pair found")

    print('\\n'.join(output))

if __name__ == "__main__":
    main()
`,

  cppStarterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;
        vector<int> nums(n);
  
        for (int i = 0; i < n; ++i) {
            cin >> nums[i];
        }

        int target;
        cin >> target;

        Solution obj;
        vector<int> result = obj.twoSum(nums, target);

        if (!result.empty()) {
          cout << result[0];
          for (size_t i = 1; i < result.size(); ++i) {
              cout << " " << result[i];
          }
      }

        cout << endl;
    }

    return 0;
}`,

  javaStarterCode: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Solution {
    public int[] twoSum(int[] nums, int target) {

    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int t = scanner.nextInt();
        StringBuilder output = new StringBuilder();

        while (t-- > 0) {
            int n = scanner.nextInt();
            int[] nums = new int[n];

            for (int i = 0; i < n; i++) {
                nums[i] = scanner.nextInt();
            }

            int target = scanner.nextInt();
            Solution obj = new Solution();
            int[] result = obj.twoSum(nums, target);

            if(result[0] != -1) {  // Check if a valid pair is found
                output.append(result[0]).append(" ").append(result[1]).append("\\n");
            } else {
                output.append("No valid pair found \\n");
            }
        }

        System.out.println(output.toString().trim());
        scanner.close();
    }
}`,
  order: 1,
  testCases: `5
4 2 7 11 15 9
3 3 2 4 6
2 3 3 6
6 1 3 2 7 4 5 12
4 -10 -1 -18 -19 -19
`,
  expectedOutput: `0 1
1 2
0 1
3 5
1 2
`,
};
