---
title: 哈希表
createTime: 2025/04/04 23:23:44
permalink: /leetcode/hash-table/
---
>[!tip]
>哈希表是一种键值对数据结构，利用哈希函数将键转化为数组索引来存储和检索数据。它通过直接定位实现快速操作，通常查找时间为 O(1)，
> 但若哈希函数分布不均或冲突多，可能变慢。它简单高效，常用于需要快速匹配的场景，如查找配对元素。 
> 

C++中map，有三种类型：

|映射 |底层实现 | 是否有序 |数值是否可以重复 | 能否更改数值|查询效率 |增删效率|
|---|---| --- |---| --- | --- | ---|
|std::map |红黑树 |key有序 |key不可重复 |key不可修改 | O(log n)|O(log n) |
|std::multimap | 红黑树|key有序 | key可重复 | key不可修改|O(log n) |O(log n) |
|std::unordered_map |哈希表 | key无序 |key不可重复 |key不可修改 |O(1) | O(1)|

std::unordered_map 底层实现为哈希表，std::map 和std::multimap 的底层实现是红黑树。

同理，std::map 和std::multimap 的key也是有序的。 

更多哈希表的理论知识请看[关于哈希表，你该了解这些！](https://www.programmercarl.com/哈希表理论基础.html)。