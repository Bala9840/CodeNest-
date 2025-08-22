export const codeTemplates = {
  python: `# Welcome to Python compiler
print("Hello, World!")

# Write your code here
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5))`,
  javascript: `// Welcome to JavaScript compiler
console.log("Hello, World!");

// Write your code here
function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(5));`,
  cpp: `// Welcome to C++ compiler
#include <iostream>
using namespace std;

// Write your code here
int factorial(int n) {
    if (n == 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

int main() {
    cout << "Hello, World!" << endl;
    cout << factorial(5) << endl;
    return 0;
}`,
  java: `// Welcome to Java compiler
public class Main {
    // Write your code here
    public static int factorial(int n) {
        if (n == 0) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println(factorial(5));
    }
}`
};

export const languageInfo = {
  python: 'Python is an interpreted, high-level, general-purpose programming language known for its readability and versatility.',
  javascript: 'JavaScript is a programming language primarily used for web development to create interactive effects within web browsers.',
  cpp: 'C++ is a general-purpose programming language created as an extension of the C programming language with object-oriented features.',
  java: 'Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible.'
};