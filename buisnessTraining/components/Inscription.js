import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Inscription = ({ route, navigation }) => {
  console.log('Route params:', route.params)
  const { courseName } = route.params || {};
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleInscription = () => {
    console.log('Inscription data:', { nom, prenom, email, telephone });
    navigation.navigate('Payment', { courseName });
  };
  
 if (!courseName) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No course selected</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>S'inscrire au cours: {courseName}</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Nom" 
        value={nom} 
        onChangeText={setNom} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Prénom" 
        value={prenom} 
        onChangeText={setPrenom} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Téléphone" 
        value={telephone} 
        onChangeText={setTelephone} 
        keyboardType="phone-pad"
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleInscription}
      >
        <Text style={styles.buttonText}>Soumettre</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Inscription;
