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
        <p>🎉恭喜您！文件已成功上传！🎉</p>
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
        default: return '📁' ;
      }
    },
  },
  methods: {
    async fetchGithubToken() {
      try {
        const response = await fetch("https://ad.paiad.online/api/token/github/get");
        if (!response.ok) {
          throw new Error(`获取 token 失败: ${response.status} ${response.statusText}`);
        }
        const result = await response.json(); // 改为解析 JSON
        if (result.code !== 200 || !result.data) {
          throw new Error(`后端返回异常: ${result.msg || 'token 为空'}`);
        }
        this.githubToken = result.data.trim(); // 提取 data 中的 token 并去除空白
      } catch (error) {
        // alert('初始化 token 失败，请检查后端服务或网络！');
        alert('请用浏览器打开，如有其他问题可联系管理员！');
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
        alert('请用浏览器打开，如有其他问题可联系管理员！');
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
            throw new Error(`上传失败: ${errorData.message}`);
          }

          const data = await response.json();
          this.fileUrl = `https://raw.githubusercontent.com/${this.githubRepo}/main/${filePath}`;
          this.showSuccessModal = true;
          this.reset();
        } catch (error) {
          alert(`上传出错，请及时联系管理员！`);
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
@import '../styles/upload-assistant.css';
</style>