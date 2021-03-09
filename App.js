import React, { Component } from 'react';
import {
    StyleSheet ,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import bgImage from './Images/background.png'
import {TextInput} from "react-native-gesture-handler";
const  { width: WIDTH } =Dimensions.get('window')
export default class Example extends Component {
    render() {
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
                <TouchableOpacity style={styles.btnLogin}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </ImageBackground>
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