<template>
  <div>
    <div v-html="marked.parse(markdownContent)" class="markdown-content"></div>
<!--    <Test ref="testRef" />-->

<!--    <n-button @click="handleTest"></n-button>-->
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {Marked} from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

function handleGlobalClick(event) {
  const target = event.target;
  if (target.matches('.block-code__copy[data-action="copy"]')) {
    const codeBlock = target.closest('.block-code');

    if (codeBlock) {
      const code = codeBlock.querySelector('pre code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        alert('Code copied!');
      });
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
})

onMounted(() => () => {
  document.removeEventListener('click', handleGlobalClick);
})

const renderer = {
  code(token)  {
    return `
            <div class="block-code">
                <div class="block-code__header">
                    <span>${token?.lang}</span>
                    <span class="block-code__copy" data-action="copy">Copy code</span>
                </div>
                <pre><code class="hljs language-${token.lang}">${token.text}</code></pre>
            </div>
           `
  }
};

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

marked.use({ renderer });

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

<style >
.markdown-content {
  padding: 16px;
  background-color: #2d2d2d;
  color: #ccc;
  border-radius: 8px;
  overflow-x: auto;
}

.block-code__header {
  height: 36px;
  width: 100%;
  background: #000;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  align-items: center;
}

.block-code__copy {
  cursor: pointer;
}
</style>
