// import assert from "assert";
import type { Problem } from "../types/Problem";

// export const validParenthesesHandler = (fn: any) => {
// 	try {
// 		const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
// 		const answers = [true, true, false, false, true];
// 		for (let i = 0; i < tests.length; i++) {
// 			const result = fn(tests[i]);
// 			assert.deepEqual(result, answers[i]);
// 		}
// 		return true;
// 	} catch (error: any) {
// 		console.error("Error from validParenthesesHandler: ", error);
// 		throw new Error(error);
// 	}
// };

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your code here
};`;

export const validParentheses: Problem = {
  id: "valid-parentheses",
  title: "4. Valid Parentheses",
  difficulty: "Easy",
  problemStatement: `<p class='mt-3'>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p> <p class='mt-3'>An input string is valid if:</p> <ul> <li class='mt-2'>Open brackets must be closed by the same type of brackets.</li> <li class='mt-3'>Open brackets must be closed in the correct order.</li>
	<li class="mt-3">Every close bracket has a corresponding open bracket of the same type. </li>
	</ul>`,
  examples: [
    {
      id: 1,
      inputText: 's = "()"',
      outputText: "true",
    },
    {
      id: 2,
      inputText: 's = "()[]{}"',
      outputText: "true",
    },
    {
      id: 3,
      inputText: 's = "(]"',
      outputText: "false",
    },
    {
      id: 4,
      inputText: 's = "([)]"',
      outputText: "false",
    },
    {
      id: 5,
      inputText: 's = "(){}}{"',
      outputText: "false",
    },
  ],
  constraints: `<li class='mt-2'><code>1 <= s.length <= 10<sup>4</sup></code></li>
<li class='mt-2 '><code>s</code> consists of parentheses only <code class="text-md">'()[]{}'</code>.</li>`,
  // handlerFunction: validParenthesesHandler,
  python3StarterCode: `from typing import List

class Solution:
    def isValid(self, s: str) -> bool:
        d = {'(': ')', '{': '}', '[': ']'}
        stack = []

        for i in s:
            if i in d:
                stack.append(i)
            elif len(stack) == 0 or d[stack.pop()] != i:
                return False

        return len(stack) == 0

def main():
    t = int(input())
    obj = Solution()
    output = []

    for _ in range(t):
        s = input()
        result = obj.isValid(s)
        output.append(str(result).lower())

    print("\\n".join(output))

if __name__ == "__main__":
    main()
`,
  cppStarterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {

    }
};

int main() {
    int t;
    cin >> t;

    while (t--) {
        string s;
        cin >> s;

        Solution obj;
        bool result = obj.isValid(s);

        cout << (result ? "true" : "false") << endl;
    }

    return 0;
}`,
  javaStarterCode: `import java.util.Scanner;
import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {

    }

    public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);

      int totalTestCases = scanner.nextInt();

      Solution obj = new Solution();

      StringBuilder output = new StringBuilder();

      for (int i = 0; i < totalTestCases; i++) {
          String s = scanner.next();
          boolean result = obj.isValid(s);
          output.append(result ? "true" : "false").append("\\n");
      }

      System.out.println(output.toString().trim());  // Print with an additional newline at the end
      scanner.close();
    }
}  
`,
  // starterFunctionName: "function validParentheses(",
  testCases: `5
()
()[]{}
(]
([)]
(){}}{
`,
  expectedOutput: `true
true
false
false
false
`,
  order: 4,
};
