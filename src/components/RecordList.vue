<template>
    <div class="record-list">
        <ul>
            <li v-for="(record, index) in recordList" v-bind:key="record.id" v-show="!record.hide">
                <span class="icon"></span>
                <a v-bind:href="record.url" class="record-link">{{record.label}}

                </a>
                
                <i class="iconfont icon-preview" @click="preview(record, index)"></i>
                <i class="iconfont icon-delete" @click="remove(record, index)"></i>
                <div v-if="record.preview" class="frame-container">
                    <iframe v-bind:src="record.url" 
                        frameborder="0" height="100%" width="100%"/>
                    
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import eventBus from '../eventBus';
import {filter} from 'lodash'
import Vue from 'vue' 
export default {
    name: 'RecordList',
    data(){
        return {
            recordList: []
        }
    },
    mounted(){
        var $this = this;
        eventBus.$on('recordList', (recordList, root) => {
            if(!root){
                $this.recordList = filter(recordList, (record) => record.type !== 'folder');
            }else{
                var nodeList = []
                walk(recordList, nodeList);
                $this.recordList = nodeList;
            }

            function walk(root, nodeList){
                root.forEach(node => {
                    if(node.type === 'folder' && node.children){
                        walk(node.children, nodeList);
                    }else if(node.type === 'website'){
                        nodeList.push(node);
                    }
                })
            }
        })
    },
    methods: {
        preview(record, index){
            if(record.preview){
                record.preview = false;
            }else{
                record.preview = true;
            } 
            Vue.set(this.recordList, index, record)
        },
        remove(record, index){
           this.recordList.splice(index, 1)
        }
    }
}
</script>



<style>
    .record-list{
        width:55%;
        margin-left: 5%;
        float: left;
        box-shadow: rgba(60, 64, 67, .3) 0 1px 2px 0,
                  rgba(60, 64, 67, .15) 0 1px 3px 1px;
        background-color: #fff;
        border-radius: 4px;
        margin-top: 20px;
        min-height: 50px;
        text-align: center;
    }

    .record-list .iconfont{
        cursor: pointer;
        margin-left: 15px;
    }
    .record-link{
        width: calc(100% - 100px);
        display: inline-block;
        text-align: left;
        text-decoration: none;
    }

    .record-list ul li{
        min-height: 40px;
        line-height: 40px;
    }

    .frame-container{
        width: 100%;
        height: 800px;
        border-top: 1px solid rgba(60, 64, 67, .3);
        border-bottom: 1px solid rgba(60, 64, 67, .3);
        margin: 10px 0px;
    }

</style>
