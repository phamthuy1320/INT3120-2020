import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Lists = [{ key: 'a' }, { key: 'b' }]


function _Function(item) {
    return (
        <View>
            <Text>{item}</Text>
        </View>
    );
}


class ListScreen extends React.Component {
    constructor() {
        super();
        this.state = { listDataSource: Lists };
    }
    cb = (item) => {
        this.props.navigation.navigate(item);
    };
    render() {
        return (
            <View>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <ScrollView>
                    {Lists.map((item) => (
                        <TouchableOpacity onPress={() => this.cb(item.key)}>
                            <Text>{item.key}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="List" component={ListScreen}
                options={{
                    title: 'My home',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                        height: 100,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />

            {
                Lists.map((item) => (
                    <Stack.Screen name={item.key} component={_Function.bind(this, item.key)}
                        options={{
                            title: item.key,
                            headerStyle: {
                                backgroundColor: '#f4511e',
                                height: 100,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }
                        }}
                    />))
            }
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
