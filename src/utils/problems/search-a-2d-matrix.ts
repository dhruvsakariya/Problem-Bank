import type { Problem } from "../types/Problem";
import example1 from "./images/search-a-2d-1.jpg";
import example2 from "./images/search-a-2d-2.jpg";

export const search2DMatrix: Problem = {
  id: "search-a-2d-matrix",
  title: "5. Search a 2D Matrix",
  difficulty: "Medium",
  problemStatement: `
  <p class='mt-3'>Write an efficient algorithm that searches for a value in an <code>m x n</code> matrix. This matrix has the following properties:</p>
    <li class="mt-3">Integers in each row are sorted from left to right.</li>
    <li class="mt-3">The first integer of each row is greater than the last integer of the previous row.</li>
  <p class='mt-3'>Given <code>matrix</code>, an <code>m x n</code> matrix, and <code>target</code>, return <code>true</code> if <code>target</code> is in the matrix, and <code>false</code> otherwise.</p>
  `,
  examples: [
    {
      id: 1,
      inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
      outputText: `true`,
      expectedText: `true
`,
      stdin: `1
3 4
1 3 5 7
10 11 16 20
23 30 34 60
3
`,
      img: example1,
    },
    {
      id: 2,
      inputText: `matrix = [
        [1,3,5,7],
        [10,11,16,20],
        [23,30,34,60]
      ], target = 13`,
      outputText: `false`,
      expectedText: `false
`,
      stdin: `1
3 4
1 3 5 7
10 11 16 20
23 30 34 60
13
`,
      img: example2,
    },
    {
      id: 3,
      inputText: `matrix = [[1]], target = 1`,
      outputText: `true`,
      expectedText: `true
`,
      stdin: `1
1 1
1
1
`,
    },
    {
      id: 4,
      inputText: `matrix = [[1],[3],[5]] target = 3`,
      outputText: `true`,
      expectedText: `true
`,
      stdin: `1
3 1
1
3
5
3
`,
    },
    {
      id: 5,
      inputText: `matrix = [[1, 3]] target = 3`,
      outputText: `true`,
      expectedText: `true
`,
      stdin: `1
1 2
1 3
3
`,
    },
  ],
  constraints: `
  <li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 100</code></li>
  <li class='mt-2'><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
  `,
  python3StarterCode: `from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:


def main():
    t = int(input())  # Number of test cases
    obj = Solution()

    output = []

    for _ in range(t):
        rows, cols = map(int, input().split())
        matrix = [list(map(int, input().split())) for _ in range(rows)]
        target = int(input())

        result = obj.searchMatrix(matrix, target)
        output.append(str(result).lower())  # Convert to lowercase

    print("\\n".join(output))


if __name__ == "__main__":
    main()
`,
  cppStarterCode: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {

    }
};

int main() {
    int testCases;
    cin >> testCases;

    Solution obj;

    while (testCases--) {
        int m, n;
        cin >> m >> n;  // Number of rows and columns

        vector<vector<int>> matrix(m, vector<int>(n));

        // Input matrix elements
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                cin >> matrix[i][j];
            }
        }

        int target;
        cin >> target;  // Target value to search

        bool result = obj.searchMatrix(matrix, target);

        cout << (result ? "true" : "false") << endl;
    }

    return 0;
}
`,
  javaStarterCode: `import java.util.Scanner;

public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {

    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int totalTestCases = scanner.nextInt();
        Solution obj = new Solution();

        StringBuilder output = new StringBuilder();

        for (int i = 0; i < totalTestCases; i++) {
            int m = scanner.nextInt();
            int n = scanner.nextInt();

            int[][] matrix = new int[m][n];

            for (int row = 0; row < m; row++) {
                for (int col = 0; col < n; col++) {
                    matrix[row][col] = scanner.nextInt();
                }
            }

            int target = scanner.nextInt();

            boolean result = obj.searchMatrix(matrix, target);
            output.append(result ? "true" : "false").append("\\n");
        }

        System.out.println(output.toString().trim());  // Print with an additional newline at the end
        scanner.close();
    }
}`,
  // handlerFunction: search2DMatrixHandler,
  // starterFunctionName: "function searchMatrix",
  testCases: `5
3 4
1 3 5 7
10 11 16 20
23 30 34 60
3
3 4
1 3 5 7
10 11 16 20
23 30 34 60
13
1 1
1
1
3 1
1
3
5
3
1 2
1 3
3
`,
  expectedOutput: `true
false
true
true
true
`,
  order: 5,
};
