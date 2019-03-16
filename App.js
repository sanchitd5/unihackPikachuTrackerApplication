/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  DeviceEventEmitter
} from "react-native";
import Beacons from "react-native-beacons-manager";
import DeviceInfo from "react-native-device-info";
import {
  Container,
  Header,
  Content,
  Footer,
  StyleProvider,
  CardItem,
  Body,
  Card,
  Title,
  Icon,
  Left,
  Right,
  Button
} from "native-base";

type Props = {};
const uniqueId = DeviceInfo.getUniqueID();
var Room = "";
const navitUID = "9d0a3fe609cae4f28a870004a3ccc3d710fdd403";
//Beacons.detectIBeacons();
Beacons.detectEstimotes();
Beacons.startMonitoringForRegion({
  identifier: "Demo_region",
  uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
  minor: 2461,
  major: 51260
})
  .then(() => {
    console.log("Region was set");
  })
  .catch(error =>
    console.log(`region monitoring not started, error: ${error}`)
  );

Beacons.startRangingBeaconsInRegion({
  identifier: "Demo_region",
  uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D"
})
  .then(() => {
    console.log("Beacons were found");
  })
  .catch(error =>
    console.log(`Beacons monitoring not started, error: ${error}`)
  );

export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      room: "",
      distance: "",
      counter: 0
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener("beaconsDidRange", data => {
      console.log("found beacons!", data.beacons);
      if (data.beacons.length > 0) {
        this.setState({ counter: 0 });
        if (data.beacons[0].minor == 42714 && data.beacons[0].major == 8817) {
          let currentRoom = "Room1";
          if (this.state.room != currentRoom) {
            console.log("found beacons!", data.beacons, "Room 1");
            this.setState({ room: "Room1" });
          }
        } else if (
          data.beacons[0].minor == 49385 &&
          data.beacons[0].major == 30174
        ) {
          let currentRoom = "Room2";
          if (this.state.room != currentRoom) {
            console.log("found beacons!", data.beacons, "Room 2");
            this.setState({ room: "Room2" });
          }
        } else if (
          data.beacons[0].minor == 15000 &&
          data.beacons[0].major == 11000
        ) {
          let currentRoom = "Room3";
          if (this.state.room != currentRoom) {
            console.log("found beacons!", data.beacons, "Room 3");
            this.setState({ room: "Room3" });
          }
        }
      } else {
        let newCounter = this.state.counter + 1;
        this.setState({ counter: newCounter });
        if (this.state.counter > 15) {
          let currentRoom = "No Room Assigned";
          if (this.state.room != currentRoom) {
            console.log("Not in range of any room");
            this.setState({ room: "No Room Assigned" });
          }
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <Header padder>
          <Body >
            <Title>Beacon Tester</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem header>
              <Body>
                <Text>Your Phone's Unique ID</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Text>{uniqueId}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Body>
                  <Text>Room you are in:</Text>
                </Body>
                <CardItem>
                  <Body>
                  <Text>{this.state.room}</Text>
                  </Body>
                </CardItem>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Body>
                  <Text>Nearest Bacon</Text>
                </Body>
                <CardItem>
                  {this.state.room === "Room2" ? (
                    <Image
                      style={{ height: 300, width: null, flex: 1 }}
                      source={require("./reactNativeSources/images/beacon_blue.png")}
                    />
                  ) : (
                    <Image
                      style={{ height: 300, width: null, flex: 1 }}
                      source={require("./reactNativeSources/images/beacon_green.png")}
                    />
                  )}
                </CardItem>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Body>
                <Text>BY TEAM ROCKET</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Text>SUBSCRIBE TO T-SERIES</Text>
            </CardItem>
          </Card>
        </Content>
        <Footer />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
