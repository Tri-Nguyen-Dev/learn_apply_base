<template>
  <div id="terminal-container" ref="terminalRef" class="terminal"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { Terminal } from '@xterm/xterm'
import 'xterm/css/xterm.css'

// Khai báo biến terminal
const terminalRef = ref<HTMLDivElement | null>(null)
const terminal = ref<any>(null)

// Emit event ra ngoài khi người dùng gõ phím
const emit = defineEmits(['input'])

onMounted(() => {
  terminal.value = new Terminal({
    cursorBlink: true,
    theme: {
      background: '#1e1e1e',
      foreground: '#ffffff',
    },
  })

  if (terminalRef.value) {
    terminal.value.open(terminalRef.value);
    terminal.value.write('Welcome to SSM Terminal!\r\n')
  }

  // Bắt sự kiện người dùng gõ phím
  terminal.value.onData((data) => {
    emit('input', data)
  })
})

onBeforeUnmount(() => {
  terminal.value.dispose()
})

// Hàm public để nhận dữ liệu server gửi về
function writeToTerminal(data: string) {
  terminal.value.write(data)
}

// Export để parent component gọi được
defineExpose({
  writeToTerminal,
  terminal
})
</script>

<style scoped>
.terminal {
  width: 100%;
  height: 500px;
  background: #1e1e1e;
}
</style>
