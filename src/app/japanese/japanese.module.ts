import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JapaneseAlphabetComponent } from './common/components/japanese-alphabet/japanese-alphabet.component';
import { JapanesePipe } from './common/pipes/japanese.pipe';
import KanjiModule from './kanji/kanji.module';
import RadicalModule from './radical/radical.module';
import VocabularyModule from './vocabulary/vocabulary.module';

@NgModule({
  declarations: [JapanesePipe, JapaneseAlphabetComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    RadicalModule,
    KanjiModule,
    VocabularyModule,
  ],
  exports: [JapanesePipe, JapaneseAlphabetComponent],
})
export class JapaneseModule {}
