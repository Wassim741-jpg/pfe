import * as React from 'react';
import { StyleSheet ,Button,ImageBackground, View, Text , Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import bgImage from './Images/background.png'
import bgImage2 from './Images/background2.jpg'
import {TextInput} from "react-native-gesture-handler";
const  { width: WIDTH } =Dimensions.get('window')


function HomeScreen({ navigation }) {
    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={'Username'}
                    placeholderTextColor={'rgba(255,255,255,0.7'}
                    underlineColorAndroid='transparent'
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    placeholderTextColor={'rgba(255,255,255,0.7'}
                    underlineColorAndroid='transparent'
                />
            </View>
            <View >
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        </ImageBackground>

    );
}

function DetailsScreen() {
    return (
        <ImageBackground source={bgImage2} style={styles.backgroundContainer}>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={'URL API'}
                placeholderTextColor={'rgba(255,255,255,0.7'}
                underlineColorAndroid='transparent'
            />
        </View>
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder={'BORD ID'}
            placeholderTextColor={'rgba(255,255,255,0.7'}
            underlineColorAndroid='transparent'
        />
        </View>
            <View >
                <Button
                    title="Start Synch"
                />
            </View>
            <View >
                <Button
                    title="Stop Synch"
                />
            </View>
        </ImageBackground>
    );
}

const Stack = createStackNavigator();

export default class Example extends React.Component {
    render() {

        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Details" component={DetailsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
const styles =  StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input : {
        width: WIDTH-55,
        height: 45,
        borderRadius:25,
        fontSize: 16,
        paddingLeft:45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25


    },
    inputContainer: {
        marginTop: 10

    },
    btnLogin: {
        width : WIDTH-55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent:'center',
        marginTop: 20

    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    }
});
