import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeSingleScreen from './views/HomeSingle';
import HomeAdvancedScreen from './views/HomeAdvanced';
import SettingScreen from './views/Settings';
import ConfiguratorScreen from './views/Configurator';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenName = "HomeScreen";
const HomeSingleTapName = "HomeSingleScreen";
const HomeAdvancedTapName = "HomeAdvancedScreen";

const SettingScreenName = "Settings";

const ConfiguratorScreenName = "Configurator";

const NavigationDrawerStructure = (props) => {
  // Estructura del cajón de navegación
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer(); // Apoyos para abrir / cerrar el cajón
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={require('./assets/drawerWhite.png')}
          style={{ width: 25, height: 25, marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function BottomTabStack() {
  return (
    <Tab.Navigator
      initialRouteName={HomeSingleTapName}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',

        labelStyle: {
          textAlign: 'center',
          fontSize: 16
        },
      }}>
      <Tab.Screen
        name={HomeSingleTapName}
        component={HomeSingleScreen}
        options={{
          tabBarLabel: 'Simple',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen
        name={HomeAdvancedTapName}
        component={HomeAdvancedScreen}
        options={{
          tabBarLabel: 'Avanzado',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
}

function HomeScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName={HomeScreenName}>
      <Stack.Screen
        name={HomeScreenName}
        component={BottomTabStack}
        options={() => ({
          headerTitle: "Inicio",
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#f4511e', // Establecer el color del encabezado
          },
          headerTintColor: '#fff', // Establecer el color del texto del encabezado
          headerTitleStyle: {
            fontWeight: 'bold', // Establecer el estilo del texto del encabezado
          },
        })}
      />
    </Stack.Navigator>
  );
}

function ConfiguratorScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName={ConfiguratorScreenName}
      screenOptions={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#f4511e', // Establecer el color del encabezado
        },
        headerTintColor: '#fff', // Establecer el color del texto del encabezado
        headerTitleStyle: {
          fontWeight: 'bold', // Establecer el estilo del texto del encabezado
        }
      }}>
      <Stack.Screen
        name={ConfiguratorScreenName}
        component={ConfiguratorScreen}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack()
              }}
            />
          ),
          title: 'Configurador' // Establecer título de encabezado
        }} />
    </Stack.Navigator>
  );
}

function SettingScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName={SettingScreenName}
      screenOptions={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#f4511e', // Establecer el color del encabezado
        },
        headerTintColor: '#fff', // Establecer el color del texto del encabezado
        headerTitleStyle: {
          fontWeight: 'bold', // Establecer el estilo del texto del encabezado
        }
      }}>
      <Stack.Screen
        name={SettingScreenName}
        component={SettingScreen}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack()
              }}
            />
          ),
          title: 'Configuracion', // Establecer título de encabezado
        }} />
    </Stack.Navigator>
  );
}

const HomeScreenStackName = "HomeScreenStack";
const ConfiguratorScreenStackName = "ConfiguratorScreenStack";
const SettingScreenStackName = "SettingScreenStack";

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName = {HomeScreenStackName}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}>
          <Drawer.Screen
            name = {HomeScreenStackName}
            options={{ drawerLabel: 'Inicio' }}
            component={HomeScreenStack}></Drawer.Screen>
          <Drawer.Screen
            name = {ConfiguratorScreenStackName}
            options={{ drawerLabel: 'Configurador' }}
            component={ConfiguratorScreenStack}></Drawer.Screen>
          <Drawer.Screen
            name = {SettingScreenStackName}
            options={{ drawerLabel: 'Configuraciones' }}
            component={SettingScreenStack}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;