import React from 'react';
import {Composition, Still, staticFile} from 'remotion';
import {FPS, H, W} from './brand';
import {Reel} from './Reel';
import {Slide} from './Carousel';
import {Cover} from './Cover';

const loadPlan = async () => fetch(staticFile('data/plan.json')).then((r) => r.json());

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Reel"
      component={Reel as any}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={300}
      defaultProps={{id: 'R01'} as any}
      calculateMetadata={async ({props}: any) => {
        const plan = await loadPlan();
        const timing = await fetch(staticFile(`data/timing/${props.id}.json`)).then((r) => r.json());
        const reel = plan.reels.find((r: any) => r.id === props.id);
        return {durationInFrames: Math.ceil(timing.duration * FPS), props: {...props, reel, timing}};
      }}
    />
    <Still
      id="Cover"
      component={Cover as any}
      width={W}
      height={H}
      defaultProps={{id: 'R01'} as any}
      calculateMetadata={async ({props}: any) => {
        const plan = await loadPlan();
        return {props: {...props, reel: plan.reels.find((r: any) => r.id === props.id)}};
      }}
    />
    <Still
      id="Slide"
      component={Slide as any}
      width={1080}
      height={1350}
      defaultProps={{id: 'C01', index: 0} as any}
      calculateMetadata={async ({props}: any) => {
        const plan = await loadPlan();
        const car = plan.carousels.find((c: any) => c.id === props.id);
        return {props: {...props, car}};
      }}
    />
  </>
);
