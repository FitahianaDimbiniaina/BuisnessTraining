import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import categoriesData from './categories.json';


const imageMapping = {
  computer: require('../../assets/info/computer.jpg'),
  algo: require('../../assets/info/algo.jpg'),
  progweb: require('../../assets/info/progweb.jpg'),
  mobiledev: require('../../assets/info/mobiledev.jpg'),
  adminnetwork: require('../../assets/info/adminnetwork.jpg'),
  linux: require('../../assets/info/linux.jpg'),
};

const Info = () => {
  const navigation = useNavigation(); 

  const category = categoriesData.categories[0];
  const handleVoirPlanning = (subcategory) => {
    navigation.navigate('Planning', { subcategory });
  };

  const handleInscription = (subcategory) => {
    Alert.alert(
      `Inscription à ${subcategory.name}`,
      "Que souhaitez-vous faire ?",
      [
        {
          text: "Voir Planning",
          onPress: () => handleVoirPlanning(subcategory),
        },
        {
          text: "S'inscrire directement",
          onPress: () => navigation.navigate('Inscription', { courseName: subcategory.name })
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <Text style={styles.title}>{category.name}</Text>
        <Image source={imageMapping[category.image]} style={styles.image} resizeMode="cover" />
        <Text style={styles.description}>{category.description}</Text>

        <View style={styles.gridContainer}>
          {category.subcategories.map((subcategory, index) => (
            <View key={index} style={styles.subcategoryCard}>
              <Image source={imageMapping[subcategory.image]} style={styles.subcategoryImage} resizeMode="cover" />
              <View style={styles.subcategoryInfo}>
                <Text style={styles.subcategoryTitle}>{subcategory.name}</Text>
                <Text style={styles.subcategoryDescription}>{subcategory.description}</Text>
                <Text style={styles.price}>Prix: {subcategory.price} MGA</Text>
                <TouchableOpacity 
                  style={styles.buttonInscription} 
                  onPress={() => handleVoirPlanning(subcategory)} 
                >
                  <Text style={styles.buttonText}>Voir Planning</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => handleInscription(subcategory)}
                >
                  <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 90,
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subcategoryCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
    elevation: 2,
  },
  subcategoryImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  subcategoryInfo: {
    padding: 10,
  },
  subcategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subcategoryDescription: {
    fontSize: 14,
    color: '#6b6b6b',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e67e22',
    marginBottom: 10,
  },
  buttonInscription: {
    backgroundColor: '#cbbcda',
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Info;
