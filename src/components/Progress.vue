<template>
  <div class="upload-container">
    <div class="progress-bar" :style="{ width: `${uploadProgress}%` }"></div>
    <p>{{ uploadProgress.toFixed(0) }}%</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadProgress: 0,
      uploadComplete: false, // Trạng thái hoàn thành upload
    };
  },
  methods: {
    simulateUpload() {
      const interval = setInterval(() => {
        if (this.uploadComplete) {
          // Khi upload hoàn thành, đặt progress bar về 100%
          this.uploadProgress = 100;
          clearInterval(interval);
        } else {
          // Tăng phần trăm với giá trị ngẫu nhiên (nhỏ hơn để trông thật hơn)
          this.uploadProgress += Math.random() * 5;

          // Giới hạn phần trăm không vượt quá 99 để tạo hiệu ứng chờ khi chưa hoàn thành
          if (this.uploadProgress >= 99) {
            this.uploadProgress = 99;
          }
        }
      }, 200); // Tốc độ update (200ms) để trông mượt mà
    },
    completeUpload() {
      // Gọi hàm này khi upload thành công
      this.uploadComplete = true;
    },
  },
  mounted() {
    this.simulateUpload();
    // Giả lập gọi completeUpload sau 5 giây (thay bằng sự kiện upload thực tế)
    setTimeout(() => {
      this.completeUpload();
    }, 5000);
  },
};
</script>

<style scoped>
.upload-container {
  width: 300px;
  margin: 20px auto;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.progress-bar {
  height: 20px;
  background-color: #4caf50;
  transition: width 0.2s ease;
}

p {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
}
</style>
