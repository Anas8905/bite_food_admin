import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAlert } from '@/hooks/useAlert';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColors } from '@/hooks/useThemeColors';
import { isAndroid } from '@/utils/common.utils';
import { createThemedStyles } from '@/utils/styles';
import { Octicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen(): React.JSX.Element {
  const styles = useThemedStyles();
  const { textPrimary, textMuted } = useThemeColors();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [password] = useState(user?.password);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [isUpdating, setIsUpdating] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      return showAlert(
        'Warning',
        'We need camera roll permissions to make this work!'
      );
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    } else {
      return showAlert('Warning', "You did not select any image.")
    }
  };

  const saveProfile = async () => {
    if (!fullName || !email || !avatar || !password) {
      return showAlert('Missing fields', 'Please fill all fields.');
    }

    setIsUpdating(true);
    const updatedUser: User = { fullName, email, avatar, password };

    try {
      const response = await updateProfile(updatedUser);

      if (response.success) {
          return showAlert('Profile Updated', `Name: ${fullName}\nEmail: ${email}`);
      }
    } catch {
      showAlert('Update Failed', 'Profile is not updated.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <ThemedView colorName="bgGray" style={styles.avatarClipper}>
                {avatar && (
                  <Image source={{ uri: avatar }} style={styles.avatarImage} />
                )}
              </ThemedView>

              <Pressable style={styles.editIcon} onPress={pickImage}>
                <Octicons name="pencil" size={14} color={textPrimary} />
              </Pressable>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.fieldGroup}>
            <View style={styles.nameContainer}>
              <ThemedText style={styles.label}>FULL NAME</ThemedText>
              <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={textMuted}
                  autoCorrect={false}
                  editable={false}
              />
            </View>

            <View style={styles.emailContainer}>
              <ThemedText style={styles.label}>EMAIL</ThemedText>
              <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Full Name"
                  placeholderTextColor={textMuted}
                  editable={false}
              />
            </View>
          </View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
            disabled={isUpdating}
          >
          <ThemedText style={styles.cancelText}>Discard Changes</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={saveProfile}
            disabled={isUpdating}
          >
          {isUpdating ? (
              <ActivityIndicator color={textPrimary} size={16} />
              ) : (
              <ThemedText colorName='textPrimary' style={styles.saveText}>SAVE</ThemedText>
          )}
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const useThemedStyles = createThemedStyles(({
  bgPrimary,
  accentPrimary,
  textPrimary,
  inputBackground,
  bgGray,
}) => ({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: bgPrimary,
    },
    innerContainer: {
      marginTop: isAndroid ? 56 : 10,
      paddingHorizontal: 20,
    },
    avatarSection: {
      alignItems: 'center',
    },
    avatarCircle: {
      width: 124,
      height: 124,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarClipper: {
      width: '100%',
      height: '100%',
      borderRadius: 62,
      overflow: 'hidden',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    editIcon: {
      position: 'absolute',
      bottom: 2,
      right: 6,
      backgroundColor: accentPrimary,
      borderRadius: 20,
      padding: 11,
      width: 35,
      height: 35,
    },
    fieldGroup: {
      gap: 10,
    },
    nameContainer: {
      gap: 4,
    },
    emailContainer: {
      gap: 4,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      marginBottom: 6,
      marginTop: 10,
    },
    input: {
      backgroundColor: inputBackground,
      color: textPrimary,
      opacity: 0.9,
      borderRadius: 10,
      padding: 12,
      fontSize: 14,
    },
    buttonRow: {
      marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    cancelBtn: {
      backgroundColor: bgGray,
      paddingVertical: 14,
      borderRadius: 30,
      flex: 1,
      alignItems: 'center',
    },
    saveBtn: {
      backgroundColor: accentPrimary,
      paddingVertical: 14,
      borderRadius: 30,
      flex: 1,
      alignItems: 'center',
      marginLeft: 8,
    },
    cancelText: {
      fontWeight: 600,
      opacity: 0.9
    },
    saveText: {
      fontWeight: 600,
    },
  }));
