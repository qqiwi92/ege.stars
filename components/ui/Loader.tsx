import React from 'react';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { LoaderCircle } from 'lucide-react-native';

export default function App() {
  return (
      <MotiView
        from={{ rotate: '0deg' }}
        animate={{ rotate: '360deg' }}
        transition={{
          type: 'timing',
          duration: 3000,
          loop: true,
          repeatReverse: false,
          easing: Easing.linear,  // avoid speed variations :contentReference[oaicite:1]{index=1}
        }}
      >
        <LoaderCircle />
      </MotiView>
  );
}

// const styles = StyleSheet.create({
//   rotator: { width: 200, height: 200, backgroundColor: 'tomato' },
// });
