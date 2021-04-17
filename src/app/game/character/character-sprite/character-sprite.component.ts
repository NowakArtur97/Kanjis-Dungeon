import { AfterViewInit, Component, OnInit } from '@angular/core';
import CssUtil from 'src/app/common/utils/css.util';

@Component({
  selector: 'app-character-sprite',
  templateUrl: './character-sprite.component.html',
  styleUrls: ['./character-sprite.component.css'],
})
export class CharacterSpriteComponent implements OnInit, AfterViewInit {
  private characterImage = 'example-character';
  private numberOfFrames = 4;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const characterImage: string =
      CssUtil.getCSSVariable('--sprite-src') +
      this.characterImage +
      '_' +
      CssUtil.getCSSVariable('--sprite-size-multiplier') +
      CssUtil.getCSSVariable('--sprite-extension');
    CssUtil.changeCSSVariable('--sprite-image', `url(${characterImage})`);
    CssUtil.changeCSSVariable('--sprite-frames', this.numberOfFrames);
  }
}
