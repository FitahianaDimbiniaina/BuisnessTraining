import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Localization from 'expo-localization';
import countryData from '../data/Country.json'; 
import { Picker } from '@react-native-picker/picker';

const PaymentForm = ({ navigation, route }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const phoneRegion = Localization.region; 
    const country = countryData.find(c => c.countryShortCode === phoneRegion); 
    if (country) {
      setSelectedCountry(country.countryName);
      setValue('country', country.countryName);
    }
  }, []);
  const onSubmit = () => {
    
    alert('Payment réussi');
  

    setTimeout(() => {
      navigation.navigate('Categorie'); 
    }, 2000); 
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Contact Info</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.sectionTitle}>Shipping</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.sectionTitle}>Country or Region</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => {
            setSelectedCountry(itemValue);
            setValue('country', itemValue);
          }}
          style={styles.picker}
        >
          {countryData.map((country) => (
            <Picker.Item
              key={country.countryShortCode}
              label={country.countryName}
              value={country.countryName}
            />
          ))}
        </Picker>
      </View>
      <Text style={styles.sectionTitle}>Payment</Text>
      <Controller
        control={control}
        name="cardNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <View style={styles.row}>
        <Controller
          control={control}
          name="expiry"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputHalf}
              placeholder="MM / YY"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="cvc"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputHalf}
              placeholder="CVC"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <View style={styles.row}>
        <Text>Billing is same as shipping information</Text>
        <Controller
          control={control}
          name="billingSameAsShipping"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>
      <Button title="Save" onPress={onSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    top: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputHalf: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '48%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
  },
});

export default PaymentForm;
