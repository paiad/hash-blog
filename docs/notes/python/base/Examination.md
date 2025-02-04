---
title: 不可变对象与可变对象
createTime: 2024/11/13 16:54:06
permalink: /python/3ram6gzw/
---

## 不可变对象与可变对象
```python
a1, a2 = 6, 6
list1, list2 = [1,2,3], [1,2,3]
tuple1, tuple2 = (1, 2, 3), (1, 2, 3)
tuple3, tuple4 = (1, 2, [1, 2]), (1, 2, [1, 2])

print(a1 is a2) # True
print(list1 is list2) # False
print(tuple1 is tuple2) # True
print(tuple3 is tuple4) # False
```
>[!important]
> 
> 不可变对象：strings, tuples, numbers
> 
> 可变对象： list, set, dict
> 
> >区别：创建后，判断其value是否能够进行更改。若不能修改，则为不可变对象；若能修改，则为可变对象。