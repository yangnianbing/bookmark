<template>
    <div ref="dropMenuContainer" class="drop-menu box">
        <ul>
            <li v-for="menu in menus" :key="menu.act" v-on:click="menuClick(menu.handler)">
                {{menu.label}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "DropMenu",
    props: {
        menus: Array,
        position: Object,
        appender: Object
    },
    data(){
        return {
        }   
    },
    mounted(){
       
    },
    methods:{
        menuClick(handler){
            handler && handler();
        }
    }
}
</script>

<style>
    .drop-menu{
        display: inline-block;
        position: absolute;
    }

    .drop-menu li{
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        cursor: pointer;
    }
    .drop-menu li:hover{
        background-color: #e8f0fe
    }
</style>

