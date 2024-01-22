import type { Problem } from "../types/Problem";
import example1 from "./images/reverseLL.jpg";
import example2 from "./images/rev1ex2.jpg";

export const reverseLinkedList: Problem = {
  id: "reverse-linked-list",
  title: "2. Reverse Linked List",
  difficulty: "Easy",
  problemStatement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>
	`,
  examples: [
    {
      id: 1,
      inputText: "head = [1,2,3,4,5]",
      outputText: "[5,4,3,2,1]",
      img: example1,
    },
    {
      id: 2,
      inputText: "head = [1,2]",
      outputText: "[2,1]",
      img: example2,
    },
    {
      id: 3,
      inputText: "head = [1,2,3]",
      outputText: "[3,2,1]",
    },
    {
      id: 4,
      inputText: "head = [1]",
      outputText: "[1]",
    },
    {
      id: 5,
      inputText: "head = [1,2,6,3,4,5,6]",
      outputText: "[6,5,4,3,6,2,1]",
    },
  ],

  constraints: `<li class='mt-2'>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-5000 <= Node.val <= 5000</code></li>`,

  python3StarterCode: `from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:


def main():
    t = int(input())

    solution = Solution()

    for _ in range(t):
        n = int(input())
        values = list(map(int, input().split()))

        head = None
        tail = None

        for val in values:
            new_node = ListNode(val)
            if head is None:
                head = tail = new_node
            else:
                tail.next = new_node
                tail = new_node

        result = solution.reverseList(head)

        # Output the reversed linked list without size information
        while result:
            print(result.val, end=" ")
            result = result.next

        print()  # Newline after each test case

if __name__ == "__main__":
    main()
`,

  cppStarterCode: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        // Input for the linked list
        ListNode* head = nullptr;
        ListNode* tail = nullptr;
        for (int i = 0; i < n; ++i) {
            int val;
            cin >> val;
            ListNode* newNode = new ListNode(val);
            if (!head) {
                head = tail = newNode;
            } else {
                tail->next = newNode;
                tail = newNode;
            }
        }

        Solution obj;
        ListNode* result = obj.reverseList(head);
        ListNode* current = result; // Keep a separate pointer to traverse the reversed list

        // Output the reversed linked list without size information
        while (current) {
            cout << current->val << " ";
            current = current->next;
        }
        cout << endl;
    }

    return 0;
}`,

  javaStarterCode: `import java.util.Scanner;

public class Main {
    static class ListNode {
        int val;
        ListNode next;

        ListNode() {}

        ListNode(int val) {
            this.val = val;
        }

        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }

    static class Solution {
        public ListNode reverseList(ListNode head) {

        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int t = scanner.nextInt();
        Solution solution = new Solution();
        StringBuilder output = new StringBuilder();

        for (int i = 0; i < t; ++i) {
            int n = scanner.nextInt();
            ListNode head = null;
            ListNode tail = null;

            for (int j = 0; j < n; ++j) {
                int val = scanner.nextInt();
                ListNode newNode = new ListNode(val);
                if (head == null) {
                    head = tail = newNode;
                } else {
                    tail.next = newNode;
                    tail = newNode;
                }
            }

            ListNode result = solution.reverseList(head);
            
            while (result != null) {
                output.append(result.val);
                if (result.next != null) {
                    output.append(" ");
                } else {
                    output.append(" ");  
                }
                result = result.next;
            }

            output.append("\\n");
        }

        System.out.print(output.toString());
        scanner.close();
    }
}`,
  testCases: `5
5
1 2 3 4 5
2
1 2
3
1 2 3
1
1
7
1 2 6 3 4 5 6
`,
  expectedOutput: `5 4 3 2 1 
2 1 
3 2 1 
1 
6 5 4 3 6 2 1 
`,
  order: 2,
};
