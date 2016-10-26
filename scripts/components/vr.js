/*!
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const _vrButton = document.createElement('button');

export class VR {
  static init() {
    _vrButton.classList.add('vr');
    _vrButton.addEventListener('click', VR._onClick.bind(VR));
    VR.showButtonIfAppropriate();
  }

  static showButtonIfAppropriate () {
    // Button is only available on “location” page
    if (window.location.pathname !== '/devsummit/location') {
      return Promise.resolve();
    }

    const _masthead = document.querySelector('.masthead');

    return new Promise(function (resolve) {
      _vrButton.classList.add('hide');
      _masthead.appendChild(_vrButton);

      // Double rAF to allow all changes to take hold.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          _vrButton.classList.remove('hide');
          _vrButton.addEventListener('transitionend', function h() {
            _vrButton.removeEventListener('transitionend', h);
            resolve();
          });
        })
      });
    });
  }

  static hideButton () {
    // If button is not in the DOM, we are done
    if (!_vrButton.parentNode) {
      return Promise.resolve();
    }

    return new Promise(function (resolve) {
      _vrButton.classList.add('hide');
      _vrButton.addEventListener('transitionend', function h() {
        _vrButton.removeEventListener('transitionend', h);
        resolve();
      });
    })
    .then(function () {
      _vrButton.parentNode.removeChild(_vrButton);
    });
  }

  static _onClick (event) {
    console.log('lol');
  }
}