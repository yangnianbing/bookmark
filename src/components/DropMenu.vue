<template>
    <div ref="dropMenuContainer" class="drop-menu">
        <ul>
            <li v-for="menu in menus" :key="menu.act" v-on:click="this.$emit(menu.act)">
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
       
    }
}
</script>

<style>
    .drop-menu{
        display: inline-block;
        position: relative;
    }
</style>

