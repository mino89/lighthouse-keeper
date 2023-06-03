import { Component, Input } from '@angular/core';
import { LightHouseAudit, LightHouseScore } from 'src/app/shared/models/lighthouse';

@Component({
  selector: 'lhk-audit-result',
  templateUrl: './audit-result.component.html',
  styleUrls: ['./audit-result.component.scss']
})
export class AuditResultComponent {
//TODO: define a type for result
  @Input() result!: LightHouseAudit
  scoreType = LightHouseScore

  changeClassBasedOnScore(score: string){
    let color
    switch(score){
      case LightHouseScore.fast:
        color = 'fast'
        break
      case LightHouseScore.average:
        color = 'average'
        break
      case LightHouseScore.slow:
        color = 'slow'
        break
    }
    return `score-color-${color}`
  }

}
