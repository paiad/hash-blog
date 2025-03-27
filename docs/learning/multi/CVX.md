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
    % cd E:\MATLAB\radio_map_ply\CVX\cvx
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
    sp_eed(i) = sqrt((x0(i+1)-x0(i))^2 + (y0(i+1)-y0(i))^2);
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
```

