import Vue from 'vue'
import axios from 'axios'
import store from '../../store'
import VueI18n from 'vue-i18n'
import LangEn from '../../../static/lang/en'
import LangZhCHS from '../../../static/lang/zhchs'
import LangZhCHT from '../../../static/lang/zhcht'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: "zhchs",
    messages: {
      'en': LangEn,
      'zhchs': LangZhCHS,
      'zhcht': LangZhCHT
    }
})
i18n.locale = store.state.lang


let root=store.state.IPPORT;
//测试机仓
var listdatag=[];//全部
var listdatagload=[];//部分
var listdatag1=[];//一个
function loadtest(){
    if(store.state.root=="Operator"){
        return false
    }
    var url = root + "/api/v1//GetSrcCamera?session="+ store.state.token;
    // return falsel;
    axios.get(url).then(result=>{
        if(result.status == 200){
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=i18n.tc('message.live.camera');
            srcGroup.iconclass="iconfont  icon-shexiangtou";
            for(var i=0; i< data.src.length; i++){
                 var item = data.src[i];
                if(item['nOriginalType'] == 'H5_CH_GB'){
                    continue;
                }else{
                    var newItem ={
                            token : item['strToken'],
                            label : item['strName'],
                            iconclass : 'iconfont  icon-shexiangtou',
                            iconclass2 : 'iconfont  icon-shexiangtou',
                            name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                            disabled_me:false};
                    
                    if(!item['bOnline'])
                        newItem['iconclass'] = 'iconfont icon-kaiqishexiangtou';

                    if(item['nType'] == 'H5_CLOUD')
                        newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';
                    
                    if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';
                        
                srcGroup.children.push(newItem);
                }
            }
            listdatag.push(srcGroup);
          } 
    })

}
loadtest();
//写作业
function loadDevice() {
    if(store.state.root=="Operator"){
        return false
    }
   var url = root + "/api/v1/GetDevice?session="+ store.state.token;

      //重组
      axios.get(url).then(result=>{
          if(result.status == 200){
              var srcData = [];
              var data=result.data;
              for(var i = 0; i < data.dev.length; i++){
                  var item=data.dev[i];
                  var srclevel=[];
                  srclevel["strToken"]=item.strToken;
                  srclevel["strName"]=item.strName;
                  loadSrc(srclevel,srcData);
              }
          }
      })
}
function loadSrc(srclevel, srcData) {

    let _this =this;
    
    var url = root + "/api/v1/GetDeviceSrc?token="+ srclevel.strToken + "&session=" + store.state.token;

    axios.get(url).then(result => {
        if (result.status == 200)
        {
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=srclevel.strName;
            srcGroup.iconclass="iconfont  icon-shexiangtou";
            for(var i=0; i< data.src.length; i++){
                var item = data.src[i];
                var newItem ={
                        token : item['strToken'],
                        label : item['strName'],
                        iconclass : 'iconfont  icon-shexiangtou',
                        iconclass1 : '',
                        name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                        disabled_me:false};

                if(!item['bOnline'])
                    newItem['iconclass'] = 'iconfont icon-kaiqishexiangtou';

                if(item['nType'] == 'H5_CLOUD')
                    newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

                if(item['bDisable'] == true){
                    newItem['disabled_me'] =true;
                    newItem['iconclass1'] = 'camera';
                }

               srcGroup.children.push(newItem);
            }
            listdatag.push(srcGroup);
            listdatagload.push(srcGroup);
        }
    }).catch(error => {
        console.log('GetSrc failed', error);
    });
}
loadDevice();
//数字仓机
function NumberDevice() {
    if(store.state.root=="Operator"){
        return false
    }
   //url
   var url = root + "/api/v1/GetGbDevice?session="+ store.state.token;

      //重组
      axios.get(url).then(result=>{
          if(result.status == 200){
              var srcData = [];
              var data=result.data;
              for(var i = 0; i < data.dev.length; i++){
                  var item=data.dev[i];
                  var srclevel=[];
                  srclevel["strToken"]=item.strToken;
                  srclevel["strName"]=item.strName;
                  NumberSrc(srclevel,srcData);
              }
          }
      })
}
NumberDevice();
function NumberSrc(srclevel, srcData) {

    let _this =this;
    var url = root + "/api/v1/GetGbDeviceSrc?token="+ srclevel.strToken + "&session=" + store.state.token;

    axios.get(url).then(result => {
        if (result.status == 200)
        {
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=srclevel.strName;
            srcGroup.iconclass="iconfont  icon-shexiangtou";
            for(var i=0; i< data.src.length; i++){
                var item = data.src[i];
                var newItem ={
                        token : item['strToken'],
                        label : item['strName'],
                        iconclass : 'iconfont  icon-shexiangtou',
                        name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                        disabled_me:false};

                if(!item['bOnline'])
                    newItem['iconclass'] = 'iconfont icon-kaiqishexiangtou';

                if(item['nType'] == 'H5_CLOUD')
                    newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

               srcGroup.children.push(newItem);
            }
            listdatag.push(srcGroup);;
            listdatagload.push(srcGroup);
        }
    }).catch(error => {
        console.log('GetSrc failed', error);
    });
}
//级联
function cloudDevice() {
    if(store.state.root=="Operator"){
        return false
    }
   var url = root + "/api/v1/GetCloudDevice?session="+ store.state.token;

      //重组
      axios.get(url).then(result=>{
          if(result.status == 200){
              var srcData = [];
              var data=result.data;
              for(var i = 0; i < data.dev.length; i++){
                  var item=data.dev[i];
                  var srclevel=[];
                  srclevel["strToken"]=item.strToken;
                  srclevel["strName"]=item.strName;
                  cloudSrc(srclevel,srcData);
              }
          }
      })
}
cloudDevice();
function cloudSrc(srclevel, srcData) {

    var url = root + "/api/v1/GetCloudDeviceSrc?token="+ srclevel.strToken + "&session=" + store.state.token;

    axios.get(url).then(result => {
        if (result.status == 200)
        {
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=srclevel.strName;
            srcGroup.iconclass="iconfont icon-shexiangtou";
            for(var i=0; i< data.src.length; i++){
                var item = data.src[i];
                var newItem ={
                        token : item['strToken'],
                        label : item['strName'],
                        iconclass : 'mdi mdi-video fa-fw',
                        name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                        disabled_me:false};

                if(!item['bOnline'])
                    newItem['iconclass'] = 'iconfont icon-kaiqishexiangtou';

                if(item['nType'] == 'H5_CLOUD')
                    newItem['iconclass'] = 'iconfont  icon-shexiangtou';

                if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

               srcGroup.children.push(newItem);
            }
            listdatag.push(srcGroup);;
            listdatagload.push(srcGroup);
        }
    }).catch(error => {
        console.log('GetSrc failed', error);
    });
}

function Regional(){
    var url = root + "/api/v1/GetRegion?session="+ store.state.token;
    axios.get(url).then(result=>{
        // console.log(result);
        var oldarr=result.data.root;
        var oldarr1=result.data.src;
        // console.log(oldarr,oldarr1)
        var dataroot=getchild(oldarr,oldarr1);
        listdatag1.push(dataroot);
    })
}
function getchild(arr,arr1) {
    
    for(var i in arr.cam){
        if(!arr.cam[i].strName){
            for(var j in arr1){
                if(arr.cam[i].strToken == arr1[j].strToken){
                    arr.cam[i].strName = arr1[j].strName;
                    arr.cam[i].name=arr1[j].strName+"--"+i18n.tc('message.live.mainstream')
                    arr.cam[i].bOnline = arr1[j].bOnline;
                    arr.cam[i].iconclass="iconfont  icon-shexiangtou"
                    arr.cam[i].disabled_me=false
                    if(!arr1[j].bOnline)
                        arr.cam[i].iconclass = 'iconfont icon-kaiqishexiangtou';

                    if(arr1[j].nConnectType == 'H5_CLOUD')
                        arr.cam[i].iconclass = 'iconfont  icon-shexiangtou';

                    if(arr1[j].bRec == true)
                        arr.cam[i].iconclass2  = 'iconfont icon-radioboxfill none';

                    if(arr1[j].bDisable== true){
                        
                        arr.cam[i].node[0].disabled_me=true;
                        arr.cam[i].node[1].disabled_me=true;
                        arr.cam[i].disabled_me=true;
                        arr.cam[i].iconclass1= 'camera';
                    }
                }
            }
        }
    }
    // var nodecam=[{
    //     strName:"cam",
    //     node:arr.cam,
    // },{
        
    // }]
    if(arr.node && arr.node.length>0){
        for (var i = 0; i < arr.node.length; i++) {
            arr.node[i] = getchild(arr.node[i],arr1);
        }
    }
    return arr;
}
Regional();
export{listdatag,listdatagload,listdatag1}