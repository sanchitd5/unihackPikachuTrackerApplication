/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import DeviceInfo from 'react-native-device-info';


type Props = {};
const uniqueId=DeviceInfo.getUniqueID();
var Room="";
const navitUID="9d0a3fe609cae4f28a870004a3ccc3d710fdd403";
//Beacons.detectIBeacons();
Beacons.detectEstimotes();
Beacons.startMonitoringForRegion({identifier:"Demo_region",uuid:"B9407F30-F5F8-466E-AFF9-25556B57FE6D",minor:2461,major:51260}).then(()=>{console.log("Region was set")}).catch(error => console.log(`region monitoring not started, error: ${error}`));

Beacons.startRangingBeaconsInRegion({identifier:"Demo_region",uuid:"B9407F30-F5F8-466E-AFF9-25556B57FE6D"}).then(()=>{console.log("Beacons were found")}).catch(error => console.log(`Beacons monitoring not started, error: ${error}`));


export default class App extends Component<Props> {

  constructor(){
    super();
    this.state={
      room:"",distance:''
      counter:0
    }
  }

  componentDidMount(){
    DeviceEventEmitter.addListener('beaconsDidRange',(data)=>{
      console.log('found beacons!',data.beacons)
      if(data.beacons.length>0){
        this.setState({counter:0})
        if(data.beacons[0].minor == 42714 && data.beacons[0].major == 8817){
          let currentRoom = "Room1";
          if(this.state.room != currentRoom){
            console.log('found beacons!',data.beacons,"Room 1")
            this.setState({ room:"Room1"})
            this.setState({distance:data.beacons[0].distance})
          }
        }
        else if(data.beacons[0].minor == 49385 && data.beacons[0].major == 30174){
          let currentRoom = "Room2";
          if(this.state.room != currentRoom){
            console.log('found beacons!',data.beacons,"Room 2")
            this.setState({ room:"Room2"})
            this.setState({distance:data.beacons[0].distance})
          }
        }
        else if(data.beacons[0].minor == 15000 && data.beacons[0].major == 11000){
          let currentRoom = "Room3";
          if(this.state.room != currentRoom){
            console.log('found beacons!',data.beacons,"Room 3")
            this.setState({ room:"Room3"})
            this.setState({distance:data.beacons[0].distance})
          }
        }
      }
      else{
        let newCounter=this.state.counter+1;
        this.setState({counter:newCounter})
        if(this.state.counter>10){
          let currentRoom = "No Room Assigned";
          if(this.state.room != currentRoom){
            console.log("Not in range of any room")
            this.setState({ room:"No Room Assigned"})
            this.setState({distance:0})
          }
        }
        
      }
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Abki baar phir se Modi Sarkar</Text>
        <Text style={styles.instructions}>Beacon Tester</Text>
        <Text style={styles.instructions}>My UUID: {uniqueId}</Text>
        <Text style={styles.instructions}>My Current Room: {this.state.room}</Text>
        <Text style={styles.instructions}>My Current Distance from nearest Traceker: {this.state.distance}</Text>


      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
