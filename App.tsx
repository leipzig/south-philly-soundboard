import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';

const soundAssets = {
  'I_will_move_this_fucking_junk_wagon_right_now.wav': require('./wavs/I_will_move_this_fucking_junk_wagon_right_now.wav'),
  'are_ya.wav': require('./wavs/are_ya.wav'),
  'are_you_christine.wav': require('./wavs/are_you_christine.wav'),
  'dont_you_see_it.wav': require('./wavs/dont_you_see_it.wav'),
  'eileen_go_sit_down.wav': require('./wavs/eileen_go_sit_down.wav'),
  'even_a_sidewalks_a_fuckin_public_property.wav': require('./wavs/even_a_sidewalks_a_fuckin_public_property.wav'),
  'excuse_me_this_is_not_a_private_property.wav': require('./wavs/excuse_me_this_is_not_a_private_property.wav'),
  'get_the_fuckin_picture.wav': require('./wavs/get_the_fuckin_picture.wav'),
  'go.wav': require('./wavs/go.wav'),
  'go_head_you_gonna_pay_for_it.wav': require('./wavs/go_head_you_gonna_pay_for_it.wav'),
  'he_wants_to_be_a_motherfucker.wav': require('./wavs/he_wants_to_be_a_motherfucker.wav'),
  'i_can_video_too_ok_so_what.wav': require('./wavs/i_can_video_too_ok_so_what.wav'),
  'i_want_him_outta_here.wav': require('./wavs/i_want_him_outta_here.wav'),
  'is_there_a_handicap_on_his_license.wav': require('./wavs/is_there_a_handicap_on_his_license.wav'),
  'it_doesnt_matter.wav': require('./wavs/it_doesnt_matter.wav'),
  'it_was_right_here.wav': require('./wavs/it_was_right_here.wav'),
  'joe.wav': require('./wavs/joe.wav'),
  'just_go.wav': require('./wavs/just_go.wav'),
  'leave.wav': require('./wavs/leave.wav'),
  'leave2.wav': require('./wavs/leave2.wav'),
  'no_it_does_not.wav': require('./wavs/no_it_does_not.wav'),
  'now_move.wav': require('./wavs/now_move.wav'),
  'oh_shes_videoing.wav': require('./wavs/oh_shes_videoing.wav'),
  'ok_go_head.wav': require('./wavs/ok_go_head.wav'),
  'ow.wav': require('./wavs/ow.wav'),
  'property_my_ass.wav': require('./wavs/property_my_ass.wav'),
  'tell_that_to_the_cop.wav': require('./wavs/tell_that_to_the_cop.wav'),
  'thats_all.wav': require('./wavs/thats_all.wav'),
  'thats_it.wav': require('./wavs/thats_it.wav'),
  'they_own_the_house.wav': require('./wavs/they_own_the_house.wav'),
  'watch.wav': require('./wavs/watch.wav'),
  'whatever.wav': require('./wavs/whatever.wav'),
  'whatever2.wav': require('./wavs/whatever2.wav'),
  'why_couldnt_he_move_over_there.wav': require('./wavs/why_couldnt_he_move_over_there.wav'),
  'wrench.wav': require('./wavs/wrench.wav'),
  'yall_tackin_him.wav': require('./wavs/yall_tackin_him.wav'),
  'yall_tackin_him_right_now.wav': require('./wavs/yall_tackin_him_right_now.wav'),
  'yep.wav': require('./wavs/yep.wav'),
  'you_better_get_out_right_now.wav': require('./wavs/you_better_get_out_right_now.wav'),
  'you_put_that_in_there_now.wav': require('./wavs/you_put_that_in_there_now.wav'),
  'you_ready.wav': require('./wavs/you_ready.wav'),
  'youre_hurtin_me.wav': require('./wavs/youre_hurtin_me.wav'),
} as const;

const soundFiles = Object.keys(soundAssets);

export default function App() {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);

  const playSound = async (fileName: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        soundAssets[fileName as keyof typeof soundAssets]
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const formatButtonText = (fileName: string) => {
    return fileName
      .replace('.wav', '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>South Philly Soundboard</Text>
        <View style={styles.grid}>
          {soundFiles.map((file, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => playSound(file)}
            >
              <Text style={styles.buttonText}>{formatButtonText(file)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  button: {
    width: '48%',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});
