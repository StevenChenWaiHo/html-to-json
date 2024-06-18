<template>
    <div class="container">
        <textarea v-model="html" @change="handleChange" class="textbox" placeholder="Enter HTML here">{{ html }}</textarea>
        <button @click="handleClick" class="button">Convert to JSON</button>
        <textarea readonly v-model="json" class="textbox" placeholder="JSON will apear here"><pre>{{ json }}</pre></textarea>
    </div>
</template>

<script>
import { handleError } from 'vue';
import HTMLParser from '../utils/htmlToJson/src/html/HTMLParser.ts'
export default {
    data() {
        return {
            html: '',
            json: ''
        };
    },
    methods: {
        async handleClick() {
            // Add your handling logic here
            const htmlInput = this.html.replace(/(\r\n|\n|\r|\s)/gm,"");
            const jsonResult = await HTMLParser(htmlInput)
            console.log(htmlInput)
            console.log(jsonResult)
            const indent = 2
            this.json = JSON.stringify(jsonResult, null, indent)
        }
    }   
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 80vh;
    width: 80vw;
}

.textbox {
  flex: 1;
  height: 80%;
  resize: none;
  padding: 10px;
  box-sizing: border-box;
}

.button {
    height: 40px;
}
</style>