import * as React from 'react';
import { ScrollView, View,StyleSheet ,Image,Text,TouchableOpacity,Linking,} from 'react-native';
import Constants from 'expo-constants';

import styles from '../assets/css/css';


class Menu2 extends React.Component {
 
  Headder=()=>{
    return(
      <View>
      <View style={styles.banner}>
          <Text style={[styles.paragraph,{ textAlign: 'center'}]}>3000 Từ vựng Tiếng Anh</Text>
      </View> 
  </View>
    );
  }

  
MenuList=()=>{
    return(
      <View style={styles.container2}>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/search.png')}/>
          <Text style={styles.text} onPress={this._Search}>Tìm Kiếm</Text>
          </View>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/star.png')}/>
          <Text style={styles.text} onPress={this._Tick}>Danh sách từ đã thêm</Text>
        </View>
        
        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/add.png')}/>
          <Text style={styles.text} onPress={this._Add}>Thêm từ</Text>
        </View>

         <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/list.png')}/>
          <Text style={styles.text} onPress={this._List}>Danh sách chủ đề</Text>
          </View>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/book.png')}/>
          <Text style={styles.text} onPress={this._Tutorial}>Hướng dẫn</Text>
        </View>
        
      </View>
    );
  }

  OtherApps=()=>{
    return(
      <View style={styles.container2}>
        <Text style={{fontSize: 20,color:"green",}} >Ứng dụng học Tiếng Anh khác</Text>
    {/*Cho quảng cáo: mới chỉ có link tải*/}
        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/img/doulingo.png')}/>
          <TouchableOpacity onPress={() =>Linking.openURL('https://play.google.com/store/apps/details?id=com.duolingo&hl=vi')}>
            <Text style = {styles.text}>Duolingo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/img/tflat.png')}/>
         
          <TouchableOpacity onPress={() =>Linking.openURL('https://play.google.com/store/apps/details?id=com.vn.dic.e.v.ui&hl=vi')}>
            <Text style = {styles.text}>Từ điển TFlat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/img/giao_tiep.png')}/>
         
          <TouchableOpacity onPress={() =>Linking.openURL('https://play.google.com/store/apps/details?id=com.ndm.tienganh&hl=vi')}>
            <Text style = {styles.text}>Tiếng anh giao tiếp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/img/ngu_phap.png')}/>
         
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bkit.congthuctienganh&hl=vi')}>
            <Text style = {styles.text}>Công thức Tiếng Anh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  render(){
    return (
  <ScrollView style={{marginTop: Constants.statusBarHeight,backgroundColor:'#f8fff9'}} stickyHeaderIndices={[0]}>
        {this.Headder()}
        {this.MenuList()}
        {this.OtherApps()}

    </ScrollView>
  );
  
  }
  //Saved Words List
  _Tick= async () => {
    this.props.navigation.navigate('Tick');
    }
  //Guilding to use this app
  _Tutorial= async () => {
    this.props.navigation.navigate('Tutorial');
    }
    //Topics List
  _List= async () => {
    this.props.navigation.navigate('List');
    }
    //Add new word
  _Add= async () => {
    this.props.navigation.navigate('Add');
    }
    //Translate en->vn with available word in database
  _Search= async () => {
    this.props.navigation.navigate('Search');
    }
}

const styles1 = StyleSheet.create({
 

  text1:{
    fontSize: 20,
    color:"#00bcd4",
  },
  text: {
    paddingVertical:10,
    fontSize: 20,
    marginLeft: 15,
  },
});
export default Menu2;