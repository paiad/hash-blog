---
title: 深拷贝和浅拷贝
createTime: 2024/11/12 20:33:42
permalink: /python/lsdw28dd/
---

- [Python的深浅拷贝](https://www.runoob.com/w3cnote/python-understanding-dict-copy-shallow-or-deep.html)
## 赋值操作
```python
a = [1,2,3,['apple','banana']]
b = a

b[0] = 666
print(a) # [666,2,3,['apple','banana']]
print(b) # [666,2,3,['apple','banana']]
```
> a,b指向同一块地址空间，b变，则a变。


## 深拷贝
```python
import copy
a = [1,2,3,['apple','banana']]
b = copy.deepcopy(a)

b[0] = 666
print(a) # [1,2,3,['apple','banana']]
print(b) # [666,2,3,['apple','banana']]
```
> b是a的深拷贝对象，可以理解为b是a的副本，b的改变不会影响a


## 浅拷贝
```python
a = [1,2,3,['apple','banana']]
b = a.copy()

b[0] = 666
print(a) # [1,2,3,['apple','banana']]
print(b) # [666,2,3,['apple','banana']]

b[0] = 1
b[3][0] = 'peach'
print(a) # [1,2,3,['peach','banana']]
print(b) # [1,2,3,['peach','banana']]
```
> b是a的浅拷贝对象，a,b指向的地址不一致，但是其内部对象地址是一致的，
> 
> 当改变b中不可变对象，a中不会发生改变；
> 
> 当改变b中的可变对象，a中会发生相应的改变

举例1
```python
ls1 = [1, 2, [3, 4], 5]
ls2 =ls1
ls3 = ls1[:]
ls4 = ls1.copy()
print(id(ls1)==id(ls2), id(ls3)==id(ls1), id(ls4)==id(ls1), id(ls1[2])==id(ls4[2]))
# Output: True False False True
```


>[!note]
> 切片操作是一种**浅拷贝**
>
> copy 模块提供两个主要函数：
>
>>copy.copy(obj)：进行浅拷贝。
>>
>>copy.deepcopy(obj)：进行深拷贝。
