import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import KanjiModule from './kanji/kanji.module';
import RadicalModule from './radical/radical.module';
import VocabularyModule from './vocabulary/vocabulary.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RadicalModule, KanjiModule, VocabularyModule],
})
export class JapaneseModule {}
