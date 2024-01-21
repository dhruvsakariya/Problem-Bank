import type { Problem } from "../types/Problem";
import example1 from "./images/reverseLL.jpg";
import example2 from "./images/rev1ex2.jpg";

// JS doesn't have a built in LinkedList class, so we'll create one
// class LinkedList {
//   value: number;
//   next: LinkedList | null;

//   constructor(value: number) {
//     this.value = value;
//     this.next = null;
//   }

//   reverse(): LinkedList {
//     let current: LinkedList | null = this;
//     let prev: LinkedList | null = null;
//     while (current !== null) {
//       const next = current.next as LinkedList;
//       current.next = prev;
//       prev = current;
//       current = next;
//     }
//     return prev!;
//   }
// }

// export const reverseLinkedListHandler = (fn: any) => {
// 	try {
// 		const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
// 		const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
// 		for (let i = 0; i < tests.length; i++) {
// 			const list = createLinkedList(tests[i]);
// 			const result = fn(list);
// 			assert.deepEqual(getListValues(result), answers[i]);
// 		}
// 		return true;
// 	} catch (error: any) {
// 		console.log("Error from reverseLinkedListHandler: ", error);
// 		throw new Error(error);
// 	}
// };

// it creates a linked list from an array
// function createLinkedList(values: number[]): LinkedList {
//   const head = new LinkedList(values[0]);
//   let current = head;
//   for (let i = 1; i < values.length; i++) {
//     const node = new LinkedList(values[i]);
//     current.next = node;
//     current = node;
//   }
//   return head;
// }

// it returns an array of values from a linked list
// function getListValues(head: LinkedList): number[] {
//   const values = [];
//   let current: LinkedList | null = head;
//   while (current !== null) {
//     values.push(current.value);
//     current = current.next;
//   }
//   return values;
// }

const starterCodeReverseLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function reverseLinkedList(head) {
  // Write your code here
};`;

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
javascriptStarterCode: `/**
* Definition for singly-linked list.
* function ListNode(val, next) {
*     this.val = (val===undefined ? 0 : val)
*     this.next = (next===undefined ? null : next)
* }
*/
/**
* @param {ListNode} head
* @return {ListNode}
*/
var reverseList = function(head) {
   
};`,
cppStarterCode: `/**
* Definition for singly-linked list.
* struct ListNode {
*     int val;
*     ListNode *next;
*     ListNode() : val(0), next(nullptr) {}
*     ListNode(int x) : val(x), next(nullptr) {}
*     ListNode(int x, ListNode *next) : val(x), next(next) {}
* };
*/
class Solution {
public:
   ListNode* reverseList(ListNode* head) {
       
   }
};`,
javaStarterCode: `/**
* Definition for singly-linked list.
* public class ListNode {
*     int val;
*     ListNode next;
*     ListNode() {}
*     ListNode(int val) { this.val = val; }
*     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
* }
*/
class Solution {
   public ListNode reverseList(ListNode head) {
       
   }
}`,
  // handlerFunction: reverseLinkedListHandler,
  starterFunctionName: "function reverseLinkedList(",
  order: 2,
};