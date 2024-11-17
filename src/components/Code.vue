<template>
  <div v-html="marked.parse(markdownContent)" class="markdown-content"></div>
</template>

<script setup>
import {ref} from 'vue'
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const marked = new Marked(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
);

function handleLinkClick(event) {
  const target = event.target
  if (target.tagName === 'A') {
    const href = target.getAttribute('href');
    if (href) {
      // Xử lý sự kiện click tại đây
      event.preventDefault();
    }
  }
}

// Nội dung Markdown ví dụ
const markdownContent = ref(`
# Tiêu đề

Đây là một đoạn mã JavaScript:

\`\`\`js
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greet('Trị');
\`\`\`

Và đây là một đoạn mã Python:

\`\`\`python
def greet(name):
    print(f"Hello, {name}")

greet("Trị")
\`\`\`

Hoặc không có ngôn ngữ xác định:

\`\`\`
console.log('Hello, world!');
\`\`\`
`);
</script>

<style scoped>
.markdown-content {
  padding: 16px;
  background-color: #2d2d2d;
  color: #ccc;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
