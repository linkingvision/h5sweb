<template>
   <div class="StorageTerminal">
       <div class="terminal_left"></div>
       <div class="terminal_right">
           <iframe width="100%" height="100%" id="terminal" src="https://192.168.100.163:9090/cockpit/@localhost/system/terminal.html" frameborder="0"></iframe>
            <div class="divifram"></div>
       </div>
   </div>
</template>

<script>
export default {
   name:'StorageTerminal',
   data(){
       return{

       }
   },
   mounted(){
      this.url()
   },
   methods:{
       url(){
         var iframe = document.getElementById("terminal");
         var configport=JSON.parse(this.$store.state.bStorageConfig)
         var configip=this.$store.state.IPPORT
         var configipnew=configip.split(":")
         iframe.setAttribute("src", "https://"+configipnew[1]+":"+configport.strNodeName+"/cockpit/@localhost/storage/index.html");
         console.log("https://"+configipnew[1]+":"+configport.strNodeName+"/cockpit/@localhost/storage/index.html")
       }
   }
}
</script>

<style scoped>
 .terminal_right{
    height:90vh; 
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
     top: 0;
     z-index: 2;
 }
</style>