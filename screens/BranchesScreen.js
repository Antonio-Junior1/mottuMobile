import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, useColorScheme, ActivityIndicator, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { lightTheme, darkTheme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Patio from '../models/Patio';
import i18n from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const BranchesScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const { currentLanguage } = useLanguage();

  const [patios, setPatios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPatioName, setNewPatioName] = useState('');
  const [editingPatio, setEditingPatio] = useState(null);

  const fetchPatios = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'patios'));
      const loadedPatios = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPatios(loadedPatios);
    } catch (error) {
      console.error('Erro ao carregar pátios do Firestore:', error);
      Alert.alert(i18n.t('error'), i18n.t('couldNotLoadBranches'));
      setPatios([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPatios();
    }, [])
  );

  const handleAddPatio = async () => {
    if (!newPatioName.trim()) {
      Alert.alert(i18n.t('error'), i18n.t('emptyBranchName'));
      return;
    }
    setLoading(true);
    try {
      const newPatioData = new Patio(null, newPatioName.trim());
      await addDoc(collection(db, 'patios'), newPatioData.toFirestore());
      Alert.alert(i18n.t('success'), i18n.t('branchAdded'));
      setNewPatioName('');
      setModalVisible(false);
      fetchPatios();
    } catch (error) {
      console.error('Erro ao adicionar pátio:', error);
      Alert.alert(i18n.t('error'), i18n.t('couldNotAddBranch'));
    } finally {
      setLoading(false);
    }
  };

  const handleEditPatio = async () => {
    if (!newPatioName.trim()) {
      Alert.alert(i18n.t('error'), i18n.t('emptyBranchName'));
      return;
    }
    if (!editingPatio) return;

    setLoading(true);
    try {
      const patioRef = doc(db, 'patios', editingPatio.id);
      await updateDoc(patioRef, { nome_local: newPatioName.trim() });
      Alert.alert(i18n.t('success'), i18n.t('branchUpdated'));
      setNewPatioName('');
      setEditingPatio(null);
      setModalVisible(false);
      fetchPatios();
    } catch (error) {
      console.error('Erro ao atualizar pátio:', error);
      Alert.alert(i18n.t('error'), i18n.t('couldNotUpdateBranch'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatio = async (id) => {
    Alert.alert(
      i18n.t('confirmDelete'),
      i18n.t('confirmDeleteBranch'),
      [
        { text: i18n.t('cancel'), style: 'cancel' },
        {
          text: i18n.t('delete'),
          onPress: async () => {
            setLoading(true);
            try {
              await deleteDoc(doc(db, 'patios', id));
              Alert.alert(i18n.t('success'), i18n.t('branchDeleted'));
              fetchPatios();
            } catch (error) {
              console.error('Erro ao excluir pátio:', error);
              Alert.alert(i18n.t('error'), i18n.t('couldNotDeleteBranch'));
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openAddModal = () => {
    setEditingPatio(null);
    setNewPatioName('');
    setModalVisible(true);
  };

  const openEditModal = (patio) => {
    setEditingPatio(patio);
    setNewPatioName(patio.nome_local);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.branchCard(theme)}
      onPress={() => Alert.alert(
        item.nome_local,
        `${i18n.t('whatToDo')} ${item.nome_local}?`,
        [
          {
            text: i18n.t('viewMotorcycles'),
            onPress: () => navigation.navigate('Motos', { branchName: item.nome_local }),
          },
          {
            text: i18n.t('edit'),
            onPress: () => openEditModal(item),
          },
          {
            text: i18n.t('delete'),
            onPress: () => handleDeletePatio(item.id),
            style: 'destructive',
          },
          {
            text: i18n.t('cancel'),
            style: 'cancel',
          },
        ],
        { cancelable: true }
      )}
    >
      <Ionicons name="business" size={24} color={theme.secondary[500]} />
      <View style={styles.branchInfo}>
        <Text style={styles.branchName(theme)}>{item.nome_local}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.text.secondary} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[theme.primary[900], theme.primary[800]]}
      style={styles.container}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.secondary[500]} />
          <Text style={{ color: theme.text.primary, marginTop: 10 }}>{i18n.t('loadingBranches')}</Text>
        </View>
      ) : (
        <FlatList
          data={patios}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.title(theme)}>{i18n.t('branchesTitle')}</Text>
              <TouchableOpacity onPress={openAddModal} style={styles.addButton(theme)}>
                <Ionicons name="add-circle-outline" size={24} color={theme.text.primary} />
                <Text style={styles.addButtonText(theme)}>{i18n.t('addBranch')}</Text>
              </TouchableOpacity>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyComponentContainer}>
              <Text style={styles.emptyComponentText(theme)}>
                {i18n.t('noBranchesYet')}
              </Text>
            </View>
          }
          extraData={currentLanguage}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: theme.primary[800] }]}>
            <Text style={[styles.modalTitle, { color: theme.text.primary }]}>
              {editingPatio ? i18n.t('editBranch') : i18n.t('addNewBranch')}
            </Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.primary[700], color: theme.text.primary, borderColor: theme.primary[600] }]}
              placeholder={editingPatio ? i18n.t('branchName') : i18n.t('branchNamePlaceholder')}
              placeholderTextColor={theme.text.secondary}
              value={newPatioName}
              onChangeText={setNewPatioName}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.error[500] }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, { color: theme.text.primary }]}>{i18n.t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.secondary[500] }]}
                onPress={editingPatio ? handleEditPatio : handleAddPatio}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={theme.text.primary} />
                ) : (
                  <Text style={[styles.buttonText, { color: theme.text.primary }]}>
                    {editingPatio ? i18n.t('saveChanges') : i18n.t('add')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: (theme) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.secondary[500],
    textAlign: 'center',
    flex: 1,
  }),
  addButton: (theme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.primary[700],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: theme.primary[600],
    borderWidth: 1,
  }),
  addButtonText: (theme) => ({
    color: theme.text.primary,
    marginLeft: 5,
    fontWeight: 'bold',
  }),
  branchCard: (theme) => ({
    backgroundColor: theme.primary[700],
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  branchInfo: {
    flex: 1,
    marginLeft: 16,
  },
  branchName: (theme) => ({
    color: theme.text.primary,
    fontSize: 16,
    fontWeight: '600',
  }),
  emptyComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyComponentText: (theme) => ({
    color: theme.text.secondary,
    fontSize: 16,
    textAlign: 'center',
  }),
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default BranchesScreen;
