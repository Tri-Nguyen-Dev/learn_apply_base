<template>
  <Terminal ref="terminalRef" @input="sendText" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Terminal from './Terminal.vue'
import { useTerminalSession } from '@/components/terminal/useSsmTerminal'

const terminalRef = ref()
const { sendText } = useTerminalSession(terminalRef)
</script>
