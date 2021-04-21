<template>
   <div class='cockpitstorage'>
       <div class="storage_left"></div>
       <div class="storage_right">
           <iframe width="100%" height="100%" id="terminal" frameborder="0" class="ifram"></iframe>
           <div class="divifram"></div>
       </div>
   </div>
</template>

<script>
export default {
    name:'cockpitstorage',
    data(){
		return{
			activemenu:"2-1",
            src:''
		}
	},
	methods:{
       url(){
           var iframe = document.getElementById("terminal");
           var configport=JSON.parse(this.$store.state.bStorageConfig)
               console.log(configport.strNodeName)
           var configip=this.$store.state.IPPORT
           var configipnew=configip.split(":")
           iframe.setAttribute("src", "https://"+configipnew[1]+":"+configport.strNodeName+"/cockpit/@localhost/storage/index.html");
           console.log("https://"+configipnew[1]+":"+configport.strNodeName+"/cockpit/@localhost/storage/index.html")
       }
	},
	mounted(){
		this.url()
	},

}
</script>

<style scoped>
 .storage_right{ 
     height: 90vh;
     background-color: #222222;
 }
 iframe{
     position: relative;
     z-index: 1;
 }
 .divifram{
     width: 100%;
     height: 100%;
     position: absolute;
     top:0;
     z-index: 2;
 }
</style>