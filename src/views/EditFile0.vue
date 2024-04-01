<template>
  <div class="edit-file" ref="editorWrap">
    <code-editor></code-editor>
  </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor.vue'

export default {
  name: "Home",
  components: {
    CodeEditor
  },
  mounted() {
    this.$refs.editorWrap.style.height = window.innerHeight + "px";
  }
};
</script>
