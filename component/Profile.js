import React from 'react';
import {StyleSheet, View,Button,ImageBackground, Dimensions} from 'react-native';
import RNLocation from 'react-native-location';
import bgImage2 from '../Images/background2.jpg'
import {TextInput} from "react-native-gesture-handler";
const  { width: WIDTH } =Dimensions.get('window')




RNLocation.configure({
    distanceFilter: 1.0, // Meters
    desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 1000, // Milliseconds
    fastestInterval: 1000, // Milliseconds
    maxWaitTime: 1000, // Milliseconds
    // iOS Only
    activityType: "other",
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
})
RNLocation.requestPermission({
    ios: 'whenInUse', // or 'always'
    android: {
        detail: 'fine', // or 'fine'
        rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
        }
    }
});
class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            serverURL: '',
            BoardID: '2',
        };
    }
    syncLocation = async () => {
        let permission = await RNLocation.checkPermission({
            ios: 'whenInUse', // or 'always'
            android: {
                detail: 'fine' // or 'fine'
            }
        });
        let location;
        if(!permission) {
            permission = await RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "fine",
                    rationale: {
                        title: "We need to access your location",
                        message: "We use your location to show where you are on the map",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }
                }
            })
            location = await RNLocation.getLatestLocation({timeout: 2})
            sendLocation(location);
        } else {
            location = await RNLocation.getLatestLocation({timeout: 2})
            console.log(location)
            console.log("-------------------------")

            this.sendLocation(location);
        }
    }

    sendLocation(location) {
        const form = new FormData();
        form.append('longitude', location.longitude);
        form.append('latitude', location.latitude);
        form.append('speedAccuracy', location.speedAccuracy);
        form.append('speed', location.speed);
        form.append('courseAccuracy', location.courseAccuracy);
        form.append('course', location.course);
        form.append('fromMockProvider', location.fromMockProvider);
        form.append('altitudeAccuracy', location.altitudeAccuracy);
        form.append('altitude', location.altitude);
        form.append('accuracy', location.accuracy);
        form.append('BoardID', this.state.BoardID);

        const url = this.props.navigation.state.params.URL;
        const locationURl = url + "/s/servlet/spaghettiaddon/addcoord" ;
        fetch(locationURl,{
            headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' },
            credentials: 'include',
            method: 'POST',
            body:form
        }).then((result) => {
            if (result) {
                //  console.log(result);
            }
        });
    }


    render()
    {
        return (
            <ImageBackground source={bgImage2} style={styles.backgroundContainer}>
                <View style={styles.inputContainer}>
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
                                onPress={this.syncLocation}
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
