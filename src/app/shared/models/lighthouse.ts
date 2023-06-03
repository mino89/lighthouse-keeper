export enum LighHouseStrategy {
  desktop = 'DESKTOP',
  mobile = 'MOBILE'
}

export enum LightHouseScore{
  slow = 'SLOW',
  average = 'AVERAGE',
  fast = 'FAST'
}

export interface LightHouseAudit {
  id: string
  type: 'desktop' | 'mobile';
  cruxMetrics:       CruxMetrics;
  lighthouseMetrics: LighthouseMetrics;
  screenshot:        Screenshot;
}

export interface CruxMetrics {
  first_contenful_paint: string;
  first_input_delay:     string;
}

export interface LighthouseMetrics {
  first_contentful_paint: string;
  speed_index:            string;
  time_to_interactive:    string;
  first_meaningful_paint: string;
}

export interface Screenshot {
  data:   string;
  height: number;
  width:  number;
}
