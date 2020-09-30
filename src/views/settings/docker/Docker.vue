<template>
    <div class="Certification">
        <div>开启Docker</div>
        <div>
            <el-switch
                @change="Certchange()"
                v-model="Certification"
                active-color="#13ce66">
            </el-switch>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Docker',
	data(){
        return {
            Certification:''
        }
    },
	mounted(){
        this.Cert()
	},
	methods:{
        Cert(){
            var url = this.$store.state.IPPORT + "/api/v1/GetEnableLinkagent?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    console.log(result)
                    this.Certification=result.data.enable
                }
            })
        },
        Certchange(){
            var url = this.$store.state.IPPORT + "/api/v1/SetEnableLinkagent?enable="+this.Certification+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    console.log(result)
                    this.Cert()
                }
            })
        },
	}
}
</script>

<style lang="scss" scoped>
.Certification{
    padding: 10px 20px;
}
</style>