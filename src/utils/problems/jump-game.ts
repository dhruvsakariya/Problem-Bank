import type { Problem } from "../types/Problem";

export const jumpGame: Problem = {
  id: "jump-game",
  title: "3. Jump Game",
  difficulty: "Medium",
  problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code>. You are initially positioned at the <strong>first index</strong>
    and each element in the array represents your maximum jump length at that position.
  </p>
    <p class='mt-3'>
    Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
    </p>
  `,

  examples: [
    {
      id: 1,
      inputText: `nums = [2,3,1,1,4]`,
      outputText: `true`,
      expectedText: `true`,
      stdin: `1
5
2 3 1 1 4
`,
      explanation:
        "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
    },
    {
      id: 2,
      inputText: `nums = [3,2,1,0,4]`,
      outputText: `false`,
      expectedText: `false`,
      stdin: `1
5
3 2 1 0 4
`,
      explanation:
        "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
    },
    {
      id: 3,
      inputText: `nums = [2,5,0,0]`,
      outputText: `true`,
      expectedText: `true`,
      stdin: `1
4
2 5 0 0
`,
    },
    {
      id: 4,
      inputText: `nums = [1,1,2,2,0,1,1]`,
      outputText: `true`,
      expectedText: `true`,
      stdin: `1
7
1 1 2 2 0 1 1
`,
    },
    {
      id: 5,
      inputText: `nums = [0,2,3]`,
      outputText: `false`,
      expectedText: `false`,
      stdin: `1
3
0 2 3
`,
    },
  ],
  constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
    <li class='mt-2'><code>0 <= nums[i] <= 10^5</code></li>`,
  python3StarterCode: `from typing import List

class Solution:
    def canJump(self, nums: List[int]) -> bool:


def main():
    t = int(input())  # Number of test cases
    obj = Solution()

    output = []

    for _ in range(t):
        n = int(input())  # Size of the array
        nums = list(map(int, input().split()))  # Elements of the array

        result = obj.canJump(nums)
        output.append(str(result).lower())  # Convert to lowercase

    print("\\n".join(output))  # Print all results on separate lines

if __name__ == "__main__":
    main()
`,
  cppStarterCode: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        
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

        Solution obj;
        bool result = obj.canJump(nums);

        cout << (result ? "true" : "false") << endl;
    }

    return 0;
}`,
  javaStarterCode: `import java.util.Scanner;

public class Solution {
    public boolean canJump(int[] nums) {

    }

    public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);

      int t = scanner.nextInt(); // Number of test cases
      Solution obj = new Solution();

      StringBuilder output = new StringBuilder();

      for (int i = 0; i < t; ++i) {
          int n = scanner.nextInt(); // Size of the array
          int[] nums = new int[n];

          for (int j = 0; j < n; j++) {
              nums[j] = scanner.nextInt(); // Elements of the array
          }

          boolean result = obj.canJump(nums);
          output.append(result).append("\\n"); // Append newline after each result
      }

      System.out.println(output.toString().trim()); // Print all results together with a newline at the end
      scanner.close();
    }
}`,
  // handlerFunction: jumpGameHandler,
  // starterFunctionName: "function canJump(",
  testCases: `5
5
2 3 1 1 4
5
3 2 1 0 4
4
2 5 0 0
7
1 1 2 2 0 1 1
3
0 2 3
`,

  expectedOutput: `true
false
true
true
false
`,
  order: 3,
};
