import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { run } from '@ember/runloop';

export default class ApplicationRoute extends Route {
  @action 
  didTransition() {
    run.scheduleOnce('afterRender', this, function() {
      let scroll = window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 1000/60))
      let elementsToShow = document.querySelectorAll('.show-on-scroll'); 

      function loop() {
        elementsToShow.forEach((element) => {
          if (isElementInViewport(element))
            element.classList.add('is-visible');
          else
            element.classList.remove('is-visible');
        });
        scroll(loop);
      }

      loop();

      function isElementInViewport(el) {
        if (typeof jQuery === "function" && el instanceof jQuery)
          el = el[0];

        let rect = el.getBoundingClientRect();
        return (
          (rect.top <= 0
            && rect.bottom >= 0)
          ||
          (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight))
          ||
          (rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        );
      }
    })
    return true
  }
}
