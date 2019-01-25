import { Module } from '@src/Module';
import { HTML5Player } from '@src/player/HTML5Player/HTML5Player';
import { Events, IEventData, IInstance } from '@src/types';

interface ICapChangeEventData extends IEventData {
  srclang: string;
}

export class CaptionsExtension extends Module {
  public name: string = 'CaptionsExtension';

  private tracks: HTMLTrackElement[];

  constructor(instance: IInstance) {
    super(instance);

    this.tracks = instance.config.captions.map(caption => {
      const track = document.createElement('track');

      track.kind = 'captions';
      track.label = caption.label;
      track.srclang = caption.srclang;
      track.src = caption.src;

      return track;
    });

    this.once(Events.READY, () => {
      const mediaElement: HTMLMediaElement = (this.instance
        .player as HTML5Player).mediaElement;

      this.tracks.forEach(track => {
        mediaElement.appendChild(track);
      });
    });
  }

  public setSubtitle(srclang: string) {
    const mediaElement: HTMLMediaElement = (this.instance.player as HTML5Player)
      .mediaElement;

    for (let i = 0; i < mediaElement.textTracks.length; i++) {
      const track = mediaElement.textTracks[i];
      track.mode = track.language === srclang ? 'showing' : 'hidden';
    }

    this.emit(Events.PLAYER_STATE_CAPTIONSCHANGE, {
      srclang,
    } as ICapChangeEventData);
  }
}
