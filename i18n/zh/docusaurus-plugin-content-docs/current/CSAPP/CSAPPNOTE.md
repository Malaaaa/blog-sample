# 计算机系统

## 计算机系统之旅行

即使我们对该系统的主要部分作出了重大改进， 我们的净速度大大低于其中一个部分的加速速度。


整数计算总是遵循一项原则：较小的数字延伸到较大的数字。 短号 -> 无签名的短号 -> int -> 无签名整数

Float IEEE754 ：https://blog.csdn.net/K346K346/article/details/50487127

文件必须包含一个主要函数

CF (unsigned) t < (unsigned) aunsigned overflow ZF (t == 0)ZI SF (t < 0)Negative \ of a<0==b<0)&&(t<0! a<0)已签署溢出

![img.png](img.png)

![计算元素i的原始和优化代码，固定长度数组的矩阵产品的 k。编译器自动执行这些优化。](img_1.png) 计算固定长度数组矩阵产品元素i的原始和优化代码。编译器自动执行这些优化。

**理解指针**

+ 每个指针都有一个关联的类型。 特殊真空*类型代表一个通用指针。
+ 每个指针都有一个值。 此值是指定类型某些对象的地址。 specNUL(0) 值表示指向器不指向任何地方。
+ 点数是通过&的操作员创建的。 ses the leaq 指令来计算表达式值，因为此指令旨在计算内存引用的地址。
+ 指针与'*'操作员互用。 结果是一个与指针相关联的值。
+ 数组和指针密切相关。 数组引用(如，[3]) 具有与指针算法和反引用完全相同的效果(如，*(a+3))。
+ 从一种指针到另一种指针，会改变其类型，但不会改变其值。
+ 指针也可以指向函数。

