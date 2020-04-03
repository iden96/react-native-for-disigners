import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppNavigator from './navigator/AppNavigator'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: "http://172.20.10.3:4000/graphql/"
})

const initialState = {
  action: "",
  name: "Stranger",
  avatar: "https://cl.ly/55da82beb939/download/avatar-default.jpg"
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU": return { ...state, action: "openMenu" };
    case "CLOSE_MENU": return { ...state, action: "closeMenu" };
    case "UPDATE_NAME": return { ...state, name: action.name };
    case "UPDATE_AVATAR": return { ...state, avatar: action.avatar };
    case "OPEN_CARD": return { ...state, action: "openCard" };
    case "CLOSE_CARD": return { ...state, action: "closeCard" };
    case "OPEN_LOGIN": return { ...state, action: "openLogin" };
    case "CLOSE_LOGIN": return { ...state, action: "closeLogin" };
    case "OPEN_NOTIF": return { ...state, action: "openNotif" };
    case "CLOSE_NOTIF": return { ...state, action: "closeNotif" };
    default: return state
  }

}

const store = createStore(reducer)

const App = () => {
  // console.log(AppNavigator)
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ApolloProvider>
  )
}

export default App

// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;