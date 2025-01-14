import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  
import logo from '../assets/logo.png';
import backgroundImage from '../assets/bg.webp';
import { useNavigation, useRoute } from '@react-navigation/native';

const categoriesData = [
  {
    name: "INFORMATIQUE",
    image: require('../assets/info/computer.jpg'),
    description: "Développez vos compétences en informatique.",
    screen: 'Informatique',
  },
  {
    name: "GESTION",
    image: require('../assets/gestion.jpg'),
    description: "Améliorez vos compétences en gestion.",
    screen: 'Gestion', 
  },
  {
    name: "COMMUNICATION",
    image: require('../assets/com.jpg'),
    description: "Perfectionnez vos compétences en communication.",
    screen: 'Communication', 
  }
];

const Acceuil = ({ navigation }) => {
  const scrollViewRef = useRef(null);

  // Scroll to the categories section
  const handleScrollToCategories = () => {
    console.log('scrolling...');
    scrollViewRef.current?.scrollTo({
      y: 500, // Adjust this based on your content's layout
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.headerTitle}>Business Training</Text>
        </View>

        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>Une nouvelle façon d'apprendre</Text>
          <Text style={styles.promoDescription}>Découvrez une nouvelle méthode pour enrichir vos compétences en ligne.</Text>
          <TouchableOpacity onPress={handleScrollToCategories} style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Commencer !!</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.imageContainer}>
          <Image source={backgroundImage} style={styles.backgroundImage} resizeMode="cover" />
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Boostez vos compétences</Text>
            <Text style={styles.overlayDescription}>Découvrez une nouvelle manière d'acquérir des connaissances pour exceller dans votre carrière professionnelle.</Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.categoriesTitle}>Catégories des modules</Text>
        
        {categoriesData.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <TouchableOpacity 
              style={styles.categoryContent}
              onPress={() => navigation.navigate(category.screen)}  
            >
              <Image source={category.image} style={styles.categoryImage} resizeMode="cover" />
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => {
                console.log('Navigating to:', category.screen);
                navigation.navigate(category.screen);
              }}
            >
              <Icon name="arrow-forward" size={30} color="#007bff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    width: '100%',
  },
  scrollViewContent: {
    paddingBottom: 70,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#cbbcda',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  promoSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  promoDescription: {
    fontSize: 14,
    textAlign: 'flex-start',
    color: '#666',
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  promoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    marginVertical: 20,
    overflow: 'hidden',
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: 300,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overlayDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  learnMoreButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  learnMoreButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    justifyContent: 'space-between',  
    alignItems: 'center',
  },
  categoryContent: {
    flexDirection: 'row',
    flex: 1,
  },
  categoryImage: {
    width: 100,
    height: 100,
  },
  categoryInfo: {
    padding: 10,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
  arrowButton: {
    padding: 10,
    marginRight: 10,
  },
});

export default Acceuil;
