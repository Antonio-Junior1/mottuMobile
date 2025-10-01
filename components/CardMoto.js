import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme';

const CardMoto = ({ moto, onPress }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <TouchableOpacity style={styles.card(theme)} onPress={onPress}>
      <Image source={moto.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.model(theme)}>{moto.brand} {moto.model}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText(theme)}>{moto.year}</Text>
          <Text style={styles.detailText(theme)}>Placa: {moto.plate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: (theme) => ({
    backgroundColor: theme.primary[700],
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  model: (theme) => ({
    color: theme.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  }),
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: (theme) => ({
    color: theme.text.secondary,
    fontSize: 14,
  }),
});

export default CardMoto;

