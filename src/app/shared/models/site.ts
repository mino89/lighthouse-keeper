import { Audit } from "./audit";

export interface Site {
  id: number;
  title:string;
  url:string;
  description:string;
  audits: Audit[];
}
