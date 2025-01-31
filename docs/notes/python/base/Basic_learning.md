---
title: Python基础
createTime: 2024/12/04 16:31:17
permalink: /python/dbql5ny7/
---

# Python
## QUICK_START
```python
name = "学生1"
age = 16
score = 66.6
print("%s %d %.2f" % (name, age, score))

# format()
print("{}/{}".format(name, age))

# f-strings[推荐]
print(f"{name} is {age} years old")
```

```python
# int 最大可以由4300个数字组成
num = 9**888
print(f"n1 = {num}")
```

```python
import sys
# 十六进制
print(0x10)  # 16
print(0o17)  # 15
print(0b10)  # 2

print(sys.getsizeof(1))  # 28B
```

```python
from decimal import Decimal

# 精度丢失
b = 8.1 / 3  # 2.6999999999999997
print(f"b = {b}")

# Decimal 解决精度丢失
a = Decimal("8.1") / 3
print(f"a = {a}")   # 2.7
```

```python
# 保持原格式
content = '''
Git从远程拉下代码、切换分支、更新代码、并重新推送
CSDN-Ada助手: CS入门 技能树
'''
print(content)
# 防止被转义
print(r"\n\t")
```
### 驻留机制
```text
驻留机制,几种情况讨论(注意:需要在交互模式下 win+r -> python)
1)字符串是由26个英文字母大小写，0-9，_组成
2)字符串长度为0或者1时
3)字符串在编译时进行驻留，而非运行时
4)[-5,256]的整数数字
```
> Pycharm对字符串的驻留机制做了优化处理
```python
str1 = "hello"
str2 = "hello"
str3 = "hello"
# 相同的字符串，各个变量会指向相同的地址空间
# id()函数可以返回对象在内存中的地址
print(f"{id(str1)}\n{id(str2)}\n{id(str3)}")

print(id('#'), id("#"))
```

```python
"""
1.python是根据上下文确定一个变量的使用类型的
2.低精度向高精度自动转换(隐式转换)
2.高精度向低精度自动转换(显式转换)
"""
print(type(1 + True))  # int
print(type(1 + .1))  # float

i = 10
print(type(float(i)))
print(type(str(i)))

```

### 运算符
```python
print(10 // 3)
print(-10 // 3)
print(-10 % 3)  # a % b = a - (a//b) * b, -10 -(-4)*3 = 2

print(f"{97 // 7} weeks + {97 % 7} days")

var1 = 234.5
res = (5 / 9) * (var1 - 100)
print("%.2f" % res)
```

```python
# is判断内存地址是否相同
a = "hello"
b = "hello"
print(a is b)
print(a is not b)
```

```python
a = 1
b = 3
max1 = a if a > b else b
print(max1)

c = 10
max2 = a if a > (c if c > b else b) else (c if c > b else b)
print(max2)
```

```python
age = input("请输入年龄：")
print(int(age))
print(type(age))

age1 = int(input("请再次输入年龄："))
print(type(age1))
```

```python
a = 1
if a > 15:
    print("a")
elif a < 100:
    print("ad_elif")
else:
    print("ad_else")
```

```python
a = 1
if a > 15:
    print("a")
elif a < 100:
    print("ad_elif")
else:
    print("ad_else")

for i in range(1, 10):
    if i % 2 == 0:
        print(i)

index = 100
while index > 10:
    print(index)
    index = index - 1
    if index == 66:
        break
```

## 函数
```python
def cat_cry():
    print("喵喵喵~~~")


def toSum(a, b):
    add = 0
    for i in range(a, b + 1):
        add += i
    return add


def toHe(a, b):
    return a + b


print(toSum(1, 100))
print(type(cat_cry()))
print(type(toSum(1, 100)))
```
>python函数调用遵循就近原则，没有函数重载
```python
def f(a, b):
    return a + b, a - b


def f1(price, count):
    return price * count


# 默认参数需要放在参数列表后 不可前面参数有默认值，后面参数没有
def f2(price=10, count=15):
    return price * count

# args是tuple类型(1, "125", True)
def f3(*args):
    for arg in args:
        print(arg)


# args是dict类型{'age': 15, 'name': 'ad'}
def f4(**args):
    for arg in args:
        print(arg)
```
> 猴子吃桃
```python
def peach(n):
    """
    前一天/2-1 = 后一天，现在知道后面的天的是10就是说
    前一千 = (后一天 + 1) * 2
    :param n:当天存有的桃子数量
    :return:
    """
    if n == 10:
        return 1
    else:
        return (peach(n + 1) + 1) * 2


print(peach(1))
```

```python
def hanoi_tower(num, a, b, c):
    """

    :param num: 盘子数
    :param a: a柱子
    :param b: b柱子
    :param c: c柱子
    :return:
    """
    if num == 1:
        print("第1个盘从:", a, "->", c)
    else:
        # 先借助c，通过将num-1个都移动到b
        hanoi_tower(num - 1, a, c, b)
        # 移动最下面的盘到c， a->c
        print(f"第{num}个盘从: {a} -> {c}")
        # 再借助a，将b全部回到c
        hanoi_tower(num - 1, b, a, c)


hanoi_tower(2, "A", "B", "C")
```

```python
def get_max(num1, num2):
    max_val = num1 if num1 > num2 else num2
    return max_val


def get_max_plus(f, num1, num2):
    return f(num1, num2), num1 + num2


plus = get_max_plus(get_max, 11, 66)
print(plus)
```

### lambda
```python
def f1(a, b):
    return max(a, b)


def f2(f, a, b):
    return f(a, b)


max1 = f2(lambda a, b: b if b > a else a, 10, 20)
print(max1)
```

## 函数
```python
n1 = 100


# 遵循就近原则
def f1():
    global n1
    n1 = 200
    n2 = 200
    print(n1, n2)


f1()
print(n1)
```

## 列表
```python
list_color = ["red", "blue", "green", "purple"]
print(len(list_color))
for e in list_color:
    print(e, end=" ")
```

```python
list_color = ["red", "blue", "green", "purple"]
print(list_color[-1])
print(list_color)
list_color.append("yellow")
print(list_color)
```

```python
# 改变list中的数值，list本身的地址不变，发生改变的元素地址发生变化
list_color = ["red", "blue", "green", "purple"]
print(id(list_color), id(list_color[0]))
list_color.append("yellow")
print(id(list_color), id(list_color[0]))
```

```python
list_a = [1, 7, 8, 7, 5]
# 1. max(list)
print(max(list_a))
# 2. min(list)
print(min(list_a))
# 3. list.append(X)
list_a.append(7)
print(list_a)
# 4. list.count(X)
print(list_a.count(7))
# 5. list.extend(list)
list_b = [1, 1, 1]
list_a.extend(list_b)
print(list_a)
# 6. list.index()第一次出现的位置，没有抛出异常
print(list_a.index(7))
# 7. list.reverse
list_a.reverse()
print(list_a)
# 8. list.insert(index, obj)
list_b.insert(0, 666)
print(list_b)
```
### 列表生成式
```python
list_elements = [ele ** 2 for ele in range(1, 5)]
list_elements = [ele ** 2 + 1 for ele in range(1, 5)]
print(list_elements)

list_elements = [name_split+'哥' for name_split in "dwh"]
print(list_elements)
```

```python
list_a = []
for i in range(0, 5):
    a = float(input(f"请输入第{i + 1}个成绩："))
    list_a.append(a)
print("%s list_a" % "成绩列表是：")
```

## 元组tuple
```python
tuple_1 = (1, 2, 3, 4, 5, 6, 7, 8, [1, 5])
print(tuple_1)
for e in tuple_1:
    print(e, end=" ")
```

```python
tuple_1 = (1, 2, 3, 4, 5, 6, 7, 8, [1, 5])
# 元组本身不可修改，但是其中的列表中的元素可以修改,因为修改单一元素，list地址不变
# 内容可变，地址不能变
tuple_1[-1][0] = 2
print(tuple_1)
del tuple_1[-1][0]
print(tuple_1)
tuple_1[-1].append("666")
print(tuple_1)
```
> ***一个元素需要加入一个 ,***
```python
tuple_2 = (2)
print(type(tuple_2))  # int
tuple_2 = (2,)
print(type(tuple_2))  # tuple
```

```python
str_names="tom jack mary nono smith hsp"
split = str_names.split(" ")
print(len(split))
replace = str_names.replace("hsp", "add")
print(replace)

list_my = []
for e in split:
    x = e[0].upper() + e[1::]
    list_my.append(x)
print(list_my)
```

## 字符串string
```python
str1 = "Hello World!"
print(str)

# 1. replace不改变原先的字符串
replace = str1.replace('H', "666")
print(str1)  # Hello World!
print(replace)  # 666ello World!

# 2. split不改变原先的字符串
str2 = "a,ad,fe,f,g"
split = str2.split(",")  # type:list
print(split)

print(str1.count("H"))
print(str1.index("H"))

# 3. strip不改变原先的字符串
str11 = "  1223 12 "
print(str11.strip(" "))  # 1223 12
str12 = "1223 12"
print(str12.strip("12"))  # 3

str13 = "HADASDDasdaw"
upper = str13.upper()
lower = str13.lower()
print(upper)
print(lower)
```

```python
str_names="tom jack mary nono smith hsp"
split = str_names.split(" ")
print(len(split))
replace = str_names.replace("hsp", "add")
print(replace)

list_my = []
for e in split:
    x = e[0].upper() + e[1::]
    list_my.append(x)
print(list_my)
```

## 集合set
```python
set1 = {1, 2, 3, 4, 5, 6, 7, 8}
print(set1)
for e in set1:
    print(e * 2)
print("-" * 20)

# 创建空集合
set_a = set()
set_b = {}  # type dict
print(type(set_b))
```

```python
# in & len
set1 = {1, 2, 3, 4, 5, 6, 7, 8, 8}
print(1 in set1)
print(len(set1))  # 不重复元素个数

# add
set1.add("123")
print(set1)

# remove
set1.remove("123")
print(set1)

# pop
pop_ele = set1.pop()  # 随机删除一个元素，会影响原集合
print(pop_ele)
print(set1)

# union
set2 = {'a', 'b', 1, 2}
set3 = set1.union(set2)
set33 = set1 | set2
print(set33)
print(set3)

# intersection
set4 = set1.intersection(set2)
set44 = set1 & set2
print(set4)
print(set44)

# difference
set5 = set1.difference(set2)
set55 = set1 - set2
print(set5)
print(set55)
```

## 字典dict
```python
dict1 = {'a': 1, 'b': 2, 'c': 3}
print(type(dict1))
print(dict1['a'])
```

```python
dict2 = {
    "jack": 115,
    "age": [1, 5, 6],
    "name": {
        "first": "John"
    }
}

# 等同于 dict2 == dict.keys()
for e in dict2:
    print(dict2[e])

for value in dict2.values():
    print(value)

# 每一项
for key, value in dict2.items():
    print(key, value)

# 定义字典
dict_a = {}
dict_b = dict()
```

```python
dict2 = {
    "one": 1,
    "age": [1, 5, 6],
    "name": {
        "first": "John"
    }
}

# 如果key不存在， 则返回keyError，除非设置默认值
dict__pop = dict2.pop("oe", "a")  # a
print(dict__pop)

keys = dict2.keys()
print(keys)
```

```python
# 字典生成式,zip()

authors = ["a", "b", "c"]
books = [1, 2, 3]

dict_a = {k.upper(): v for k, v in zip(authors, books)}
print(dict_a)
```

## 模块
### 字母索引找模块
<https://docs.python.org/zh-cn/3.12/py-modindex.html>

<https://docs.python.org/zh-cn/3.12/library/index.html>
```html
模块导入-基本语法
[from 模块名]import( 函数|类|变量|*)[as 别名]
```

```python
import jack_module
import tom_module

"""
# jack
jack_module.hi()
# tom
tom_module.hi()
"""

"""
1. import 模块1, 模块2
import 模块1.hi() # 导入模块的函数
"""

# 1. 导入一个或者多个模块
import math
import random

# 获得绝对值
print(math.fabs(-11.2))
# 随机返回一个值
print(random.choice([1, 2, 3, 5, 48, 7]))

# 2.导入模块的指定功能(此后不需要再加入模块名，可以直接导入函数)
from math import fabs

print(fabs(-12))

# 3. 导入全部的功能
from random import *

i = choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print(i)

# 4. 给模块或者功能取别名
import math as mt
from random import choice as c

print(mt.fabs(-125))
print(c([1, 2, 5, 4]))
```
### \_\_name__
```python
# ___name__ 是运行文件的名称,只在本文件中运行，
if __name__ == "__main__":
    print("======")
    print(__name__)
```
### \_\_all__
```python
# from jack_module import * ,通过这种形式，
# 别的模块只能导入这个ok函数
# import 模块 不受__all__的影响
__all__ = ['ok']


# 定义函数
def hi():
    print("hi jack")


def ok():
    print("ok")
```
### \_\_init__
```python
# 只有这种方式才触发: from pkg1 import *
__all__ = ['jack']
```
```python
# 快捷键 alt+enter/shift+alt+enter 可以快捷的导入
```