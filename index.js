/**
 * @format
 */

import {AppRegistry,Alert,PermissionsAndroid} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// type PermissionStatus = "always" | "when_in_use" | "denied";
// const locationPermission = {
//   ALWAYS: "always",
//   WHEN_IN_USE: "when_in_use",
//   DENIED: "denied",

//   request: async (): Promise<PermissionStatus> => {
//     if (Platform.OS === "ios") {
//       const result = await RNEstimoteProximity.requestLocationPermission();
//       return result;
//     } else if (Platform.OS === "android") {
//       const result = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
//       );
//       return result === "granted" ? "always" : "denied";
//     }
//     throw "Unsupported platform";
//   }
// };
// locationPermission.request();