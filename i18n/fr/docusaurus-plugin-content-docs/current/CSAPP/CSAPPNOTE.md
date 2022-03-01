# Computer Systems

## A Tour of Computer Systems

Even though we made a substantial improvement to a major part of the system, our net speed up was significantly less than the speedup for the one part.


Integer arithmetic, always follows a principle: the smaller extends to the larger.
short -> unsigned short -> int -> unsigned int

Float IEEE754 ：https://blog.csdn.net/K346K346/article/details/50487127

The file must contain a main function

CF    (unsigned) t < (unsigned) aUnsigned overflow \
ZF    (t == 0)Zero \
SF    (t < 0)Negative \
OF   (a<0==b<0)&&(t<0!=a<0)Signed overflow

![img.png](img.png)

![Original and optimized code to compute element i, k of matrix product for fixed-length arrays.The compiler performs these optimizations automatically.](img_1.png)
Original and optimized code to compute the element i, k of matrix product for fixed-length arrays.The compiler performs these optimizations automatically.

**Understanding Pointers**

+ Every pointer has an associated type. The special void *type represents a generic pointer.
+ Every  pointer  has  a  value. This  value  is  an  address  of  some  object  of  the designated type. The specialNULL(0) value indicates that the pointer does not point anywhere.
+ Pointers are created with the ‘&’ operator.uses the leaq instruction to compute the expression value, since this instruction is designed to compute the addressof a memory reference.
+ Pointers are dereferenced with the ‘*’ operator. The result is a value having the type associated with the pointer.
+ Arrays and pointers are closely related. Array  referencing  (e.g.,a[3]) has the exact same effect as pointer arithmetic and dereferencing (e.g.,*(a+3)).
+ Casting from one type of pointer to another changes its type but not its value.
+ Pointers can also point to functions.
