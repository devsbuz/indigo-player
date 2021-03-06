import { Events, IInstance } from '@src/types';
import { IData } from '@src/ui/types';

export function triggerEvent(
  instance: IInstance,
  data: IData,
  prevData: IData,
) {
  if (!prevData) {
    return;
  }

  // Trigger the controls visibility.
  if (data.visibleControls && !prevData.visibleControls) {
    instance.emit(Events.UI_VISIBLECONTROLS_CHANGE, {
      visibleControls: true,
    });
  } else if (!data.visibleControls && prevData.visibleControls) {
    instance.emit(Events.UI_VISIBLECONTROLS_CHANGE, {
      visibleControls: false,
    });
  }

  // Trigger subtitles to move up.
  const subtitlesExtension = instance.getModule('SubtitlesExtension');
  if (subtitlesExtension) {
    if (data.visibleControls && !prevData.visibleControls) {
      (subtitlesExtension as any).setOffset(42);
    } else if (!data.visibleControls && prevData.visibleControls) {
      (subtitlesExtension as any).setOffset(0);
    }
  }
}
