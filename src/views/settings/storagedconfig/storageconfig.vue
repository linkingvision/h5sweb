<template>
   <div class="stora-config">
        <div class="config_title">存储配置</div>
        <div class="config_input">
             <el-form class="Cluster_form" label-position="left" label-width="140px" :model="form">
                <el-form-item :label="label.configuiport">
                    <el-input v-model="form.strNodeName"></el-input>
                </el-form-item>
                <el-form-item :label="label.strNodeName">
                    <el-switch active-color="#13ce66" v-model="form.switch"></el-switch>
                </el-form-item>
             </el-form>
             <div class="submit_title">
                 <el-button class="" type="primary" @click="configsubmit">保存</el-button>
             </div>
        </div>
   </div>
</template>

<script>
export default {
   name:"Storagepage",
   data(){
       return{
           label:{
              strNodeName:'bStorageConfigUI',
              configuiport:"nStorageConfigPort"
           },
           form:{
                strNodeName:this.$store.state.strNodeName,
                switch:this.$store.state.switch
           },

       } 
     },
   methods:{
        configsubmit(){
          this.$store.state.strNodeName=this.form.strNodeName
          this.$store.state.switch=this.form.switch
          localStorage.setItem('strNodeName',JSON.stringify(this.form.strNodeName)) 
          localStorage.setItem('switchconfig',JSON.stringify(this.form.switch)) 
          this.$message({
                          message:"保存成功!",
                          type: 'success'
                        })
            } 
      }
}
</script>

<style scoped>
   .stora-config{
     width:33.33%;
     margin:20px auto;
   }
   .config_title{
     margin-bottom: 20px;
   }
   .el-form-item{
     margin-bottom: 0;
   }
   .submit_title{
     text-align: right;
   }
   .el-button--primary{
     height: 32px;
     line-height: 0;
   }
</style>