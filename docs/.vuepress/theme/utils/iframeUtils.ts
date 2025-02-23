export function adjustIframeHeight(): void {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    if (iframe) {
        const adjustHeight = () => {
            const windowHeight = window.innerHeight;
            iframe.style.height = `${windowHeight * 1}px`; // 设置 iframe 高度为浏览器窗口的 100%
        };
        adjustHeight(); // 初始调整
        window.addEventListener('resize', adjustHeight); // 监听窗口大小变化
    }
}
