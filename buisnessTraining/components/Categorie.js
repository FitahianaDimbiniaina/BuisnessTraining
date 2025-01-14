

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const colors = ['#f0f0f0'];


const categoriesData = [
  {
    name: "Informatique",
    image: require('../assets/info/computer.jpg'), 
    description: "Développez vos compétences en informatique.",
  },
  {
    name: "Gestion",
    image: require('../assets/gestion.jpg'), 
    description: "Améliorez vos compétences en gestion.",
  },
  {
    name: "Communication",
    image: require('../assets/com.jpg'), 
    description: "Perfectionnez vos compétences en communication.",
  }
];

const Categorie = ({  }) => {
  const Navigation = useNavigation()
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Catégories des modules</Text>
        </View>
        {categoriesData.map((category, index) => (
          <View key={index} style={[styles.categoryContainer, { backgroundColor: colors[index % colors.length] }]}>
            <Image
              source={category.image}
              style={styles.categoryImage}
              resizeMode="cover"
            />
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => Navigation.navigate(`${category.name}`)}>
              <Text style={styles.buttonText}>Voir Modules</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  scrollContainer: {
    padding: 16,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 200,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  categoryDescription: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: '#cbbcda',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 70,
  },
});

export default Categorie;
