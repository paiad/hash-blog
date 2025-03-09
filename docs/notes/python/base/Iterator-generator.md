---
title: 迭代器和生成器
createTime: 2024/12/04 17:26:13
permalink: /python/w03r7n9o/
---
<LinkCard title = "Python的迭代器和生成器" href = "https://www.runoob.com/python3/python3-iterator-generator.html"/>

## 迭代器
迭代器是一个可以记住遍历的位置的对象。
迭代器对象从集合的第一个元素开始访问，直到所有的元素被访问完结束。迭代器只能往前不会后退。
迭代器有两个基本的方法：iter() 和 next()。
字符串，列表或元组对象都可用于创建迭代器：
```python
list1 = [1,2,3,4]
it = iter(list1)    # 创建迭代器对象
print (next(it))   # 输出迭代器的下一个元素 >>> 1
print (next(it))   # >>> 2
```

迭代器对象可以使用常规for语句进行遍历：
```python
list1 = [1,2,3,4]
it = iter(list1)    # 创建迭代器对象
for x in it:
    print (x, end=" ") # >>> 1 2 3 4
```

可以使用 next() 函数：
```python
import sys         # 引入 sys 模块

list1 = [1,2,3,4]
it = iter(list1)    # 创建迭代器对象

while True:
try:
    print (next(it))
except StopIteration:
    sys.exit()
``` 
## 生成器
在 Python 中，使用了**yield**的函数被称为生成器（generator）。
yield 是一个关键字，用于定义生成器函数，生成器函数是一种特殊的函数，可以在迭代过程中逐步产生值，而不是一次性返回所有结果。
跟普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。
当在生成器函数中使用 yield 语句时，函数的执行将会暂停，并将 yield 后面的表达式作为当前迭代的值返回。
然后，每次调用生成器的 next() 方法或使用 for 循环进行迭代时，函数会从上次暂停的地方继续执行，直到再次遇到 yield 语句。这样，生成器函数可以逐步产生值，而不需要一次性计算并返回所有结果。
调用一个生成器函数，返回的是一个迭代器对象。
下面是一个简单的示例，展示了生成器函数的使用：
```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1
 
# 创建生成器对象
generator = countdown(5)
 
# 通过迭代生成器获取值
print(next(generator))  # 输出: 5
print(next(generator))  # 输出: 4
print(next(generator))  # 输出: 3
 
# 使用 for 循环迭代生成器
for value in generator:
    print(value)  # 输出: 2 1
```