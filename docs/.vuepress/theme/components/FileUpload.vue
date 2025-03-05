<template>
  <div class="upload-container">
    <h2>文件上传小助手</h2>
    <div class="content-wrapper">
      <div class="drop-zone-container">
        <div
            class="drop-zone"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
            :class="{ 'drag-over': isDragging }"
        >
          <p v-if="!fileName">将文件拖到这里或点击选择文件</p>
          <div v-if="fileName && !isUploading" class="file-preview">
            <div class="preview-container">
              <img v-if="isImageFile" :src="filePreviewUrl" alt="文件预览" class="file-image" />
              <div v-else class="file-icon">
                <span>{{ fileTypeIcon }}</span>
              </div>
            </div>
          </div>
          <button @click="reset" class="reset-button">🔄 重新提交</button>
          <div v-if="isUploading" class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <input type="file" @change="onFileChange" ref="fileInput" hidden />
          <button v-if="!fileName" @click="triggerFileInput">上传文件</button>
        </div>
      </div>
      <div class="info-container" v-if="fileName">
        <div class="file-info">
          <p>已选择文件：{{ fileName }}</p>
          <div class="input-group">
            <label>学号：<input v-model="studentId" placeholder="请输入学号" /></label>
            <label>姓名：<input v-model="studentName" placeholder="请输入姓名" /></label>
          </div>
          <button @click="uploadFile">上传提交</button>
        </div>
      </div>
      <div v-if="fileUrl" class="upload-success">
        <p>恭喜您！文件已成功上传！</p>
      </div>
    </div>
    <!-- 上传成功弹窗 -->
    <div v-if="showSuccessModal" class="success-modal">
      <div class="modal-content">
        <p>上传成功！</p>
        <button @click="closeSuccessModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      selectedFile: null,
      fileName: "",
      fileUrl: "",
      filePreviewUrl: "",
      studentId: "",
      studentName: "",
      isUploading: false,
      showSuccessModal: false,
      githubToken: "",
      githubRepo: "paiad/homework-collect",
      uploadPath: "test",
    };
  },
  async created() {
    await this.fetchGithubToken(); // 将 token 获取逻辑抽取为独立方法
  },
  computed: {
    isImageFile() {
      if (!this.selectedFile) return false;
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
      const extension = this.selectedFile.name.split('.').pop().toLowerCase();
      return imageExtensions.includes(extension);
    },
    fileTypeIcon() {
      if (!this.selectedFile) return '📄';
      const extension = this.selectedFile.name.split('.').pop().toLowerCase();
      switch (extension) {
        case 'pdf': return '📑';
        case 'doc':
        case 'docx': return '📝';
        case 'txt': return '📜';
        default: return '📁';
      }
    },
  },
  methods: {
    async fetchGithubToken() {
      try {
        const response = await fetch('http://localhost:9090/api/token/github/get');
        if (!response.ok) {
          throw new Error(`获取 token 失败: ${response.status} ${response.statusText}`);
        }
        const result = await response.json(); // 改为解析 JSON
        if (result.code !== 200 || !result.data) {
          throw new Error(`后端返回异常: ${result.msg || 'token 为空'}`);
        }
        this.githubToken = result.data.trim(); // 提取 data 中的 token 并去除空白
        console.log('Fetched Token:', this.githubToken);
      } catch (error) {
        console.error('获取 GitHub token 失败:', error);
        alert('初始化 token 失败，请检查后端服务或网络！');
      }
    },
    onDragOver() { this.isDragging = true; },
    onDragLeave() { this.isDragging = false; },
    onDrop(event) {
      this.isDragging = false;
      const files = event.dataTransfer.files;
      if (files.length > 0) this.handleFile(files[0]);
    },
    triggerFileInput() { this.$refs.fileInput.click(); },
    onFileChange(event) {
      const files = event.target.files;
      if (files.length > 0) this.handleFile(files[0]);
    },
    handleFile(file) {
      this.selectedFile = file;
      this.fileName = file.name;
      this.fileUrl = "";
      this.studentId = "";
      this.studentName = "";
      this.isUploading = false;
      this.showSuccessModal = false;
      this.filePreviewUrl = this.isImageFile ? URL.createObjectURL(file) : "";
    },
    async uploadFile() {
      if (!this.selectedFile) {
        alert("请先选择文件！");
        return;
      }
      if (!this.studentId || !this.studentName) {
        alert("请输入学号和姓名！");
        return;
      }
      if (!this.githubToken) {
        alert("GitHub Token 未加载，请刷新页面或检查后端！");
        return;
      }

      this.isUploading = true;

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Content = reader.result.split(",")[1];
        const originalExtension = this.selectedFile.name.split(".").pop();
        const filePath = `${this.uploadPath}/${this.studentId}-${this.studentName}.${originalExtension}`;
        const apiUrl = `https://api.github.com/repos/${this.githubRepo}/contents/${filePath}`;

        try {
          console.log('Uploading with Token:', this.githubToken);
          console.log('API URL:', apiUrl);
          const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${this.githubToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Upload ${this.studentId}-${this.studentName} file to GitHub`,
              content: base64Content,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('GitHub API Error:', errorData);
            throw new Error(`上传失败: ${errorData.message}`);
          }

          const data = await response.json();
          this.fileUrl = `https://raw.githubusercontent.com/${this.githubRepo}/main/${filePath}`;
          this.showSuccessModal = true;
          this.reset();
        } catch (error) {
          console.error("上传错误:", error);
          alert(`上传出错：${error.message}`);
        } finally {
          this.isUploading = false;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    },
    reset() {
      this.selectedFile = null;
      this.fileName = "";
      this.studentId = "";
      this.studentName = "";
      this.filePreviewUrl = "";
      this.isUploading = false;
      this.showSuccessModal = false;
      this.$refs.fileInput.value = "";
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
  },
};
</script>



<style scoped>
.upload-container {
  max-width: 100%; /* 适配手机屏幕，占满宽度 */
  margin: 0 auto; /* 移除顶部和底部外边距，确保贴近屏幕边缘 */
  padding: 15px; /* 保持内边距，但可以根据需要调整 */
  text-align: center;
  background-color: #f5f6f7; /* 保持浅灰背景 */
  border-radius: 0; /* 移除圆角，因为它现在填满屏幕 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 保持轻微阴影 */
  height: 100vh; /* 填满整个视口高度 */
  display: flex; /* 使用 Flexbox 确保内容垂直排列并填满高度 */
  flex-direction: column; /* 垂直排列内容 */
}

h2 {
  color: #213A57; /* 使用深蓝色（#213A57）作为标题颜色 */
  font-size: 1.5rem; /* 适配手机屏幕，缩小字体 */
  margin-bottom: 15px; /* 减少下边距 */
}

.content-wrapper {
  display: flex;
  flex-direction: column; /* 保持上下结构 */
  gap: 15px; /* 缩小间距 */
  flex-grow: 1; /* 让内容区域填满剩余高度 */
  overflow-y: auto; /* 如果内容超出，允许垂直滚动 */
}

.drop-zone-container, .info-container {
  width: 100%; /* 占满宽度 */
}

.drop-zone {
  height: 50vh; /* 保持现有高度设置 */
  border: 2px dashed #086477; /* 使用中间蓝色（#086477）作为虚线边框 */
  padding: 20px; /* 缩小内边距 */
  border-radius: 6px; /* 缩小圆角 */
  background-color: white;
  transition: all 0.3s ease;
  color: #202124;
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); /* 缩小阴影 */
  display: flex; /* 使用 Flexbox 居中所有内容 */
  flex-direction: column; /* 垂直排列内容 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}

.drop-zone.drag-over {
  border-color: #14919B; /* 使用更亮的蓝色（#14919B）作为高亮 */
  background-color: #f1f3f4;
  box-shadow: 0 4px 8px rgba(20, 145, 155, 0.2); /* 调整阴影 */
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #0AD1C8; /* 使用明亮的青色（#0AD1C8）作为按钮背景 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem; /* 缩小字体，适配手机 */
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
}

p {
  margin: 0;
  color: #202124;
  font-size: 0.9rem; /* 缩小字体，适配手机 */
}

a {
  color: #0AD1C8; /* 使用明亮的青色（#0AD1C8）作为链接颜色 */
  text-decoration: none;
}

.input-group {
  margin: 10px 0; /* 缩小外边距 */
  display: flex;
  flex-direction: column; /* 确保在手机上垂直排列 */
  gap: 10px;
}

.input-group label {
  color: #202124;
  font-size: 0.9rem; /* 缩小字体 */
}

.input-group input {
  padding: 8px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background-color: white;
  color: #202124;
  font-size: 0.9rem; /* 缩小输入框字体 */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.input-group input::placeholder {
  color: #80868b;
  font-size: 0.9rem; /* 缩小占位符字体 */
}

.file-preview {
  margin: 15px 0; /* 缩小外边距 */
  text-align: center;
  position: relative;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px; /* 缩小预览容器尺寸 */
  height: 150px; /* 缩小预览容器尺寸 */
  margin: 0 auto;
}

.file-image {
  max-width: 150px; /* 缩小图片尺寸 */
  max-height: 150px; /* 缩小图片尺寸 */
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 缩小阴影 */
}

.file-icon {
  font-size: 60px; /* 缩小图标大小 */
  color: #0AD1C8; /* 使用明亮的青色（#0AD1C8）作为图标颜色 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px; /* 缩小容器宽度 */
  height: 150px; /* 缩小容器高度 */
}

.file-info {
  padding: 15px; /* 缩小内边距 */
  background-color: white;
  border-radius: 6px; /* 缩小圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 缩小阴影 */
}

.upload-success {
  margin-top: 15px; /* 缩小外边距 */
  color: #202124;
  background-color: white;
  padding: 15px;
  border-radius: 6px; /* 缩小圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 缩小阴影 */
}

.loading-spinner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
}

.spinner {
  width: 30px; /* 缩小加载动画大小 */
  height: 30px; /* 缩小加载动画大小 */
  border: 3px solid #f3f3f3;
  border-top: 3px solid #0AD1C8; /* 使用明亮的青色（#0AD1C8）作为加载动画颜色 */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 15px; /* 缩小内边距 */
  border-radius: 6px; /* 缩小圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* 缩小阴影 */
  text-align: center;
  width: 80%; /* 适配手机屏幕，占满更大部分 */
  max-width: 250px; /* 限制最大宽度 */
}

.modal-content p {
  color: #202124;
  margin-bottom: 10px; /* 缩小外边距 */
  font-size: 1rem; /* 适配手机屏幕 */
}

.modal-content button {
  padding: 8px 16px;
  background-color: #0AD1C8; /* 使用明亮的青色（#0AD1C8）作为按钮背景 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem; /* 缩小字体 */
}

.modal-content button:hover {
  background-color: #45DFB1; /* 使用更浅的绿色（#45DFB1）作为悬停颜色 */
}

.reset-button {
  position: absolute;
  bottom: 0px;
  right: 0px;
  background: none;
  border: none;
  font-size: 1rem; /* 调整字体大小 */
  cursor: pointer;
  color: #0AD1C8; /* 使用明亮的青色（#0AD1C8）作为重置按钮颜色 */
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
}

/* 媒体查询，确保在小屏幕上更优化 */
@media (max-width: 480px) {
  .upload-container {
    width: 100%;
    margin: 0 auto; /* 确保贴近屏幕边缘 */
    padding: 10px; /* 进一步减少内边距 */
  }

  button, .input-group input, .input-group label, p {
    font-size: 0.8rem; /* 进一步缩小字体 */
  }

  .preview-container, .file-image, .file-icon {
    width: 120px; /* 进一步缩小预览尺寸 */
    height: 120px; /* 进一步缩小预览尺寸 */
  }

  .file-icon {
    font-size: 50px; /* 进一步缩小图标 */
  }

  .spinner {
    width: 25px; /* 进一步缩小加载动画 */
    height: 25px; /* 进一步缩小加载动画 */
  }
}
</style>