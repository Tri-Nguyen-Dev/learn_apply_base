<template>
  <div>
    <button @click="openPicker">Select File from Google Drive</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const apiKey = 'YOUR_API_KEY'; // Thay thế bằng API Key của bạn
const clientId = 'YOUR_CLIENT_ID'; // Thay thế bằng OAuth Client ID của bạn
const scope = 'https://www.googleapis.com/auth/drive.file';
const pickerApiLoaded = ref(false);

const openPicker = () => {
  gapi.load('auth', { callback: onAuthApiLoad });
  gapi.load('picker', { callback: onPickerApiLoad });
};

const onAuthApiLoad = () => {
  gapi.auth2.init({
    client_id: clientId,
    scope: scope,
  }).then(() => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      if (pickerApiLoaded.value) {
        createPicker();
      }
    });
  });
};

const onPickerApiLoad = () => {
  pickerApiLoaded.value = true;
};

const createPicker = () => {
  const accessToken = gapi.auth.getToken().access_token;
  const view = new google.picker.View(google.picker.ViewId.DOCS);

  const picker = new google.picker.PickerBuilder()
      .setDeveloperKey(apiKey)
      .setOAuthToken(accessToken)
      .addView(view)
      .setCallback(pickerCallback)
      .build();

  // Mở picker từ sự kiện click
  picker.setVisible(true);
};

const pickerCallback = (data) => {
  if (data.action === google.picker.Action.PICKED) {
    const fileId = data.docs[0].id;
    console.log('Selected file ID:', fileId);
    // Tiếp tục xử lý file như tải lên hoặc hiển thị
  }
};

function getFileDetailsAndContent(fileId) {
  // Lấy thông tin file và nội dung cùng một lúc
  gapi.client.drive.files.get({
    fileId: fileId,
    alt: 'media',
    fields: 'name, mimeType, size' // Bạn có thể thêm 'size' nếu cần
  }).then(response => {
    const fileName = response.result.name;
    const mimeType = response.result.mimeType;
    const fileData = response.body;

    console.log('File name:', fileName);
    console.log('MIME type:', mimeType);

    if (mimeType === 'application/pdf') {
      getFileContent(fileId, fileName, mimeType);
    } else {
      console.error('The selected file is not a PDF.');
    }

    // Gọi hàm để xử lý và upload fileData
    uploadFile(fileData, fileName, mimeType);
  }).catch(error => {
    console.error('Error getting file details or content:', error);
  });
}

function uploadFile(fileData, fileName, mimeType) {
  // Chuyển đổi dữ liệu thành Blob (binary)
  const blob = new Blob([fileData], { type: mimeType });

  // Sử dụng FormData để upload file
  const formData = new FormData();
  formData.append('file', blob, fileName); // Sử dụng tên file thực tế

  // Gửi yêu cầu POST lên server của bạn để upload file
  fetch('https://your-server-endpoint.com/upload', {
    method: 'POST',
    body: formData,
  })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully!');
        } else {
          console.error('Error uploading file.');
        }
      })
      .catch(error => {
        console.error('Upload failed:', error);
      });
}


onMounted(() => {
  // Tải và khởi tạo các thư viện Google API khi component được mount
  if (!window.gapi) {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      console.log('Google API loaded');
    };
    document.head.appendChild(script);
  }
});
</script>
