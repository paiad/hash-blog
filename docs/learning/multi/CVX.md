---
title: 👑CVX
createTime: 2025/03/27 10:23:50
permalink: /article/fuq0saok/
tags:
  - Matlab
  - CVX
---

### CVX工具包

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

### 原始代码
```matlab
clc
clear all
close all

N = 100;
x0 = linspace(0, 400, N)';
y0 = zeros(N, 1);
H = 100 * ones(N, 1);
x_o = 0; y_o = 0; x_f = 400; y_f = 0;
x_b = 200; y_b = 200; 
x_e = 20; y_e = 250;
x_e2 = 300; y_e2 = 50;
x_e3 = 50; y_e3 = 100;
v = 20;

for mm = 1:5
    p = 0.1 * ones(N, 1);  % 传输功率20dbm
    p_e = 0.1 * ones(N, 1);  % 18dbm
    gammar = 10^(11.4) * p;
    gammar_e = 10^(11.4) * p;
    
    % 注意：以下路径需要根据你的实际CVX安装路径调整
    % cd C:\xxx\yyy\CVX\cvx
    % cvx_setup
    
    n = 6 * N + 1;
    cvx_begin
        variable x(n) nonnegative
        maximize(x(6*N+1))
        subject to
        for k = 1:N
            RDL = log2(1 + gammar(k) ./ ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2));
            REL = log2(1 + gammar_e(k) ./ ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2));
            REL2 = log2(1 + gammar_e(k) ./ ((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2));
            REL3 = log2(1 + gammar_e(k) ./ ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2));
            
            ADL = gammar(k) ./ (log(2) * ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2 + gammar(k)) .* ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2));
            AEL = gammar_e(k) ./ (log(2) * ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2));
            AEL2 = gammar_e(k) ./ (log(2) * ((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e2)^2 + (y0(k)-y_e2)^2 + H(k)^2));
            AEL3 = gammar_e(k) ./ (log(2) * ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2));
            
            BDL = -2 * (x_b - x0(k)) .* ADL;
            BEL = -2 * (x_e - x0(k)) .* AEL;
            BEL2 = -2 * (x_e2 - x0(k)) .* AEL2;
            BEL3 = -2 * (x_e3 - x0(k)) .* AEL3;
            CDL = -2 * (y_b - y0(k)) .* ADL;
            CEL = -2 * (y_e - y0(k)) .* AEL;
            CEL2 = -2 * (y_e2 - y0(k)) .* AEL2;
            CEL3 = -2 * (y_e3 - y0(k)) .* AEL3;
            
            x(2*N+k) <= RDL - ADL .* (square(x(k)) + square(x(N+k))) - BDL .* x(k) - CDL .* x(N+k);
            x(3*N+k) <= REL - AEL .* (square(x(k)) + square(x(N+k))) - BEL .* x(k) - CEL .* x(N+k);
            x(4*N+k) <= REL2 - AEL2 .* (square(x(k)) + square(x(N+k))) - BEL2 .* x(k) - CEL2 .* x(N+k);
            x(5*N+k) <= REL3 - AEL3 .* (square(x(k)) + square(x(N+k))) - BEL3 .* x(k) - CEL3 .* x(N+k);
        end   
        
        i = (2*N+1):(3*N);
        j = (3*N+1):(4*N);
        A = x(j) - x(i);
        A1 = x(j+N) - x(i);
        A2 = x(j+2*N) - x(i);
        
        for kk = 1:N
            dd = (x0(kk)-x_b)^2 + (y0(kk)-y_b)^2 + H(kk)^2;
            de1 = (x0(kk)-x_e)^2 + (y0(kk)-y_e)^2 + H(kk)^2;
            de2 = (x0(kk)-x_e2)^2 + (y0(kk)-y_e2)^2 + H(kk)^2;
            de3 = (x0(kk)-x_e3)^2 + (y0(kk)-x_e3)^2 + H(kk)^2;
            if (dd >= de1)
                A(kk) = 0;
            end
            if (dd >= de2)
                A1(kk) = 0;
            end
            if (dd >= de3)
                A2(kk) = 0;
            end
        end
        
        sum(A) <= -x(6*N+1);
        sum(A1) <= -x(6*N+1);
        sum(A2) <= -x(6*N+1);
        
        for jj = 1:N-1
            square(x0(jj+1) + x(jj+1) - x0(jj) - x(jj)) + square(y0(jj+1) + x(N+jj+1) - y0(jj) - x(N+jj)) <= v^2;
        end
        square(x0(1) + x(1) - x_o) + square(y0(1) + x(N+1) - y_o) <= v^2;
        square(x_f - x(N) - x0(N)) + square(y_f - x(N+N) - y0(N)) <= v^2;
    cvx_end
    
    x0 = x0 + x(1:N);
    y0 = y0 + x(N+1:2*N);
    
    % 计算保密速率
    rate = []; rate_u = []; rate_e0 = [];
    for l = 1:size(x0,1)   
        rate_u = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_b-x0(l))^2 + (y_b-y0(l))^2));
        rate_e = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e-x0(l))^2 + (y_e-y0(l))^2));
        rate_e2 = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e2-x0(l))^2 + (y_e2-y0(l))^2));
        rate_e3 = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e3-x0(l))^2 + (y_e3-y0(l))^2));
        rate_e0 = max([rate_e, rate_e2, rate_e3]);
        rate(l) = max(rate_u - rate_e0, 0);
    end
    secrecy_rate(mm) = sum(rate);
end

x0 = [0; x0; 400];
y0 = [0; y0; 0];
z0 = [0; H; 0];  % 添加高度维度，起点和终点在地面 (z=0)，路径在 H=100

for i = 1:size(x0)-1
    speed(i) = sqrt((x0(i+1)-x0(i))^2 + (y0(i+1)-y0(i))^2);
end 

% 2D 绘图部分（保留原有平面图）
figure;
plot(x0, y0, 'b-', 'LineWidth', 1.5); % 无人机路径
hold on;

% 标注用户位置
plot(x_b, y_b, 'ro', 'MarkerSize', 10, 'LineWidth', 2);
text(x_b+5, y_b+5, 'User', 'FontSize', 12);

% 标注三个窃听者位置
plot(x_e, y_e, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e+5, y_e+5, 'Eavesdropper 1', 'FontSize', 12);

plot(x_e2, y_e2, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e2+5, y_e2+5, 'Eavesdropper 2', 'FontSize', 12);

plot(x_e3, y_e3, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e3+5, y_e3+5, 'Eavesdropper 3', 'FontSize', 12);

% 标注起点和终点
plot(x0(1), y0(1), 'g^', 'MarkerSize', 12, 'LineWidth', 2);
text(x0(1)+5, y0(1)+5, 'Start', 'FontSize', 12);

plot(x0(end), y0(end), 'ms', 'MarkerSize', 12, 'LineWidth', 2);
text(x0(end)+5, y0(end)+5, 'End', 'FontSize', 12);

grid on;
xlabel('X coordinate');
ylabel('Y coordinate');
title('UAV Trajectory with User and Eavesdroppers (2D)');
legend('UAV Path', 'User', 'Eavesdropper 1', 'Eavesdropper 2', 'Eavesdropper 3', 'Start', 'End');
hold off;

% 3D 绘图部分
figure;
plot3(x0, y0, z0, 'b-', 'LineWidth', 1.5); % 无人机路径
hold on;

% 标注用户位置 (地面 z=0)
plot3(x_b, y_b, 0, 'ro', 'MarkerSize', 10, 'LineWidth', 2);
text(x_b+5, y_b+5, 0, 'User', 'FontSize', 12);

% 标注三个窃听者位置 (地面 z=0)
plot3(x_e, y_e, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e+5, y_e+5, 0, 'Eavesdropper 1', 'FontSize', 12);

plot3(x_e2, y_e2, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e2+5, y_e2+5, 0, 'Eavesdropper 2', 'FontSize', 12);

plot3(x_e3, y_e3, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e3+5, y_e3+5, 0, 'Eavesdropper 3', 'FontSize', 12);

% 标注起点和终点 (地面 z=0)
plot3(x0(1), y0(1), z0(1), 'g^', 'MarkerSize', 12, 'LineWidth', 2);
text(x0(1)+5, y0(1)+5, z0(1), 'Start', 'FontSize', 12);

plot3(x0(end), y0(end), z0(end), 'ms', 'MarkerSize', 12, 'LineWidth', 2);
text(x0(end)+5, y0(end)+5, z0(end), 'End', 'FontSize', 12);

grid on;
xlabel('X coordinate');
ylabel('Y coordinate');
zlabel('Z coordinate (Height)');
title('UAV Trajectory with User and Eavesdroppers (3D)');
legend('UAV Path', 'User', 'Eavesdropper 1', 'Eavesdropper 2', 'Eavesdropper 3', 'Start', 'End');
view(-37.5, 30); % 设置视角，便于观察
hold off;

% 绘制保密速率随迭代次数的变化
figure;
plot(1:5, secrecy_rate, 'b-o', 'LineWidth', 1.5, 'MarkerSize', 8);
grid on;
xlabel('Iteration Number');
ylabel('Secrecy Rate (bits/s)');
title('Secrecy Rate vs. Iteration Number');
legend('Secrecy Rate');
disp('Secrecy Rate for each iteration:');
disp(secrecy_rate);
```

### 代码中的关键公式与意义
1. 初始化与系统参数
```matlab
N = 100; % 时间槽数量
x0 = linspace(0, 400, N)'; % 初始 x 坐标
y0 = zeros(N, 1); % 初始 y 坐标
H = 100 * ones(N, 1); % UAV 飞行高度
x_o = 0; y_o = 0; x_f = 400; y_f = 0; % 起点和终点坐标
x_b = 200; y_b = 200; % 用户（destination）坐标
x_e = 20; y_e = 250; x_e2 = 300; y_e2 = 50; x_e3 = 50; y_e3 = 100; % 三个窃听者坐标
v = 25; % UAV 最大速度 (m/s) 
```

2. 信噪比与传输功率
```matlab
p = 0.1 * ones(N, 1); % 传输功率 20dBm (0.1 W)
p_e = 0.1 * ones(N, 1); % 窃听者功率 (假设相同)
gammar = 10^(11.4) * p; % 用户信噪比
gammar_e = 10^(11.4) * p_e; % 窃听者信噪比
```

3. CVX 优化问题
```matlab
cvx_begin
    variable x(n) nonnegative
    maximize(x(6*N+1))
    subject to
    for k = 1:N
        RDL = log2(1 + gammar(k) ./ ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2));
        REL = log2(1 + gammar_e(k) ./ ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2));
        REL2 = log2(1 + gammar_e(k) ./ ((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2));
        REL3 = log2(1 + gammar_e(k) ./ ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2));
        
        ADL = gammar(k) ./ (log(2) * ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2 + gammar(k)) .* ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2));
        AEL = gammar_e(k) ./ (log(2) * ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2));
        AEL2 = gammar_e(k) ./ (log(2) * ((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e2)^2 + (y0(k)-y_e2)^2 + H(k)^2));
        AEL3 = gammar_e(k) ./ (log(2) * ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2));
        
        BDL = -2 * (x_b - x0(k)) .* ADL;
        BEL = -2 * (x_e - x0(k)) .* AEL;
        BEL2 = -2 * (x_e2 - x0(k)) .* AEL2;
        BEL3 = -2 * (x_e3 - x0(k)) .* AEL3;
        CDL = -2 * (y_b - y0(k)) .* ADL;
        CEL = -2 * (y_e - y0(k)) .* AEL;
        CEL2 = -2 * (y_e2 - y0(k)) .* AEL2;
        CEL3 = -2 * (y_e3 - y0(k)) .* AEL3;
        
        x(2*N+k) <= RDL - ADL .* (square(x(k)) + square(x(N+k))) - BDL .* x(k) - CDL .* x(N+k);
        x(3*N+k) <= REL - AEL .* (square(x(k)) + square(x(N+k))) - BEL .* x(k) - CEL .* x(N+k);
        x(4*N+k) <= REL2 - AEL2 .* (square(x(k)) + square(x(N+k))) - BEL2 .* x(k) - CEL2 .* x(N+k);
        x(5*N+k) <= REL3 - AEL3 .* (square(x(k)) + square(x(N+k))) - BEL3 .* x(k) - CEL3 .* x(N+k);
    end   
    
    i = (2*N+1):(3*N);
    j = (3*N+1):(4*N);
    A = x(j) - x(i);
    A1 = x(j+N) - x(i);
    A2 = x(j+2*N) - x(i);
    
    for kk = 1:N
        dd = (x0(kk)-x_b)^2 + (y0(kk)-y_b)^2 + H(kk)^2;
        de1 = (x0(kk)-x_e)^2 + (y0(kk)-y_e)^2 + H(kk)^2;
        de2 = (x0(kk)-x_e2)^2 + (y0(kk)-y_e2)^2 + H(kk)^2;
        de3 = (x0(kk)-x_e3)^2 + (y0(kk)-x_e3)^2 + H(kk)^2;
        if (dd >= de1)
            A(kk) = 0;
        end
        if (dd >= de2)
            A1(kk) = 0;
        end
        if (dd >= de3)
            A2(kk) = 0;
        end
    end
    
    sum(A) <= -x(6*N+1);
    sum(A1) <= -x(6*N+1);
    sum(A2) <= -x(6*N+1);
    
    for jj = 1:N-1
        square(x0(jj+1) + x(jj+1) - x0(jj) - x(jj)) + square(y0(jj+1) + x(N+jj+1) - y0(jj) - x(N+jj)) <= v^2;
    end
    square(x0(1) + x(1) - x_o) + square(y0(1) + x(N+1) - y_o) <= v^2;
    square(x_f - x(N) - x0(N)) + square(y_f - x(N+N) - y0(N)) <= v^2;
cvx_end
```

4. UAV轨迹优化以及保密速率计算
```matlab
% 更新UAV路径
x0 = x0 + x(1:N);
y0 = y0 + x(N+1:2*N);

% 计算保密速率
rate = []; rate_u = []; rate_e0 = [];
for l = 1:size(x0,1)   
    rate_u = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_b-x0(l))^2 + (y_b-y0(l))^2));
    rate_e = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e-x0(l))^2 + (y_e-y0(l))^2));
    rate_e2 = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e2-x0(l))^2 + (y_e2-y0(l))^2));
    rate_e3 = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e3-x0(l))^2 + (y_e3-y0(l))^2));
    rate_e0 = max([rate_e, rate_e2, rate_e3]);
    rate(l) = max(rate_u - rate_e0, 0);
end
secrecy_rate(mm) = sum(rate);
```

>[!important]
> 优化变量：
> - x(1:N)：$u_x(n)$，$x$ 方向轨迹增量。
> - x(N+1:2*N)：$u_y(n)$，$y$ 方向轨迹增量。
> - x(2*N+1:3*N)：$R_d(n)$ 的下界。
> - x(3*N+1:4*N)：$R_e^1(n)$ 的下界。
> - x(4*N+1:5*N)：$R_e^2(n)$ 的下界。
> - x(5*N+1:6*N)：$R_e^3(n)$ 的下界。
> - x(6*N+1)：目标值，表示 $\min_{k} \sum_{n=1}^N R_s^k(n)$。

---

[//]: # (## 原论文模型)

[//]: # (### 1. 系统模型与信道模型)

[//]: # ()
[//]: # (#### 1.1 节点位置定义)

[//]: # (在一个三维笛卡尔坐标系中：)

[//]: # (- 地面高度定义为 0，无人机（UAV）飞行高度固定为 $H$。)

[//]: # (- 窃听者位置：$\mathcal{L}_e^k = &#40;e_x^k, e_y^k, 0&#41;, k = 1, \ldots, K$。)

[//]: # (- 目标位置：$\mathcal{L}_d = &#40;d_x, d_y, 0&#41;$。)

[//]: # (- UAV 轨迹离散化为 $N$ 个锚点：$\mathcal{L}_u&#40;n&#41; = &#40;u_x&#40;n&#41;, u_y&#40;n&#41;, H&#41;, n = 1, \ldots, N$。)

[//]: # (- 初始和最终位置分别为：$\mathcal{L}_u&#40;I&#41; = &#40;u_x&#40;I&#41;, u_y&#40;I&#41;, H&#41;$ 和 $\mathcal{L}_u&#40;F&#41; = &#40;u_x&#40;F&#41;, u_y&#40;F&#41;, H&#41;$。)

[//]: # ()
[//]: # (#### 1.2 距离计算)

[//]: # (UAV 与目标之间的距离：)

[//]: # ($$)

[//]: # (s_d&#40;n&#41; = \|\mathcal{L}_u&#40;n&#41; - \mathcal{L}_d\|_2, \quad n = 1, \ldots, N)

[//]: # ($$)

[//]: # (UAV 与第 $k$ 个窃听者之间的距离：)

[//]: # ($$)

[//]: # (s_e^k&#40;n&#41; = \|\mathcal{L}_u&#40;n&#41; - \mathcal{L}_e^k\|_2, \quad k = 1, \ldots, K, \, n = 1, \ldots, N)

[//]: # ($$)

[//]: # ()
[//]: # (#### 1.3 信道增益)

[//]: # (采用自由空间路径损耗模型，信道增益为：)

[//]: # (- UAV 到目标：)

[//]: # (  $$)

[//]: # (  h_d&#40;n&#41; = \alpha_0 s_d&#40;n&#41;^{-2}, \quad n = 1, \ldots, N)

[//]: # (  $$)

[//]: # (- UAV 到第 $k$ 个窃听者：)

[//]: # (  $$)

[//]: # (  h_e^k&#40;n&#41; = \alpha_0 s_e^k&#40;n&#41;^{-2}, \quad k = 1, \ldots, K, \, n = 1, \ldots, N)

[//]: # (  $$)

[//]: # (  其中，$\alpha_0$ 是参考距离 1 米处的有效信道功率增益。)

[//]: # ()
[//]: # (#### 1.4 瞬时传输速率)

[//]: # (UAV 到目标的瞬时传输速率：)

[//]: # ($$)

[//]: # (R_d&#40;n&#41; = \log_2\left&#40;1 + \frac{h_d&#40;n&#41; p}{\sigma^2}\right&#41;)

[//]: # ($$)

[//]: # (第 $k$ 个窃听者的瞬时泄漏速率：)

[//]: # ($$)

[//]: # (R_e^k&#40;n&#41; = \log_2\left&#40;1 + \frac{h_e^k&#40;n&#41; p}{\sigma^2}\right&#41;)

[//]: # ($$)

[//]: # (其中，$p$ 是瞬时发射功率，$\sigma^2$ 是加性白高斯噪声（AWGN）的功率。)

[//]: # ()
[//]: # (#### 1.5 保密速率)

[//]: # (针对第 $k$ 个窃听者的保密速率定义为：)

[//]: # ($$)

[//]: # (R_s^k&#40;n&#41; = [R_d&#40;n&#41; - R_e^k&#40;n&#41;]^+)

[//]: # ($$)

[//]: # (其中，$[x]^+ = \max&#40;x, 0&#41;$。)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 2. 问题形式化)

[//]: # ()
[//]: # (#### 2.1 优化目标)

[//]: # (目标是最大化系统中最小可实现的保密速率（考虑最坏情况），优化问题 $\mathbf{P0}$ 表示为：)

[//]: # ($$)

[//]: # (\mathbf{P0}: \max_{\{u_x&#40;n&#41;, u_y&#40;n&#41;\}} \min_{k} \sum_{n=1}^N R_s^k&#40;n&#41;)

[//]: # ($$)

[//]: # ()
[//]: # (#### 2.2 约束条件)

[//]: # (- 初始位置约束：)

[//]: # (  $$)

[//]: # (  \|\mathcal{L}_u&#40;1&#41; - \mathcal{L}_u&#40;I&#41;\|_2 \leq v \tau)

[//]: # (  $$)

[//]: # (- 连续时间槽的移动约束：)

[//]: # (  $$)

[//]: # (  \|\mathcal{L}_u&#40;n&#41; - \mathcal{L}_u&#40;n-1&#41;\|_2 \leq v \tau, \quad n = 2, \ldots, N)

[//]: # (  $$)

[//]: # (- 最终位置约束：)

[//]: # (  $$)

[//]: # (  \|\mathcal{L}_u&#40;N&#41; - \mathcal{L}_u&#40;F&#41;\|_2 \leq v \tau)

[//]: # (  $$)

[//]: # (  其中，$v$ 是 UAV 的最大瞬时速度，$\tau$ 是每个时间槽的长度，$v \tau$ 表示 UAV 在一个时间槽内可移动的最大距离。)

[//]: # ()
[//]: # (由于 $R_s^k&#40;n&#41;$ 的非凸性和不可导性，$\mathbf{P0}$ 是一个非凸优化问题。)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 3. 轨迹优化)

[//]: # ()
[//]: # (#### 3.1 变量变换)

[//]: # (为了简化优化，直接优化轨迹锚点 $&#40;u_x&#40;n&#41;, u_y&#40;n&#41;&#41;$ 较困难，因此引入轨迹增量变量：)

[//]: # (- 在第 $i-1$ 次迭代中，第 $n$ 个锚点的轨迹增量为 $\{\zeta&#40;i-1, n&#41; \geq 0, \nu&#40;i-1, n&#41; \geq 0\}$。)

[//]: # (- 第 $i$ 次迭代的轨迹锚点更新为：)

[//]: # (  $$)

[//]: # (  u_x&#40;i, n&#41; = u_x&#40;i-1, n&#41; + \zeta&#40;i-1, n&#41;)

[//]: # (  $$)

[//]: # (  $$)

[//]: # (  u_y&#40;i, n&#41; = u_y&#40;i-1, n&#41; + \nu&#40;i-1, n&#41;)

[//]: # (  $$)

[//]: # ()
[//]: # (#### 3.2 下界近似)

[//]: # (对 $R_d&#40;n&#41;$ 和 $R_e^k&#40;n&#41;$ 进行下界近似：)

[//]: # (- UAV 到目标的传输速率下界：)

[//]: # (  $$)

[//]: # (  R_d^{lb}&#40;i, n&#41; = R_d&#40;i-1, n&#41; - a_d&#40;i-1, n&#41; [&#40;\zeta&#40;i-1, n&#41;&#41;^2 + &#40;\nu&#40;i-1, n&#41;&#41;^2] - b_d&#40;i-1, n&#41; \zeta&#40;i-1, n&#41; - c_d&#40;i-1, n&#41; \nu&#40;i-1, n&#41;)

[//]: # (  $$)

[//]: # (- 第 $k$ 个窃听者的泄漏速率下界：)

[//]: # (  $$)

[//]: # (  R_e^{k,lb}&#40;i, n&#41; = R_e^k&#40;i-1, n&#41; - a_e^k&#40;i-1, n&#41; [&#40;\zeta&#40;i-1, n&#41;&#41;^2 + &#40;\nu&#40;i-1, n&#41;&#41;^2] - b_e^k&#40;i-1, n&#41; \zeta&#40;i-1, n&#41; - c_e^k&#40;i-1, n&#41; \nu&#40;i-1, n&#41;)

[//]: # (  $$)

[//]: # (  其中，系数定义如下：)

[//]: # (  $$)

[//]: # (  a_d&#40;i-1, n&#41; = \frac{p}{\ln 2 [\alpha_0 \sigma^2 s_d&#40;i-1, n&#41;^4 + p s_d&#40;i-1, n&#41;^2]})

[//]: # (  $$)

[//]: # (  $$)

[//]: # (  b_d&#40;i-1, n&#41; = 2 &#40;u_x&#40;i-1, n&#41; - d_x&#41; a_d&#40;i-1, n&#41;)

[//]: # (  $$)

[//]: # (  $$)

[//]: # (  c_d&#40;i-1, n&#41; = 2 &#40;u_y&#40;i-1, n&#41; - d_y&#41; a_d&#40;i-1, n&#41;)

[//]: # (  $$)

[//]: # (  $$)

[//]: # (  a_e^k&#40;i-1, n&#41; = \frac{p}{\ln 2 [\alpha_0 \sigma^2 s_e^k&#40;i-1, n&#41;^4 + p s_e^k&#40;i-1, n&#41;^2]})

[//]: # (  $$)

[//]: # (  $$)

[//]: # (  b_e^k&#40;i-1, n&#41; = 2 &#40;u_x&#40;i-1, n&#41; - e_x^k&#41; a_e^k&#40;i-1, n&#41;)

[//]: # (  $$)

[//]: # (  $$)

[//]: # (  c_e^k&#40;i-1, n&#41; = 2 &#40;u_y&#40;i-1, n&#41; - e_y^k&#41; a_e^k&#40;i-1, n&#41;)

[//]: # (  $$)

[//]: # ()
[//]: # (#### 3.3 优化问题重写)

[//]: # (基于下界，$\mathbf{P0}$ 在第 $i$ 次迭代中重写为 $\mathbf{P0}^{&#40;1&#41;}$：)

[//]: # ($$)

[//]: # (\mathbf{P0}^{&#40;1&#41;}: \max_{\{\zeta&#40;n&#41;, \nu&#40;n&#41;, R_d&#40;i,n&#41;, R_e^k&#40;i,n&#41;\}} \min_{k} \sum_{n=1}^N [R_d&#40;i,n&#41; - R_e^k&#40;i,n&#41;]^+)

[//]: # ($$)

[//]: # (约束条件：)

[//]: # ($$)

[//]: # (R_d&#40;i,n&#41; \leq R_d^{lb}&#40;i,n&#41;, \quad n = 1, \ldots, N)

[//]: # ($$)

[//]: # ($$)

[//]: # (R_e^k&#40;i,n&#41; \leq R_e^{k,lb}&#40;i,n&#41;, \quad k = 1, \ldots, K, \, n = 1, \ldots, N)

[//]: # ($$)

[//]: # ($$)

[//]: # (\|\mathcal{L}_u&#40;1&#41; + \Phi&#40;1&#41; - \mathcal{L}_u&#40;I&#41;\|_2 \leq v \tau)

[//]: # ($$)

[//]: # ($$)

[//]: # (\|\mathcal{L}_u&#40;n&#41; + \Phi&#40;n&#41; - \mathcal{L}_u&#40;n-1&#41; - \Phi&#40;n-1&#41;\|_2 \leq v \tau, \quad n = 2, \ldots, N)

[//]: # ($$)

[//]: # ($$)

[//]: # (\|\mathcal{L}_u&#40;N&#41; + \Phi&#40;N&#41; - \mathcal{L}_u&#40;F&#41;\|_2 \leq v \tau)

[//]: # ($$)

[//]: # (其中，$\Phi&#40;n&#41; = &#40;\zeta&#40;n&#41;, \nu&#40;n&#41;, 0&#41;$ 表示轨迹增量向量。)

[//]: # ()
[//]: # (由于 $R_d^{lb}&#40;i,n&#41;$ 和 $R_e^{k,lb}&#40;i,n&#41;$ 是凹二次函数，$\mathbf{P0}^{&#40;1&#41;}$ 满足凸性，但仍不可导。)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 4. Hypograph 变换)

[//]: # ()
[//]: # (#### 4.1 Hypograph 定义)

[//]: # (定义目标函数 $f = \sum_{n=1}^N R_s^k&#40;i,n&#41;$，其 hypograph 为：)

[//]: # ($$)

[//]: # (\text{hypo } f = \{&#40;\{\zeta&#40;n&#41;, \nu&#40;n&#41;, R_d&#40;i,n&#41;, R_e^k&#40;i,n&#41;\}, R^*&#41; \mid f \geq R^*\})

[//]: # ($$)

[//]: # (由于 $f$ 是线性函数，$\text{hypo } f$ 是凸集。)

[//]: # ()
[//]: # (#### 4.2 优化问题重构)

[//]: # (基于 hypograph，问题 $\mathbf{P0}^{&#40;1&#41;}$ 转化为标准凸优化问题 $\mathbf{P1}^{&#40;1&#41;}$：)

[//]: # ($$)

[//]: # (\mathbf{P1}^{&#40;1&#41;}: \max_{\{\zeta&#40;n&#41;, \nu&#40;n&#41;, R^*, R_d&#40;i,n&#41;, R_e^k&#40;i,n&#41;\}} R^*)

[//]: # ($$)

[//]: # (约束条件：)

[//]: # ($$)

[//]: # (\sum_{n=1}^N R_s^k&#40;i,n&#41; \geq R^*, \quad k = 1, \ldots, K)

[//]: # ($$)

[//]: # ($$)

[//]: # (R_d&#40;i,n&#41; \leq R_d^{lb}&#40;i,n&#41;, \quad n = 1, \ldots, N)

[//]: # ($$)

[//]: # ($$)

[//]: # (R_e^k&#40;i,n&#41; \leq R_e^{k,lb}&#40;i,n&#41;, \quad k = 1, \ldots, K, \, n = 1, \ldots, N)

[//]: # ($$)

[//]: # ($$)

[//]: # (\|\mathcal{L}_u&#40;1&#41; + \Phi&#40;1&#41; - \mathcal{L}_u&#40;I&#41;\|_2 \leq v \tau)

[//]: # ($$)

[//]: # ($$)

[//]: # (\|\mathcal{L}_u&#40;n&#41; + \Phi&#40;n&#41; - \mathcal{L}_u&#40;n-1&#41; - \Phi&#40;n-1&#41;\|_2 \leq v \tau, \quad n = 2, \ldots, N)

[//]: # ($$)

[//]: # ($$)

[//]: # (\|\mathcal{L}_u&#40;N&#41; + \Phi&#40;N&#41; - \mathcal{L}_u&#40;F&#41;\|_2 \leq v \tau)

[//]: # ($$)

[//]: # ()
[//]: # ($\mathbf{P1}^{&#40;1&#41;}$ 是一个标准的凸二次规划问题，可使用现有工具（如 CVX）高效求解。)


## 系统模型
### 元素坐标与系统模型
基本坐标信息：
>[!info]
> - UAV 位置：$\mathcal{L}_u(n) = (u_x(n), u_y(n), H)$
> - 用户位置：$\mathcal{L}_d = (d_x, d_y, 0)$
> - RIS 位置：$\mathcal{L}_r = (r_x, r_y, H_r)$
> - RIS 相位调整矩阵：$\Phi(n) = \text{diag}(e^{j\theta_1(n)}, \ldots, e^{j\theta_M(n)})$，$M$ 为反射单元数。

系统组成：
>[!info]
> - UAV 位置：$\mathcal{L}_u(n) = (u_x(n), u_y(n), H)$
> - 用户位置：$\mathcal{L}_d = (d_x, d_y, 0)$
> - RIS 位置：$\mathcal{L}_r = (r_x, r_y, H_r)$
> - RIS 相位调整矩阵：$\Phi(n) = \text{diag}(e^{j\theta_1(n)}, \ldots, e^{j\theta_M(n)})$，$M$ 为反射单元数。

距离定义：
>[!info]
> - UAV 到用户：$s_d(n) = ||\mathcal{L}_u(n) - \mathcal{L}_d||_2$
> - UAV 到 RIS：$s_{u,r}(n) = ||\mathcal{L}_u(n) - \mathcal{L}_r||_2$
> - RIS 到用户：$s_{r,d} = ||\mathcal{L}_r - \mathcal{L}_d||_2$


### 信道增益推导

==直接信道(UAV --> User)==

根据自由空间路径损耗模型，

信道功率增益为： $|h_d(n)|^2 = \alpha_0 s_d(n)^{-2}$

信道幅度为： ==$h_d(n) = \sqrt{|h_d(n)|^2} = \sqrt{\alpha_0 s_d(n)^{-2}} = \sqrt{\alpha_0} s_d(n)^{-1}$=={.tip}

==反射信道(UAV --> RIS, RIS --> User)==
>[!important]
>RIS 反射信道由 UAV 到 RIS 和 RIS 到用户的级联组成。

:::steps
1. UAV -> RIS：

距离 $s_{u,r}(n)$，功率增益： $|\mathbf{h}_{u,r}(n)|^2 = \alpha_0 s_{u,r}(n)^{-2}$

幅度： $\mathbf{h}_{u,r}(n) = \sqrt{\alpha_0} s_{u,r}(n)^{-1} \mathbf{a}_{u,r}(n)$ 
>其中 $\mathbf{a}_{u,r}(n)$ 是 RIS 的阵列响应向量，长度为 $M$，模为 1。

2. RIS -> User：

距离 $s_{r,d}$，功率增益： $|\mathbf{h}_{r,d}(n)|^2 = \alpha_0 s_{r,d}(n)^{-2}$

幅度： $\mathbf{h}_{r,d} = \sqrt{\alpha_0} s_{r,d}(n)^{-1} \mathbf{a}_{r,d}(n)$ 
>其中$\mathbf{a}_{r,d}(n)$ 为 RIS 到用户的阵列响应向量。

3. UAV -> RIS -> User：

总信道为： $h_r(n) = \mathbf{h}_{r,d}(n)^T \Phi(n) \mathbf{h}_{u,r}(n)$

代入： $h_r(n) = (\sqrt{\alpha_0} s_{r,d}(n)^{-1} \mathbf{a}_{r,d})^T \Phi(n) (\sqrt{\alpha_0} s_{u,r}(n)^{-1} \mathbf{a}_{u,r}(n))$

化简： ==$h_r(n) = \alpha_0 s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \{\mathbf{a}_{r,d}^T \Phi(n) \mathbf{a}_{u,r}(n)\}$=={.tip}

:::

==总信道 $h_{\text{total}}(n)$==

总信道增益为直接信道和反射信道的相干叠加： $h_{\text{total}}(n) = h_d(n) + h_r(n)$

代入： ==$h_{\text{total}}(n) = \sqrt{\alpha_0} s_d(n)^{-1} + \alpha_0 s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n)$=={.danger}

>[!note]
>$h_d(n)$ 和 $h_r(n)$ 的相位未显式考虑。若需精确计算，应引入相位项，但优化中通常通过 $\Phi(n)$ 调整相位对齐。


### 用户接收功率推导
接收功率定义为： $P_d(n) = p |h_{\text{total}}(n)|^2$

代入 $h_{\text{total}}(n)$，计算功率： 

$|h_{\text{total}}(n)|^2 = \left| \sqrt{\alpha_0} s_d(n)^{-1} + \alpha_0 s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n) \right|^2$

令 $g_r(n) = \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n)$（复数），则： 

$|h_{\text{total}}(n)|^2 = \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2$

因此： 

$P_d(n) = p|h_{\text{total}}(n)|^2 = p \left( \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2 \right)$


### 速率计算
用户传输速率： $R_d(n) = \log_2 \left( 1 + \frac{P_d(n)}{\sigma^2} \right)$

代入 $P_d(n)$： 
==$R_d(n)$ = $\log_2(1 + \frac{p \left( \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2 \right)}{\sigma^2})$=={.danger}

### 可能的模型简化
相位对齐：

$g_r(n) = \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n)$ 的值取决于 RIS 相位调整。

若 $\Phi(n)$ 优化使 $g_r(n)$ 与 $h_d(n)$ 同相，则 $\text{Re}\{g_r(n)\}$ 最大化，增强信号。

简化形式：

若忽略相位，或假设 $g_r(n)$ 已优化为实数（如 $|g_r(n)| \leq M$），

可近似为： 

$P_d(n) \approx p \left( \alpha_0 s_d(n)^{-2} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} M^2 \right)$

代入 $P_d(n)$：
==$R_d(n) = \log_2(1 + \frac{p \left( \alpha_0 s_d(n)^{-2} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} M^2 \right)}{\sigma^2})$=={.danger}

### 公式总结
> 1. $h_{\text{total}}(n) = \sqrt{\alpha_0} s_d(n)^{-1} + \alpha_0 s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n)$


> 2. $P_d(n) = p \left( \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2 \right)$


> 3. $R_d(n)$ = $\log_2(1 + \frac{p \left( \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2 \right)}{\sigma^2})$


```markdown
## 系统模型
### 元素坐标与系统模型
基本坐标信息：
>[!info]
> - UAV 位置：$\mathcal{L}_u(n) = (u_x(n), u_y(n), H)$
> - 用户位置：$\mathcal{L}_d = (d_x, d_y, 0)$
> - RIS 位置：$\mathcal{L}_r = (r_x, r_y, H_r)$
> - RIS 相位调整矩阵：$\Phi(n) = \text{diag}(e^{j\theta_1(n)}, \ldots, e^{j\theta_M(n)})$，$M$ 为反射单元数。

系统组成：
>[!info]
> - UAV 位置：$\mathcal{L}_u(n) = (u_x(n), u_y(n), H)$
> - 用户位置：$\mathcal{L}_d = (d_x, d_y, 0)$
> - RIS 位置：$\mathcal{L}_r = (r_x, r_y, H_r)$
> - RIS 相位调整矩阵：$\Phi(n) = \text{diag}(e^{j\theta_1(n)}, \ldots, e^{j\theta_M(n)})$，$M$ 为反射单元数。

距离定义：
>[!info]
> - UAV 到用户：$s_d(n) = ||\mathcal{L}_u(n) - \mathcal{L}_d||_2$
> - UAV 到 RIS：$s_{u,r}(n) = ||\mathcal{L}_u(n) - \mathcal{L}_r||_2$
> - RIS 到用户：$s_{r,d} = ||\mathcal{L}_r - \mathcal{L}_d||_2$


### 信道增益推导

==直接信道(UAV --> User)==

根据自由空间路径损耗模型，

信道功率增益为： $|h_d(n)|^2 = \alpha_0 s_d(n)^{-2}$

信道幅度为： ==$h_d(n) = \sqrt{|h_d(n)|^2} = \sqrt{\alpha_0 s_d(n)^{-2}} = \sqrt{\alpha_0} s_d(n)^{-1}$=={.tip}

==反射信道(UAV --> RIS, RIS --> User)==
>[!important]
>RIS 反射信道由 UAV 到 RIS 和 RIS 到用户的级联组成。

:::steps
1. UAV -> RIS：

距离 $s_{u,r}(n)$，功率增益： $|\mathbf{h}_{u,r}(n)|^2 = \alpha_0 s_{u,r}(n)^{-2}$

幅度： $\mathbf{h}_{u,r}(n) = \sqrt{\alpha_0} s_{u,r}(n)^{-1} \mathbf{a}_{u,r}(n)$ 
>其中 $\mathbf{a}_{u,r}(n)$ 是 RIS 的阵列响应向量，长度为 $M$，模为 1。

2. RIS -> User：

距离 $s_{r,d}$，功率增益： $|\mathbf{h}_{r,d}(n)|^2 = \alpha_0 s_{r,d}(n)^{-2}$

幅度： $\mathbf{h}_{r,d} = \sqrt{\alpha_0} s_{r,d}(n)^{-1} \mathbf{a}_{r,d}(n)$ 
>其中$\mathbf{a}_{r,d}(n)$ 为 RIS 到用户的阵列响应向量。

3. UAV -> RIS -> User：

总信道为： $h_r(n) = \mathbf{h}_{r,d}(n)^T \Phi(n) \mathbf{h}_{u,r}(n)$

代入： $h_r(n) = (\sqrt{\alpha_0} s_{r,d}(n)^{-1} \mathbf{a}_{r,d})^T \Phi(n) (\sqrt{\alpha_0} s_{u,r}(n)^{-1} \mathbf{a}_{u,r}(n))$

化简： ==$h_r(n) = \alpha_0 s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \{\mathbf{a}_{r,d}^T \Phi(n) \mathbf{a}_{u,r}(n)\}$=={.tip}

:::

==总信道 $h_{\text{total}}(n)$==

总信道增益为直接信道和反射信道的相干叠加： $h_{\text{total}}(n) = h_d(n) + h_r(n)$

代入： ==$h_{\text{total}}(n) = \sqrt{\alpha_0} s_d(n)^{-1} + \alpha_0 s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n)$=={.danger}

>[!note]
>$h_d(n)$ 和 $h_r(n)$ 的相位未显式考虑。若需精确计算，应引入相位项，但优化中通常通过 $\Phi(n)$ 调整相位对齐。


### 用户接收功率推导
接收功率定义为： $P_d(n) = p |h_{\text{total}}(n)|^2$

代入 $h_{\text{total}}(n)$，计算功率： 

$|h_{\text{total}}(n)|^2 = \left| \sqrt{\alpha_0} s_d(n)^{-1} + \alpha_0 s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n) \right|^2$

令 $g_r(n) = \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n)$（复数），则： 

$|h_{\text{total}}(n)|^2 = \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2$

因此： 

$P_d(n) = p|h_{\text{total}}(n)|^2 = p \left( \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2 \right)$


### 速率计算
用户传输速率： $R_d(n) = \log_2 \left( 1 + \frac{P_d(n)}{\sigma^2} \right)$

代入 $P_d(n)$： 
==$R_d(n)$ = $\log_2(1 + \frac{p \left( \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2 \right)}{\sigma^2})$=={.danger}

### 可能的模型简化
相位对齐：

$g_r(n) = \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n)$ 的值取决于 RIS 相位调整。

若 $\Phi(n)$ 优化使 $g_r(n)$ 与 $h_d(n)$ 同相，则 $\text{Re}\{g_r(n)\}$ 最大化，增强信号。

简化形式：

若忽略相位，或假设 $g_r(n)$ 已优化为实数（如 $|g_r(n)| \leq M$），

可近似为： 

$P_d(n) \approx p \left( \alpha_0 s_d(n)^{-2} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} M^2 \right)$

代入 $P_d(n)$：
==$R_d(n) = \log_2(1 + \frac{p \left( \alpha_0 s_d(n)^{-2} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} M^2 \right)}{\sigma^2})$=={.danger}

### 公式总结
> 1. $h_{\text{total}}(n) = \sqrt{\alpha_0} s_d(n)^{-1} + \alpha_0 s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \mathbf{a}_{r,d}(n)^T \Phi(n) \mathbf{a}_{u,r}(n)$


> 2. $P_d(n) = p \left( \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2 \right)$


> 3. $R_d(n)$ = $\log_2(1 + \frac{p \left( \alpha_0 s_d(n)^{-2} + 2 \sqrt{\alpha_0} \alpha_0 s_d(n)^{-1} s_{u,r}(n)^{-1} s_{r,d}(n)^{-1} \text{Re}\{g_r(n)\} + \alpha_0^2 s_{u,r}(n)^{-2} s_{r,d}(n)^{-2} |g_r(n)|^2 \right)}{\sigma^2})$


```

### index_ris
```matlab
% 清空工作区变量，关闭所有图形窗口
clc
clear all
close all

% 初始化参数
N = 100;                    % 路径点数量
x0 = linspace(0, 400, N)';  % 初始x坐标，从0到400线性分布
y0 = zeros(N, 1);           % 初始y坐标，全部为0
H = 100 * ones(N, 1);       % 无人机飞行高度，固定为100米
x_o = 0; y_o = 0;           % 起点坐标 (0,0)
x_f = 400; y_f = 0;         % 终点坐标 (400,0)
x_b = 200; y_b = 200;       % 用户位置坐标 (200,200)
x_e = 50; y_e = 250;        % 窃听者1位置坐标 (50,250)
x_e2 = 300; y_e2 = 50;      % 窃听者2位置坐标 (300,50)
x_e3 = 50; y_e3 = 100;      % 窃听者3位置坐标 (50,100)
v = 20;                     % 无人机最大速度限制 (米/秒)
x_r = 200; y_r = 100; H_r = 30;  % RIS位置坐标 (200,100,30)
beta = 0.75;                % RIS每个单元的反射增益
M = 64;                     % RIS反射单元数，固定为64

% 用于存储每次迭代的保密速率
secrecy_rate_ris = zeros(1, 5);

% 初始化RIS相位
theta = 2 * pi * rand(M, 1);  % 初始相位，范围[0, 2pi)

% 主优化循环，执行5次迭代
for mm = 1:5
    % 初始化功率参数
    p = 0.1 * ones(N, 1);      % 传输功率20dBm (0.1 W)
    p_e = 0.1 * ones(N, 1);    % 窃听者功率（这里假设与用户相同）
    alpha0 = 10^(-5);          % 参考距离1米时的信道功率增益
    sigma2 = 10^(-11.4);       % 高斯白噪声功率
    
    % CVX优化部分 - 使用凸优化求解无人机轨迹
    n = 6 * N + 1;             % 变量总数
    cvx_begin       
        variable x(n) nonnegative  % 定义非负优化变量
        maximize(x(6*N+1))        % 目标：最大化保密速率下界
        % 添加约束条件
        subject to
        for k = 1:N
            % 计算直接信道距离和增益
            s_d = sqrt((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2);
            h_d = sqrt(alpha0) / s_d;
            % 计算反射信道距离和增益（考虑RIS高度）
            s_ur = sqrt((x0(k)-x_r)^2 + (y0(k)-y_r)^2 + (H(k)-H_r)^2);  % UAV到RIS距离
            s_rd = sqrt((x_r-x_b)^2 + (y_r-y_b)^2 + H_r^2);             % RIS到用户距离
            h_r = beta * sum(exp(1j * theta)) * alpha0 / (s_ur * s_rd);
            % 总信道增益和接收功率
            h_total = h_d + h_r;
            P_d = p(k) * abs(h_total)^2;
            % 用户信道容量
            RDL = log2(1 + P_d / sigma2);
            % 计算窃听者信道容量（仅直接路径）
            s_e = sqrt((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2);
            s_e2 = sqrt((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2);
            s_e3 = sqrt((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2);
            
            h_e = sqrt(alpha0) / s_e;
            h_e2 = sqrt(alpha0) / s_e2;
            h_e3 = sqrt(alpha0) / s_e3;
            REL = log2(1 + p_e(k) * (h_e^2) / sigma2);
            REL2 = log2(1 + p_e(k) * (h_e2^2) / sigma2);
            REL3 = log2(1 + p_e(k) * (h_e3^2) / sigma2);
            % 计算一阶泰勒近似系数（用户）
            ADL = (p(k) * abs(h_total)^2) / (log(2) * (sigma2 + P_d) * s_d^2);
            BDL = -2 * (x_b - x0(k)) * ADL;
            CDL = -2 * (y_b - y0(k)) * ADL;
            % 计算一阶泰勒近似系数（窃听者）
            AEL = (p_e(k) * h_e) / (log(2) * (sigma2 + p_e(k) * h_e) * s_e^2);
            AEL2 = (p_e(k) * h_e2) / (log(2) * (sigma2 + p_e(k) * h_e2) * s_e2^2);
            AEL3 = (p_e(k) * h_e3) / (log(2) * (sigma2 + p_e(k) * h_e3) * s_e3^2);
            BEL = -2 * (x_e - x0(k)) * AEL;
            BEL2 = -2 * (x_e2 - x0(k)) * AEL2;
            BEL3 = -2 * (x_e3 - x0(k)) * AEL3;
            CEL = -2 * (y_e - y0(k)) * AEL;
            CEL2 = -2 * (y_e2 - y0(k)) * AEL2;
            CEL3 = -2 * (y_e3 - y0(k)) * AEL3;
            % 添加速率约束（使用一阶泰勒近似）
            x(2*N+k) <= RDL - ADL * (square(x(k)) + square(x(N+k))) - BDL * x(k) - CDL * x(N+k);
            x(3*N+k) <= REL - AEL * (square(x(k)) + square(x(N+k))) - BEL * x(k) - CEL * x(N+k);
            x(4*N+k) <= REL2 - AEL2 * (square(x(k)) + square(x(N+k))) - BEL2 * x(k) - CEL2 * x(N+k);
            x(5*N+k) <= REL3 - AEL3 * (square(x(k)) + square(x(N+k))) - BEL3 * x(k) - CEL3 * x(N+k);
        end   
        % 定义辅助变量，用于保密速率计算
        i = (2*N+1):(3*N);
        j = (3*N+1):(4*N);
        A = x(j) - x(i);
        A1 = x(j+N) - x(i);
        A2 = x(j+2*N) - x(i);
        % 添加距离相关约束
        for kk = 1:N
            dd = (x0(kk)-x_b)^2 + (y0(kk)-y_b)^2 + H(kk)^2;
            de1 = (x0(kk)-x_e)^2 + (y0(kk)-y_e)^2 + H(kk)^2;
            de2 = (x0(kk)-x_e2)^2 + (y0(kk)-x_e2)^2 + H(kk)^2;
            de3 = (x0(kk)-x_e3)^2 + (y0(kk)-x_e3)^2 + H(kk)^2;
            if (dd >= de1)
                A(kk) = 0;
            end
            if (dd >= de2)
                A1(kk) = 0;
            end
            if (dd >= de3)
                A2(kk) = 0;
            end
        end
        % 添加保密速率约束
        sum(A) <= -x(6*N+1);
        sum(A1) <= -x(6*N+1);
        sum(A2) <= -x(6*N+1);
        % 添加速度约束
        for jj = 1:N-1
            square(x0(jj+1) + x(jj+1) - x0(jj) - x(jj)) + square(y0(jj+1) + x(N+jj+1) - y0(jj) - x(N+jj)) <= v^2;
        end
        square(x0(1) + x(1) - x_o) + square(y0(1) + x(N+1) - y_o) <= v^2;
        square(x_f - x(N) - x0(N)) + square(y_f - x(N+N) - y0(N)) <= v^2;
    cvx_end
    
    % 更新无人机位置
    x0 = x0 + x(1:N);      % 更新x坐标
    y0 = y0 + x(N+1:2*N);  % 更新y坐标
    
    % 固定轨迹，优化RIS相位（简单最大化方法）
    for k = 1:N
        s_ur = sqrt((x0(k)-x_r)^2 + (y0(k)-y_r)^2 + (H(k)-H_r)^2);
        s_d = sqrt((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2);
        h_d = sqrt(alpha0) / s_d;
        phi_opt = angle(h_d) * ones(M, 1);  % 简单假设：相位对齐直接路径
        theta = phi_opt;  % 更新相位
    end
    
    % 计算实际保密速率
    rate = zeros(1, N);
    for l = 1:N 
        % 用户信道（直接路径 + 反射路径）
        s_d = sqrt((x0(l)-x_b)^2 + (y0(l)-y_b)^2 + H(l)^2);
        h_d = sqrt(alpha0) / s_d;
        s_ur = sqrt((x0(l)-x_r)^2 + (y0(l)-y_r)^2 + (H(l)-H_r)^2);
        s_rd = sqrt((x_r-x_b)^2 + (y_r-y_b)^2 + H_r^2);
        h_r = beta * sum(exp(1j * theta)) * alpha0 / (s_ur * s_rd);
        h_total = h_d + h_r;
        rate_u = log2(1 + p(l) * abs(h_total)^2 / sigma2);
        % 窃听者信道（仅直接路径）
        rate_e = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e)^2 + (y0(l)-y_e)^2 + H(l)^2)^2) / sigma2);
        rate_e2 = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e2)^2 + (y0(l)-x_e2)^2 + H(l)^2)^2) / sigma2);
        rate_e3 = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e3)^2 + (y0(l)-x_e3)^2 + H(l)^2)^2) / sigma2);
        rate_e0 = max([rate_e, rate_e2, rate_e3]);
        % 计算保密速率
        rate(l) = max(rate_u - rate_e0, 0);
    end
    secrecy_rate_ris(mm) = sum(rate) / N;  % 存储每次迭代的平均保密速率
end

% 准备绘图数据（添加起点和终点）
x0 = [0; x0; x_f];
y0 = [0; y0; y_f];
z0 = [0; H; 0];  % 添加高度维度

% 计算无人机速度
uav_speed = zeros(1, length(x0)-1);
for i = 1:length(x0)-1
    uav_speed(i) = sqrt((x0(i+1)-x0(i))^2 + (y0(i+1)-y0(i))^2);
end 

% 绘制3D轨迹图（考虑高度）
figure;
plot3(x0, y0, z0, 'b-', 'LineWidth', 1.5); % 无人机路径
hold on;
plot3(x_b, y_b, 0, 'ro', 'MarkerSize', 10, 'LineWidth', 2);
text(x_b+5, y_b+5, 0, 'User', 'FontSize', 12);
plot3(x_e, y_e, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e+5, y_e+5, 0, 'Eavesdropper 1', 'FontSize', 12);
plot3(x_e2, y_e2, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e2+5, y_e2+5, 0, 'Eavesdropper 2', 'FontSize', 12);
plot3(x_e3, y_e3, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e3+5, y_e3+5, 0, 'Eavesdropper 3', 'FontSize', 12);
plot3(x_r, y_r, H_r, 'gs', 'MarkerSize', 10, 'LineWidth', 2);
text(x_r+5, y_r+5, H_r, 'RIS', 'FontSize', 12);
plot3(x0(1), y0(1), z0(1), 'g^', 'MarkerSize', 12, 'LineWidth', 2);
text(x0(1)+5, y0(1)+5, z0(1), 'Start', 'FontSize', 12);
plot3(x0(end), y0(end), z0(end), 'ms', 'MarkerSize', 12, 'LineWidth', 2);
text(x0(end)+5, y0(end)+5, z0(end), 'End', 'FontSize', 12);
grid on;
xlabel('X coordinate (m)');
ylabel('Y coordinate (m)');
zlabel('Z coordinate (m)');
title('UAV Trajectory with RIS (M=64), User, and Eavesdroppers (3D)');
legend('UAV Path', 'User', 'Eavesdropper 1', 'Eavesdropper 2', 'Eavesdropper 3', 'RIS', 'Start', 'End');
view(-37.5, 30); % 设置视角
hold off;

% 绘制M=64时的保密速率随迭代次数变化图
figure;
plot(1:5, secrecy_rate_ris, 'b-o', 'LineWidth', 1.5, 'MarkerSize', 8);
grid on;
xlabel('Iteration Number');
ylabel('Average Secrecy Rate (bits/s)');
title('Average Secrecy Rate vs. Iteration Number with RIS (M=64)');
legend('M = 64');

% 显示每次迭代的平均保密速率
disp('Average Secrecy Rate for each iteration with RIS (M=64):');
disp(secrecy_rate_ris);

% 将保密速率数据保存为CSV文件
filename = 'E:\MATLAB\RIS-UAV-Security\test\test\secrecy_rate_ris.csv';
writematrix(secrecy_rate_ris', filename);
disp(['保密速率数据已保存为: ' filename]);

% 准备完整轨迹数据（包含起点、中间点和终点）
final_trajectory = [x0, y0, [0; H; 0]];
% 保存为CSV文件
filename_traj = 'E:\MATLAB\RIS-UAV-Security\test\test\uav_trajectory.csv';
headers = {'X_coordinate(m)', 'Y_coordinate(m)', 'Z_coordinate(m)'};
fid = fopen(filename_traj, 'w');
fprintf(fid, '%s,%s,%s\n', headers{:});
fclose(fid);
writematrix(final_trajectory, filename_traj, 'WriteMode', 'append');
disp(['无人机轨迹数据已保存为: ' filename_traj]);
```











































```matlab

% 清空工作区变量，关闭所有图形窗口

clc

clear all

close all


% 初始化参数

N = 100;                    % 路径点的数量

x0 = linspace(0, 400, N)';  % 初始x坐标，从0到400线性分布

y0 = zeros(N, 1);          % 初始y坐标，全部为0

H = 100 * ones(N, 1);      % 无人机飞行高度，固定为100米

x_o = 0; y_o = 0;          % 起点坐标 (0,0)

x_f = 400; y_f = 0;        % 终点坐标 (400,0)

x_b = 200; y_b = 200;      % 用户位置坐标 (200,200)

x_e = 50; y_e = 250;       % 窃听者1位置坐标 (50,250)

x_e2 = 300; y_e2 = 50;     % 窃听者2位置坐标 (300,50)

x_e3 = 50; y_e3 = 100;     % 窃听者3位置坐标 (50,100)

v = 20;                    % 无人机最大速度限制 (米/秒)

x_r = 200; y_r = 100; H_r = 30;    % RIS位置坐标(200,100,30)

M = 64;                    % RIS反射单元数量

beta = 0.85;               % RIS每个单元的反射增益


% 初始化RIS相位向量（随机初始化）

theta = 2 * pi * rand(M, 1);  % 初始相位，范围[0, 2pi)


% 用于存储每次迭代的保密速率

secrecy_rate = zeros(1, 5);


% 主优化循环，执行5次迭代

for mm = 1:5

    % 初始化功率参数

    p = 0.1 * ones(N, 1);      % 传输功率20dBm (0.1 W)

    p_e = 0.1 * ones(N, 1);    % 窃听者功率（这里假设与用户相同）

    alpha0 = 10^(-5);          % 参考距离1米时的信道功率增益

    sigma2 = 10^(-11.4);       % 高斯白噪声功率

    
    % CVX优化部分 - 使用凸优化求解无人机轨迹

    n = 6 * N + 1;             % 变量总数

    cvx_begin

        variable x(n) nonnegative  % 定义非负优化变量

        maximize(x(6*N+1))        % 目标：最大化保密速率下界

        
        % 添加约束条件

        subject to

        % 对每个路径点计算速率约束

        for k = 1:N

            % 计算直接信道距离和增益

            s_d = sqrt((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2);

            h_d = sqrt(alpha0) / s_d;

            
            % 计算反射信道距离和增益（考虑RIS高度）

            s_ur = sqrt((x0(k)-x_r)^2 + (y0(k)-y_r)^2 + (H(k)-H_r)^2);  % UAV到RIS距离

            s_rd = sqrt((x_r-x_b)^2 + (y_r-y_b)^2 + H_r^2);             % RIS到用户距离

            h_r = beta * sum(exp(1j * theta)) * alpha0 / (s_ur * s_rd);

            
            % 总信道增益和接收功率

            h_total = h_d + h_r;

            P_d = p(k) * abs(h_total)^2;

            
            % 用户信道容量

            RDL = log2(1 + P_d / sigma2);

            
            % 计算窃听者信道容量（仅直接路径）

            s_e = sqrt((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2);

            s_e2 = sqrt((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2);

            s_e3 = sqrt((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2);

            h_e = alpha0 / (s_e^2);

            h_e2 = alpha0 / (s_e2^2);

            h_e3 = alpha0 / (s_e3^2);

            REL = log2(1 + p_e(k) * h_e / sigma2);

            REL2 = log2(1 + p_e(k) * h_e2 / sigma2);

            REL3 = log2(1 + p_e(k) * h_e3 / sigma2);

            
            % 计算一阶泰勒近似系数（用户）

            ADL = (p(k) * abs(h_total)^2) / (log(2) * (sigma2 + P_d) * s_d^2);

            BDL = -2 * (x_b - x0(k)) * ADL;

            CDL = -2 * (y_b - y0(k)) * ADL;

            
            % 计算一阶泰勒近似系数（窃听者）

            AEL = (p_e(k) * h_e) / (log(2) * (sigma2 + p_e(k) * h_e) * s_e^2);

            AEL2 = (p_e(k) * h_e2) / (log(2) * (sigma2 + p_e(k) * h_e2) * s_e2^2);

            AEL3 = (p_e(k) * h_e3) / (log(2) * (sigma2 + p_e(k) * h_e3) * s_e3^2);

            BEL = -2 * (x_e - x0(k)) * AEL;

            BEL2 = -2 * (x_e2 - x0(k)) * AEL2;

            BEL3 = -2 * (x_e3 - x0(k)) * AEL3;

            CEL = -2 * (y_e - y0(k)) * AEL;

            CEL2 = -2 * (y_e2 - y0(k)) * AEL2;

            CEL3 = -2 * (y_e3 - y0(k)) * AEL3;

            
            % 添加速率约束（使用一阶泰勒近似）

            x(2*N+k) <= RDL - ADL * (square(x(k)) + square(x(N+k))) - BDL * x(k) - CDL * x(N+k);

            x(3*N+k) <= REL - AEL * (square(x(k)) + square(x(N+k))) - BEL * x(k) - CEL * x(N+k);

            x(4*N+k) <= REL2 - AEL2 * (square(x(k)) + square(x(N+k))) - BEL2 * x(k) - CEL2 * x(N+k);

            x(5*N+k) <= REL3 - AEL3 * (square(x(k)) + square(x(N+k))) - BEL3 * x(k) - CEL3 * x(N+k);

        end   

        
        % 定义辅助变量，用于保密速率计算

        i = (2*N+1):(3*N);

        j = (3*N+1):(4*N);

        A = x(j) - x(i);

        A1 = x(j+N) - x(i);

        A2 = x(j+2*N) - x(i);

        
        % 添加距离相关约束

        for kk = 1:N

            dd = (x0(kk)-x_b)^2 + (y0(kk)-y_b)^2 + H(kk)^2;

            de1 = (x0(kk)-x_e)^2 + (y0(kk)-y_e)^2 + H(kk)^2;

            de2 = (x0(kk)-x_e2)^2 + (y0(kk)-x_e2)^2 + H(kk)^2;

            de3 = (x0(kk)-x_e3)^2 + (y0(kk)-y_e3)^2 + H(kk)^2;

            if (dd >= de1)

                A(kk) = 0;

            end

            if (dd >= de2)

                A1(kk) = 0;

            end

            if (dd >= de3)

                A2(kk) = 0;

            end

        end

        
        % 添加保密速率约束

        sum(A) <= -x(6*N+1);

        sum(A1) <= -x(6*N+1);

        sum(A2) <= -x(6*N+1);

        
        % 添加速度约束

        for jj = 1:N-1

            square(x0(jj+1) + x(jj+1) - x0(jj) - x(jj)) + square(y0(jj+1) + x(N+jj+1) - y0(jj) - x(N+jj)) <= v^2;

        end

        square(x0(1) + x(1) - x_o) + square(y0(1) + x(N+1) - y_o) <= v^2;

        square(x_f - x(N) - x0(N)) + square(y_f - x(N+N) - y0(N)) <= v^2;

    cvx_end

    
    % 更新无人机位置

    x0 = x0 + x(1:N);      % 更新x坐标

    y0 = y0 + x(N+1:2*N);  % 更新y坐标

    
    % 固定轨迹，优化RIS相位（简单最大化方法）

    for k = 1:N

        s_ur = sqrt((x0(k)-x_r)^2 + (y0(k)-y_r)^2 + (H(k)-H_r)^2);

        s_d = sqrt((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2);

        h_d = sqrt(alpha0) / s_d;

        % 优化目标：最大化|h_d + h_r|^2

        phi_opt = angle(h_d) * ones(M, 1);  % 简单假设：相位对齐直接路径

        theta = phi_opt;  % 更新相位

    end

    
    % 计算实际保密速率

    rate = []; rate_u = []; rate_e0 = [];

    for l = 1:N 

        % 用户信道（直接路径 + 反射路径）

        s_d = sqrt((x0(l)-x_b)^2 + (y0(l)-y_b)^2 + H(l)^2);

        h_d = sqrt(alpha0) / s_d;

        s_ur = sqrt((x0(l)-x_r)^2 + (y0(l)-y_r)^2 + (H(l)-H_r)^2);

        s_rd = sqrt((x_r-x_b)^2 + (y_r-y_b)^2 + H_r^2);

        h_r = beta * sum(exp(1j * theta)) * alpha0 / (s_ur * s_rd);

        h_total = h_d + h_r;

        rate_u = log2(1 + p(l) * abs(h_total)^2 / sigma2);

        
        % 窃听者信道（仅直接路径）

        rate_e = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e)^2 + (y0(l)-y_e)^2 + H(l)^2)^2) / sigma2);

        rate_e2 = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e2)^2 + (y0(l)-x_e2)^2 + H(l)^2)^2) / sigma2);

        rate_e3 = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e3)^2 + (y0(l)-x_e3)^2 + H(l)^2)^2) / sigma2);

        rate_e0 = max([rate_e, rate_e2, rate_e3]);

        
        % 计算保密速率

        rate(l) = max(rate_u - rate_e0, 0);

    end

    secrecy_rate(mm) = sum(rate) / N;  % 存储每次迭代的平均保密速率

end


% 准备绘图数据（添加起点和终点）

x0 = [0; x0; x_f];

y0 = [0; y0; y_f];

z0 = [0; H; 0];  % 添加高度维度


% 计算无人机速度

for i = 1:size(x0)-1

    uav_speed(i) = sqrt((x0(i+1)-x0(i))^2 + (y0(i+1)-y0(i))^2);

end 


% 绘制3D轨迹图（考虑高度）

figure;

plot3(x0, y0, z0, 'b-', 'LineWidth', 1.5); % 无人机路径

hold on;


% 绘制用户、窃听者和RIS位置（3D）

plot3(x_b, y_b, 0, 'ro', 'MarkerSize', 10, 'LineWidth', 2);

text(x_b+5, y_b+5, 0, 'User', 'FontSize', 12);


plot3(x_e, y_e, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);

text(x_e+5, y_e+5, 0, 'Eavesdropper 1', 'FontSize', 12);


plot3(x_e2, y_e2, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);

text(x_e2+5, y_e2+5, 0, 'Eavesdropper 2', 'FontSize', 12);


plot3(x_e3, y_e3, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);

text(x_e3+5, y_e3+5, 0, 'Eavesdropper 3', 'FontSize', 12);


plot3(x_r, y_r, H_r, 'gs', 'MarkerSize', 10, 'LineWidth', 2);

text(x_r+5, y_r+5, H_r, 'RIS', 'FontSize', 12);


% 绘制起点和终点

plot3(x0(1), y0(1), z0(1), 'g^', 'MarkerSize', 12, 'LineWidth', 2);

text(x0(1)+5, y0(1)+5, z0(1), 'Start', 'FontSize', 12);


plot3(x0(end), y0(end), z0(end), 'ms', 'MarkerSize', 12, 'LineWidth', 2);

text(x0(end)+5, y0(end)+5, z0(end), 'End', 'FontSize', 12);


% 设置图形属性

grid on;

xlabel('X coordinate');

ylabel('Y coordinate');

zlabel('Z coordinate');

title('UAV Trajectory with RIS, User, and Eavesdroppers (3D)');

legend('UAV Path', 'User', 'Eavesdropper 1', 'Eavesdropper 2', 'Eavesdropper 3', 'RIS', 'Start', 'End');

view(-37.5, 30); % 设置视角

hold off;


% 绘制保密速率随迭代次数变化图

figure;

plot(1:5, secrecy_rate, 'b-o', 'LineWidth', 1.5, 'MarkerSize', 8);

grid on;

xlabel('Iteration Number');

ylabel('Secrecy Rate (bits/s)');

title('Secrecy Rate vs. Iteration Number with RIS');

legend('Secrecy Rate');


% 显示每次迭代的保密速率

disp('Secrecy Rate for each iteration with RIS:');

disp(secrecy_rate);

```



```ris

% 清空工作区变量，关闭所有图形窗口

clc

clear all

close all


% 初始化参数

N = 100;                    % 路径点数量

x0 = linspace(0, 400, N)';  % 初始x坐标，从0到400线性分布

y0 = zeros(N, 1);           % 初始y坐标，全部为0

H = 100 * ones(N, 1);       % 无人机飞行高度，固定为100米

x_o = 0; y_o = 0;           % 起点坐标 (0,0)

x_f = 400; y_f = 0;         % 终点坐标 (400,0)

x_b = 200; y_b = 200;       % 用户位置坐标 (200,200)

x_e = 50; y_e = 250;        % 窃听者1位置坐标 (50,250)

x_e2 = 300; y_e2 = 50;      % 窃听者2位置坐标 (300,50)

x_e3 = 50; y_e3 = 100;      % 窃听者3位置坐标 (50,100)

v = 20;                     % 无人机最大速度限制 (米/秒)

x_r = 200; y_r = 100; H_r = 30;  % RIS位置坐标 (200,100,30)

beta = 0.75;                % RIS每个单元的反射增益

M = 64;                     % RIS反射单元数，固定为64


% 用于存储每次迭代的保密速率

secrecy_rate_ris = zeros(1, 5);


% 初始化RIS相位

theta = 2 * pi * rand(M, 1);  % 初始相位，范围[0, 2pi)


% 主优化循环，执行5次迭代

for mm = 1:5

    % 初始化功率参数

    p = 0.1 * ones(N, 1);      % 传输功率20dBm (0.1 W)

    p_e = 0.1 * ones(N, 1);    % 窃听者功率（这里假设与用户相同）

    alpha0 = 10^(-5);          % 参考距离1米时的信道功率增益

    sigma2 = 10^(-11.4);       % 高斯白噪声功率

    
    % CVX优化部分 - 使用凸优化求解无人机轨迹

    n = 6 * N + 1;             % 变量总数

    cvx_begin       

        variable x(n) nonnegative  % 定义非负优化变量

        maximize(x(6*N+1))        % 目标：最大化保密速率下界

        
        % 添加约束条件

        subject to

        for k = 1:N

            % 计算直接信道距离和增益

            s_d = sqrt((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2);

            h_d = sqrt(alpha0) / s_d;

            
            % 计算反射信道距离和增益（考虑RIS高度）

            s_ur = sqrt((x0(k)-x_r)^2 + (y0(k)-y_r)^2 + (H(k)-H_r)^2);  % UAV到RIS距离

            s_rd = sqrt((x_r-x_b)^2 + (y_r-y_b)^2 + H_r^2);             % RIS到用户距离

            h_r = beta * sum(exp(1j * theta)) * alpha0 / (s_ur * s_rd);

            
            % 总信道增益和接收功率

            h_total = h_d + h_r;

            P_d = p(k) * abs(h_total)^2;

            
            % 用户信道容量

            RDL = log2(1 + P_d / sigma2);

            
            % 计算窃听者信道容量（仅直接路径）

            s_e = sqrt((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2);

            s_e2 = sqrt((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2);

            s_e3 = sqrt((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2);

            h_e = alpha0 / (s_e^2);

            h_e2 = alpha0 / (s_e2^2);

            h_e3 = alpha0 / (s_e3^2);

            REL = log2(1 + p_e(k) * h_e / sigma2);

            REL2 = log2(1 + p_e(k) * h_e2 / sigma2);

            REL3 = log2(1 + p_e(k) * h_e3 / sigma2);

            
            % 计算一阶泰勒近似系数（用户）

            ADL = (p(k) * abs(h_total)^2) / (log(2) * (sigma2 + P_d) * s_d^2);

            BDL = -2 * (x_b - x0(k)) * ADL;

            CDL = -2 * (y_b - y0(k)) * ADL;

            
            % 计算一阶泰勒近似系数（窃听者）

            AEL = (p_e(k) * h_e) / (log(2) * (sigma2 + p_e(k) * h_e) * s_e^2);

            AEL2 = (p_e(k) * h_e2) / (log(2) * (sigma2 + p_e(k) * h_e2) * s_e2^2);

            AEL3 = (p_e(k) * h_e3) / (log(2) * (sigma2 + p_e(k) * h_e3) * s_e3^2);

            BEL = -2 * (x_e - x0(k)) * AEL;

            BEL2 = -2 * (x_e2 - x0(k)) * AEL2;

            BEL3 = -2 * (x_e3 - x0(k)) * AEL3;

            CEL = -2 * (y_e - y0(k)) * AEL;

            CEL2 = -2 * (y_e2 - y0(k)) * AEL2;

            CEL3 = -2 * (y_e3 - y0(k)) * AEL3;

            
            % 添加速率约束（使用一阶泰勒近似）

            x(2*N+k) <= RDL - ADL * (square(x(k)) + square(x(N+k))) - BDL * x(k) - CDL * x(N+k);

            x(3*N+k) <= REL - AEL * (square(x(k)) + square(x(N+k))) - BEL * x(k) - CEL * x(N+k);

            x(4*N+k) <= REL2 - AEL2 * (square(x(k)) + square(x(N+k))) - BEL2 * x(k) - CEL2 * x(N+k);

            x(5*N+k) <= REL3 - AEL3 * (square(x(k)) + square(x(N+k))) - BEL3 * x(k) - CEL3 * x(N+k);

        end   

        
        % 定义辅助变量，用于保密速率计算

        i = (2*N+1):(3*N);

        j = (3*N+1):(4*N);

        A = x(j) - x(i);

        A1 = x(j+N) - x(i);

        A2 = x(j+2*N) - x(i);

        
        % 添加距离相关约束

        for kk = 1:N

            dd = (x0(kk)-x_b)^2 + (y0(kk)-y_b)^2 + H(kk)^2;

            de1 = (x0(kk)-x_e)^2 + (y0(kk)-y_e)^2 + H(kk)^2;

            de2 = (x0(kk)-x_e2)^2 + (y0(kk)-x_e2)^2 + H(kk)^2;

            de3 = (x0(kk)-x_e3)^2 + (y0(kk)-x_e3)^2 + H(kk)^2;

            if (dd >= de1)

                A(kk) = 0;

            end

            if (dd >= de2)

                A1(kk) = 0;

            end

            if (dd >= de3)

                A2(kk) = 0;

            end

        end

        
        % 添加保密速率约束

        sum(A) <= -x(6*N+1);

        sum(A1) <= -x(6*N+1);

        sum(A2) <= -x(6*N+1);

        
        % 添加速度约束

        for jj = 1:N-1

            square(x0(jj+1) + x(jj+1) - x0(jj) - x(jj)) + square(y0(jj+1) + x(N+jj+1) - y0(jj) - x(N+jj)) <= v^2;

        end

        square(x0(1) + x(1) - x_o) + square(y0(1) + x(N+1) - y_o) <= v^2;

        square(x_f - x(N) - x0(N)) + square(y_f - x(N+N) - y0(N)) <= v^2;

    cvx_end

    
    % 更新无人机位置

    x0 = x0 + x(1:N);      % 更新x坐标

    y0 = y0 + x(N+1:2*N);  % 更新y坐标

    
    % 固定轨迹，优化RIS相位（简单最大化方法）

    for k = 1:N

        s_ur = sqrt((x0(k)-x_r)^2 + (y0(k)-y_r)^2 + (H(k)-H_r)^2);

        s_d = sqrt((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2);

        h_d = sqrt(alpha0) / s_d;

        phi_opt = angle(h_d) * ones(M, 1);  % 简单假设：相位对齐直接路径

        theta = phi_opt;  % 更新相位

    end

    
    % 计算实际保密速率

    rate = zeros(1, N);

    for l = 1:N 

        % 用户信道（直接路径 + 反射路径）

        s_d = sqrt((x0(l)-x_b)^2 + (y0(l)-y_b)^2 + H(l)^2);

        h_d = sqrt(alpha0) / s_d;

        s_ur = sqrt((x0(l)-x_r)^2 + (y0(l)-y_r)^2 + (H(l)-H_r)^2);

        s_rd = sqrt((x_r-x_b)^2 + (y_r-y_b)^2 + H_r^2);

        h_r = beta * sum(exp(1j * theta)) * alpha0 / (s_ur * s_rd);

        h_total = h_d + h_r;

        rate_u = log2(1 + p(l) * abs(h_total)^2 / sigma2);

        
        % 窃听者信道（仅直接路径）

        rate_e = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e)^2 + (y0(l)-y_e)^2 + H(l)^2)^2) / sigma2);

        rate_e2 = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e2)^2 + (y0(l)-x_e2)^2 + H(l)^2)^2) / sigma2);

        rate_e3 = log2(1 + p_e(l) * alpha0 / (sqrt((x0(l)-x_e3)^2 + (y0(l)-x_e3)^2 + H(l)^2)^2) / sigma2);

        rate_e0 = max([rate_e, rate_e2, rate_e3]);

        
        % 计算保密速率

        rate(l) = max(rate_u - rate_e0, 0);

    end

    secrecy_rate_ris(mm) = sum(rate) / N;  % 存储每次迭代的平均保密速率

end


% 准备绘图数据（添加起点和终点）

x0 = [0; x0; x_f];

y0 = [0; y0; y_f];

z0 = [0; H; 0];  % 添加高度维度


% 计算无人机速度

uav_speed = zeros(1, length(x0)-1);

for i = 1:length(x0)-1

    uav_speed(i) = sqrt((x0(i+1)-x0(i))^2 + (y0(i+1)-y0(i))^2);

end 


% 绘制3D轨迹图（考虑高度）

figure;

plot3(x0, y0, z0, 'b-', 'LineWidth', 1.5); % 无人机路径

hold on;


% 绘制用户、窃听者和RIS位置（3D）

plot3(x_b, y_b, 0, 'ro', 'MarkerSize', 10, 'LineWidth', 2);

text(x_b+5, y_b+5, 0, 'User', 'FontSize', 12);


plot3(x_e, y_e, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);

text(x_e+5, y_e+5, 0, 'Eavesdropper 1', 'FontSize', 12);


plot3(x_e2, y_e2, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);

text(x_e2+5, y_e2+5, 0, 'Eavesdropper 2', 'FontSize', 12);


plot3(x_e3, y_e3, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2);

text(x_e3+5, y_e3+5, 0, 'Eavesdropper 3', 'FontSize', 12);


plot3(x_r, y_r, H_r, 'gs', 'MarkerSize', 10, 'LineWidth', 2);

text(x_r+5, y_r+5, H_r, 'RIS', 'FontSize', 12);


% 绘制起点和终点

plot3(x0(1), y0(1), z0(1), 'g^', 'MarkerSize', 12, 'LineWidth', 2);

text(x0(1)+5, y0(1)+5, z0(1), 'Start', 'FontSize', 12);


plot3(x0(end), y0(end), z0(end), 'ms', 'MarkerSize', 12, 'LineWidth', 2);

text(x0(end)+5, y0(end)+5, z0(end), 'End', 'FontSize', 12);


% 设置图形属性

grid on;

xlabel('X coordinate (m)');

ylabel('Y coordinate (m)');

zlabel('Z coordinate (m)');

title('UAV Trajectory with RIS (M=64), User, and Eavesdroppers (3D)');

legend('UAV Path', 'User', 'Eavesdropper 1', 'Eavesdropper 2', 'Eavesdropper 3', 'RIS', 'Start', 'End');

view(-37.5, 30); % 设置视角

hold off;


% 绘制M=64时的保密速率随迭代次数变化图

figure;

plot(1:5, secrecy_rate_ris, 'b-o', 'LineWidth', 1.5, 'MarkerSize', 8);

grid on;

xlabel('Iteration Number');

ylabel('Average Secrecy Rate (bits/s)');

title('Average Secrecy Rate vs. Iteration Number with RIS (M=64)');

legend('M = 64');


% 显示每次迭代的平均保密速率

disp('Average Secrecy Rate for each iteration with RIS (M=64):');

disp(secrecy_rate_ris);


%% 将保密速率数据保存为CSV文件

filename = 'E:\MATLAB\RIS-UAV-Security\test\test\secrecy_rate_ris.csv';  % 定义文件名

writematrix(secrecy_rate_ris', filename);  % 保存数据（转置为列向量）


disp(['保密速率数据已保存为: ' filename]);






%% 准备完整轨迹数据（包含起点、中间点和终点）

final_trajectory = [x0, y0, [0; H; 0]];  % 包含x,y,z坐标


% 保存为CSV文件

filename_traj = 'E:\MATLAB\RIS-UAV-Security\test\test\uav_trajectory.csv';


% 添加列标题

headers = {'X_coordinate(m)', 'Y_coordinate(m)', 'Z_coordinate(m)'};

fid = fopen(filename_traj, 'w');

fprintf(fid, '%s,%s,%s\n', headers{:});

fclose(fid);


% 写入数据

writematrix(final_trajectory, filename_traj, 'WriteMode', 'append');


disp(['无人机轨迹数据已保存为: ' filename_traj]);

```




```原论文
% 清空工作区变量，关闭所有图形窗口
clc
clear all
close all

% 初始化参数
N = 100;                    % 路径点的数量
x0 = linspace(0, 400, N)';  % 初始x坐标，从0到400线性分布
y0 = zeros(N, 1);          % 初始y坐标，全部为0
H = 100 * ones(N, 1);      % 无人机飞行高度，固定为100米
x_o = 0; y_o = 0;          % 起点坐标 (0,0)
x_f = 400; y_f = 0;        % 终点坐标 (400,0)
x_b = 200; y_b = 200;      % 用户位置坐标 (200,200)
x_e = 50; y_e = 250;  % 窃听者1位置坐标 (50,250)
x_e2 = 350; y_e2 = 175;     % 窃听者2位置坐标 (300,50)
x_e3 = 50; y_e3 = 100;     % 窃听者3位置坐标 (50,100)
v = 20;                    % 无人机最大速度限制 (米/秒)

% 用于存储每次迭代的保密速率
secrecy_rate_noris = zeros(1, 5);

% 主优化循环，执行5次迭代
for mm = 1:5
    % 初始化功率参数
    p = 0.1 * ones(N, 1);      % 传输功率20dBm (0.1 W)
    p_e = 0.1 * ones(N, 1);    % 窃听者功率18dBm (这里假设与用户相同)
    gammar = 10^(11.4) * p;    % 用户信噪比
    gammar_e = 10^(11.4) * p_e;% 窃听者信噪比
    
    % CVX优化部分 - 使用凸优化求解无人机轨迹
    n = 6 * N + 1;             % 变量总数
    cvx_begin
        variable x(n) nonnegative  % 定义非负优化变量
        maximize(x(6*N+1))        % 目标：最大化保密速率下界
        
        % 添加约束条件
        subject to
        % 对每个路径点计算速率约束
        for k = 1:N
            % 计算用户和窃听者的信道容量（基于距离和信噪比）
            RDL = log2(1 + gammar(k) ./ ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2));
            REL = log2(1 + gammar_e(k) ./ ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2));
            REL2 = log2(1 + gammar_e(k) ./ ((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2));
            REL3 = log2(1 + gammar_e(k) ./ ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2));
            
            % 计算一阶泰勒近似系数
            ADL = gammar(k) ./ (log(2) * ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2 + gammar(k)) .* ((x0(k)-x_b)^2 + (y0(k)-y_b)^2 + H(k)^2));
            AEL = gammar_e(k) ./ (log(2) * ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e)^2 + (y0(k)-y_e)^2 + H(k)^2));
            AEL2 = gammar_e(k) ./ (log(2) * ((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e2)^2 + (y0(k)-x_e2)^2 + H(k)^2));
            AEL3 = gammar_e(k) ./ (log(2) * ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2 + gammar_e(k)) .* ((x0(k)-x_e3)^2 + (y0(k)-x_e3)^2 + H(k)^2));
            
            % 计算梯度项
            BDL = -2 * (x_b - x0(k)) .* ADL;
            BEL = -2 * (x_e - x0(k)) .* AEL;
            BEL2 = -2 * (x_e2 - x0(k)) .* AEL2;
            BEL3 = -2 * (x_e3 - x0(k)) .* AEL3;
            CDL = -2 * (y_b - y0(k)) .* ADL;
            CEL = -2 * (y_e - y0(k)) .* AEL;
            CEL2 = -2 * (y_e2 - y0(k)) .* AEL2;
            CEL3 = -2 * (y_e3 - y0(k)) .* AEL3;
            
            % 添加速率约束（使用一阶泰勒近似）
            x(2*N+k) <= RDL - ADL .* (square(x(k)) + square(x(N+k))) - BDL .* x(k) - CDL .* x(N+k);
            x(3*N+k) <= REL - AEL .* (square(x(k)) + square(x(N+k))) - BEL .* x(k) - CEL .* x(N+k);
            x(4*N+k) <= REL2 - AEL2 .* (square(x(k)) + square(x(N+k))) - BEL2 .* x(k) - CEL2 .* x(N+k);
            x(5*N+k) <= REL3 - AEL3 .* (square(x(k)) + square(x(N+k))) - BEL3 .* x(k) - CEL3 .* x(N+k);
        end   
        
        % 定义辅助变量，用于保密速率计算
        i = (2*N+1):(3*N);
        j = (3*N+1):(4*N);
        A = x(j) - x(i);
        A1 = x(j+N) - x(i);
        A2 = x(j+2*N) - x(i);
        
        % 添加距离相关约束
        for kk = 1:N
            dd = (x0(kk)-x_b)^2 + (y0(kk)-y_b)^2 + H(kk)^2;    % 到用户的距离平方
            de1 = (x0(kk)-x_e)^2 + (y0(kk)-y_e)^2 + H(kk)^2;   % 到窃听者1的距离平方
            de2 = (x0(kk)-x_e2)^2 + (y0(kk)-y_e2)^2 + H(kk)^2; % 到窃听者2的距离平方
            de3 = (x0(kk)-x_e3)^2 + (y0(kk)-y_e3)^2 + H(kk)^2; % 到窃听者3的距离平方
            if (dd >= de1)
                A(kk) = 0;  % 如果到用户的距离大于窃听者1，则约束为0
            end
            if (dd >= de2)
                A1(kk) = 0; % 如果到用户的距离大于窃听者2，则约束为0
            end
            if (dd >= de3)
                A2(kk) = 0; % 如果到用户的距离大于窃听者3，则约束为0
            end
        end
        
        % 添加保密速率约束
        sum(A) <= -x(6*N+1);
        sum(A1) <= -x(6*N+1);
        sum(A2) <= -x(6*N+1);
        
        % 添加速度约束
        for jj = 1:N-1
            % 相邻点之间的距离不得超过最大速度平方
            square(x0(jj+1) + x(jj+1) - x0(jj) - x(jj)) + square(y0(jj+1) + x(N+jj+1) - y0(jj) - x(N+jj)) <= v^2;
        end
        % 起点和终点的速度约束
        square(x0(1) + x(1) - x_o) + square(y0(1) + x(N+1) - y_o) <= v^2;
        square(x_f - x(N) - x0(N)) + square(y_f - x(N+N) - y0(N)) <= v^2;
    cvx_end
    
    % 更新无人机位置
    x0 = x0 + x(1:N);      % 更新x坐标
    y0 = y0 + x(N+1:2*N);  % 更新y坐标
    
    % 计算实际保密速率
    rate = []; rate_u = []; rate_e0 = [];
    for l = 1:N 
        % 计算用户和窃听者的实际速率
        rate_u = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_b-x0(l))^2 + (y_b-y0(l))^2));
        rate_e = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e-x0(l))^2 + (y_e-y0(l))^2));
        rate_e2 = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e2-x0(l))^2 + (y_e2-y0(l))^2));
        rate_e3 = log2(1 + 10^(11.4) * 0.1 / (100^2 + (x_e3-x0(l))^2 + (y_e3-y0(l))^2));
        rate_e0 = max([rate_e, rate_e2, rate_e3]);  % 取窃听者中的最大速率
        rate(l) = max(rate_u - rate_e0, 0);        % 计算保密速率（非负）
    end
    secrecy_rate_noris(mm) = sum(rate)/N;  % 存储每次迭代的平均保密速率
end

% 准备绘图数据（添加起点和终点）
x0 = [0; x0; x_f];
y0 = [0; y0; y_f];
z0 = [0; H; 0];  % 添加高度维度，起点和终点在地面 (z=0)，路径在 H=100

% 计算无人机速度
for i = 1:size(x0)-1
    uav_speed(i) = sqrt((x0(i+1)-x0(i))^2 + (y0(i+1)-y0(i))^2);
end 

% 绘制2D轨迹图
figure;
plot(x0, y0, 'b-', 'LineWidth', 1.5); % 无人机路径
hold on;

% 绘制用户和窃听者位置
plot(x_b, y_b, 'ro', 'MarkerSize', 10, 'LineWidth', 2);
text(x_b+5, y_b+5, 'User', 'FontSize', 12);

plot(x_e, y_e, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e+5, y_e+5, 'Eavesdropper 1', 'FontSize', 12);

plot(x_e2, y_e2, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e2+5, y_e2+5, 'Eavesdropper 2', 'FontSize', 12);

plot(x_e3, y_e3, 'kx', 'MarkerSize', 10, 'LineWidth', 2);
text(x_e3+5, y_e3+5, 'Eavesdropper 3', 'FontSize', 12);

% 绘制起点和终点
plot(x0(1), y0(1), 'g^', 'MarkerSize', 12, 'LineWidth', 2);
text(x0(1)+5, y0(1)+5, 'Start', 'FontSize', 12);

plot(x0(end), y0(end), 'ms', 'MarkerSize', 12, 'LineWidth', 2);
text(x0(end)+5, y0(end)+5, 'End', 'FontSize', 12);

% 设置图形属性
grid on;
xlabel('X coordinate');
ylabel('Y coordinate');
title('UAV Trajectory with User and Eavesdroppers (2D)');
legend('UAV Path', 'User', 'Eavesdropper 1', 'Eavesdropper 2', 'Eavesdropper 3', 'Start', 'End');
hold off;

% 绘制保密速率随迭代次数变化图
figure;
plot(1:5, secrecy_rate_noris, 'b-o', 'LineWidth', 1.5, 'MarkerSize', 8);
grid on;
xlabel('Iteration Number');
ylabel('Secrecy Rate (bits/s)');
title('Secrecy Rate vs. Iteration Number');
legend('Secrecy Rate');

% 显示每次迭代的保密速率
disp('Secrecy Rate for each iteration:');
disp(secrecy_rate_noris);

%% 将保密速率数据保存为CSV文件
filename = 'E:\MATLAB\RIS-UAV-Security\test\test\secrecy_rate_noris.csv';  % 定义文件名
writematrix(secrecy_rate_noris', filename);  % 保存数据（转置为列向量）

disp(['保密速率数据已保存为: ' filename]);


%% 准备完整轨迹数据（包含起点、中间点和终点）
final_trajectory = [x0, y0, [0; H; 0]];  % 包含x,y,z坐标

% 保存为CSV文件
filename_traj = 'E:\MATLAB\RIS-UAV-Security\test\test\uav_trajectory_noris.csv';

% 添加列标题
headers = {'X_coordinate(m)', 'Y_coordinate(m)', 'Z_coordinate(m)'};
fid = fopen(filename_traj, 'w');
fprintf(fid, '%s,%s,%s\n', headers{:});
fclose(fid);

% 写入数据
writematrix(final_trajectory, filename_traj, 'WriteMode', 'append');

disp(['无人机轨迹数据已保存为: ' filename_traj]);
```