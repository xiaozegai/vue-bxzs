<template>
    <div class="hight-light-comp" v-html="html"></div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import 'highlight.js/styles/stackoverflow-dark.css';
  // import showdown from 'showdown';
  import hljs from 'highlight.js';
  import MarkdownIt from 'markdown-it';
  
  export default Vue.extend({
    name: 'HighLightMarkDown',
    props: {
      content: {
        type: String,
        default: '',
      },
      showCode: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        html: '',
        md: null as any,
      };
    },
    watch: {
      content: {
        handler(newValue: string) {
          this.html = this.md.render(newValue);
        },
        immediate: true,
      },
      showCode: {
        handler(newValue: boolean) {
          this.$nextTick(() => {
            if (newValue) {
              document.querySelectorAll('pre code').forEach((el: any) => {
                hljs.highlightAll();
              });
            }
          });
        },
        immediate: true,
      },
    },
    created() {
      // 使用 markdown-it 实例并开启 highlight.js 支持
      this.md = new MarkdownIt({
        html: true,
        highlight: (str: string, lang: string) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code>' +
                hljs.highlight(str, { language: lang }).value +
                '</code></pre>'
              );
            } catch (__) {
              console.log('markdown-err');
            }
          }
          return (
            '<pre class="hljs"><code>' +
            this.md.utils.escapeHtml(str) +
            '</code></pre>'
          ); // 使用默认的转义
        },
      });
    },
  });
  </script>
  
  <style>
  .hight-light-comp {
    user-select: text;
    font-weight: 500;
    
  }
  .hight-light-comp ul,
  .hight-light-comp ol {
    padding-left: 20px;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  
  .hight-light-comp li {
    list-style-position: inside;
    list-style-type: disc;
  }
  
  .hight-light-comp li::marker {
    color: gray;
  }
  .hight-light-comp li p {
    margin: 0;
    display: inline;
  }
  
  .hight-light-comp table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  .hight-light-comp tr th {
    background-color: #f0f0f0;
    border-bottom: solid 2px #bfbfbf;
    border: 1px solid #dbdbdb;
    padding: 8px;
    /* text-align: left; */
    margin: 0;
  }
  
  .hight-light-comp td {
    border: 1px solid #dbdbdb;
    padding: 4px;
    text-align: center;
  }
  
  .hight-light-comp a {
    color: blue;
  }
  
  .hljs {
    background: #333;
    color: #f0f0f0;
    padding: 20px;
  }
  
  .hight-light-comp p {
    word-wrap: break-word;
    line-break: anywhere;
    word-break: break-all;
    white-space: pre-line;
  }
  </style>
  