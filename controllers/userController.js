import admin from 'firebase-admin';

const db = admin.firestore();


// Save FCM Token to Firestore
export const saveNotificationToken = async (req, res) => {
    const { token, userId } = req.body; // Assume you also send userId to associate the token

    try {
        const userRef = db.collection('users').doc(userId);
        await userRef.update({ fcmToken: token });
        res.status(200).send({ message: 'Token saved successfully!' });
    } catch (error) {
        console.error('Error saving token:', error);
        res.status(500).send({ message: 'Error saving token' });
    }
}

export const sendNotification = async (userId, message) => {
    try {
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            throw new Error('User not found');
        }

        const fcmToken = userDoc.data().fcmToken;

        if (!fcmToken) {
            throw new Error('No FCM token found for user');
        }

        const payload = {
            notification: {
                title: 'Notification',
                body: message,
            },
            token: fcmToken,
        };

        const response = await admin.messaging().send(payload);
        console.log('Notification sent:', response);
        return response;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};