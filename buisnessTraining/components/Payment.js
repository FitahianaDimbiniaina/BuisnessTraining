import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const Payment = ({ route, navigation }) => {
  const { courseName } = route.params || {};

  const handlePayment = (method) => {
    console.log(`Selected payment method: ${method}`);
    
    if (method === 'Visa') {
     
      navigation.navigate('PaymentForm'); 
    } else {
      alert(`Processing payment via ${method} for the course: ${courseName}`);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez un mode de paiement pour le cours: {courseName}</Text>
     <TouchableOpacity 
        style={styles.button} 
        onPress={() => handlePayment('PayPal')}
      >
        <Image source={require('../assets/Paypal.png')} style={styles.logo} />
        <Text style={styles.buttonText}>PayPal</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handlePayment('MVola')}
      >
        <Image source={require('../assets/Mvola.png')} style={styles.logo} />
        <Text style={styles.buttonText}>MVola</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handlePayment('Visa')}
      >
        <Image source={require('../assets/Visa.png')} style={styles.logo} />
        <Text style={styles.buttonText}>Visa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
        backgroundColor: '#fff',  
        padding: 15,
        borderRadius: 10,               
        alignItems: 'center',
        flexDirection: 'row',           
        justifyContent: 'center',
        marginBottom: 20, 
        borderWidth: 1,
        borderColor: 'lightgrey', 
      },
      
      
    buttonText: {
      color: '#000',                   
      fontWeight: 'bold',
      marginLeft: 10,                 
    },
    logo: {
      width: 30,    
      height: 30,  
      resizeMode: 'contain',
    },
  });
  
export default Payment;
