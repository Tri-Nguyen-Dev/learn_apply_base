<script lang="ts" setup>
import {useMarkdownFormat} from "@/components/markdown/useMarkdown";

const {renderedMarkdown} = useMarkdownFormat()
</script>

<template>
  <div>
    <div class="markdown-body" v-html="renderedMarkdown('')"></div>
  </div>
</template>

<style lang="scss" scoped>
</style>
