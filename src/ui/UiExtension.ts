import { Module } from '@src/Module';
import { Events, IInstance } from '@src/types';
import { render } from '@src/ui/render';

import '@src/ui/theme/index.scss';

export class UiExtension extends Module {
  public name: string = 'UiExtension';

  constructor(instance: IInstance) {
    super(instance);

    const container = this.instance.container.querySelector(
      '.ig-ui',
    ) as HTMLElement;

    this.instance.on(Events.STATE_CHANGE, state =>
      render(container, state, this.instance),
    );
  }
}
