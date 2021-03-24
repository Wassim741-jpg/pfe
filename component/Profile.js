import React from 'react';
import {StyleSheet, View,Button,ImageBackground, Dimensions} from 'react-native';
import RNLocation from 'react-native-location';
import bgImage2 from '../Images/background2.jpg'
import {TextInput} from "react-native-gesture-handler";
const  { width: WIDTH } =Dimensions.get('window')




RNLocation.configure({
    distanceFilter: 100, // Meters
    desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
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
        detail: 'coarse', // or 'fine'
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
    }
    syncLocation = async () => {
       let permission = await RNLocation.checkPermission({
            ios: 'whenInUse', // or 'always'
            android: {
                detail: 'coarse' // or 'fine'
            }
        });
       console.log(this.props.navigation.state.params.user)
        console.log(this.props.navigation.state.params.psw)
        console.log(this.props.navigation.state.params.URL)
        let location;
        if(!permission) {
            permission = await RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "coarse",
                    rationale: {
                        title: "We need to access your location",
                        message: "We use your location to show where you are on the map",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }
                }
            })
            location = await RNLocation.getLatestLocation({timeout: 100})
            sendLocation(location);
        } else {
            location = await RNLocation.getLatestLocation({timeout: 100})
          //  console.log(location)

           this.sendLocation(location);
        }
    }

    sendLocation(location) {
        const locationURl = "https://webhook.site/9fb23852-0b2f-4f00-9934-6cf2532e09be" ;
        fetch(locationURl,{
            method: 'post',
            withCredentials : true,
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: JSON.stringify(location)
        }).then((result) => {
            if (result) {
               // console.log(result);
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
                    placeholder={'BORD ID'}
                    placeholderTextColor={'rgba(255,255,255,0.7'}
                    underlineColorAndroid='transparent'
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
