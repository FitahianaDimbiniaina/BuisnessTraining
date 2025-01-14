// Landing.js
import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import background from '../assets/bg.webp';

const Landing = () => {
  const navigation = useNavigation();

  // Function to navigate to Acceuil screen
  const handleGetStarted = () => {
    navigation.navigate('Acceuil');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          <Text style={styles.heading}>Business Training</Text>
          <Text style={styles.description}>  
            Apprenez les compétences et les connaissances nécessaires pour exceller dans le monde des affaires concurrentiel d’aujourd’hui. Rejoignez-nous !
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Commencer !!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 80,
    zIndex: 1,
  },
  heading: {
    fontSize: 36,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#cbbcda',
    paddingVertical: 15,
    top: 25,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 30, 
    zIndex: 1, 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Landing;
