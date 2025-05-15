import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../theme/colors';

const CardMoto = ({ moto, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={moto.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.model}>{moto.brand} {moto.model}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>{moto.year}</Text>
          <Text style={styles.detailText}>Placa: {moto.plate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary[700],
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  model: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
});

export default CardMoto;