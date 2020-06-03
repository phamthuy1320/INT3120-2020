import * as React from 'react';
import {StyleSheet,View,ScrollView,Text, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Icons from 'react-native-vector-icons/MaterialIcons';
import styles from '../assets/css/css';

class Tutorial extends React.Component {
  render() {
    return (
    <ScrollView style={{marginTop: Constants.statusBarHeight,backgroundColor:'#f7f7f7'}} stickyHeaderIndices={[0]}>
    <View style={styles.banner}>
      <View style={{flexDirection:'row',}}>
      <TouchableOpacity  onPress={this._Done}>
        <Icons name={'arrow-back'} size={30} color='#fff' />
      </TouchableOpacity>
      <Text style={[styles.paragraph,{marginHorizontal:20}] }>
        Hướng dẫn học
      </Text>
      </View>
    </View>
    <View style={styles.container2,{margin:10}}>
    <View>
        <Text style={styles1.textMain}>3000 từ vựng Tiếng Anh thông dụng</Text>
        <Text style={styles1.text}>Sản phẩm dựa trên sản phẩm mẫu 3000 từ vựng Tiếng Anh thông dụng của BkiT Software</Text>
      </View>
      <View style={styles1.paragraph}>
        <Text style={styles1.textMain}>Các chức năng chính :</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={styles1.text}> <Text style={styles1.textList}>+ Tra từ:</Text>Bạn có thể tra cứu các từ vựng có sẵn trong cơ sở dữ liệu của ứng dụng</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles1.text}> <Text style={styles1.textList}>+ Danh sách từ đã thêm:</Text>Danh sách tất cả các từ vựng người dùng tự thêm vào</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles1.text}> <Text style={styles1.textList}>+ Thêm từ: </Text>Form thêm từ vựng mới, từ mới thêm vào sẽ được hiển thị trong 'Danh sách từ đã thêm'</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles1.text}> <Text style={styles1.textList}>+ Danh sách chủ đề: </Text>Mỗi chủ đề tương ứng với một nút, chạm vào nút để hiển thị danh sách từ vựng ứng với chủ đề đó, 
            thanh tìm kiếm ở đầu trang để người dùng tiện tìm kiếm chủ đề</Text>
        </View>
      </View>
      <View style={styles1.paragraph}>
        <Text style={styles1.textMain}>Ứng dụng mẫu :</Text>
        <Text style={styles1.text}>So với ứng dụng mẫu, sản phẩm làm lại đơn giản tuy nhiên ứng dụng hữu ích khi sử dụng ngoại tuyến với chức năng 'Tra từ'
           được bổ sung. Với chức năng 'Thêm từ' lại thuận tiện cho việc ghi chú, giúp bạn nhanh chóng note lại từ vựng mới bất cứ khi nào.
           Không nhất thiết là từ vựng tiếng Anh mà bất kì ngôn ngữ nào, tự tạo cho mình một từ điển riêng.</Text>
           <Text style={styles1.text}>Sản phẩm còn chưa hoàn hảo, và có thể còn nhiều thiếu sót.</Text>
      </View>
  </View>
    </ScrollView>
  );
  }
  _Done= async () => {
    this.props.navigation.navigate('Menu');
    }
}

const styles1= StyleSheet.create({
  textMain:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  textList:{
    fontSize:20,
    color: '#000',
    fontWeight: 'bold',
  },
  text:{
    fontSize:20,
    justifyContent:'space-around'
  },
  paragraph:{
    flexDirection:'column',
    marginTop:20,
    justifyContent:'space-between'
  }
});

export default Tutorial;
