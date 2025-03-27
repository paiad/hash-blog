---
title: 👑CVX
createTime: 2025/03/27 10:23:50
permalink: /article/fuq0saok/
tags:
  - Matlab
  - CVX
---
<CardGrid>
    <LinkCard icon="skill-icons:matlab-light" title="CVX工具包" href="https://cvxr.com/cvx/download/"/>
</CardGrid>

```bash
>> cvx_begin
>> variable x(2)
>> minimize(norm(x,1))
>> subject to
>>  x >= 0
>> cvx_end
```