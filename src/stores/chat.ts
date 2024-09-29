import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const message = ref<string>('')
  const keycloak = ref<any>(null)

  return { message, keycloak }
})
