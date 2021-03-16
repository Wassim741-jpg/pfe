import * as React from 'react';
import { StyleSheet ,Button,ImageBackground, View, Text , Dimensions, TouchableOpacity } from 'react-native';
import bgImage from '../Images/background.png'
import {TextInput} from "react-native-gesture-handler";
const  { width: WIDTH } =Dimensions.get('window')



class Home extends React.Component {
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
            <View >
                <Button
                    title="Login"
                    onPress={() => this.props.navigation.navigate('Profile')}
                />
            </View>
        </ImageBackground>
        )
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

    }
});


export default Home