import React from 'react';
import {StyleSheet, Text, View, Alert, Button, ImageBackground} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

class test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
            step : 1 ,
            altitude : 0.0 ,
            accuracy : 0.0 ,
            longitude : 0.0 ,
            latitude : 0.0 ,
        };
    }
    watchID: ?number = null;
    async getLocation () {
        console.log(this.state.initialPosition);
        console.log(this.state.lastPosition) ;
        console.log(this.state.step);

    }
    Login3 = () => {
        this.componentDidMount();
        this.componentWillUnmount();

    }
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
                        this.setState({ PointIndex: 'randomPoint' });


                    },
                    error => Alert.alert('Error', JSON.stringify(error)),
                    {enableHighAccuracy: false,
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
         const form = new FormData();
         form.append('longitude', this.state.longitude);
         form.append('latitude', this.state.latitude);
         form.append('altitude', this.state.altitude);
         form.append('accuracy', this.state.accuracy);

       //  const url = this.props.navigation.state.params.URL;
         const locationURl = "https://webhook.site/780aa58e-ec6f-4f7e-83e4-95159a4f072a" ;
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
    /*componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        console.log('im int the update')
        console.log(this.state.lastPosition)
        if (!this.state.lastPosition.localeCompare('unknown')) {
            console.log(this.state.lastPosition.coords);
        }
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
        form.append('PointIndex', this.state.PointIndex);

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
        this.setState({ PointIndex: 'randomPoint' });
        console.log(this.state.PointIndex);*/


    componentWillUnmount() {
        console.log("it's clean ");
    }
    render() {
        return (
            <View>
                <Text>
                    <Text style={styles.title}> position: </Text>
                    {this.state.initialPosition}
                </Text>
                <Text>
                    <Text> ----------------------------------- </Text>
                </Text>
                <View >
                    <Button
                        title="use react-native-community/geolocation (recommended API)"
                        onPress={this.Login3}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
    },
});
export default test

