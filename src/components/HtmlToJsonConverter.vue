<template>
    <div class="container">
        <textarea v-model="leftText" class="textbox">{{ html }}</textarea>
        <button @click="handleClick" class="button">Convert to JSON</button>
        <textarea readonly v-model="rightText" class="textbox">{{ json }}</textarea>
    </div>
</template>

<script>
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
            const jsonResult = await HTMLParser(this.html)
            console.log(jsonResult)
            this.json = jsonResult
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
    padding: 20px;
}

.textbox {
    width: 200px;
    height: 100px;
    resize: none;
}

.button {
    height: 40px;
}
</style>