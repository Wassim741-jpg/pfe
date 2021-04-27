import * as React from 'react';
import { StyleSheet ,Button,ImageBackground, View, Text , Dimensions, TouchableOpacity } from 'react-native';
import bgImage from '../Images/background.png'
import {TextInput} from "react-native-gesture-handler";
const  { width: WIDTH } =Dimensions.get('window')



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverURL: '',
            username: 'admin',
            password:'admin'
        };
    }

    Login = () => {
        this.props.navigation.navigate('Profile', { user : this.state.username, psw : this.state.password , URL : this.state.serverURL})
        const loginURl = this.state.serverURL + '/j_spring_security_check';
       fetch(loginURl,{
            method: 'post',
            credentials: 'same-origin',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'XMLHttpRequest=true&username=' + encodeURIComponent(this.state.username) + '&password=' + encodeURIComponent(this.state.password)
        }).then((result) => {
            if (result) {
             //  console.log(result);
            }
        });
    }
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                      //  placeholder={'URL API'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        value={this.state.serverURL}
                        onChangeText={text =>
                            this.setState(state => ({serverURL:text}))
                        }
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'rgba(255,255,255,0.7'}
                        underlineColorAndroid='transparent'
                        value={this.state.username}
                        onChangeText={text =>
                            this.setState(state => ({username:text}))

                        }
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                      //  placeholder={'Password'}
                        placeholderTextColor={'rgba(255,255,255,0.7'}
                        underlineColorAndroid='transparent'
                        value={this.state.password}
                        onChangeText={text =>
                            this.setState(state => ({password:text}))

                        }
                    />
                </View>
                <View >
                    <Button
                        title="Login"
                        onPress={this.Login}
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
