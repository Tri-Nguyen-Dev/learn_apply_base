<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import store from '../store'; // Import Vuex store

export default {
  name: 'Callback',
  async mounted() {
    const router = useRouter();

    // Lấy authorization code từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      try {
        // Gọi API để trao đổi code lấy token
        const tokenData = await exchangeCodeForToken(authorizationCode);

        // Lưu token vào localStorage
        localStorage.setItem('access_token', tokenData.access_token);

        // Gọi API để lấy thông tin người dùng từ Keycloak
        const userInfo = await axios.get('https://your-keycloak-server/auth/realms/{realm}/protocol/openid-connect/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });

        // Lưu thông tin user vào store
        store.dispatch('setUser', userInfo.data);

        // Xóa các tham số không cần thiết khỏi URL
        window.history.replaceState({}, document.title, window.location.pathname);

        // Điều hướng về URL trước khi chuyển hướng tới Keycloak
        const redirectUrl = localStorage.getItem('redirectUrl') || '/dashboard'; // Mặc định điều hướng về /dashboard nếu không có redirect URL
        localStorage.removeItem('redirectUrl'); // Xóa redirect URL sau khi sử dụng
        router.push(redirectUrl);
      } catch (error) {
        console.error('Lỗi khi trao đổi mã hoặc lấy thông tin người dùng:', error);
        // Xử lý lỗi, có thể điều hướng tới trang lỗi hoặc login lại
      }
    } else {
      console.error('Không tìm thấy authorization code trong URL.');
    }
  },
};

// Hàm trao đổi authorization code để lấy token
async function exchangeCodeForToken(code) {
  const response = await axios.post('https://your-keycloak-server/auth/realms/{realm}/protocol/openid-connect/token', {
    client_id: '{client-id}',
    client_secret: '{client-secret}', // Nếu dùng confidential client
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: `${window.location.origin}/callback`,
  });

  return response.data; // Trả về token data: access_token, refresh_token, id_token
}
</script>
