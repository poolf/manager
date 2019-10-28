<template>
  <div id="mapGetLngLatapp"> 
      <el-button  type="primary" @click="dialogVisible = true" plain>地图检索</el-button>     
      <el-dialog title="获取门店经纬度" :visible.sync="dialogVisible"  width="35rem" :before-close="handleClose" :lock-scroll=true>
          <ul class="ulInp">
              <li> <el-input size="small" v-model="nowLocal.val" placeholder="当前经纬度" :disabled="true"></el-input>   </li>
              <li> <el-input  size="small" v-model="searchAry.keyword" placeholder="关键词搜索" clearable  prefix-icon="el-icon-search" ></el-input>     </li>
          </ul>       
      
        <label class="clsAddress" v-text="address"></label>
            <baidu-map class="mapGetLngLat" :center="center" :zoom="zoom" @ready="handler" @dragend="dragendGet" ak="CxhwbY0ACSV5qeppoL9r0as9MV5FoYbx">
                <bm-control>
                        <div class="showMIcon"><img src="~@/components/publicComponents/mapComponents/img/marker_blue_sprite.png" style="width:2rem;height:2rem;" /></div>
                </bm-control>
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" type="BMAP_NAVIGATION_CONTROL_ZOOM"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="lsSet"></bm-geolocation>
                 <bm-local-search class="mapsearchlist" :keyword="searchAry.keyword"  :auto-viewport="false" @resultshtmlset="setSearchPanl(true)" @infohtmlset="setNowlnglat" :panel="searchListPanl" :pageCapacity=5></bm-local-search>
            </baidu-map>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="setLngLat">确 定</el-button>
            </span>
      </el-dialog>
    
  </div>
</template>

<script>
// 调用示例
// 父组件定义一个对象，将对象props给bingObject
// 例如： <MapGetLngLat :bingObject.sync="mapNum"></MapGetLngLat>
// mapNum为父组件对象， mapNum ={val:""}
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmLabel from 'vue-baidu-map/components/overlays/Label'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation'
import BmControl from 'vue-baidu-map/components/controls/Control'


const center = {lng: 0, lat: 0}
const nowLocal = {val:0};
const searchAry = {keyword:""}
const address = ""
const spageNUm = 5
const searchListPanl = true;
export default {
  name: 'mapGetLngLatapp',
  props:{
        bingObject:{
            type: Object,
            required: true
        }
    },
  components: {
　　　　BaiduMap,  //指定组件模板
        BmMarker,BmLabel,BmLocalSearch,BmNavigation,BmGeolocation,BmControl 
　　},

 data(){
     return {
         center,nowLocal,address,searchListPanl,zoom: 21,　searchAry,
         dialogVisible: false   
     }
    },
 methods:{
    handler ({BMap, map}) {
      //console.log(BMap, map)     
      this.zoom = 19
     
      //自动获取用户浏览器当前位置
        var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
               center.lng = r.longitude;
               center.lat = r.latitude;         
               nowLocal.val = r.longitude + "," +  r.latitude;
                // let geocoder= new BMap.Geocoder(); //创建地址解析器的实例
                
                // geocoder.getLocation(r.point,rs=>{
                // this.address = "当前地址："+rs.addressComponents.street + rs.addressComponents.streetNumber;  
                // console.log(this.address)                
                // });   
            }); 
            
        },  
        lsSet:function(e){//当前位置加载完毕后执行
           this.initPointInfo(e);   
        },
        setSearchPanl:function(val){
            this.searchListPanl = val;//打开搜索列表 
        },         
        setNowlnglat:function(e){//点击搜索列表重新赋值           
            this.initPointInfo(e);      
            this.setSearchPanl(false);//关闭搜索列表    
        },    
        initPointInfo:function(e){//初始化当前位置及地址内容
            if(e.point !=null)
                var obj = e.point; 
            else
                var obj = e;
            nowLocal.val = obj.lng + "," +  obj.lat; 
            let geocoder= new BMap.Geocoder(); //创建地址解析器的实例
            geocoder.getLocation(obj,rs=>{
           let addStr = rs.addressComponents.province;
           addStr += rs.addressComponents.city;
           addStr += rs.addressComponents.district;
           addStr +=rs.addressComponents.street;
           addStr += rs.addressComponents.streetNumber;
           this.address = "当前地址："+addStr;             
           });   
        }, 
    dragendGet:function(e){//拖动地图     
        this.initPointInfo(e.target.getCenter());            
        },
        setLngLat:function(){//父组件赋值
            this.bingObject.val = nowLocal.val;
            //this.$parent.mapNum.nowLocal=nowLocal.val;
            this.dialogVisible = false;
        },
         handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }
       
    }
}
</script>

<style lang="scss">
@import './mapGetLngLat.scss';
</style>
