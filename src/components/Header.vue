<template>
    <div class="header">
        <span class="title">书签</span>
        <div class="search-container">
            <i class="iconfont icon-search"></i>
            <input type="text" v-model="filterText" @keyup="filterRecord" class="search-input" placeholder="搜索书签"/>
        </div>
        <Dropdown  @command="handleCommand">
            <span class="el-dropdown-link menu">
                <i ref="dropMenuAppender" class="iconfont icon-menu"></i>
            </span>
            <DropdownMenu slot="dropdown">
                <DropdownItem command="import">导入书签</DropdownItem>
                <DropdownItem command="newBookmark">新建书签</DropdownItem>
                <DropdownItem command="newDir">新建文件夹</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <input ref="inputFile" type="file" style="display:none;" class="file"/>

         <Dialog
            title="添加书签"
            :visible.sync="bookmarkDialogVisible"
            width="30%">
            <div class="row"><label for="bookmarkName">名称</label><input name="bookmarkName" type="text" v-model="bookmarkName"/></div>
            <div class="row"><label for="bookmarkUrl">网址</label><input name="bookmarkUrl" type="website" v-model="bookmarkUrl" /></div>
            <span slot="footer" class="dialog-footer">
                <button class="button white" @click="bookmarkDialogVisible = false">取消</button>
                <button class="button blue" @click="saveBookmark">确定</button>
            </span>
        </Dialog>

        <Dialog
            title="添加文件夹"
            :visible.sync="dirDialogVisible"
            width="30%">
            <label for="dirName">名称</label><input name="dirName" type="text" v-model="dirName"/>
            <span slot="footer" class="dialog-footer">
               <button class="button white" @click="dirDialogVisible = false">取消</button>
               <button class="button blue" @click="saveDir">确定</button>
            </span>
        </Dialog>
    </div>
</template>

<script>
import DropMenu from './DropMenu';
import {Dialog, Dropdown, DropdownMenu, DropdownItem} from 'element-ui';
import eventBus from '../eventBus';
import {throttle} from 'lodash'
import { debug } from 'util';
import idGenerator from '../idGenerator'

export default {
    name: 'Header',
    components: {Dropdown,DropdownMenu, DropdownItem, Dialog},
    data(){
        return {
            filterText: '',
            bookmarkDialogVisible: false,
            dirDialogVisible: false,
            bookmarkName: '',
            bookmarkUrl:'',
            dirName: ''

        }
    },
    mounted() {
        var $vue = this;

        this.$refs.inputFile.addEventListener('change', () => {
            $vue.$refs.inputFile.files[0] && resolve($vue.$refs.inputFile.files[0]);
        })

        function resolve(file){
            var fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (e) => {
                var html = fileReader.result;
                var domNode = parseToDOM(html);
                var tree = toTree(domNode);
                eventBus.$emit('addNode', tree);
            }
        }

        function parseToDOM(html){
            var $div = document.createElement("div");
            if(typeof html == "string"){
                $div.innerHTML = html;
            }   
            return filterChildNode($div.querySelector('dl'), 'dt');
        }

        function filterChildNode($div, tagName){
            var nodes = [];
            Array.from($div.children).forEach(node => {
                if(node.tagName.toLowerCase() === tagName.toLowerCase()){
                    nodes.push(node);
                }
            })
            return nodes;
        }
        
        function toTree($div){
            var treeNodes = [];
            $div.forEach(tmp => {
                var h3 = filterChildNode(tmp, 'h3');
                if(h3.length > 0){
                    h3 = h3[0]
                    treeNodes.push({
                        label: h3.innerText,
                        type: 'folder',
                        id: idGenerator(),
                        children: toTree(filterChildNode(filterChildNode(tmp, 'dl')[0], 'dt'))
                    })
                }else{
                    var a = filterChildNode(tmp, 'a')
                    if(a.length > 0){
                        a = a[0]
                    }
                    treeNodes.push({
                        label: a.innerText,
                        url: a.href,
                        id: idGenerator(),
                        type: 'website'
                    })
                }
            })
            return treeNodes;
        }

    },
    methods: {
        filterRecord: throttle(
			function(){
				eventBus.$emit('filterRecord', this.filterText.trim());
			}
			,500),
        handleCommand(command){
            switch(command){
                case 'import':
                    this.$refs.inputFile.click();
                    break;
                case 'newBookmark':
                    this.showDialog('bookmarkDialogVisible');
                    break;
                case 'newDir':
                    this.showDialog('dirDialogVisible');
                    break;
            }
        },
        showDialog(type){
            this.bookmarkName = '';
            this.bookmarkUrl = '';
            this.dirName = '';
            this[type] = true;
        },
        saveDir(){
            eventBus.$emit('addNode', {
                label: this.dirName,
                children: [],
                type: 'folder',
                id: idGenerator()
            })
            this.hideDialog();
        },
        saveBookmark(){
            eventBus.$emit('addNode', {
                label: this.bookmarkName,
                url: this.bookmarkUrl,
                type: 'website',
                id: idGenerator()
            })
            this.hideDialog();
        },
        hideDialog(){
            this.dirDialogVisible = this.bookmarkDialogVisible = false;
        }
    }
}

</script>

<style>
    .header{
        height: 56px;
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
    .header .el-dropdown{
        line-height: 56px;
        float: right;
        margin-right: 20px;
    }
    .header .menu .icon-menu{
        font-size: 30px;
        color: #c3ced9
    }

    .header .el-dialog{
        text-align: left
    }

    .header .row{
        height: 40px;
    }

    .header .row input{
        width: 370px;
        margin-left: 10px;
        height: 25px;
        line-height: 25px;
        border-radius: 4px;
        border: 1px solid #DDDDDD
    }

    .header .button{
        padding: 5px 15px;
        border-radius: 4px;
        border-width: 1px;
        border-style: solid;
    }

    .header .button.white{
        background: #fff;
        color: rgb(51, 103, 214);
    }

    .header .button.blue{
        background: rgb(51, 103, 214);
        color: #fff
    }


</style>
