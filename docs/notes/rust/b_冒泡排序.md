---
title: 冒泡排序
createTime: 2024/11/05 10:59:31
permalink: /rust/nhs7zpwt/
---

::: rust-repl 冒泡排序
```rust
use std::io;
use std::ops::Add;

fn main() {
    loop {
        println!("\n===============================");
        println!("请输入需要排序的列表list：");
        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("读取输入失败");


        let mut list: Vec<i32> = Vec::new();

        let mut flag = 1;
        for ele in input.trim().split(" ") {
            match ele.trim().parse::<i32>() {
                Ok(i) => list.push(i),
                _=>{
                    flag = 0;
                    break;
                }
            }
        }

        if flag == 0{
            print!("输入的列表的值，存在错误！！！");
            continue;
        }

        bubble_sort(&mut list);
        print!("list排序结果(asc)为: {:?}", list);
    }
}


fn bubble_sort(list: &mut Vec<i32>) {
    let len = list.len();
    for i in 0..len {
        for j in 0..len - i - 1 {
            if list[j] > list[j + 1] {
                list.swap(j, j + 1);
            }
        }
    }
}
```
:::
