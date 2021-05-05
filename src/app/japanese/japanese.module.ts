import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JapanesePipe } from './common/pipes/japanese.pipe';
import KanjiModule from './kanji/kanji.module';
import RadicalModule from './radical/radical.module';
import VocabularyModule from './vocabulary/vocabulary.module';

@NgModule({
  declarations: [JapanesePipe],
  imports: [CommonModule, RadicalModule, KanjiModule, VocabularyModule],
  exports: [JapanesePipe],
})
export class JapaneseModule {}
