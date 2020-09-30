<template>
    <div class="Certification">
        <div>
            {{$t("message.setting.Watchvideo")}}
        </div>
        <el-switch
            @change="anonymoued"
            v-model="anonymous"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
        <div>
            {{$t("message.setting.Illegal")}}
        </div>
        <el-switch
            @change="Illegalfun"
            v-model="Illegal"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
    </div>
</template>


<script>
export default {
	name: 'Safetyinof',
	data(){
        return {
            Certification:'',
            anonymous:"",
            Illegal:"",
        }
    },
	mounted(){
        this.anonymou();
        this.Illegallook();
	},
	methods:{
         // 是否匿名浏览
        anonymou(){
            var url1 = this.$store.state.IPPORT + "/api/v1/GetAnonymousView?session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                if(result.status==200){
                    this.anonymous=result.data.bAnonymousView
                }
            })
        },
        anonymoued(){
            var url1 = this.$store.state.IPPORT + "/api/v1/SetAnonymousView?enable="+this.anonymous+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                if(result.status==200){
                    this.anonymou();
                }
            })
        },
        // 是否匿名浏览
        Illegallook(){
            var url1 = this.$store.state.IPPORT + "/api/v1/GetLoginLockStatus?session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                if(result.status==200){
                    // console.log(result);
                    this.Illegal=result.data.bLoginLockStatus
                }
            })
        },
        Illegalfun(){
            var url1 = this.$store.state.IPPORT + "/api/v1/SetLoginLockStatus?enable="+this.Illegal+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                if(result.status==200){
                    this.Illegallook();
                }
            })
        }
	}
}
</script>

<style lang="scss" scoped>
.Certification{
    padding: 10px 20px;
}
</style>