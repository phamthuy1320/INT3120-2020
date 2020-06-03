import * as React from 'react';
import {StyleSheet,TextInput,View,Alert,Keyboard,ScrollView,Text,Platform,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import Constants from 'expo-constants';
import styles from '../assets/css/css';
import Icons from 'react-native-vector-icons/MaterialIcons';
import t from 'tcomb-form-native';
import * as SQLite from 'expo-sqlite';
import { Input } from 'react-native-elements';


const db = SQLite.openDatabase("db.db");
/*const MyString = t.refinement(t.String, function(text) {
  if(text.length>0){
    return text;
  }
});*/
t.String.getValidationErrorMessage = function() {
  return 'Chưa điền';
};
const Form = t.form.Form;
const NewWord = t.struct({
  word: t.String,
  pronounce:t.String,
  description: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
    },
  },
  controlLabel: {
    normal: {
      fontSize: 20,
      paddingBottom:5,
      color:'#166d18',
    },
    // the style applied when a validation error occours
    error: {
      fontSize: 20,
      paddingBottom:5,
      color:'#166d18',
    },
  },
  textbox:{
    normal: {
      height: 50,
      borderWidth: 1,
      fontSize: 20,
      borderColor: '#848383',
      borderRadius:10,
      backgroundColor: '#ffffff',
      paddingLeft:10,
     
    },
    error: {
      height: 50,
      borderWidth: 1,
      fontSize: 20,
      borderColor: '#848383',
      borderRadius:10,
      backgroundColor: '#ffffff',
      paddingLeft:10,
     
    },
  }
};

const options = {
  order: ['word','pronounce','description'],
  fields: {
    word: {
      label:'Từ vựng',
      placeholder: 'VD: Word',
  
    },
    pronounce: {
      label:'Phiên âm',
      placeholder: 'VD: wə:d',
     
    },
    description: {
      label:'Nghĩa của từ',
      placeholder: 'VD: Danh từ: Từ vựng',
     
    },
  },
  stylesheet: formStyles,
}

class AddWord extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(tx => {
      tx.executeSql("create table if not exists addWord (word text primary key not null, pronounce text, isExpanded boolean, description text);");
    });
    this.state = {
      options: options,
      value: {
        word:'',
        pronounce:'',
        description:'',
      },
    };
    }
    
    submit = () => {
      const v = this._form.getValue();
      
      console.log('value: ', v);
      if(v===null||v.word.length<=0||v.pronounce.length<=0||v.description.length<=0){
        Alert.alert(
          "Bạn Chưa điền đầy đủ các trường!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
        console.log('fill all fields, please')}
      else {
        this.setState({
          value:{
            word: v.word,
            pronounce: v.pronounce,
            description: v.description,
          }
        })

        db.transaction(
          tx => {
            tx.executeSql("insert into addWord (word, pronounce, description,isExpanded) values (?, ?,?,0)", [v.word,v.pronounce,v.description]);
            tx.executeSql("select * from addWord", [], (_, { rows }) =>
              console.log(JSON.stringify(rows)),
              this.setState({value:null}),
            );
          },
        );
      }
     
    }

    clear = () =>{
      this.setState({value:null});
    }

  render() {
    return (
    <ScrollView style={{marginTop: Constants.statusBarHeight,backgroundColor:'#f8fff9'}} stickyHeaderIndices={[0]}>
    <View style={styles.banner}>
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity  onPress={this._Done}>
        <Icons name={'arrow-back'} size={30} color='#fff' />
      </TouchableOpacity>
      <Text style={[styles.paragraph,{marginHorizontal:20}] }>
        Thêm từ
      </Text>
      </View>
    </View>
    <KeyboardAvoidingView behavior={Platform.OS='ios'? "padding" : "height"} style={styles1.container}>
    
      <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30,marginTop:20,color:'#166d18'}}>Thêm từ mới</Text>
      <Text style={{textAlign:'center',fontSize:20,color:'#166d18'}}>(Điền đầy đủ các trường)</Text>
      <View style ={{marginHorizontal:10}}>
        <Form ref={c => (this._form = c)} type={NewWord} value={this.state.value} options={this.state.options} /> 
      </View>
    <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
     
      <TouchableOpacity style={[styles1.button,]} onPress={this.submit}>
         <Text style={[styles.text,{color:'#ffffff'}]}> Thêm từ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles1.button,]} onPress={this._ListView}>
         <Text style={[styles.text,{color:'#ffffff'}]}> Danh sách từ </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles1.button,{backgroundColor:'red',}]} onPress={this.clear}>
         <Text style={[styles.text,{color:'#ffffff'}]}> Hủy</Text>
      </TouchableOpacity>
      
    </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
  }

  _ListView =()=>{
    this.props.navigation.navigate('Tick');
  }
  _Done=() => {
    this.props.navigation.navigate('Menu');
    }
  
}

const styles1=StyleSheet.create({
  container: {
    flex: 1
  },
  container2: {
    paddingHorizontal:20,
    paddingVertical:40,
    marginHorizontal:10,
    marginVertical:40,
    backgroundColor:'#ffffff',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius:5,
  },
  TextInput: {
    height: 50,
    borderWidth: 1,
    fontSize: 20,
    borderColor: '#848383',
    borderRadius:10,
    backgroundColor: '#ffffff',
    paddingLeft:10,
    marginHorizontal:10,
  },
  text:{
    fontSize: 20,
    paddingTop:25,
    paddingBottom:5,
    marginHorizontal:10,
  },
  button:{
    height:50,
    alignItems: 'center',
    marginHorizontal:10,
    justifyContent: 'center',
    backgroundColor:'#0cbb66', 
    marginVertical:10,
    borderRadius:5,
  },
});
export default AddWord;
