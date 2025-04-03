// src/composables/useSubmitQuestion.ts
import { Ref } from "vue";
import axios from "axios";

export function useSubmitQuestion(text: Ref<string>, isLoading: Ref<boolean>) {
    const getBeijingTime = () => {
        const now = new Date();
        return new Date(now.getTime() + 8 * 60 * 60 * 1000)
            .toISOString()
            .replace("Z", "") + "+08:00";
    };

    const handleSubmit = async (submittedText: string) => {
        isLoading.value = true;
        try {
            const beijingTime = getBeijingTime();
            const response = await axios.post("https://hash.paiad.top/api/questions", {
                question: submittedText,
                timestamp: beijingTime,
                timezone: "Asia/Shanghai",
            });

            text.value = ""; // 清空输入框
            console.log("提交成功，北京时间:", beijingTime);
        } catch (error) {
            console.error("提交失败:", error);
        } finally {
            isLoading.value = false;
        }
    };

    return { handleSubmit };
}