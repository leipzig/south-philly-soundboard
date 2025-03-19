import React, { useState, useRef } from 'react';
import './App.css';

const soundCategories = {
  joe: [
    'eileen_go_sit_down.wav',
    'get_the_fuckin_picture.wav',
    'he_wants_to_be_a_motherfucker.wav',
    'I_will_move_this_fucking_junk_wagon_right_now.wav',
    'i_want_him_outta_here.wav',
    'watch.wav',
    'wrench.wav',
    'you_put_that_in_there_now.wav',
    'you_ready.wav',
    'youre_hurtin_me.wav'
  ],
  christine: [
    'dont_you_see_it.wav',
    'even_a_sidewalks_a_fuckin_public_property.wav',
    'excuse_me_this_is_not_a_private_property.wav',
    'go_head_you_gonna_pay_for_it.wav',
    'it_doesnt_matter.wav',
    'it_was_right_here.wav',
    'no_it_does_not.wav',
    'ok_go_head.wav',
    'property_my_ass.wav',
    'tell_that_to_the_cop.wav',
    'whatever.wav',
    'yall_tackin_him.wav',
    'yall_tackin_him_right_now.wav',
    'yep.wav'
  ],
  neighbor: [
    'is_there_a_handicap_on_his_license.wav',
    'they_own_the_house.wav'
  ],
  eileen: [
    'are_ya.wav',
    'are_you_christine.wav',
    'go.wav',
    'i_can_video_too_ok_so_what.wav',
    'joe.wav',
    'just_go.wav',
    'leave.wav',
    'leave2.wav',
    'now_move.wav',
    'oh_shes_videoing.wav',
    'ow.wav',
    'thats_all.wav',
    'thats_it.wav',
    'whatever2.wav',
    'why_couldnt_he_move_over_there.wav',
    'you_better_get_out_right_now.wav'
  ]
};

function App() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const formatButtonText = (fileName: string) => {
    return fileName
      .replace('.wav', '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatCategoryName = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const playSound = (fileName: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = audioRefs.current[fileName];
    if (audio) {
      audio.play();
      setCurrentAudio(audio);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>South Philly Soundboard</h1>
      </header>
      <div className="categories-container">
        {Object.entries(soundCategories).map(([category, files]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{formatCategoryName(category)}</h2>
            <div className="soundboard-grid">
              {files.map((file) => (
                <React.Fragment key={file}>
                  <button
                    className={`sound-button ${category}`}
                    onClick={() => playSound(file)}
                  >
                    {formatButtonText(file)}
                  </button>
                  <audio
                    ref={(element) => {
                      if (element) {
                        audioRefs.current[file] = element;
                      }
                    }}
                    src={`${process.env.PUBLIC_URL}/wavs/${file}`}
                    preload="auto"
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
