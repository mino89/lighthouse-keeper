import { LightHouseAudit } from "./lighthouse";

export interface Audit {
  id?: number;
  siteId: number;
  date: Date;
  auditData: LightHouseAudit
}
