<template>
    <div class="folder-tree">
        <Tree ref="tree" node-key="id" :data="tree" @node-click="handleNodeClick" :filter-node-method="filterNode"></Tree>
       
    </div>
</template>

<script>
import {Tree} from 'element-ui'
import {cloneDeep, remove, isArray} from 'lodash'
import eventBus from '../eventBus';
import Vue from 'vue';

export default {
    name: 'FolderTree',
    components: {Tree},
    data(){
       return {
           tree: [{
               label: '书签',
               type: 'folder',
               id: '1',
               children: [
                  
               ]
           }],
           currentSelected:null
        }
    },
    mounted(){ 
        var $vue = this;
        $vue.$refs.tree.filter('')
        setTimeout(() => {
            var nodes = []
            walkLeafNode(this.tree, function(node){
                nodes.push(node);
            })
            eventBus.$emit('recordList', nodes)
        });

        eventBus.$on('filterRecord', filterText => {
            var nodes = []
            filterText = filterText.toLowerCase();
            walkLeafNode(this.tree, function(node){
                if(node.label.toLowerCase().indexOf(filterText) != -1 ||
                    node.url.toLowerCase().indexOf(filterText) != -1 ){
                    nodes.push(node);
                }
            })
            eventBus.$emit('recordList', nodes)
        })

        eventBus.$on('addNode', (node) => {
            if(!isArray(node)){
                node = [node];
            }
            if(this.currentSelected){
                !this.currentSelected.children && Vue.set(this.currentSelected, 'children', [])
                this.currentSelected.children = this.currentSelected.children.concat(node);
                eventBus.$emit('recordList', this.currentSelected.children);
            }else{
                this.tree[0].children = this.tree[0].children.concat(node);
                eventBus.$emit('recordList', this.tree[0].children);
            }
            setTimeout(() => this.$refs.tree.filter(''))
        })
    },


    methods: {
        handleNodeClick(node){
            eventBus.$emit('recordList', node.children)
            this.currentSelected = node;
        },
        filterNode(value, data){
            return data.type === 'folder'
        }
    }
}

function walkLeafNode(tree, callback){
    tree.forEach(node => {
        if(node.type === 'folder' && node.children){
            walkLeafNode(node.children, callback);
        }else if(node.type === 'website'){
            callback(node);
        }
    })
}
</script>



<style>
    .folder-tree{
        width: 20%;
        float: left;
    }

    .folder-tree .el-tree{
        background: inherit;
        margin: 20px;
    }

    .folder-tree .el-tree .el-tree-node__content{
        height: 40px;
    }

    .folder-tree .el-tree .el-tree-node.is-current>.el-tree-node__content{
        color: #4285f4
    }
</style>
