import React,{useState} from 'react';
import {CheckBox,StyleSheet,View,ScrollView,UIManager,Platform,LayoutAnimation,Text,ActivityIndicator, TouchableOpacity, Button} from 'react-native';
import styles from '../assets/css/css';
import Icons from 'react-native-vector-icons/MaterialIcons';
import IconsAnt from 'react-native-vector-icons/AntDesign';
import * as SQLite from 'expo-sqlite';
import { Input } from 'react-native-elements';
import {polyfill} from 'react-lifecycles-compat';

const db = SQLite.openDatabase("db.db");

//Tham khảo: https://medium.com/@iakash1195/expandable-listview-in-react-native-53ebdd78abea

class ExpandableItemComponent extends React.Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      isLoading: false,
      layoutHeight: 0,
    };
    
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  
  render() {
    return (
      <View style={{width:'90%'}}>
        {/*Header of the Expandable List Item*/}
       
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
         >
          <Text style={styles1.header}>{this.props.item.word}</Text>
          <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
         
          {/*Content under the header of the Expandable List Item*/}
            <Text style={[styles1.text,{color:'green'}]}>/{this.props.item.pronounce}/</Text>
            <Text style={[styles1.text]}>{this.props.item.description}</Text>

        </View>
        
        </TouchableOpacity>
        
      </View>
    );
  }
}
polyfill(ExpandableItemComponent);
class TickWords2 extends React.Component {
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
   
    this.state = { listDataSource: [] ,delete:''};
  }

  componentDidMount(){
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM addWord',
        null,
        (tx, results) =>{
         this.setState ( { listDataSource: results.rows._array });
        }
      );
    });
    
  }
  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };
 
  clearItem = (item) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from addWord where word=?;',[item]),
        tx.executeSql("select * from addWord", null,(tx, results) =>{
         this.setState ( { listDataSource: results.rows._array });
         console.log(JSON.stringify(results))
        }
      );
      },
    );}

    clearData = () => {
      db.transaction(
        tx => {
          tx.executeSql('delete from addWord;'),
          tx.executeSql("select * from addWord", null,(tx, results)  =>{
            this.setState ( { listDataSource: results.rows._array });
            console.log(JSON.stringify(results))
          }
            
          );
        },
      );}

 render() {
  if (this.state.isLoading) {
    //Loading View while data is loading
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <ActivityIndicator />
      </View>
    );
  }
    return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={{flexDirection:'row',}}>
          <TouchableOpacity  onPress={this._Done}>
            <Icons name={'arrow-back'} size={30} color='#fff' />
          </TouchableOpacity>
          <Text style={[styles.paragraph,{marginHorizontal:20}] }>
            Danh sách từ đã thêm
          </Text>
          {/*<Button title='list' onPress={getData}/>
          <Button title='test' onPress={test}/>*/}
        </View>
      </View>
  
        <ScrollView>
          {this.state.listDataSource.map((item, key) => (
            <View key={item.word} style={[styles1.button,{flexDirection:'row'}]}>
              <ExpandableItemComponent
                key={item.word}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
              />
              <IconsAnt name={'delete'} size={30} color='#000' onPress={this.clearItem.bind(this, item.word)} style={{alignSelf:'center',marginRight:20}} />
              
          </View>
            
          ))}
        </ScrollView>

        <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
          <TouchableOpacity style={[styles1.button1,]} onPress={this._AddWord}>
            <Text style={[styles.text,{color:'#ffffff'}]}> Thêm từ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles1.button1,{backgroundColor:'red'}]} onPress={this.clearData}>
            <Text style={[styles.text,{color:'#ffffff'}]}> Xóa tất cả </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
  }

  _AddWord = async () =>{
    this.props.navigation.navigate('Add');
  }
  _Done= async () => {
    this.props.navigation.navigate('Menu');
    }

}

const styles1 = StyleSheet.create({
  button: {
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    paddingVertical:10,
    marginTop:10,
    borderWidth: 1,
    borderColor: '#dfeae1',
    paddingLeft: 15,
  },
  button1:{
    backgroundColor:'#0cbb66',
    height:50,
    width:'45%',
    flexDirection:'row',
    alignItems: 'center',
    alignSelf:'center',
    alignContent:'center',
    color:'#ffffff',
    margin :10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  header:{
    fontSize:20,
    fontWeight:'bold',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
});
export default TickWords2;
