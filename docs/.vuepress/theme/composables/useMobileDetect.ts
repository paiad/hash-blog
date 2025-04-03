// src/composables/useMobileDetect.ts
import { ref, onMounted, onUnmounted } from "vue";

export function useMobileDetect() {
    const isMobile = ref(false);

    const checkIfMobile = () => {
        isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    };

    onMounted(() => {
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", checkIfMobile);
    });

    return { isMobile };
}