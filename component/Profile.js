import React from 'react';
import {StyleSheet, View,Button,ImageBackground, Alert,Text, Dimensions} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import bgImage2 from '../Images/background2.jpg'
import {TextInput} from "react-native-gesture-handler";
const  { width: WIDTH } =Dimensions.get('window')


class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            serverURL: '',
            BoardID: '2',
            initialPosition: 'unknown',
            altitude : 0.0 ,
            accuracy : 0.0 ,
            longitude : 0.0 ,
            latitude : 0.0 ,
            PointIndex: 'FirstPoint',
        };
    }
    watchID: ?number = null;
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                console.log("je vais appeler la fonction getcurrectPosition");
                const initialPosition = JSON.stringify(position);
                this.setState({step : this.state.step +1});
                this.setState({accuracy : position.coords.accuracy}) ;
                this.setState({altitude : position.coords.altitude}) ;
                this.setState({longitude : position.coords.longitude}) ;
                this.setState({latitude : position.coords.latitude}) ;
                this.setState({initialPosition:initialPosition});
                console.log("jai modifie dans initial position");

            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true,
                timeout: 2000,
                maximumAge: 3600000},
        );
        this.watchID = Geolocation.watchPosition(position => {
            console.log('je suis dans le watcher')
            const lastPosition = JSON.stringify(position);
            this.setState({accuracy : position.coords.accuracy}) ;
            this.setState({altitude : position.coords.altitude}) ;
            this.setState({longitude : position.coords.longitude}) ;
            this.setState({latitude : position.coords.latitude}) ;
            this.setState({initialPosition : lastPosition});
            console.log('jai modife dans lastposition')

        });
        console.log("finish");
    }
    componentWillUnmount() {
        console.log("it's clean ");
    }
    sendLocation() {
        if (this.state.accuracy != 0.0) {
            const form = new FormData();
            form.append('longitude', this.state.longitude);
            form.append('latitude', this.state.latitude);
            form.append('altitude', this.state.altitude);
            form.append('accuracy', this.state.accuracy);
            form.append('BoardID', this.state.BoardID);
            form.append('PointIndex', this.state.PointIndex);

            const url = this.props.navigation.state.params.URL;
            const locationURl = url + "/s/servlet/spaghettiaddon/addcoord";
            fetch(locationURl, {
                headers: {'Accept': 'application/json', 'Content-Type': 'multipart/form-data'},
                credentials: 'include',
                method: 'POST',
                body: form
            }).then((result) => {
                if (result) {
                    //  console.log(result);
                }
            });
            console.log("request sent");
            console.log(this.state.accuracy);
            this.setState({PointIndex: 'randomPoint'});
        }
    }
    Login3 = () => {
        this.componentDidMount();
        this.sendLocation();
        this.componentWillUnmount();

    }

    render()
    {
        return (
            <ImageBackground source={bgImage2} style={styles.backgroundContainer}>
                <View style={styles.inputContainer}>
                    <View>
                        <Text>
                            <Text style={styles.title}> position: </Text>
                            {this.state.initialPosition}
                        </Text>
                        <Text>
                            <Text> ----------------------------------- </Text>
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder={'BoardID'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        value={this.state.BoardID}
                        onChangeText={text =>
                            this.setState(state => ({BoardID:text}))
                        }
                    />
                </View>
                <View >
                    <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
                        <Button title="Start sending GPS Location"
                                onPress={this.Login3}
                        />
                    </View>
                    <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
                        <Button
                            title="Stop sending GPS Location"
                        />
                    </View>
                </View>
            </ImageBackground>


        )
    }
};

const styles = StyleSheet.create({
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

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Profile
