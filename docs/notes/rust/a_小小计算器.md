---
title: 小小计算器
createTime: 2024/11/05 10:59:36
permalink: /rust/15cqdu7c/
---

::: rust-repl 小小计算器
```rust
//1.通过实现一个基本的加减乘除计算器，掌握Rust的基本语法、函数定义、变量声明和类型推断。

use std::io;
use std::thread::sleep;
use std::time::Duration;

fn main() {
    loop {
        println!("=====================================");
        println!("**   小小计算器   **");
        println!("**    1.加法     **");
        println!("**    2.减法     **");
        println!("**    3.乘法     **");
        println!("**    4.除法     **");
        println!("**    5.退出     **");

        let mut input = String::new();
        let mut a = String::new();
        let mut b = String::new();


        println!("请输入您要执行的操作序列号：");
        io::stdin().read_line(&mut input)
            .expect("读取输入失败");

        match input.trim().parse::<i32>() {
            Ok(num) if num >= 1 && num <= 5 => num,
            _ => {
                println!("无效的输入，输入应选择的范围在1~5之间！");
                continue;
            }
        };

        if input.trim().eq("5") {
            println!("退出成功!!!");
            break;
        }

        println!("请输入第1个数字：");
        io::stdin().read_line(&mut a)
            .expect("读取输入失败");

        println!("请输入第2个数字：");
        io::stdin().read_line(&mut b)
            .expect("读取输入失败");


        let n1: i32 = a.trim().parse().expect("转换失败！");
        let n2: i32 = b.trim().parse().expect("转换失败！");


        match input.trim() {
            "1" => println!("两数相加结果为：{}", n1 + n2),
            "2" => println!("两数相减结果为：{}", n1 - n2),
            "3" => println!("两数相乘结果为：{}", n1 * n2),
            "4" => println!("两数相除结果为：{}", n1 / n2),
            _ => println!("退出成功")
        }
        sleep(Duration::new(2,0));
    }
}
```
:::