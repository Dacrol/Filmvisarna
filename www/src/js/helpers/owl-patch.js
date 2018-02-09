/**
 * Patches the Owl Carousel play function by appending additional YouTube parameters
 *
 * @param {string} additionalParams Parameters to append to the generated iframes
 * @see {@link https://developers.google.com/youtube/player_parameters}
 */
export default function patchOwlCarousel (additionalParams) {
  const playFn =
    // @ts-ignore
    window.$.fn.owlCarousel.prototype.constructor.Constructor.Plugins.Video
      .prototype.play;
  // @ts-ignore
  window.$.fn.owlCarousel.prototype.constructor.Constructor.Plugins.Video.prototype.play = function (
    event
  ) {
    playFn.apply(this, arguments);
    let src = $('.owl-video-frame')
      .children()
      .first()
      .prop('src');
    $('.owl-video-frame')
      .children()
      .first()
      .prop('src', src + additionalParams);
  };
}
