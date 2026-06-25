import { Composition } from 'remotion';
import { DowntonTitle } from './DowntonTitle';

export function RemotionRoot() {
  return (
    <Composition
      id="DowntonTitle"
      component={DowntonTitle}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
