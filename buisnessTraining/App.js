// App.js
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/Landing';
import BaseLayout from './BaseLayout';
import Acceuil from './components/Acceuil';
import Categorie from './components/Categorie';
import Info from './components/categorie/Info';  
import Modules from './components/Modules';
import Inscription from './components/Inscription';
import Gestion from './components/categorie/Gestion';
import Communication from './components/categorie/Communication';
import Planning from './components/planning/Planning';
import { Notifier } from 'react-native-notifier';
import Payment from './components/Payment';
import PaymentForm from './components/CardPaymentMethod';
import GeneralPlanning from './components/planning/GeneralPlanning';
import Detail from './components/planning/Detail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} color='black'/>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Acceuil">
            {() => (
              <BaseLayout>
                <Acceuil />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Planning">
            {() => (
              <BaseLayout>
                <Planning />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="PaymentForm">
            {({route , navigation}) => (
              <BaseLayout>
                <PaymentForm route={route} navigation={navigation}  />
              </BaseLayout>
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Communication">
            {() => (
              <BaseLayout>
                <Communication />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Payment">
            {({route , navigation}) => (
              <BaseLayout>
                <Payment route={route} navigation={navigation} />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Detail">
            {({route , navigation}) => (
              <BaseLayout>
                <Detail route={route} navigation={navigation} />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="GeneralPlanning">
            {({route , navigation}) => (
              <BaseLayout>
                <GeneralPlanning route={route} navigation={navigation} />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Gestion">
            {() => (
              <BaseLayout>
                <Gestion />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Categorie">
            {() => (
              <BaseLayout>
                <Categorie />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Informatique">
            {() => (
              <BaseLayout>
                <Info />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Modules">
            {() => (
              <BaseLayout>
                <Modules />
              </BaseLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Inscription">
            {({ route, navigation }) => (
              <BaseLayout>
                <Inscription route={route} navigation={navigation} />
              </BaseLayout>
            )}
          </Stack.Screen>
        </Stack.Navigator>
        
      </SafeAreaView>
      
    </NavigationContainer>
  );
};

export default App;
