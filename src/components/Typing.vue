<template>
  <div class="chat-box">
    <div class="messages" ref="messageContainer" @scroll="onScroll">
      <div v-for="(message, index) in typedMessages" :key="index" class="message">
        <div v-if="message.role === 'user'" class="message-user">
          {{ message.message }} {{ message.t_id }}
        </div>
        <div v-else class="message-assistant">
          {{ message.message }} {{ message.t_id }}
        </div>
      </div>

      <div v-if="typingMessage" class="message typing">
        {{ typingMessage }}
      </div>

      <div ref="scrollAnchor"></div>
    </div>
    <input
        v-model="newMessage"
        :disabled="isFirstMessageTyping"
        @keyup.enter="sendNewMessage"
        placeholder="Enter your message..."
    />
  </div>
</template>

<script>
import { ref, nextTick, computed } from 'vue';

export default {
  setup() {
    const typedMessages = ref([]); // Store completed messages
    const newMessage = ref('');
    const messageQueue = ref([]); // Queue to store incoming messages
    const isFirstMessageTyping = ref(false);
    const messageContainer = ref(null);
    const scrollAnchor = ref(null);
    const autoScrollEnabled = ref(true);
    const typingMessage = ref(''); // Store the typing message
    let typingInterval = null; // Reference for the typing interval
    const isTyping = ref(false);
    const t_id = ref(1)

    const typingId = ref(null)

    const processQueue = async () => {
      if (messageQueue.value.length === 0 || isTyping.value) return;

      const message = messageQueue.value.shift();

      // Xác dinh typingId dang go

      // Neu ma typing = null thi la tin nhan dau tien
      if(typingId.value === null) {
        isFirstMessageTyping.value = true;
        typingId.value = message.t_id;
      }

      isTyping.value = true

      typingMessage.value = '';
      await typeMessage(message);

      isFirstMessageTyping.value = false;
      isTyping.value = false

      // Continue processing the queue after the current message is completed
      if (messageQueue.value.length > 0) {
        processQueue();
      }
    };

    const typeMessage = (fullMessage) => {
      return new Promise((resolve) => {
        let currentIndex = 0;

        clearInterval(typingInterval);
        typingInterval = setInterval(() => {
          if (currentIndex < fullMessage.message.length) {
            typingMessage.value = fullMessage.message.slice(0, currentIndex + 1);
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            typedMessages.value.push(fullMessage);
            typingMessage.value = ''; // Reset the typing message
            resolve();
          }
        }, 10); // Typing speed (100ms per character)
      });
    };

    const sendNewMessage = () => {
      if (newMessage.value.trim() !== '') {
        const dataSent = {
          message: newMessage.value,
          t_id: t_id.value,
          role: 'user'
        }

        if(typingId.value !== dataSent.t_id) {
          typingId.value = null
          if (typingMessage.value) {
            clearInterval(typingInterval);
            typedMessages.value.push({ role: 'assistant', message: typingMessage.value, t_id: t_id.value - 1 });
            typingMessage.value = '';
            isTyping.value = false
            messageQueue.value = []
          }
        }

        typedMessages.value.push(dataSent);

        // Nhan tin nhan ve
        setTimeout(() => {

          const dataReceipt = {
            message: 'blogradio.vn - Cuộc blogradio.vn - Cuộc đời này vốn dĩ không công bằng nếu tập làđời này vốn dĩ không công bằng nếu tập làm quen được với điều đó thì bạn sẽ nhận ra rằng “Sau cơn mưa, trời lại sáng”.blogradio.vn - Cuộc đời này vốn dĩ không công bằng nếu tập làm quen được với điều đó thì bạn sẽ nhận ra rằng “Sau cơn mưa, trời lại sáng”.',
            t_id: t_id.value,
            role: 'assistant'
          }

          messageQueue.value.push(dataReceipt);
          processQueue();

        }, 400)

        setTimeout(() => {

          const dataReceipt = {
            message: 'blogradio.vn - Cuộc đời này vốn dĩ không công bằng nếu tập làblogradio.vn - Cuộc đời này vốn dĩ không công bằng nếu tập làm quen được với điều đó thì bạn sẽ nhận ra rằng “Sau cơn mưa, trời lại sáng”.blogradio.vn - Cuộc đời này vốn dĩ không công bằng nếu tập làm quen được với điều đó thì bạn sẽ nhận ra rằng “Sau cơn mưa, trời lại sáng”.',
            t_id: t_id.value,
            role: 'assistant'
          }

          t_id.value = t_id.value + 1

          messageQueue.value.push(dataReceipt);
          processQueue();

        }, 800)


        newMessage.value = '';
      }
    }


    const scrollToBottom = () => {
      const anchor = scrollAnchor.value;
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const onScroll = () => {
      const container = messageContainer.value;
      const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
      autoScrollEnabled.value = isAtBottom;
    };

    return {
      newMessage,
      typedMessages,
      messageContainer,
      scrollAnchor,
      typingMessage,
      isFirstMessageTyping,
      onScroll,
      sendNewMessage
    };
  },
};
</script>

<style scoped>
.chat-box {
  max-width: 800px;
  margin: 0 auto;
}

.messages {
  border: 1px solid #ccc;
  padding: 10px;
  height: 800px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin: 24px 0;
  font-family: monospace;
}

.typing {
  color: gray;
  font-style: italic;
}

.message-user {
  text-align: end;
  display: inline-flex;
  justify-content: end;
  background-color: #cccccc;

  border-radius: 8px;
  padding: 6px 10px;
}

input {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  padding: 12px;
}
</style>
