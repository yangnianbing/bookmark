<template>
    <div class="header">
        <span class="title">书签</span>
        <div class="search-container">
            <i class="iconfont icon-search"></i>
            <input type="text" v-model="filterText" @change="filterRecord" class="search-input" placeholder="搜索书签"/>
        </div>
        <span class="menu"><i ref="dropMenuAppender" class="iconfont icon-menu"></i></span>
        <DropMenu ref="dropMenu" :menus="dropMenu"></DropMenu>
        <input ref="inputFile" type="file" style="display:none;" class="file"/>
    </div>
</template>

<script>
import DropMenu from './DropMenu';
export default {
    name: 'Header',
    components: {DropMenu},
    data(){
        return {
            filterText: 'test',
            dropMenu: [
                {act: 'import', label: '导入书签', handler: (($vue) => {
                    return function(){
                        $vue.$refs.inputFile.click();
                    }
                })(this)}
            ]
        }
    },
    mounted() {
        var $vue = this;
        this.$refs.dropMenu.$refs.dropMenuContainer.style.top = this.$refs.dropMenuAppender.offsetTop + this.$refs.dropMenuAppender.offsetHeight + 'px';
        this.$refs.dropMenu.$refs.dropMenuContainer.style.left = this.$refs.dropMenuAppender.offsetLeft - this.$refs.dropMenu.$refs.dropMenuContainer.offsetWidth + this.$refs.dropMenuAppender.offsetWidth + 'px'; 

        this.$refs.inputFile.addEventListener('change', () => {
            $vue.$refs.inputFile.files[0] && resolve($vue.$refs.inputFile.files[0]);
        })

        function resolve(file){
            var fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (e) => {
                var html = fileReader.result;
                console.log(parseToDOM(html));
            }
        }

        function parseToDOM(html){
        var div = document.createElement("div");
            if(typeof html == "string")
                div.innerHTML = html;
            return div.childNodes;
        }

    },
    methods: {
        filterRecord(){

        }
    }
}
</script>

<style>
    .header{
        height: 56px;
        line-height: 56px;
        background-color: rgb(51, 103, 214);
        text-align: center;
    }

    .header .title{
        float: left;
        line-height: 56px;
        color: white;
        padding-left: 30px;
    }

    .header .search-container{
        width: 680px;
        height: 40px;
        line-height: 40px;
        background-color: rgba(0, 0, 0, 0.22);
        display: inline-block;
        margin-top: 8px;
    }
    .header .search-container input.search-input{
        width: 634px;
        height: 24px;
        font-size: 16px;
        background: transparent;
        border-width: 0px;
        color:#c3ced9
    }

    .header .search-container input.search-input:focus{
        outline-offset: 0px;
        outline:none;
    }
    .header .search-container i.icon-search{
        color: #c3ced9 !important;
    }
    .header .search-container input.search-input::-moz-placeholder{
        color: #c3ced9 !important;
    }
    .header .search-container input.search-input::-webkit-input-placeholder {
        color: #c3ced9 !important;
    }
    .header .menu{
        line-height: 56px;
        float: right;
        margin-right: 20px;
    }
    .header .menu .icon-menu{
        font-size: 30px;
        color: #c3ced9
    }

</style>
