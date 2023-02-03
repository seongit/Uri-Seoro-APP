<template>
  <!--eslint-disable-->
    <div>
       <editor
        :options="editorOptions"
        height="500px"
        initialEditType="wysiwyg"
        previewStyle="vertical" />
    </div>
</template>

<script>
/* Toast-ui-Editor  */
/*eslint-disable */
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

export default {
  components: {
    editor: Editor
  },
  data() {
      return {
        editorOptions: {
          hideModeSwitch: true
        }
      };
  },

};

</script>