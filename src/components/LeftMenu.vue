<template>
    <div class="folder-tree">
        <Tree ref="tree" :data="tree" @node-click="handleNodeClick" :filter-node-method="filterNode"></Tree>
    </div>
</template>

<script>
import {Tree} from 'element-ui'
import {cloneDeep} from 'lodash'

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
                   {
                       label: '百度',
                       type: 'website',
                       id: 3,
                       url: 'http://www.baidu.com'
                   },{
                       label: '博客',
                       type: 'folder',
                       id: 2,
                   }
               ]
           }]
       }
    },
    mounted(){
        this.$refs.tree.filter('');
    },
    methods: {
        handleNodeClick(){
            console.log(arguments)
        },
        filterNode(value, data){
            return data.type === 'folder'
        }
    }
}
</script>



<style>
    .folder-tree{
        display: inline-block;
        width: 20%;
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
