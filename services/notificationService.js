import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    console.log('Permissão negada');
    return;
  }
}

export async function sendLoginNotification(userName) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '✅ Login realizado!',
      body: `Bem-vindo de volta${userName ? ', ' + userName : ''}!`,
    },
    trigger: { seconds: 1 },
  });
}
