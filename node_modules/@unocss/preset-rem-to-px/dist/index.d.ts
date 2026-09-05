import * as _unocss_core from '@unocss/core';

interface RemToPxOptions {
    /**
     * 1rem = n px
     * @default 16
     */
    baseFontSize?: number;
}
/**
 * @see https://unocss.dev/presets/rem-to-px
 */
declare const presetRemToPx: _unocss_core.PresetFactory<object, RemToPxOptions>;

export { type RemToPxOptions, presetRemToPx as default, presetRemToPx };
