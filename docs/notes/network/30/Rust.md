---
title: 网络应用编程
icon: teenyicons:rust-outline
createTime: 2024/11/30 17:30:05
permalink: /network/tx4jgaxf/
---
> [🌈Rust Course](https://course.rs/first-try/intro.html)

## 变量
### 变量绑定与解构
::: rust-repl Hash Running
```rust
fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```
:::
>程序出现`cannot assign twice to immutable variable`的错误
> 因为对于不可变的变量进行重新赋值在Rust中是不被允许的，但是以下这种操作是被允许的

### 变量遮蔽
::: rust-repl Hash Running
```rust
fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    let x = 6;
    println!("The value of x is: {}", x);
}
```
:::
>第二个 let x生成了完全不同的新变量，两个变量只是恰好拥有同样的名称，涉及一次内存对象的再分配

### mut关键字
::: rust-repl Hash Running
```rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```
:::
>mut 关键字使x变成了一个可变的变量；
> 
>mut 声明的变量，可以修改同一个内存地址上的值，并不会发生内存对象的再分配。

### 以下划线的方式忽略unused的变量
::: rust-repl Hash Running
```rust
fn main() {
    let _x = 5;
    let y = 10;
}
```
:::


## 基本类型
### 数值类型
#### 整数类型
| 长度        | 有符号类型 | 无符号类型 |
|-------------|------------|------------|
| 8 位        | i8         | u8         |
| 16 位       | i16        | u16        |
| 32 位       | i32        | u32        |
| 64 位       | i64        | u64        |
| 128 位      | i128       | u128       |
| 视架构而定  | isize      | usize      |
> isize 和 usize 类型取决于程序运行的计算机 CPU 类型： 
> 若 CPU 是 32 位的，则这两个类型是 32 位的，同理，若 CPU 是 64 位，那么它们则是 64 位。

#### 浮点类型
::: rust-repl Hash Running
```rust
fn main() {
    let x = 2.0; // f64

    let y: f32 = 3.0; // f32
    println!("x = {}, y = {}", x, y)
}
```
:::

#### 数字转换
::: rust-repl Hash Running
```rust
fn main() {
    // 同类型才可进行数值运算
    let twenty = 20; // i32
    let twenty_one: i32 = 21; // i32
    let twenty_two = 22i32; // i32
    println!("twenty:{twenty} + twenty_one:{twenty_one} + twenty_two:{twenty_two} = {}",twenty + twenty_one + twenty_two);
    
    // 大数字可以通过下划线分割_
    let one_million:i64 = 1_000_000;
    println!("{}", one_million.pow(2));
    
     // 定义一个f32数组，其中42.0会自动被推导为f32类型
    let forty_twos = [42.0, 42f64, 42.0_f64];
    println!("{:.2}", forty_twos[0]);
}
```
:::

#### 位运算
::: rust-repl Hash Running
```rust
fn main() {
    // 无符号8位整数，二进制为00000010
    let a: u8 = 2; // 也可以写 let a: u8 = 0b_0000_0010;

    // 二进制为00000011
    let b: u8 = 3;

    // {:08b}：左高右低输出二进制01，不足8位则高位补0
    println!("a value is        {:08b}", a);

    println!("b value is        {:08b}", b);

    println!("(a & b) value is  {:08b}", a & b);

    println!("(a | b) value is  {:08b}", a | b);

    println!("(a ^ b) value is  {:08b}", a ^ b);

    println!("(!b) value is     {:08b}", !b);

    println!("(a << b) value is {:08b}", a << b);

    println!("(a >> b) value is {:08b}", a >> b);

    let mut a = a;
    // 注意这些计算符除了!之外都可以加上=进行赋值 (因为!=要用来判断不等于)
    a <<= b;
    println!("(a << b) value is {:08b}", a);
}
```
:::

#### 序列(Range)
::: rust-repl Hash Running
```rust
fn main() {
    for i in 1..=5{
        println!("{}",i)
    }
}
```
:::

## 字符、布尔、单元类型
### 字符类型
::: rust-repl Hash Running
```rust
fn main() {
    let x = '中';
    println!("字符'中'占用了{}字节的内存大小",std::mem::size_of_val(&x));
}
```
:::
>Rust 的字符只能用 '' 来表示， "" 是留给字符串的。

### 布尔(Bool)类型
::: rust-repl Hash Running
```rust
fn main() {
    let t = true;
    let f: bool = false; // 使用类型标注,显式指定f的类型

    if f {
        println!("这是段毫无意义的代码");
    }
}
```
:::

## 语句与表达式
::: rust-repl Hash Running
```rust
fn add_with_extra(x:i32, y:i32) -> i32{
    let x = x + 1;
    let y = y + 2;
    x + y
}

fn main(){
    let x = 3i32; 
    let y = 3i32; 
    let res = add_with_extra(x, y);
    
    println!("x = {}, y = {}", x,y);
    println!("{}", res);
}
```
:::
> `语句`是没有返回值的，`表达式`是有返回值的。

### 语句
::: rust-repl Hash Running
```rust
fn main(){
    let a: i32 = 1;
    let b: Vec<f64>= Vec::new();
    let (c, d) = ("hi", false);
}
```
:::

### 表达式
::: rust-repl Hash Running
```rust
fn main(){
    let y = {
        let x = 665;
        x + 1
    };
    println!("{}", y)
}
```
:::
>表达式不能包含分号，一旦你在表达式后加上分号，它就会变成一条语句，再也不会返回一个值，请牢记！

::: rust-repl Hash Running
```rust
fn main() {
    assert_eq!(ret_unit_type(), ())
}

fn ret_unit_type() {
    let x = 1;
    let y = if x % 2 == 1 {
        "odd"
    } else {
        "even"
    };
}
```
:::

## 函数
::: rust-repl Hash Running
```rust
fn main() {
    let res = add(1, 5);
    println!("{}", res)
}

fn add(i: i32, j: i32) -> i32{
    i + j
}
```
:::

## 所有权与借用
### 栈
栈按照顺序存储值并以相反顺序取出值，这也被称作后进先出。想象一下一叠盘子：当增加更多盘子时，把它们放在盘子堆的顶部，当需要盘子时，再从顶部拿走。不能从中间也不能从底部增加或拿走盘子！

增加数据叫做进栈，移出数据则叫做出栈。

因为上述的实现方式，栈中的所有数据都必须占用已知且固定大小的内存空间，假设数据大小是未知的，那么在取出数据时，你将无法取到你想要的数据。

### 堆
与栈不同，对于大小未知或者可能变化的数据，我们需要将它存储在堆上。

当向堆上放入数据时，需要请求一定大小的内存空间。操作系统在堆的某处找到一块足够大的空位，把它标记为已使用，并返回一个表示该位置地址的指针，该过程被称为在堆上分配内存，有时简称为 “分配”(allocating)。

接着，该指针会被推入栈中，因为指针的大小是已知且固定的，在后续使用过程中，你将通过栈中的指针，来获取数据在堆上的实际内存位置，进而访问该数据。

由上可知，堆是一种缺乏组织的数据结构。想象一下去餐馆就座吃饭：进入餐馆，告知服务员有几个人，然后服务员找到一个够大的空桌子（堆上分配的内存空间）并领你们过去。如果有人来迟了，他们也可以通过桌号（栈上的指针）来找到你们坐在哪。

### 性能区别
在栈上分配内存比在堆上分配内存要快，因为入栈时操作系统无需进行函数调用（或更慢的系统调用）来分配新的空间，只需要将新数据放入栈顶即可。相比之下，在堆上分配内存则需要更多的工作，这是因为操作系统必须首先找到一块足够存放数据的内存空间，接着做一些记录为下一次分配做准备，如果当前进程分配的内存页不足时，还需要进行系统调用来申请更多内存。 因此，处理器在栈上分配数据会比在堆上分配数据更加高效。

### 所有权与堆栈
当你的代码调用一个函数时，传递给函数的参数（包括可能指向堆上数据的指针和函数的局部变量）依次被压入栈中，当函数调用结束时，这些值将被从栈中按照相反的顺序依次移除。

因为堆上的数据缺乏组织，因此跟踪这些数据何时分配和释放是非常重要的，否则堆上的数据将产生内存泄漏 —— 这些数据将永远无法被回收。这就是 Rust 所有权系统为我们提供的强大保障。

对于其他很多编程语言，你确实无需理解堆栈的原理，但是在 Rust 中，明白堆栈的原理，对于我们理解所有权的工作原理会有很大的帮助。



### 所有权原则
>[!important]
> 1.Rust 中每一个值都被一个变量所拥有，该变量被称为值的所有者
> 
> 2.一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
> 
> 3.当所有者（变量）离开作用域范围时，这个值将被丢弃(drop)

#### String类型
::: rust-repl Hash Running
```rust
fn main(){
    let s = String::from("hello");
    println!("s = {}",s);
    
    let mut s = String::from("hello");
    s.push_str(",world!");
    println!("s = {}",s);
}
```
:::

#### 转移所有权
::: rust-repl Hash Running
```rust
fn main() {
    //基本数据类型
    let x = 5;
    let y = x;
    println!("y = {}",y);
    println!("x = {}",x);
    
    
    //复杂数据类型
    let s1 = String::from("hello");
    let s2 = s1;
    println!("s2 = {}",s2);
    println!("s1 = {}",s1);
    /**
    error，当 s1 被赋予 s2 后，Rust 认为 s1 不再有效，
    因此也无需在 s1 离开作用域后 drop 任何东西，
    这就是把所有权从 s1 转移给了 s2，s1 在被赋予 s2 后就马上失效了。
    */
}
```
:::

::: rust-repl Hash Running
```rust
fn main() {
    let x = 5;                      // x 进入作用域
    makes_copy(x);                  // x 应该移动函数里
    println!("x = {}",x);     
    
    let s = String::from("hello");  // s 进入作用域
    takes_ownership(s);             // s 的值移动到函数里，所有权发生更替，s被系统回收
    
    println!("s = {}",s);           // error       

}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}

fn makes_copy(some_integer: i32) { 
    println!("{}", some_integer);
}
```
:::

### 引用与借用
>Rust 通过`借用(Borrowing)`这个概念来达成上述的目的，获取变量的引用，称之为借用(borrowing)。
>正如现实生活中，如果一个人拥有某样东西，你可以从他那里借来，当使用完毕后，也必须要物归原主。

#### 引用与解引用
::: rust-repl Hash Running
```rust
fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```
:::

#### 不可变引用
::: rust-repl Hash Running
```rust
fn main() {
    let s = String::from("hello");
    let len = get_str_len(&s);
    println!("{}", len);
    println!("s = {}",s);  //no error 
}

fn get_str_len(s: &String) ->usize{
    s.len()
}
```
:::

#### 可变引用
::: rust-repl Hash Running
```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("s = {}", s)
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```
:::

>[!important]
> 总的来说，借用规则如下：
>
> - 同一时刻，你只能拥有要么一个可变引用，要么任意多个不可变引用
> - 引用必须总是有效的


## 复合类型
### 字符串类型
::: rust-repl Hash Running
```rust
use std::any::type_name;

fn print_type<T>(_: T) {
    println!("The type is: {}", type_name::<T>());
}

fn main() {
    let s = "Hello, world!";
    print_type(s);  // 传递 s，打印其类型
}

```
:::
> 字符串s是`&str`类型
>
> Rust 中的`字符`是 `Unicode` 类型，因此每个字符占据 4 个字节内存空间，但是在字符串中不一样，`字符串`是 `UTF-8` 编码，
> 也就是字符串中的字符所占的字节数是变化的(1 - 4)，这样有助于大幅降低字符串所占用的内存空间。

#### String 与 &str 的转换
::: rust-repl Hash Running
```rust
fn main() {
    let s = String::from("Hello, world!");
    // String -> &str
    say_hello(&s);
    say_hello(&s[..]);
    say_hello(s.as_str());
}

fn say_hello(s: &str){
    println!("{}", s)
}
```
:::

#### 字符串索引与切片
::: rust-repl Hash Running
```rust
fn main(){
    let hello = String::from("中国人");
    let h = hello[0];
}
```
:::

::: rust-repl Hash Running
```rust
fn main(){
    let hello = "中国人";//每一个字符 3Byte
    let s = &hello[0..2]; // error
    /* let s1 = &hello[0..3];  
       println!("{}", s1)   //中
    */
    println!("{}", s)
}
```
:::
>[!note]
>在Rust中，
> - `the type 'str' cannot be indexed by '{integer}'`，字符串索引是不被允许的
> - 通过索引区间来访问字符串时，需要格外的小心，是按照字节`（Byte）`计数的

#### 操作字符串
##### push
::: rust-repl Hash Running
```rust
fn main(){
    let mut s = String::from("hello");
    println!("原始s：{}", s);
    s.push_str(",world!");
    println!("push后的s：{}", s);
}
```
:::

##### insert
::: rust-repl Hash Running
```rust
fn main(){
    let mut s = String::from("hello");
    println!("原始s：{}", s);
    s.insert(5,",world!");
    println!("insert后的s：{}", s);
}
```
:::

##### replace
::: rust-repl Hash Running
```rust
fn main(){
    let mut s = String::from("hello");
    println!("原始s：{}", s);
    let s_changed = s.replace("hello","hello, world!");
    dbg!(s_changed);//dbg! 的输出包括源文件名、代码行号和变量内容。
}
```
:::

##### pop & remove
**pop**
::: rust-repl Hash Running
```rust
fn main() {
    let mut string_pop = String::from("rust pop 中文!");
    let p1 = string_pop.pop();
    let p2 = string_pop.pop();
    dbg!(p1);
    dbg!(p2);
    dbg!(string_pop);
}
```
:::

**remove**
::: rust-repl Hash Running
```rust
fn main() {
    let mut string_remove = String::from("测试remove方法");
    println!(
    "string_remove 占 {} 个字节",
    std::mem::size_of_val(string_remove.as_str())
    );
    // 删除第一个汉字
    string_remove.remove(0);
    // 下面代码会发生错误
    // string_remove.remove(1);
    // 直接删除第二个汉字
    // string_remove.remove(3);
    dbg!(string_remove);
}
```
:::

##### 连接
::: rust-repl Hash Running
```rust
fn main(){
    let s1 = "hello,";
    let s2 = "world!";
    let s_add = s1 + &s2; //注意此时s1 所有权发生转移
    println!("{}",s_add);
}
```
:::
>使用 + 或者 += 连接字符串，要求右边的参数必须为字符串的切片引用（&str）类型。
> 
> String + &str -> String

### 元组
::: rust-repl Hash Running
```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    println!("tup:{}", tup);
    println!("{}, {}, {}}", tup.0, tup.1, tup.2);
    
    let tup = (500, 6.4, 1);
    let (x, y, z) = tup;
    println!("The value of y is: {}", y);
}
```
:::
::: rust-repl Hash Running
```rust
fn main() {
    let s = String::from("hello");
    let (s1, len) = get_s_and_len(&s);
    println!("{}, {}", s1, len);
}

fn get_s_and_len(s: &str) -> (&str, usize){
    let len = s.len();
    (s, len) 
}
```
:::

### 结构体
::: rust-repl Hash Running
```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main(){
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

}
```
:::
>有几点值得注意:
>1. 初始化实例时，**每个字段**都需要进行初始化
>2. 初始化时的字段顺序**不需要**和结构体定义时的顺序一致

#### 访问结构体字段
::: rust-repl Hash Running
```rust
fn main() {
    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");
    println!("{}",user1.email);
}
```
:::
















































































































