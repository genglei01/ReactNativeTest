import TrackPlayer, { EmitterSubscription } from 'react-native-track-player';

export class AudioTrace {
    id: string;
    url: string;
    title: string;
    artist: string;
    artwork?: string;

    constructor(id: string, url: string, title: string = 'GrapeSEED', artwork?: string | null) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.artwork = artwork as string | undefined;
        this.artist = '';
    }
}

export default class AudioPlayer {
    private static _instance: AudioPlayer | null = null;
    private _traceEvents: EmitterSubscription[] = [];
    private _speed = 1;


    static getInstance(): AudioPlayer {
        if (!AudioPlayer._instance) {
            AudioPlayer._instance = new AudioPlayer();
            AudioPlayer._instance.setup();
        }

        return AudioPlayer._instance;
    }

    async addTrace(trace: AudioTrace) {
        await TrackPlayer.add(trace);
    }

    async setup() {
        await TrackPlayer.setupPlayer();

        this._traceEvents.push(
            TrackPlayer.addEventListener('playback-queue-ended', data => {
            }),
        );

        this._traceEvents.push(
            TrackPlayer.addEventListener('playback-error', data => {
                console.info('play-error', data);
            }),
        );

        TrackPlayer.addEventListener('playback-track-changed', data => {
            console.info('play-error', data);
        })
    }

    async play(onEnd?: () => void) {
        await TrackPlayer.play();
    }


    async stop() {
        await TrackPlayer.pause();
        await TrackPlayer.stop();
        await TrackPlayer.reset();
    }


    setSpeed(value: number) {
      return  TrackPlayer.setRate(value);
    }
}
