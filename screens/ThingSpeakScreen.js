import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { lightTheme, darkTheme } from '../theme';
import Button from '../components/Button';
import i18n from '../i18n';
import axios from 'axios';

const ThingSpeakScreen = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // ThingSpeak API Configuration
  const CHANNEL_ID = '3086523';
  const READ_API_KEY = 'X1MGFWH2AMVSVSU8';
  const WRITE_API_KEY = '4W1ZFVRLJ2SI1ICW';

  const fetchChannelData = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=10`
      );
      setChannelData(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.error('Erro ao buscar dados do ThingSpeak:', err);
      setError(i18n.t('thingSpeakError'));
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchChannelData();
  };

  const renderFieldData = (feed, fieldNumber) => {
    const fieldKey = `field${fieldNumber}`;
    const value = feed[fieldKey];
    return value ? (
      <View style={styles.dataItem(theme)}>
        <Text style={styles.dataLabel(theme)}>
          {channelData?.channel?.[fieldKey] || `Field ${fieldNumber}`}:
        </Text>
        <Text style={styles.dataValue(theme)}>{value}</Text>
      </View>
    ) : null;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.primary[900], theme.primary[800]]}
          style={styles.background}
        >
          <ActivityIndicator size="large" color={theme.secondary[500]} />
          <Text style={styles.loadingText(theme)}>{i18n.t('loadingThingSpeak')}</Text>
        </LinearGradient>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.primary[900], theme.primary[800]]}
          style={styles.background}
        >
          <View style={styles.content}>
            <Text style={styles.errorText(theme)}>{error}</Text>
            <Button 
              title={i18n.t('retry')}
              onPress={fetchChannelData}
              style={styles.retryButton}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.primary[900], theme.primary[800]]}
        style={styles.background}
      >
        <ScrollView 
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.secondary[500]}
            />
          }
        >
          <Text style={styles.title(theme)}>{i18n.t('thingSpeakMonitoring')}</Text>
          
          {channelData?.channel && (
            <View style={styles.channelInfo(theme)}>
              <Text style={styles.channelName(theme)}>
                {channelData.channel.name}
              </Text>
              {channelData.channel.description && (
                <Text style={styles.channelDescription(theme)}>
                  {channelData.channel.description}
                </Text>
              )}
              <Text style={styles.channelId(theme)}>
                {i18n.t('channelId')}: {CHANNEL_ID}
              </Text>
            </View>
          )}

          <Text style={styles.sectionTitle(theme)}>{i18n.t('latestData')}</Text>

          {channelData?.feeds && channelData.feeds.length > 0 ? (
            channelData.feeds.map((feed, index) => (
              <View key={feed.entry_id} style={styles.feedCard(theme)}>
                <Text style={styles.feedTitle(theme)}>
                  {i18n.t('entry')} #{feed.entry_id}
                </Text>
                <Text style={styles.feedTime(theme)}>
                  {new Date(feed.created_at).toLocaleString('pt-BR')}
                </Text>
                
                              <View style={styles.dataContainer}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(fieldNum => 
                    <View key={`${feed.entry_id}-field${fieldNum}`}>
                      {renderFieldData(feed, fieldNum)}
                    </View>
                  )}
                </View>

              </View>
            ))
          ) : (
            <Text style={styles.noDataText(theme)}>{i18n.t('noDataAvailable')}</Text>
          )}

          <Button 
            title={i18n.t('refreshData')}
            onPress={fetchChannelData}
            style={styles.refreshButton}
          />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: (theme) => ({
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.secondary[500],
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: theme.secondary[500],
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  }),
  loadingText: (theme) => ({
    color: theme.text.primary,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  }),
  errorText: (theme) => ({
    color: theme.error[500],
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  }),
  channelInfo: (theme) => ({
    backgroundColor: theme.primary[800],
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.secondary[500],
  }),
  channelName: (theme) => ({
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.secondary[500],
    marginBottom: 5,
  }),
  channelDescription: (theme) => ({
    fontSize: 14,
    color: theme.text.secondary,
    marginBottom: 10,
  }),
  channelId: (theme) => ({
    fontSize: 12,
    color: theme.text.secondary,
  }),
  sectionTitle: (theme) => ({
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text.primary,
    marginBottom: 15,
    marginTop: 10,
  }),
  feedCard: (theme) => ({
    backgroundColor: theme.primary[700],
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.primary[600],
  }),
  feedTitle: (theme) => ({
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.secondary[500],
    marginBottom: 5,
  }),
  feedTime: (theme) => ({
    fontSize: 12,
    color: theme.text.secondary,
    marginBottom: 10,
  }),
  dataContainer: {
    marginTop: 10,
  },
  dataItem: (theme) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme.primary[600],
  }),
  dataLabel: (theme) => ({
    fontSize: 14,
    color: theme.text.primary,
    fontWeight: '600',
  }),
  dataValue: (theme) => ({
    fontSize: 14,
    color: theme.secondary[400],
    fontWeight: 'bold',
  }),
  noDataText: (theme) => ({
    fontSize: 16,
    color: theme.text.secondary,
    textAlign: 'center',
    marginTop: 20,
  }),
  refreshButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  retryButton: {
    marginTop: 20,
  },
});

export default ThingSpeakScreen;
