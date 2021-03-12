import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JapanesePipe } from './pipe/japanese.pipe';

@NgModule({
  declarations: [JapanesePipe, JapanesePipe],
  imports: [CommonModule],
})
export class AppCommonModule {}
